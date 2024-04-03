import {DetailHeader, DetailInfoGrid, DetailInfoItem, DetailTitleBar, Pill} from "@app/ui/shared";
import type {EksCluster} from "@app/types";

export function EksClusterHeader({
  eksCluster,
  isLoading,
}: { eksCluster: EksCluster; isLoading: boolean }) {
    return (
        <DetailHeader>
            <DetailTitleBar
                title="EKS Cluster Details"
                isLoading={isLoading}
                icon={
                    <img
                        src={"/resource-types/logo-eks.png"}
                        className="w-[32px] h-[32px] mr-3"
                        aria-label="EksCluster"
                    />
                }
            />

            <DetailInfoGrid>
                <DetailInfoItem title="ID">fedbfd19-c9d9-4b1a-8062-6086fa4d3bc0</DetailInfoItem>
                <DetailInfoItem title="Name">test-cluster</DetailInfoItem>
                <DetailInfoItem title="ARN">arn:aws:eks:us-west-2:012345678910:cluster/test-cluster</DetailInfoItem>
                <DetailInfoItem title="Kubernetes Version">1.29</DetailInfoItem>
                <DetailInfoItem title="Region">us-east-2</DetailInfoItem>
                <DetailInfoItem title="Endpoint">https://EXAMPLE0A04F01705DD065655C30CC3D.yl4.us-east-2.eks.amazonaws.com"</DetailInfoItem>
                <DetailInfoItem title="Status"><Pill variant="success">Healthy</Pill></DetailInfoItem>
            </DetailInfoGrid>
        </DetailHeader>
    );
}
