export interface ITokenResponse{
    access_token: string | null,
    token_type: string | null,
    expires_in: number | null,
    refresh_token: string | null
}