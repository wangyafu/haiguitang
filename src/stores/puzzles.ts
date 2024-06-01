import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { request } from "../assets/request";
import { topicList } from "./data";
import type { PuzzleIn } from "@/types/entity"
type PuzzleBase = {
  title: string;
  rank: number;
  topic: number;
  isSuccess:boolean;
  successTimes: number;
  wholeTimes: number;
  tagContents: Array<string>;
}

export type Puzzle = {
  puzzleId: number;
  title: string;
  rank: number;
  topic: number;
  isSuccess:boolean;
  successTimes: number;
  wholeTimes: number;
  tagContents: Array<string>;
  position: number;
  
}
export const usePuzzlesStore = defineStore(
  "puzzles",
  () => {
    const puzzles: Array<Puzzle> = [];
    const puzzlesRef = ref(puzzles);
    const puzzleSuccessNum = ref(0);
    const compliantPuzzleNum = ref(0);
    const haveLoadPuzzles = ref(false);
    const num=ref(0)
    let nowPosition=1;
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
        position:nowPosition++,
      };
    }


    
  
    function setPuzzles(puzzleData:PuzzleIn[]){
      for (let i = 0; i < puzzleData.length; i++) {
        const newData = puzzleData[i];
        if (newData.isSuccess == true) {
          puzzleSuccessNum.value += 1;
        }
        let newPuzzle = makePuzzle(newData as PuzzleIn);

        puzzlesRef.value.push(newPuzzle);
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
    
return { puzzlesRef, puzzleSuccessNum, compliantPuzzleNum, haveLoadPuzzles, setPuzzles, passPuzzle,passPuzzles,findNextPuzzle }
}
);
