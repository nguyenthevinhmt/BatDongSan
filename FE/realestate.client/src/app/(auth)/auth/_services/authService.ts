import { LoginConfig } from "@/shared/configs/authConfig";
import { environment } from "@/shared/environment/environment";
import { ITokenResponse } from "@/shared/interfaces/ITokenResponse";
import { LoginModel } from "@/shared/models/LoginModel";
import axios, { AxiosInstance } from "axios";

export class AuthService{
    private api : AxiosInstance;
    constructor(){
        this.api = axios.create({
            baseURL : `${environment.baseUrl}`
        })
    }
    async Login(body: LoginModel) {
        let param = {
            grant_type: LoginConfig.grant_type,
            username: body.username,
            password: body.password,
            scope: LoginConfig.scope,
            client_id: LoginConfig.client_id,
            client_secret: LoginConfig.client_secret
        }
        try{
            const response = await this.api.post<ITokenResponse>("/connect/token",param);
            const res = response.data
            return res;
        }
        catch (error) {
            console.error('Lỗi khi đăng nhập', error);
            throw error;
        }
    }   
}