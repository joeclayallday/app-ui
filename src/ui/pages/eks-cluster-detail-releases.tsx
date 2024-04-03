import {EksClusterHeader} from "@app/ui/layouts/eks-cluster-layout";
import {useParams} from "react-router";
import {useQuery, useSelector} from "@app/react";
import {fetchEksClusterById, selectEksClusterById} from "src/deploy/eks-clusters";
import {TabItem, Table, Tabs, TBody, Td, Th, THead, Tr} from "@app/ui/shared";

export function EksClusterDetailReleases() {
    const { id = "" } = useParams();
    const { isLoading } = useQuery(fetchEksClusterById({ id: id }));
    const eksCluster = useSelector((s) =>
        selectEksClusterById(s, { id: id }),
    );

    const tabs: TabItem[] = [
        { name: "Deployments", href: 'http://localhost:4200/eks_clusters/fedbfd19-c9d9-4b1a-8062-6086fa4d3bc0/deployments' },
        { name: "Releases", href: '#', current: true },
        { name: "Sources", href: 'http://localhost:4200/eks_clusters/fedbfd19-c9d9-4b1a-8062-6086fa4d3bc0/sources' },
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
                        Status
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Source
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Source
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Tag
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Commit
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Message
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Date
                    </Th>
                </THead>

                <TBody>
                    <Tr key={1}>
                        <Td>1</Td>
                        <Td>DONE</Td>
                        <Td>quay.io/aptible/auth</Td>
                        <Td>v102.6</Td>
                        <Td>e4cdd59358f64691a6bd8577f221fd0c3498620cd58c73ad12a7385e5adf51fe</Td>
                        <Td>Lower rate limiting</Td>
                        <Td>2024-03-31 22:06:15 UTC</Td>
                    </Tr>

                    <Tr key={1}>
                        <Td>1</Td>
                        <Td>DONE</Td>
                        <Td>quay.io/aptible/api</Td>
                        <Td>v101.3</Td>
                        <Td>416894e6e4d7da7420eab9199c1566c426b627f3b35410fb44116ff3bd64bf3c</Td>
                        <Td>Add SCIM</Td>
                        <Td>2024-03-31 14:23:53 UTC</Td>
                    </Tr>

                    <Tr key={1}>
                        <Td>1</Td>
                        <Td>DONE</Td>
                        <Td>quay.io/aptible/api</Td>
                        <Td>v111.4</Td>
                        <Td>fa980c2e2d5ae6f49e461ee29c5abb6711a4538d3f3957acabd4bd91a7b962a4</Td>
                        <Td>Fix validation on app creation</Td>
                        <Td>2024-03-22 06:32:43 UTC</Td>
                    </Tr>

                    <Tr key={3}>
                        <Td>1</Td>
                        <Td>DONE</Td>
                        <Td>quay.io/aptible/api</Td>
                        <Td>v111.3</Td>
                        <Td>7adc414c4917b6b3bad16baedd8e8b385c43a6bbde523642f3679d55fe9f9074</Td>
                        <Td>Speed up operations</Td>
                        <Td>2024-03-19 09:46:48 UTC</Td>
                    </Tr>
                </TBody>
            </Table>
        </>
    );
}
