import { Cluster } from "./Cluster";
import { EntityAction } from "./EntityAction";
import { EntityLabel } from "./EntityLabel";
import { HealthIssue } from "./HealthIssue";
import { NodeService } from "./NodeService";

export interface Node {
    id?: string;

    clusterName?: string;

    ip?: string;
    host?: string;
    rack?: string;

    labels: EntityLabel[];
    actions: EntityAction[];
    services: NodeService[];

    status?: string;
    isRegistered?: boolean;

    lastHeartbeat?: string;
    
    healthIssues?: HealthIssue[];
}