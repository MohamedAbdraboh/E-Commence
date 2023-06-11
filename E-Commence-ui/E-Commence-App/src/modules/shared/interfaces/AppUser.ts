import { RefreshToken } from "./RefreshToken";
import { Role } from "./Role";

export interface AppUser {
    id?: string;
    userName?: string;
    email?: boolean;

    firstName?: boolean;
    lastName?: boolean;
    token?: boolean;
    refreshTokens?: RefreshToken[];

    createdAt?: Date;
    updatedAt?: Date;

    createdBy?: string;
    updatedBy?: string;

    isDeleted?: boolean;
    isActive?: boolean;
    
    normalizedUserName?: string;
    normalizedEmail?: boolean;
    emailConfirmed?: boolean;
    passwordHash?: string;
    securityStamp?: string;
    concurrencyStamp?: string;
    phoneNumber?: string;
    phoneNumberConfirmed?: boolean;
    twoFactorEnabled?: boolean;
    lockoutEnd?: Date;
    lockoutEnabled?: boolean;
    accessFailedCount?: number;

    roles?: string[];
}