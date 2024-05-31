
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

export type PuzzleIn = {
    id: number;
    title: string;
    rank: number;
    topic: number;
    isSuccess:boolean;
    successTimes: number;
    wholeTimes: number;
    tagContents: Array<string>;
    
  }