import { fillAllGridWall, removeWall } from "../../store/mainConfigSlice";

import { clamp } from "../clamp";
import { sleep } from "../sleep";


const direction = [{r: -1, c: 0}, {r: 0, c: 1}, {r: 1, c: 0}, {r: 0, c: -1}]

export const randomizedDepthFirst = async (array, startPoint, endPoint, dispatch) => {
   
    let cpyArr = array.map(val => val.slice());
    cpyArr.map(val => val.fill({
        isRoad: false,
        isWall: true,
        isWeightWall: false,
        isStartPoint: false,
        isEndPoint: false,
        isPath: false,
        isSearch: false,
    }))

    cpyArr[startPoint.y][startPoint.x] = {...cpyArr[startPoint.y][startPoint.x], isStartPoint: true, isWall: false} 
    cpyArr[endPoint.y][endPoint.x] = {...cpyArr[endPoint.y][endPoint.x], isEndPoint: true, isWall: false}

    dispatch(fillAllGridWall())

    let visited = new Set();
    let stackR = [];
    let stackC = [];
    let randomPoint = setRandomPoint(array)

    stackR.push(randomPoint.y)
    stackC.push(randomPoint.x)

    visited.add(`${randomPoint.y},${randomPoint.x}`)
    
    let prevR = randomPoint.y; 
    let prevC = randomPoint.x; 

    while(stackC.length > 0) {
        
        let curentC = stackC.pop()
        let curentR = stackR.pop()

        await sleep(1)
        joinPoints(curentR, curentC, prevR, prevC, dispatch, startPoint, endPoint, cpyArr)
        searchNeighbor(cpyArr, curentR, curentC, visited, stackC, stackR)
  
        prevC = curentC
        prevR = curentR
    }
    
}

const searchNeighbor = (array, r, c, visited, stackC, stackR) => {

    const shuffledDirection = direction.sort((a, b) => 0.5 - Math.random())
    
    for(let i = 0; i < 4; i++) {
        
        let rr, cc
        cc = c + shuffledDirection[i].c * 2
        rr = r + shuffledDirection[i].r * 2
    
        const inbounceR = 0 <= rr && rr < array.length 
        const inbounceC = 0 <= cc && cc < array[0].length
    
        if(!inbounceC || !inbounceR) continue
    
        if(array[rr][cc].isStartPoint || array[rr][cc].isEndPoint) continue
    
        if(visited.has(`${rr},${cc}`)) continue

        visited.add(`${rr},${cc}`)

        stackC.push(cc)
        stackR.push(rr)
    }



}

const setRandomPoint = (array) => {

    const randomY = Math.floor(Math.random() * (array.length - 1) / 2) * 2
    const randomX = Math.floor(Math.random() * (array[0].length - 1) / 2) * 2

    if(!array[randomY][randomX].isEndPoint && !array[randomY][randomX].isStartPoint)
      return {x: randomX, y: randomY}

    setRandomPoint(array);
}

const joinPoints = (currentR, currentC, prevR, prevC, dispatch, startPoint, endPoint, array) => {
    
    let directionC = clamp(prevC - currentC, -1, 1)
    let directionR = clamp(prevR - currentR, -1, 1)

    if(directionC !== 0) {
        
        while(currentC !== prevC) {
            
            if((array[prevR][prevC].isStartPoint) || array[prevR][prevC].isEndPoint) break
            
            dispatch(removeWall({x: prevC, y: prevR}))
            prevC -= directionC
        }

    }

    if(directionR !== 0) {
        
        while(currentR !== prevR) {

            if((array[prevR][prevC].isStartPoint) || array[prevR][prevC].isEndPoint) break
            
            dispatch(removeWall({x: prevC, y: prevR}))
            
            prevR -= directionR
        }
    }
}