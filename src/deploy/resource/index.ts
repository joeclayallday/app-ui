import { api, cacheMinTimer } from "@app/api";
// import { call, createAction, parallel, poll, select } from "@app/fx";
// import { createSelector } from "@app/fx";
import { defaultEntity } from "@app/hal";
// import { selectOrganizationSelectedId } from "@app/organizations";
import { schema } from "@app/schema";
// import type {
//     DeployApp,
//     DeployAppConfigEnv,
//     DeployOperation,
//     DeployServiceResponse,
//     LinkResponse,
//     ProvisionableStatus,
// } from "@app/types";
// import {
//     findEnvById,
//     hasDeployEnvironment,
//     selectEnvironments,
//     selectEnvironmentsByOrg,
// } from "../environment";
// import { DeployImageResponse } from "../image";
// import { DeployOperationResponse, waitForOperation } from "../operation";
// import {
//     fetchServiceOperations,
//     selectServiceById,
//     selectServicesByAppId,
// } from "../service";
// import { findStackById, selectStacks } from "../stack";

import type {
    DeployResource,
} from "@app/types";

export interface DeployResourceResponse {
    id: number;
    displayName: string;
    _type: string;
}

export const defaultResourceResponse = (
    p: Partial<DeployResourceResponse> = {},
): DeployResourceResponse => {
    return {
        id: 1,
        displayName: "",
        ...p,
        _type: "app",
    };
};

export const deserializeDeployResource = (payload: DeployResourceResponse): DeployResource => {
    return {
        id: `${payload.id}`,
        displayName: payload.displayName,
    };
};

// export const hasDeployApp = (a: DeployApp) => a.id !== "";
// export const selectAppById = schema.apps.selectById;
// export const selectApps = schema.apps.selectTable;
// const selectAppsAsList = schema.apps.selectTableAsList;
// export const findAppById = schema.apps.findById;
//
// export interface DeployAppRow extends DeployApp {
//     envHandle: string;
//     lastOperation: DeployOperation;
//     cost: number;
//     totalCPU: number;
//     totalMemoryLimit: number;
//     totalServices: number;
// }
//
// export const selectAppsByEnvId = createSelector(
//     selectAppsAsList,
//     (_: WebState, props: { envId: string }) => props.envId,
//     (apps, envId) => {
//         return apps.filter((app) => app.environmentId === envId);
//     },
// );
//
// export const selectFirstAppByEnvId = createSelector(
//     selectAppsByEnvId,
//     (apps) => apps[0] || schema.apps.empty,
// );
//
// export const selectAppsByOrgAsList = createSelector(
//     selectAppsAsList,
//     selectEnvironmentsByOrg,
//     selectOrganizationSelectedId,
//     (apps, envs) => {
//         return apps.filter((app) => {
//             const env = findEnvById(envs, { id: app.environmentId });
//             return hasDeployEnvironment(env);
//         });
//     },
// );
//
// export const selectAppsByEnvOnboarding = createSelector(
//     selectEnvironments,
//     selectAppsByOrgAsList,
//     (envs, apps) => {
//         return apps.filter((app) => {
//             const env = findEnvById(envs, { id: app.environmentId });
//             if (!hasDeployEnvironment(env)) {
//                 return false;
//             }
//             if (env.onboardingStatus === "unknown") {
//                 return false;
//             }
//
//             return true;
//         });
//     },
// );
//
// export const selectAppsByStack = createSelector(
//     selectAppsAsList,
//     selectEnvironments,
//     (_: WebState, p: { stackId: string }) => p.stackId,
//     (apps, envs, stackId) => {
//         return apps.filter((app) => {
//             const env = findEnvById(envs, { id: app.environmentId });
//             return env.stackId === stackId;
//         });
//     },
// );
//
// export const selectAppsCountByStack = createSelector(
//     selectAppsByStack,
//     (apps) => apps.length,
// );


export const fetchResources = api.get(
    "/resources",
    {
        supervisor: cacheMinTimer(),
    },
    function* (ctx, next) {
        yield* next();
        if (!ctx.json.ok) {
            return;
        }
        yield* schema.update(schema.resources.reset());
    },
);

