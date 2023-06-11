import { Commands } from "../enums/Commands.enum";

export interface CommandHistory {
    command?: Commands;
    context?: string;
    startTime?: Date;
    duration?: Date;
}
