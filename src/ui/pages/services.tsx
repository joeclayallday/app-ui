import { fetchServices, selectServicesForTableSearch } from "@app/deploy";
import { AppState } from "@app/types";
import { useSearchParams } from "react-router-dom";
import { useQuery, useSelector } from "starfx/react";
import { usePaginate } from "../hooks";
import { AppSidebarLayout } from "../layouts";
import {
  DescBar,
  FilterBar,
  Group,
  InputSearch,
  LoadingBar,
  PaginateBar,
  ServiceByOrgTable,
  TitleBar,
} from "../shared";

export function ServicesPage() {
  const { isLoading } = useQuery(fetchServices());
  const [params, setParams] = useSearchParams();
  const search = params.get("search") || "";
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ search: ev.currentTarget.value }, { replace: true });
  };
  const services = useSelector((s: AppState) =>
    selectServicesForTableSearch(s, { search }),
  );
  const paginated = usePaginate(services);

  return (
    <AppSidebarLayout>
      <Group>
        <Group size="sm">
          <TitleBar description="Services determine the number of containers of your app and the memory and CPU limits for your app.">
            Services
          </TitleBar>

          <FilterBar>
            <Group variant="horizontal" size="sm" className="items-center">
              <InputSearch
                placeholder="Search..."
                search={search}
                onChange={onChange}
              />
              <LoadingBar isLoading={isLoading} />
            </Group>

            <Group variant="horizontal" size="lg" className="items-center mt-1">
              <DescBar>{paginated.totalItems} Services</DescBar>
              <PaginateBar {...paginated} />
            </Group>
          </FilterBar>
        </Group>

        <ServiceByOrgTable paginated={paginated} />
      </Group>
    </AppSidebarLayout>
  );
}