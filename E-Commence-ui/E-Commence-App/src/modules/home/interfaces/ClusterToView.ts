import { Node } from "src/modules/shared/interfaces/Node";

export interface ClusterToView {
    id?: string;
    name?: string;
    nodes?: Node[];
    isRegistered?: boolean;
    groups?: {title: string, nodes: Node[]}[];
}
