import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import type { AppState } from "@app/types";
import { selectAppById } from "@app/deploy";
import {
  appActivityUrl,
  appOverviewUrl,
  appSecurityUrl,
  appSettingsUrl,
  appsUrl,
} from "@app/routes";

import { DetailPageHeaderView, TabItem } from "../shared";

import { DetailPageLayout } from "./detail-page";

const crumbs = [{ name: "Apps", to: appsUrl() }];

function AppPageHeader() {
  const { id = "" } = useParams();
  const app = useSelector((s: AppState) => selectAppById(s, { id }));

  const tabs = [
    { name: "Overview", href: appOverviewUrl(id) },
    { name: "Activity", href: appActivityUrl(id) },
    { name: "Security", href: appSecurityUrl(id) },
    { name: "Settings", href: appSettingsUrl(id) },
  ] as TabItem[];

  return (
    <DetailPageHeaderView
      breadcrumbs={crumbs}
      title={app ? app.handle : "Loading..."}
      tabs={tabs}
    />
  );
}

export const AppDetailLayout = () => {
  return (
    <DetailPageLayout header={<AppPageHeader />}>
      <Outlet />
    </DetailPageLayout>
  );
};