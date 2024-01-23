export interface LoginModel{
    grant_type: string,
    username: string,
    password: string,
    scope: string,
    client_id: string,
    client_secret: string
}