
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
export type MessageOut={
    role:string,
    content:string,
    
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
    shortFace: string|undefined;
    
  }
export type PuzzleInfo={
    face: string;
    answerCount: number;
    topic: number;
    title:string;
    prompts: string[];
}
export type CandidateInWithStream={
    chatRounds:number;
    content:string;
}
export type CandidateOutWithStream={
    chatRounds:number;
    messages:MessageOut[];
}