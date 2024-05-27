import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { request } from "../assets/request";
import { topicList } from "./data";
type PuzzleBase = {
  title: string;
  rank: number;
  topic: number;
  isSuccess:boolean;
  successTimes: number;
  wholeTimes: number;
  tagContents: Array<string>;
}
type PuzzleIn = {
  id: number;
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


    }
  }
    function getPuzzles(uuid: string) {
      
      console.log(uuid)
      request
        .post(
          "/getPuzzles",
          {
            userUuid: uuid,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            const newData = response.data[i];
            if (newData.isSuccess == true) {
              puzzleSuccessNum.value += 1;
            }
            let newPuzzle = makePuzzle(newData as PuzzleIn);

            puzzlesRef.value.push(newPuzzle);
          }

          compliantPuzzleNum.value = puzzlesRef.value.length;
          haveLoadPuzzles.value = true;
        })
        .catch((error) => {
          console.error(error);
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
function findPuzzle(nowPuzzleId:Number){
    let puzzles=puzzlesRef.value
    let puzzleId=-1
    let rate=0
    for(let i=0;i<puzzles.length;i++){
        
        if(puzzles[i].isSuccess==false && puzzles[i].puzzleId!=nowPuzzleId){
            if(rate<puzzles[i].successTimes/(puzzles[i].wholeTimes+1)){
                puzzleId=puzzles[i].puzzleId
                rate=puzzles[i].successTimes/(puzzles[i].wholeTimes+1)
    
            }
        }
    }
    return puzzleId
    }
return { puzzlesRef, puzzleSuccessNum, compliantPuzzleNum, haveLoadPuzzles, getPuzzles, passPuzzle,findPuzzle }
}
);