//
// export const selectEnvironmentByAppId = createSelector(
//     selectEnvironments,
//     selectAppById,
//     (envs, app) => {
//         return findEnvById(envs, { id: app.environmentId });
//     },
// );
//
// export const selectStackByAppId = createSelector(
//     selectStacks,
//     selectEnvironmentByAppId,
//     (stacks, env) => {
//         return findStackById(stacks, { id: env.stackId });
//     },
// );
//
// export const selectAppByServiceId = createSelector(
//     selectServiceById,
//     selectApps,
//     (service, apps) => {
//         return findAppById(apps, { id: service.appId });
//     },
// );
//
// interface AppIdProp {
//     id: string;
// }
//
// export const fetchApp = api.get<AppIdProp>("/apps/:id");
//
// export const fetchAppOperations = api.get<AppIdProp>("/apps/:id/operations");
//
// export const cancelAppOpsPoll = createAction("cancel-app-ops-poll");
// export const pollAppOperations = api.get<AppIdProp>(
//     ["/apps/:id/operations", "poll"],
//     {
//         supervisor: poll(10 * 1000, `${cancelAppOpsPoll}`),
//     },
// );
//
// interface CreateAppProps {
//     name: string;
//     envId: string;
// }
//
// export const createDeployApp = api.post<CreateAppProps, DeployAppResponse>(
//     "/accounts/:envId/apps",
//     function* (ctx, next) {
//         const { name, envId } = ctx.payload;
//         const body = {
//             handle: name,
//             account_id: envId,
//         };
//         ctx.request = ctx.req({
//             body: JSON.stringify(body),
//         });
//
//         yield* next();
//
//         if (!ctx.json.ok) {
//             return;
//         }
//
//         ctx.loader = { meta: { appId: ctx.json.value.id } };
//     },
// );
//
// interface ScanAppOpProps {
//     type: "scan_code";
//     envId: string;
//     appId: string;
//     gitRef: string;
// }
// interface DeployAppOpProps {
//     type: "deploy";
//     envId: string;
//     appId: string;
//     gitRef: string;
// }
// interface ConfigAppOpProps {
//     type: "configure";
//     appId: string;
//     env: DeployAppConfigEnv;
// }
//
// interface DeprovisionAppOpProps {
//     type: "deprovision";
//     appId: string;
// }
//
// type AppOpProps =
//     | ScanAppOpProps
//     | DeployAppOpProps
//     | DeprovisionAppOpProps
//     | ConfigAppOpProps;
// export const createAppOperation = api.post<AppOpProps, DeployOperationResponse>(
//     "/apps/:appId/operations",
//     function* (ctx, next) {
//         const { type } = ctx.payload;
//
//         const getBody = () => {
//             switch (type) {
//                 case "deprovision": {
//                     return { type };
//                 }
//
//                 case "deploy":
//                 case "scan_code": {
//                     const { gitRef } = ctx.payload;
//                     return { type, git_ref: gitRef };
//                 }
//
//                 case "configure": {
//                     const { env } = ctx.payload;
//                     return { type, env };
//                 }
//
//                 default:
//                     return {};
//             }
//         };
//
//         const body = getBody();
//         ctx.request = ctx.req({ body: JSON.stringify(body) });
//         yield* next();
//     },
// );
//
export const resourceEntities = {
    app: defaultEntity({
        id: "resource",
        deserialize: deserializeDeployResource,
        save: schema.resources.add,
    }),
};
//
// export const restartApp = api.post<{ id: string }, DeployOperationResponse>(
//     ["/apps/:id/operations", "restart"],
//     function* (ctx, next) {
//         const { id } = ctx.payload;
//         const body = {
//             type: "restart",
//             id,
//         };
//
//         ctx.request = ctx.req({ body: JSON.stringify(body) });
//         yield* next();
//
//         if (!ctx.json.ok) {
//             return;
//         }
//
//         const opId = ctx.json.value.id;
//         ctx.loader = {
//             message: `Restart app operation queued (operation ID: ${opId})`,
//             meta: { opId: `${opId}` },
//         };
//     },
// );
//
// export const deprovisionApp = thunks.create<{
//     appId: string;
// }>("deprovision-app", function* (ctx, next) {
//     const { appId } = ctx.payload;
//     yield* select((s: WebState) => selectAppById(s, { id: appId }));
//
//     const deprovisionCtx = yield* call(() =>
//         createAppOperation.run(
//             createAppOperation({
//                 type: "deprovision",
//                 appId,
//             }),
//         ),
//     );
//
//     if (!deprovisionCtx.json.ok) {
//         return;
//     }
//     const id = `${deprovisionCtx.json.value.id}`;
//     yield* call(() => waitForOperation({ id }));
//     yield* next();
// });
//
// interface UpdateApp {
//     id: string;
//     handle: string;
// }
//
// export const updateApp = api.put<UpdateApp>("/apps/:id", function* (ctx, next) {
//     const { handle } = ctx.payload;
//     const body = {
//         handle,
//     };
//     ctx.request = ctx.req({ body: JSON.stringify(body) });
//
//     yield* next();
//
//     if (!ctx.json.ok) {
//         return;
//     }
//
//     ctx.loader = {
//         message: "Saved changes successfully!",
//     };
// });
//
// export const pollAppAndServiceOperations = thunks.create<{ id: string }>(
//     "app-service-op-poll",
//     { supervisor: poll(10 * 1000, `${cancelAppOpsPoll}`) },
//     function* (ctx, next) {
//         yield* schema.update(schema.loaders.start({ id: ctx.key }));
//
//         const services = yield* select((s: WebState) =>
//             selectServicesByAppId(s, {
//                 appId: ctx.payload.id,
//             }),
//         );
//         const serviceOps = services.map(
//             (service) => () =>
//                 fetchServiceOperations.run(fetchServiceOperations({ id: service.id })),
//         );
//         const group = yield* parallel([
//             () => fetchAppOperations.run(fetchAppOperations(ctx.payload)),
//             ...serviceOps,
//         ]);
//         yield* group;
//
//         yield* next();
//         yield* schema.update(schema.loaders.success({ id: ctx.key }));
//     },
// );
