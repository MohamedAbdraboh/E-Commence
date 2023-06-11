import { EntityAction } from "./EntityAction";
import { EntityLabel } from "./EntityLabel";
import { HealthIssue } from "./HealthIssue";
import { NodeServicePort } from "./NodeServicePort";

export interface NodeService {
    id?: string;

    clusterName?: string;
    nodeIp?: string;

    name?: string;
    type?: string;
    status?: string;
    isRegistered?: boolean;

    ports: NodeServicePort[];
    labels: EntityLabel[];
    actions: EntityAction[];

    healthIssues?: HealthIssue[];
}