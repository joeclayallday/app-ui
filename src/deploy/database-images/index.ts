import { selectDeploy } from "../slice";
import { PaginateProps, api, cacheTimer, combinePages, thunks } from "@app/api";
import { defaultEntity } from "@app/hal";
import { createTable } from "@app/slice-helpers";
import { AppState, DeployDatabaseImage } from "@app/types";
import { createSelector } from "@reduxjs/toolkit";
import { createReducerMap, mustSelectEntity } from "robodux";

export interface DeployDatabaseImageResponse {
  id: number;
  default: boolean;
  description: string;
  discoverable: boolean;
  docker_repo: string;
  type: string;
  version: string;
  visible: boolean;
  created_at: string;
  updated_at: string;
  _type: "database_image";
}

export const deserializeDeployDatabaseImage = (
  payload: DeployDatabaseImageResponse,
): DeployDatabaseImage => {
  return {
    id: `${payload.id}`,
    default: payload.default,
    description: payload.description,
    discoverable: payload.discoverable,
    dockerRepo: payload.docker_repo,
    type: payload.type,
    version: payload.version,
    visible: payload.visible,
    createdAt: payload.created_at,
    updatedAt: payload.updated_at,
  };
};

export const defaultDeployDatabaseImage = (
  db: Partial<DeployDatabaseImage> = {},
): DeployDatabaseImage => {
  const now = new Date().toISOString();
  return {
    id: "",
    default: false,
    description: "",
    discoverable: false,
    dockerRepo: "",
    type: "",
    version: "",
    visible: false,
    createdAt: now,
    updatedAt: now,
    ...db,
  };
};

export const DEPLOY_DATABASE_IMAGE_NAME = "databaseImages";
const slice = createTable<DeployDatabaseImage>({
  name: DEPLOY_DATABASE_IMAGE_NAME,
});
const { add: addDeployDatabaseImages } = slice.actions;

export const hasDeployDatabaseImage = (a: DeployDatabaseImage) => a.id !== "";
export const databaseImageReducers = createReducerMap(slice);
const initApp = defaultDeployDatabaseImage();
const must = mustSelectEntity(initApp);

const selectors = slice.getSelectors(
  (s: AppState) => selectDeploy(s)[DEPLOY_DATABASE_IMAGE_NAME],
);
export const selectDatabaseImageById = must(selectors.selectById);
export const selectDatabaseImagesAsList = createSelector(
  selectors.selectTableAsList,
  (imgs) =>
    imgs.sort((a, b) => {
      const type = a.type.localeCompare(b.type);
      if (type !== 0) {
        return type;
      }
      return a.version.localeCompare(b.version);
    }),
);

export const fetchDatabaseImages = api.get<PaginateProps>(
  "/database_images?page=:page",
  { saga: cacheTimer() },
);

export const fetchAllDatabaseImages = thunks.create(
  "fetch-all-database-images",
  { saga: cacheTimer() },
  combinePages(fetchDatabaseImages),
);

export const databaseImageEntities = {
  database_image: defaultEntity({
    id: "database_image",
    deserialize: deserializeDeployDatabaseImage,
    save: addDeployDatabaseImages,
  }),
};