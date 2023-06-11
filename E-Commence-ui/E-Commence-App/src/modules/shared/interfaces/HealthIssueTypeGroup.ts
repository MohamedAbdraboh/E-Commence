import { HealthIssueLevel } from "../enums/HealthIssueLevel.enum";
import { HealthIssueType } from "../enums/HealthIssueType.enum";
import { SystemEntities } from "../enums/SystemEntities.enum";

export interface HealthIssueTypeGroup {
    clusterName?: string;
    nodeIp?: string;
    serviceName?: string;

    name?: string;
    description?: string;
    entityTitle?: string;
    entity?: SystemEntities;
    level?: HealthIssueLevel;
    type?: HealthIssueType;
    issuedDate?: Date;
}
