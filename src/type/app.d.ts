export interface IRegister {
    username : string
    password : string
    email : string
    fullname : string

}

export enum EStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
    
}

export type AuthMiddlewareData = {
    id: string
}

export interface IProfile {
    bio? : string
    avatar? : string
    cover? : string
    userId? : number
}

export interface IThread {
    id? : number;
    content? : string;
    threadId? : number;
    userId : number;
    images?: IImage[];
}

export interface IImage {
    id?: number
    image: string
    threadId: number
}