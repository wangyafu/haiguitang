
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
export interface MessageOut{
    role:string,
    content:string,
    
}
export interface PuzzleBase{
    id: number;
    title: string;
    topic: number;
    shortFace: string|undefined;
    tagContents:Array<string>;
   
}
export interface PuzzleIn extends PuzzleBase{
   
    isSuccess:boolean;
    successTimes: number;
    wholeTimes: number;
    rate:number;
    rank:number;
    
  }
export interface PuzzleInfo{
    face: string;
    answerCount: number;
    topic: number;
    title:string;
    prompts: string[];
}
export interface CandidateInWithStream{
    chatRounds:number;
    content:string;
}
export interface CandidateOutWithStream{
    chatRounds:number;
    messages:MessageOut[];
}