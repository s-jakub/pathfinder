import { findAndReplace } from "../../store/mainConfigSlice"
import { animatePath } from "./breadthFirstAlgorithm"
import { sleep } from "../sleep"

const directionR = [-1, 1, 0, 0]
const directionC = [0, 0, -1, 1]

let path = []
let firtsPath = []

export const AStarSearch = async (array, startPoint, endPoint, dispatch, isActiveNewPoint, betweenPoint) => {
    
    let queue = []
    queue = [{r: startPoint.y, c: startPoint.x, f: 0, h: 0}]

    let adjacencyList = new Map()
    adjacencyList.set(`${startPoint.y},${startPoint.x}`, {distance: 0, prevNode: '', hCost: 0, fCost: 0})

    let visited = new Set()
    
    while(queue.length > 0) {
        
        let curent = queue.shift()
        
        await sleep(0.01)
        dispatch(findAndReplace({x: curent.c, y: curent.r, propName: 'isSearch'}))
        
        if(isActiveNewPoint) {

            if(array[curent.r][curent.c].isBetweenPoint) {
        
                getPath(adjacencyList, firtsPath, curent.r, curent.c, startPoint)
                await AStarSearch(array, {x: curent.c, y: curent.r}, endPoint, dispatch, false)

                return false
            }

        } else {
            
            if(array[curent.r][curent.c].isEndPoint) {
        
                getPath(adjacencyList, path, curent.r, curent.c, startPoint)
                await animatePath([...firtsPath, ...path], dispatch)
    
                path = []
                firtsPath = []
    
                return true
            }

        }


        visited.add(`${curent.r},${curent.c}`)
        isActiveNewPoint ? 
            searchNeighbor(array, curent.c, curent.r, visited, betweenPoint, adjacencyList, queue) :
            searchNeighbor(array, curent.c, curent.r, visited, endPoint, adjacencyList, queue) 
        queue.sort( sortObj )

    }

    return true;
}

const searchNeighbor = (array, c, r, visited, endPoint, adjacencyList, queue) => {
    let cc,rr 
    let distance = 0;

    for(let i = 0; i < 4; i++) {
        cc = c + directionC[i]
        rr = r + directionR[i]

        const inbounceR = 0 <= rr && rr < array.length
        const inbounceC = 0 <= cc && cc < array[0].length

        if(!inbounceC || !inbounceR) continue

        if(array[rr][cc].isWall) continue

        let pos = `${rr},${cc}`
        if(visited.has(pos)) continue;

        if(array[rr][cc].isWeightWall)
            distance = 150
        else
            distance = 0

        let neighborNode = adjacencyList.get(`${r},${c}`)
        let gCost = neighborNode.distance + 10 + distance 
        let hCost = getHCost(endPoint, rr, cc)
        
        let fCost = gCost + hCost

        if(adjacencyList.has(pos)) {
            let prevNode = adjacencyList.get(pos);
          
            if(prevNode.fCost > fCost || prevNode.hCost > hCost) {
                prevNode.fCost = fCost
                prevNode.prevNode = `${r},${c}`
                prevNode.hCost = hCost
                prevNode.distance = gCost
                queue.push({r:rr, c:cc, f:fCost, h:hCost})
            }
        }

        if(!adjacencyList.has(pos)) {
            adjacencyList.set(pos, {distance: gCost, prevNode: `${r},${c}`, hCost, fCost })
            queue.push({r:rr, c:cc, f:fCost, h:hCost})
        }

    }
}

export const getHCost = (endPoint, currentR, currentC) => (Math.abs(endPoint.y - currentR) + Math.abs(endPoint.x - currentC)) * 10

const sortObj = (a, b) => {

    if(a.f > b.f)
        return 1
    if(a.f < b.f)
        return - 1

    if(a.h < b.h)
        return - 1
    if(a.h > b.h)
        return 1 
    
    return 0
}

const getPath = (adjacencyList, path, lastR, lastC, startPoint) => {
    let [r, c] = adjacencyList.get(`${lastR},${lastC}`).prevNode.split(',')
    path.push(`${r},${c}`)

    if(Number(r) === startPoint.y && Number(c) === startPoint.x)
        return path.reverse();

    getPath(adjacencyList, path, r, c, startPoint);

}