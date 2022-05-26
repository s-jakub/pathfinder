import { findAndReplace } from "../../store/mainConfigSlice";
import { animatePath } from "./breadthFirstAlgorithm";
import { sleep } from "../sleep";

const directionR = [1, 0, -1, 0]
const directionC = [0, 1, 0, -1]

let firstPath = []

export const bidirectionalDijkstraAlgorithm = async (array, startPoint, endPoint, dispatch, isActiveNewPoint, betweenPoint) => {
    
    let startQueue = []
    let endQueue = [];
    let visitedStart = new Set();
    let visitedEnd = new Set();
    
    let adjacencyListStart = new Map();
    let adjacencyListEnd = new Map();
    

    if(isActiveNewPoint) {

        startQueue.push({r: startPoint.y, c: startPoint.x, distance: 0})
        endQueue.push({r: betweenPoint.y, c: betweenPoint.x, distance: 0})

        adjacencyListStart.set(`${startPoint.y},${startPoint.x}`, {parentNode: '', distance: 0})
        adjacencyListEnd.set(`${betweenPoint.y},${betweenPoint.x}`, {parentNode: '', distance: 0})

        visitedStart.add(`${startPoint.y},${startPoint.x}`)
        visitedEnd.add(`${betweenPoint.y},${betweenPoint.x}`)

        while(startQueue.length > 0 && endQueue.length > 0) {

            let startCurent = startQueue.shift();
            let endCurent = endQueue.shift();

            await sleep(1)
            dispatch(findAndReplace({x: startCurent.c, y: startCurent.r, propName: 'isSearch'}))
            dispatch(findAndReplace({x: endCurent.c, y: endCurent.r, propName: 'isSearch'}))
            

            if(visitedStart.has(`${endCurent.r},${endCurent.c}`)) {

                let firstHalf = getPath(adjacencyListStart, `${endCurent.r},${endCurent.c}`)
                let secondHalf = getPath(adjacencyListEnd, `${endCurent.r},${endCurent.c}`)
                secondHalf.pop()
                secondHalf.reverse()
                
                firstPath = [...firstHalf, ...secondHalf ]
                await bidirectionalDijkstraAlgorithm(array, betweenPoint, endPoint, dispatch, false, betweenPoint)

                return 
            }

            searchNeighbor(array, startCurent.r, startCurent.c, startQueue, visitedStart, adjacencyListStart)
            searchNeighbor(array, endCurent.r, endCurent.c, endQueue, visitedEnd, adjacencyListEnd)
            
            startQueue.sort( sortQueue )
            endQueue.sort( sortQueue )
        }

    } else {

        startQueue.push({r: startPoint.y, c: startPoint.x, distance: 0})
        endQueue.push({r: endPoint.y, c: endPoint.x, distance: 0})

        adjacencyListStart.set(`${startPoint.y},${startPoint.x}`, {parentNode: '', distance: 0})
        adjacencyListEnd.set(`${endPoint.y},${endPoint.x}`, {parentNode: '', distance: 0})

        visitedStart.add(`${startPoint.y},${startPoint.x}`)
        visitedEnd.add(`${endPoint.y},${endPoint.x}`)

        while(startQueue.length > 0 && endQueue.length > 0) {

            let startCurent = startQueue.shift();
            let endCurent = endQueue.shift();

            await sleep(1)
            dispatch(findAndReplace({x: startCurent.c, y: startCurent.r, propName: 'isSearch'}))
            dispatch(findAndReplace({x: endCurent.c, y: endCurent.r, propName: 'isSearch'}))
            

            if(visitedStart.has(`${endCurent.r},${endCurent.c}`)) {

                let firstHalf = getPath(adjacencyListStart, `${endCurent.r},${endCurent.c}`)
                let secondHalf = getPath(adjacencyListEnd, `${endCurent.r},${endCurent.c}`)
                secondHalf.pop()
                secondHalf.reverse()
                
                let path = [...firstHalf, ...secondHalf ]
                await animatePath([...firstPath, ...path], dispatch)
                
                firstPath = []

                return 
            }

            searchNeighbor(array, startCurent.r, startCurent.c, startQueue, visitedStart, adjacencyListStart)
            searchNeighbor(array, endCurent.r, endCurent.c, endQueue, visitedEnd, adjacencyListEnd)
            
            startQueue.sort( sortQueue )
            endQueue.sort( sortQueue )

            
        }
    }

}


const searchNeighbor = (array, r, c, queue, visited, adjacencyList) => {
    let rr, cc
    let distance = 0;

    for(let i = 0; i < directionC.length; i++) {

        rr = r + directionR[i]
        cc = c + directionC[i]
        
        const inbounceR = 0 <= rr && rr < array.length 
        const inbounceC = 0 <= cc && cc < array[0].length

        if(!inbounceC || !inbounceR) continue

        if(array[rr][cc].isWall) continue

        let pos = `${rr},${cc}`;
        if(visited.has(pos)) continue

        visited.add(pos)

        if(array[rr][cc].isWeightWall) 
            distance = 5
        else 
            distance = 1

        let parentNode = adjacencyList.get(`${r},${c}`)
        let curDistance = parentNode.distance + distance

        if(adjacencyList.has(pos)) {
            let currentNode = adjacencyList.get(pos)
            
            if(currentNode.distance > curDistance) {
                currentNode.distance = curDistance
                currentNode.parentNode = `${r},${c}`
            }

            continue
        }

        adjacencyList.set(pos, {parentNode: `${r},${c}`, distance: curDistance})

        queue.push({r: rr, c: cc, distance: curDistance})
           
    }

}

const sortQueue = (a, b) => {
    if(a.distance > b.distance)
        return 1
        
    if(a.distance < b.distance)
        return -1

    return 0
}

const getPath = (adjacecnyList, point) => {    
    let path = []
    path.push(point)
    
    let node = adjacecnyList.get(point).parentNode

    while(node !== '') {

        path.push(node)
        node = adjacecnyList.get(node).parentNode
    }

    return path.reverse()


}