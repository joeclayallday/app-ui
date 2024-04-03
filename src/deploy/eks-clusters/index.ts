import { schema } from "@app/schema";
import {api} from "@app/api";
import {defaultEntity} from "@app/hal";
import {DeployEksCluster} from "@app/types";

export interface DeployEksClusterResponse {
    created_at: string;
    updated_at: string;
    id: string;
    version: string;
    region: string;
    arn: string;
    name: string;
    kubernetes_network_config_service_ipv_4_cidr: string;
    kubernetes_network_config_service_ipv_6_cidr: string;
    kubernetes_network_config_ip_family: string;
    cluster_logging_types_enabled: string;
    identity_oidc_issuer: string;
    certificate_authority_data: string;
    client_request_token: string;
    platform_version: string;
    connector_config_activation_id: string;
    connector_config_activation_code: string;
    connector_config_activation_expiry: string;
    connector_config_provider: string;
    connector_config_role_arn: string;
    access_config_bootstrap_cluster_creator_admin_permissions: boolean;
    access_config_authentication_mode: boolean;
    resources_vpc_config_vpc_id: string;
    resources_vpc_config_endpoint_public_access: boolean;
    resources_vpc_config_endpoint_private_access: boolean;
    resources_vpc_config_public_access_cidrs: string;
    resources_vpc_config_subnet_ids: string;
    resources_vpc_config_security_group_ids: string;
    resources_vpc_config_cluster_security_group_id: string;
    organization_id: string;
    _type: "eks_cluster";
}

export const defaultEksClusterResponse = (
    p: Partial<DeployEksClusterResponse> = {},
): DeployEksClusterResponse => {
    const now = new Date().toISOString();
    return {
        created_at: now,
        region: "",
        updated_at: now,
        access_config_authentication_mode: false,
        access_config_bootstrap_cluster_creator_admin_permissions: false,
        certificate_authority_data: "",
        client_request_token: "",
        cluster_logging_types_enabled: "",
        connector_config_activation_code: "",
        connector_config_activation_expiry: "",
        connector_config_activation_id: "",
        connector_config_provider: "",
        connector_config_role_arn: "",
        identity_oidc_issuer: "",
        kubernetes_network_config_ip_family: "",
        kubernetes_network_config_service_ipv_4_cidr: "",
        kubernetes_network_config_service_ipv_6_cidr: "",
        organization_id: "",
        platform_version: "",
        resources_vpc_config_cluster_security_group_id: "",
        resources_vpc_config_endpoint_private_access: false,
        resources_vpc_config_endpoint_public_access: false,
        resources_vpc_config_public_access_cidrs: "",
        resources_vpc_config_security_group_ids: "",
        resources_vpc_config_subnet_ids: "",
        resources_vpc_config_vpc_id: "",
        id: "",
        version: "",
        arn: "",
        name: "",
        _type: "eks_cluster",
        ...p,
    };
};

export const deserializeDeployEksCluster = (
    payload: DeployEksClusterResponse,
): DeployEksCluster => {
    return {
        createdAt: payload.created_at,
        region: payload.region,
        updatedAt: payload.updated_at,
        accessConfigAuthenticationMode: payload.access_config_authentication_mode,
        accessConfigBootstrapClusterCreatorAdminPermissions: payload.access_config_bootstrap_cluster_creator_admin_permissions,
        certificateAuthorityData: payload.certificate_authority_data,
        clientRequestToken: payload.client_request_token,
        clusterLoggingTypesEnabled: payload.cluster_logging_types_enabled,
        connectorConfigActivationCode: payload.connector_config_activation_code,
        connectorConfigActivationExpiry: payload.connector_config_activation_expiry,
        connectorConfigActivationId: payload.connector_config_activation_id,
        connectorConfigProvider: payload.connector_config_provider,
        connectorConfigRoleArn: payload.connector_config_role_arn,
        identityOidcIssuer: payload.identity_oidc_issuer,
        kubernetesNetworkConfigServiceIpFamily: payload.kubernetes_network_config_ip_family,
        kubernetesNetworkConfigServiceIpv4Cidr: payload.kubernetes_network_config_service_ipv_4_cidr,
        kubernetesNetworkConfigServiceIpv6Cidr: payload.kubernetes_network_config_service_ipv_6_cidr,
        organizationId: payload.organization_id,
        platformVersion: payload.platform_version,
        resourcesVpcConfigClusterSecurityGroupId: payload.resources_vpc_config_cluster_security_group_id,
        resourcesVpcConfigEndpointPrivateAccess: payload.resources_vpc_config_endpoint_private_access,
        resourcesVpcConfigEndpointPublicAccess: payload.resources_vpc_config_endpoint_public_access,
        resourcesVpcConfigPublicAccessCidrs: payload.resources_vpc_config_public_access_cidrs,
        resourcesVpcConfigSecurityGroupIds: payload.resources_vpc_config_security_group_ids,
        resourcesVpcConfigSubnetIds: payload.resources_vpc_config_subnet_ids,
        resourcesVpcConfigVpcId: payload.resources_vpc_config_vpc_id,
        id: payload.id,
        version: payload.version,
        arn: payload.arn,
        name: payload.name
    };
};

export const selectEksClusterById = schema.eksClusters.selectById;

export const fetchEksClusterById = api.get<{ id: string }>("/eks_clusters/:id");

export const eksClusterEntities = {
    release: defaultEntity({
        id: "eks_cluster",
        save: schema.eksClusters.add,
        deserialize: deserializeDeployEksCluster,
    }),
};