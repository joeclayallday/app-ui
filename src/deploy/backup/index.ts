import {
  type PaginateProps,
  api,
  cacheLongTimer,
  cacheTimer,
  combinePages,
  thunks,
} from "@app/api";
import { poll } from "@app/fx";
import { createAction, createSelector } from "@app/fx";
import { defaultEntity, extractIdFromLink } from "@app/hal";
import { type WebState, schema } from "@app/schema";
import { dateDescSort } from "@app/sort";
import type { DeployBackup, HalEmbedded, LinkResponse } from "@app/types";
import { selectDatabases } from "../database";
import type { DeployOperationResponse } from "../operation";

export interface BackupResponse {
  id: number;
  aws_region: string;
  created_by_email: string;
  manual: boolean;
  size: number;
  created_at: string;
  database_handle: string;
  _embedded: {
    copied_from?: {
      id: number;
    };
  };
  _links: {
    account: LinkResponse;
    copies: LinkResponse;
    created_from_operation: LinkResponse;
    database: LinkResponse;
    database_image: LinkResponse;
    operations: LinkResponse;
  };
  _type: "backup";
}

export interface HalBackups {
  backups: BackupResponse[];
}

export const deserializeDeployBackup = (b: BackupResponse): DeployBackup => {
  return {
    id: `${b.id}`,
    awsRegion: b.aws_region,
    createdByEmail: b.created_by_email,
    copiedFromId: `${b._embedded.copied_from?.id || ""}`,
    size: b.size,
    manual: b.manual,
    createdAt: b.created_at,
    databaseId: extractIdFromLink(b._links.database),
    environmentId: extractIdFromLink(b._links.account),
    createdFromOperationId: extractIdFromLink(b._links.created_from_operation),
    databaseHandle: b.database_handle,
  };
};

export const selectBackupById = schema.backups.selectById;
export const selectBackupsByIds = schema.backups.selectByIds;
export const selectBackupsAsList = schema.backups.selectTableAsList;
export const selectBackups = schema.backups.selectTable;
export const findBackupsByEnvId = (backups: DeployBackup[], envId: string) =>
  backups.filter((backup) => backup.environmentId === envId);
export const findBackupsByDatabaseId = (
  backups: DeployBackup[],
  dbId: string,
) => backups.filter((backup) => backup.databaseId === dbId);

export const selectBackupsByEnvId = createSelector(
  selectBackupsAsList,
  (_: WebState, p: { envId: string }) => p.envId,
  (backups, envId) =>
    backups.filter((bk) => bk.environmentId === envId).sort(dateDescSort),
);

export const selectOrphanedBackupsByEnvId = createSelector(
  selectBackupsByEnvId,
  selectDatabases,
  (backups, databases) => {
    return backups.filter((backup) => {
      const db = databases[backup.databaseId];
      if (!db) return true;
      return false;
    });
  },
);

export const selectBackupsByDatabaseId = createSelector(
  selectBackupsAsList,
  (_: WebState, p: { dbId: string }) => p.dbId,
  findBackupsByDatabaseId,
);

export const backupEntities = {
  backup: defaultEntity({
    id: "backup",
    deserialize: deserializeDeployBackup,
    save: schema.backups.add,
  }),
};

// As of 2024-08-12 the largest number of backups for any one org is ~27,000
export const fetchBackupsPage = api.get<PaginateProps>(
  "/backups?per_page=1500&page=:page",
);
export const fetchBackups = thunks.create(
  "fetch-backups",
  { supervisor: cacheLongTimer() },
  combinePages(fetchBackupsPage),
);

export const cancelPollDatabaseBackups = createAction("cancel-poll-db-backups");
export const pollDatabaseBackups = api.get<{ id: string }>(
  ["/databases/:id/backups", "poll"],
  { supervisor: poll(10 * 1000, `${cancelPollDatabaseBackups}`) },
);

export const fetchBackupsByDatabaseIdPage = api.get<
  { id: string } & PaginateProps,
  HalEmbedded<{ backups: BackupResponse[] }>
>("/databases/:id/backups?page=:page", function* (ctx, next) {
  yield* next();

  if (!ctx.json.ok) {
    return;
  }

  const ids = ctx.json.value._embedded.backups.map((bk) => `${bk.id}`);
  const paginatedData = { ...ctx.json.value, _embedded: { backups: ids } };
  yield* schema.update(schema.cache.add({ [ctx.key]: paginatedData }));
});
export const fetchBackupsByDatabaseId = thunks.create<{ id: string }>(
  "fetch-backups-by-database-id",
  { supervisor: cacheTimer() },
  combinePages(fetchBackupsByDatabaseIdPage),
);

export const fetchBackup = api.get<{ id: string }>("/backups/:id");

interface FetchByResourceIdProps {
  id: string;
  onlyOrphaned?: boolean;
  perPage?: number;
}
export const fetchBackupsByEnvIdPage = api.get<
  FetchByResourceIdProps & PaginateProps,
  HalEmbedded<{ backups: BackupResponse[] }>
>("/accounts/:id/backups?page=:page", function* (ctx, next) {
  if (ctx.payload.onlyOrphaned === true) {
    ctx.request = ctx.req({
      url: `${ctx.req().url}&orphaned=true`,
    });
  }
  if (ctx.payload.perPage != null) {
    ctx.request = ctx.req({
      url: `${ctx.req().url}&per_page=${ctx.payload.perPage}`,
    });
  }

  yield* next();

  if (!ctx.json.ok) {
    return;
  }

  const ids = ctx.json.value._embedded.backups.map((bk) => `${bk.id}`);
  const paginatedData = { ...ctx.json.value, _embedded: { backups: ids } };
  yield* schema.update(schema.cache.add({ [ctx.key]: paginatedData }));
});

export const fetchBackupsByEnvId = thunks.create<FetchByResourceIdProps>(
  "fetch-backups-by-env-id",
  { supervisor: cacheTimer() },
  combinePages(fetchBackupsByEnvIdPage),
);

export const deleteBackup = api.post<{ id: string }, DeployOperationResponse>(
  ["/backups/:id/operations", "delete"],
  function* (ctx, next) {
    const body = {
      type: "purge",
    };
    ctx.request = ctx.req({ body: JSON.stringify(body) });
    yield* next();

    if (!ctx.json.ok) {
      return;
    }

    const opId = ctx.json.value.id;
    ctx.loader = {
      message: `Backup operation queued (operation ID: ${opId})`,
      meta: { opId: `${opId}` },
    };
    yield* schema.update(schema.backups.remove([ctx.payload.id]));
  },
);

export interface RestoreBackupProps {
  id: string;
  handle: string;
  destEnvId: string;
  diskSize?: number;
  containerSize?: number;
}

export const restoreBackup = api.post<
  RestoreBackupProps,
  DeployOperationResponse
>(["/backups/:id/operations", "restore"], function* (ctx, next) {
  const { handle, destEnvId, diskSize, containerSize } = ctx.payload;
  const body = {
    type: "restore",
    handle,
    destination_account_id: destEnvId,
    disk_size: diskSize || 10,
    containerSize: containerSize || 1024,
  };
  ctx.request = ctx.req({ body: JSON.stringify(body) });
  yield* next();

  if (!ctx.json.ok) {
    return;
  }

  const opId = ctx.json.value.id;
  ctx.loader = {
    message: `Restore from Backup operation queued (operation ID: ${opId})`,
    meta: { opId: `${opId}` },
  };
});
