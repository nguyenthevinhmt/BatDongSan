import { UserTypes } from "../consts/userType";

export interface IUser{
    username?: string, 
    userType?: UserTypes, 
    id?: number, 
    fullName?: string,
    avatarImageUri?: string,
}