 import { IMusic } from "./dataMusic";
 
 export interface IUser {
    id?:number,
    email: string,
    password: string,
    confirmPassword: string,
    urlPhoto: string | null,
    musics_save: any[]
}