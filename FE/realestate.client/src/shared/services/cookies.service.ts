// Trong file trang hoặc API route
import Cookies from 'js-cookie';
import { ITokenResponse } from '../interfaces/ITokenResponse';

export class CookieService{
    static saveToken(params: any){
        Cookies.set('access_token', params.access_token, { expires: params.expires_in });
        Cookies.set('refresh_token', params.refresh_token, { expires: params.expires_in });
    }
    static removeToken(){
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
    }
    static getAccessToken(){
        return Cookies.get('access_token');
    }
    static getRefreshToken(){
        return Cookies.get('refresh_token');   
    }
} 