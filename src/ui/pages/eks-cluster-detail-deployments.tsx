import {EksClusterHeader} from "@app/ui/layouts/eks-cluster-layout";
import {useParams} from "react-router";
import {useQuery, useSelector} from "@app/react";
import {fetchEksClusterById, selectEksClusterById} from "src/deploy/eks-clusters";
import {TabItem, Table, Tabs, TBody, Td, Th, THead, Tr} from "@app/ui/shared";

export function EksClusterDetailDeployments() {
    const { id = "" } = useParams();
    const { isLoading } = useQuery(fetchEksClusterById({ id: id }));
    const eksCluster = useSelector((s) =>
        selectEksClusterById(s, { id: id }),
    );

    const tabs: TabItem[] = [
        { name: "Deployments", href: '#', current: true },
        { name: "Releases", href: 'http://localhost:4200/eks_clusters/fedbfd19-c9d9-4b1a-8062-6086fa4d3bc0/releases' },
        { name: "Sources", href: 'http://localhost:4200/eks_clusters/fedbfd19-c9d9-4b1a-8062-6086fa4d3bc0/sources' },
    ];

    return(
        <>
            <EksClusterHeader eksCluster={eksCluster} isLoading={isLoading} />
            <Tabs tabs={tabs} />

            <Table>
                <THead>
                    <Th className="cursor-pointer hover:text-black group">
                        Name
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Namespace
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Docker Image
                    </Th>
                </THead>

                <TBody>
                    <Tr key={1}>
                        <Td>api</Td>
                        <Td>apps</Td>
                        <Td>quay.io/aptible/api:v123.2</Td>
                    </Tr>

                    <Tr key={1}>
                        <Td>auth</Td>
                        <Td>apps</Td>
                        <Td>quay.io/aptible/auth:v102.6</Td>
                    </Tr>

                    <Tr key={1}>
                        <Td>grafana</Td>
                        <Td>observability</Td>
                        <Td>docker.io/grafana/grafana:10.1</Td>
                    </Tr>

                    <Tr key={3}>
                        <Td>influxdb</Td>
                        <Td>observability</Td>
                        <Td>influxdb:2.7</Td>
                    </Tr>
                </TBody>
            </Table>
        </>
    );
}
