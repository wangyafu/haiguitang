
export interface RegisterIn{
    code:number,
    message:string,
    uuid:string,
    passPuzzles:number[]
    registerDate:string
}
export interface LogOutInfo extends RegisterIn{
    uuid:string,
    
}