import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { request } from "../../assets/request";
import { topicList } from "./data";
import type { PuzzleIn,PuzzleBase } from "@/types/entity"
import {puzzleBaseArray} from "@/assets/puzzleBase"

export type Puzzle = {
  puzzleId: number;
  title: string;
  rank: number;
  topic: number;
  isSuccess:boolean;
  successTimes: number;
  wholeTimes: number;
  tagContents: Array<string>;
  
  shortFace:string;
  rate:number;
  
}
export const usePuzzlesStore = defineStore(
  "puzzles",
  () => {
    const puzzles: Array<Puzzle> = [];
    const puzzlesRef = ref(puzzles);
    const puzzleSuccessNum = ref(0);
    // const compliantPuzzleNum = ref(0);
    const compliantPuzzleNum=ref(0)
    const haveLoadPuzzles = ref(false);
    const haveSetPuzzles=ref(false)
    const num=ref(0)
    let nowPosition=1;
    function initPuzzles(){
      //将puzzleBaseArray中的Null转换为Undefined
      
      const initPuzzlesData=puzzleBaseArray.map((puzzleData:PuzzleBase)=>{
        return{
          ...puzzleData,
          isSuccess:false,
          successTimes:0,
          wholeTimes:0,
          rate:0,
          rank:0
        }
    })
    const initPuzzlesArray=initPuzzlesData.map((puzzleData:PuzzleBase)=>{
      return makePuzzle(puzzleData as PuzzleIn)
    })
    puzzlesRef.value=initPuzzlesArray
    // console.log(puzzlesRef.value)
    compliantPuzzleNum.value=puzzlesRef.value.length
    
  }
  
    function makePuzzle(puzzleData: PuzzleIn): Puzzle {
      puzzleData.tagContents.concat(
        puzzleData.topic ? [topicList.content[puzzleData.topic].text] : []
      );
      //将PuzzleIn转换为Puzzle;
      return {
        puzzleId: puzzleData.id,
        title: puzzleData.title,
        rank: puzzleData.rank,
        topic: puzzleData.topic,
        isSuccess:puzzleData.isSuccess,
        successTimes: puzzleData.successTimes,
        wholeTimes: puzzleData.wholeTimes,
        tagContents:puzzleData.tagContents,
        // position:nowPosition++,
        shortFace:puzzleData.shortFace?puzzleData.shortFace:"",
        rate:puzzleData.rate
      
      };
    }


    
  
    function setPuzzles(puzzleData:PuzzleIn[]){
      const puzzlesId=puzzlesRef.value.map((puzzle)=>puzzle.puzzleId)
      for (let i = 0; i < puzzleData.length; i++) {
        const newData = puzzleData[i];
        if (newData.isSuccess == true) {
          puzzleSuccessNum.value += 1;
        }
        let newPuzzle = makePuzzle(newData as PuzzleIn);
        if(!puzzlesId.includes(newPuzzle.puzzleId)){
        puzzlesRef.value.push(newPuzzle);
      }
      else{
      puzzlesRef.value.forEach((element: Puzzle) => {
        if (element.puzzleId == newPuzzle.puzzleId) {
          element.isSuccess = newPuzzle.isSuccess;
          element.successTimes = newPuzzle.successTimes;
          element.wholeTimes = newPuzzle.wholeTimes;
          element.rate = newPuzzle.rate;
          element.rank = newPuzzle.rank;
          element.shortFace=newPuzzle.shortFace
        }
       
      });
      }
      haveSetPuzzles.value=true
    }
      

      compliantPuzzleNum.value = puzzlesRef.value.length;
      haveLoadPuzzles.value = true;
    
    }
    
  function passPuzzles(puzzlesId:Number[]):void{
    const puzzlesSet=new Set(puzzlesId)
    puzzlesRef.value.forEach((element: Puzzle) => {
      if (element.puzzleId in puzzlesSet) {
        if (element.isSuccess == false) {
          element.isSuccess = true;
          puzzleSuccessNum.value += 1;
        }
      }
    });

  }

  function passPuzzle(puzzleId:Number): void {
    puzzlesRef.value.forEach((element: Puzzle) => {
      if (element.puzzleId == puzzleId) {
        if (element.isSuccess == false) {
          element.isSuccess = true;
          puzzleSuccessNum.value += 1;
        }
      }
    });
}
function findNextPuzzle(nowPuzzleId:number):number{
    let puzzles=puzzlesRef.value

    let rate=0
    for(let i=0;i<puzzles.length;i++){
        
        if(puzzles[i].isSuccess==false && puzzles[i].puzzleId!=nowPuzzleId){
        return puzzles[i].puzzleId
    }
  }
  return -1
}
    
return { puzzlesRef, puzzleSuccessNum, compliantPuzzleNum, haveLoadPuzzles, haveSetPuzzles,initPuzzles,setPuzzles, passPuzzle,passPuzzles,findNextPuzzle }
}
);
