import { HealthIssue } from "./HealthIssue";

export interface HealthIssueEntityGroup {
    clusterName?: string;
    nodeIp?: string;
    serviceName?: string;
    healthIssues?: HealthIssue[];
}
