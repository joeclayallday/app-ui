import {EksClusterHeader} from "@app/ui/layouts/eks-cluster-layout";
import {useParams} from "react-router";
import {useQuery, useSelector} from "@app/react";
import {fetchEksClusterById, selectEksClusterById} from "src/deploy/eks-clusters";
import {TabItem, Table, Tabs, TBody, Td, Th, THead, Tr} from "@app/ui/shared";

export function EksClusterDetailSources() {
    const { id = "" } = useParams();
    const { isLoading } = useQuery(fetchEksClusterById({ id: id }));
    const eksCluster = useSelector((s) =>
        selectEksClusterById(s, { id: id }),
    );

    const tabs: TabItem[] = [
        { name: "Deployments", href: 'http://localhost:4200/eks_clusters/fedbfd19-c9d9-4b1a-8062-6086fa4d3bc0/deployments' },
        { name: "Releases", href: 'http://localhost:4200/eks_clusters/fedbfd19-c9d9-4b1a-8062-6086fa4d3bc0/releases' },
        { name: "Sources", href: '#', current: true },
    ];

    return(
        <>
            <EksClusterHeader eksCluster={eksCluster} isLoading={isLoading} />
            <Tabs tabs={tabs} />

            <Table>
                <THead>
                    <Th className="cursor-pointer hover:text-black group">
                        ID
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Name
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Repository
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Last Deployed
                    </Th>
                </THead>

                <TBody>
                    <Tr key={1}>
                        <Td>1</Td>
                        <Td>api</Td>
                        <Td>quay.io/aptible/api</Td>
                        <Td>2024-03-22 15:47:23</Td>
                    </Tr>

                    <Tr key={2}>
                        <Td>2</Td>
                        <Td>auth</Td>
                        <Td>quay.io/aptible/auth</Td>
                        <Td>2024-03-31 22:04:15</Td>
                    </Tr>

                    <Tr key={3}>
                        <Td>3</Td>
                        <Td>api</Td>
                        <Td>docker.io/grafana/grafana</Td>
                        <Td>2024-02-31 13:27:01</Td>
                    </Tr>

                    <Tr key={4}>
                        <Td>4</Td>
                        <Td>influxdb</Td>
                        <Td>docker.io/influxdb</Td>
                        <Td>2023-12-27 09:05:43</Td>
                    </Tr>
                </TBody>
            </Table>
        </>
    );
}
