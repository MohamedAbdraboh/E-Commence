export interface RefreshToken {
    id?: string;
    token?: string;
    JwtId?: string;

    creationDate?: Date;
    expiryDate?: Date;

    isExpired?: boolean;
    isUsed?: boolean;
    invalidated?: boolean;

    userId?: string;
}
