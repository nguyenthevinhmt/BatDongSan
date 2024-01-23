import { environment } from "@/shared/environment/environment";
import { LoginModel } from "@/shared/models/LoginModel";

export class AuthService{
    private apiUrl = `${environment.baseUrl}/connect/token`;

    login = async (body: LoginModel) => {
        
    }   
}