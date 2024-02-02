 export interface IUser {
    id?:number,
    email: string,
    password: string,
    confirmPassword: string,
    urlPhoto: string | null
}