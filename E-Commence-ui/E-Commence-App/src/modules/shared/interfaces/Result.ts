import { Error } from "./Error";

export interface Result <T>{
    hasErrors?: boolean;
    errors?: Error[];
    data?: T;
}