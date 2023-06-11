import { Node } from "./Node";

export interface Cluster {
    id?: string;
    name?: string;
    status?: string;
    isRegistered?: boolean;

    nodes: Node[];
}