import { fillAllGridWall, removeWall } from "../../store/mainConfigSlice";

import { sleep } from "../sleep";
import { clamp } from "../clamp";

const directionC = [2, 0, -2, 0]
const directionR = [0, 2, 0, -2]

export const randomizedPrimsAlgorithm = async (array, dispatch) => {

    dispatch(fillAllGridWall())

    let adjacencyList = [];
    let visited = new Set();
    
    let initPoint = getRandomNubmer(array)
    adjacencyList.push(initPoint)

    visited.add(`${initPoint.r - 2},${initPoint.c}`)
    dispatch(removeWall({x: initPoint.c, y: initPoint.r - 2}))
    
    let randomIndex
    let current

    while(adjacencyList.length > 0) {
        
        randomIndex = Math.floor(Math.random() * adjacencyList.length)
        current = adjacencyList[randomIndex]
        adjacencyList.splice(randomIndex, 1)

        visited.add(`${current.r},${current.c}`)
        
        await sleep(1)
        
        let neighborList = searchNeighbor(current.r, current.c, array, visited, adjacencyList);

        // randomIndex = Math.floor(Math.random() * neighborList.length)
        let prevPoint = neighborList[0]

        visited.add(`${prevPoint.r},${prevPoint.c}`)

        joinPoints(current.r, current.c, prevPoint, dispatch, array, visited)
    
        
                   
    }

}

const searchNeighbor = (r, c, array, visited, adjacencyList) => {

    let rr, cc;
    let neighborList = []
    for(let i = 0; i < 4; i++) {

        rr = r + directionR[i]
        cc = c + directionC[i]

        let inbounceR = 0 <= rr && rr < array.length
        let inbounceC = 0 <= cc && cc < array[0].length

        if(!inbounceC || !inbounceR) continue
        
        if(visited.has(`${rr},${cc}`)) {
            neighborList.push({r: rr, c: cc})
            continue
        }
        
        adjacencyList.push({r: rr, c: cc})

    }

    return neighborList

}

const getRandomNubmer = (array) => {
    const randomR = Math.floor(Math.random() * array.length / 2) * 2
    const randomC = Math.floor(Math.random() * array.length / 2) * 2

    return {r: randomR, c: randomC}
}

const joinPoints = (currentR, currentC, prevPoint, dispatch, array, visited) => {
    
    let directionC = clamp(prevPoint.c - currentC, -1, 1)
    let directionR = clamp(prevPoint.r - currentR, -1, 1)

    dispatch(removeWall({x: currentC, y: currentR}))
    visited.add(`${prevPoint.r},${prevPoint.c}`)

    // debugger

    if(directionC !== 0) {
        
        while(currentC !== prevPoint.c) {
            
            if((array[prevPoint.r][prevPoint.c].isStartPoint) || array[prevPoint.r][prevPoint.c].isEndPoint) break
            
            dispatch(removeWall({x: prevPoint.c, y: prevPoint.r}))
            prevPoint.c -= directionC
        }

    }

    if(directionR !== 0) {
        
        while(currentR !== prevPoint.r) {

            if((array[prevPoint.r][prevPoint.c].isStartPoint) || array[prevPoint.r][prevPoint.c].isEndPoint) break
            
            dispatch(removeWall({x: prevPoint.c, y: prevPoint.r}))
            
            prevPoint.r -= directionR
        }
    }

}
