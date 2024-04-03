import {Group, Table, TBody, Th, THead, TitleBar, Tr, Td} from "@app/ui/shared";
import { Pill } from "../shared/pill";
import { Link } from "react-router-dom";

export function ResourcesPage() {
    return(
        <Group>
            <Group size="sm">
                <TitleBar description="This is a listing of all of your top-level resources.">
                    Service Directory
                </TitleBar>
            </Group>

            <Table>
                <THead>
                    <Th className="cursor-pointer hover:text-black group">
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Display Name
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Type
                    </Th>
                    <Th className="cursor-pointer hover:text-black group">
                        Status
                    </Th>
                </THead>

                <TBody>
                    <Tr key={1}>
                        <Td><img src="/resource-types/logo-app.png" className="w-[32px] h-[32px] mr-3" aria-label="App"/></Td>
                        <Td><Link to="http://localhost:4200/apps/1" className="flex"><p>httpd</p></Link></Td>
                        <Td>Aptible App</Td>
                        <Td><Pill variant="success">Healthy</Pill></Td>
                    </Tr>

                    <Tr key={2}>
                        <Td><img src="/resource-types/logo-database.png" className="w-[32px] h-[32px] mr-3" aria-label="Database"/></Td>
                        <Td><Link to="http://localhost:4200/databases/3" className="flex"><p>test-92f3-postgresql</p></Link></Td>
                        <Td>Aptible Database (PostgreSQL)</Td>
                        <Td><Pill variant="success">Healthy</Pill></Td>
                    </Tr>


                    <Tr key={3}>
                        <Td><img src="/resource-types/logo-database.png" className="w-[32px] h-[32px] mr-3" aria-label="Database"/></Td>
                        <Td><Link to="http://localhost:4200/databases/1" className="flex"><p>test-4cb4-redis</p></Link></Td>
                        <Td>Aptible Database (Redis)</Td>
                        <Td><Pill variant="success">Healthy</Pill></Td>
                    </Tr>

                    <Tr key={3}>
                        <Td><img src="/resource-types/logo-database.png" className="w-[32px] h-[32px] mr-3" aria-label="Database"/></Td>
                        <Td><Link to="http://localhost:4200/databases/2" className="flex"><p>test-2b8e-elasticsearch</p></Link></Td>
                        <Td>Aptible Database (Elasticsearch)</Td>
                        <Td><Pill variant="success">Healthy</Pill></Td>
                    </Tr>

                    <Tr key={4}>
                        <Td><img src="/resource-types/logo-eks.png" className="w-[32px] h-[32px] mr-3" aria-label="EKS Cluster"/></Td>
                        <Td><Link to="http://localhost:4200/eks_clusters/fedbfd19-c9d9-4b1a-8062-6086fa4d3bc0" className="flex"><p>test-cluster</p></Link></Td>
                        <Td>EKS Cluster</Td>
                        <Td><Pill variant="success">Healthy</Pill></Td>
                    </Tr>
                </TBody>
            </Table>
        </Group>
    )
}
