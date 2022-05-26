import { findAndReplace } from "../../store/mainConfigSlice"
import { animatePath } from "./breadthFirstAlgorithm"
import { sleep } from "../sleep"

const directionR = [-1, 1, 0, 0]
const directionC = [0, 0, -1, 1]

let path = [];
let firstPath = [];

export const greedyBestFirstSearch = async(array, startPoint, endPoint, dispatch, isActiveNewPoint, betweenPoint) => {
    
    let queue = []
    queue.push({r: startPoint.y, c: startPoint.x, distance: Infinity})
    
    let visited = new Map();
    visited.set(`${startPoint.y},${startPoint.x}`, '')

    while(queue.length > 0) {
        
        let current = queue.shift();

        await sleep(1)
        dispatch(findAndReplace({x: current.c, y: current.r, propName: 'isSearch'}))
        

        if(isActiveNewPoint) {

            if(array[current.r][current.c].isBetweenPoint) {
                
                getPath(firstPath, visited, startPoint, current.c, current.r)
                await greedyBestFirstSearch(array, betweenPoint, endPoint, dispatch, false, betweenPoint)                
                return true
            }

            searchNeighbor(array, current.c, current.r, visited, betweenPoint, queue)

        } else {
            
            if(array[current.r][current.c].isEndPoint) {
                
                getPath(path, visited, startPoint, current.c, current.r)
                await animatePath([...firstPath, ...path], dispatch)
                
                path = []
                firstPath = []

                return true
            }

            searchNeighbor(array, current.c, current.r, visited, endPoint, queue)
        }


        queue.sort( sortQueue )

    }

}

const searchNeighbor = (array, c, r, visited, endPoint, queue) => {
    let cc, rr
    let distance = 1;

    for(let i = 0; i < 4; i++) {
        cc = c + directionC[i]
        rr = r + directionR[i]

        const inbounceR = 0 <= rr && rr < array.length
        const inbounceC = 0 <= cc && cc < array[0].length

        if(!inbounceC || !inbounceR) continue

        if(array[rr][cc].isWall) continue

        let pos = `${rr},${cc}`
        if(visited.has(pos)) continue

        visited.set(pos, `${r},${c}`)

        if(array[rr][cc].isWeightWall)
            distance = 15
        else 
            distance = 1;

        let distanceToEnd = getDistanceToEnd(endPoint, rr, cc) + distance       
        
        queue.push({r: rr, c: cc, distance: distanceToEnd})
    }


}

const getDistanceToEnd = (endPoint, curentR, curentC) => Math.abs(endPoint.x - curentC) + Math.abs(endPoint.y - curentR) 

const sortQueue = (a, b) => (a.distance > b.distance) ? 1 : ((a.distance < b.distance) ? -1 : -1)

const getPath = (path, adjacencyList, startPoint, currentC, currentR) => {

    let [r, c] = adjacencyList.get(`${currentR},${currentC}`).split(',')

    if(Number(r) === startPoint.y && Number(c) === startPoint.x)
        return
    
    path.unshift(`${r},${c}`)

    getPath(path, adjacencyList, startPoint, c, r)

}