import { LoginConfig } from "@/lib/configs/authConfig";
import { environment } from "@/lib/environment/environment";
import { ITokenResponse } from "@/lib/interfaces/ITokenResponse";
import { LoginType } from "@/lib/types/LoginType";
import { RegisterType } from "@/lib/types/RegisterType";
import axios, { AxiosInstance } from "axios";
import {ECommonStatus} from "@/lib/enums/CommonStatusEnum"

export class AuthService{
    private api : AxiosInstance;
    constructor(){
        this.api = axios.create({
            baseURL : `${environment.baseUrl}`
        })
    }
    async Login(body: LoginType) {
        let param = {
            grant_type: LoginConfig.grant_type,
            username: body.username,
            password: body.password,
            scope: LoginConfig.scope,
            client_id: LoginConfig.client_id,
            client_secret: LoginConfig.client_secret
        }
        try{
            const response = await this.api.post<ITokenResponse>("/connect/token", param);
            return response.data;
        }
        catch (error) {
            console.error('Lỗi khi đăng nhập', error);
            throw error;
        }
    }   
    async Register(body: RegisterType){
        let param: RegisterType = {
            username: body.username,
            password: body.password,
            fullname: body.fullname,
            email: body.email,
            phone: body.phone,
            status: ECommonStatus.ACTIVE
        }
        try{
            const res = await this.api.post<any>("/register", param);
            return res.data
        }
        catch (error) {
            console.error('Lỗi khi đăng ký', error);
            throw error;
        }
    }

    async ValidateOtp(otp: string, userId: number){
        try{
            const res = await this.api.put<any>("/validate-otp", {otp, userId} );
            return res.data;
        }
        catch (error) {
            console.error('Lỗi khi xác thực OTP', error);
            throw error;
        }
    }
    async RefreshOtp(username: string){
        try{
            const res = await this.api.put<any>("/refresh-otp", {username} );
            return res.data;
        }
        catch (error) {
            console.error('Lỗi khi refresh otp', error);
            throw error;
        }
    }
}