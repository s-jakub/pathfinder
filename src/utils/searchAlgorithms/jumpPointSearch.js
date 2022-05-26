import { findAndReplace, clear } from "../../store/mainConfigSlice";
import { animatePath } from "./breadthFirstAlgorithm"

import { clamp } from "../clamp";
import { sleep } from "../sleep";

let firstPointsTable = [];
let pointsTable = [];

export const jumpPointSearch = async (array, startPoint, endPoint, dispatch, isActiveNewPoint, betweenPoint) => {
    let queue = []
    let visited = new Map();
    
    dispatch(clear({val: 'isWeightWall'}))

    const h =  getHCost(endPoint, startPoint.y, startPoint.x)

    queue.push({r: startPoint.y, c: startPoint.x, f: h, h, distance: 0, parentNode: '' })
    visited.set(`${startPoint.y},${startPoint.x}`, {parentNode: ``, f: h, h, distance: 0});

    while(queue.length > 0) {
        
        let current = queue.shift();

        visited.set(`${current.r},${current.c}`, current);
        
        if(isActiveNewPoint) {

            if(array[current.r][current.c].isBetweenPoint) {
    
                getPoints(visited, firstPointsTable, current.c, current.r, startPoint)
                await jumpPointSearch(array, betweenPoint, endPoint, dispatch, false, betweenPoint)

                return 
    
            }

        } else {

            if(array[current.r][current.c].isEndPoint) {
    
                getPoints(visited, pointsTable, current.c, current.r, startPoint)
                await animatePath(getPath([...firstPointsTable, ...pointsTable]), dispatch)
               
                pointsTable = []
                firstPointsTable = []

                return 
    
            }

        }

        
        let neighborList = searchNeighbor(array, current.r, current.c, visited)
        
      
        for(let neighbour of neighborList) {

            let [r, c] = neighbour.split(',')
            let directionC = clamp(Number(c) - current.c, -1, 1)
            let directionR = clamp(Number(r)- current.r, -1, 1)
            
            if(directionR === 0 && directionC === 0) continue

            let jump = await isActiveNewPoint ? jumpPoint(array, Number(c), Number(r), directionC, directionR, betweenPoint, dispatch) : jumpPoint(array, Number(c), Number(r), directionC, directionR, endPoint, dispatch)
            
            if(jump && !visited.has(jump)) {
                
                let [jumpR, jumpC] = jump.split(',')
                
                await sleep(1)
                dispatch(findAndReplace({x: Number(jumpC), y: Number(jumpR), propName: 'isSearch'}))

                let newGCost = current.distance + chceckIsDiagonally(current, Number(jumpC), Number(jumpR));
                let newHCost = getHCost(endPoint, Number(jumpR), Number(jumpC))
                let newFCost = newGCost + newHCost;
                
                if(isExistInQueue(array, Number(jumpR), Number(jumpC)) && newFCost < current.f) {

                    let index = isExistInQueue(array, Number(jumpR), Number(jumpC))
                    queue[index] = {r: Number(jumpR), c: Number(jumpC), f: newFCost, distance: newGCost, h: newHCost, parentNode: queue[index].parentNode}
                    
                    let visitedNode = visited.get(jump)
                    visitedNode.parentNode = queue[index].parentNode
                    visited.f = newFCost
                    visited.distance = newGCost
                    visited.h = newHCost
                    
                    queue.sort(sortObj)
                    
                } else {
                    queue.push({r: Number(jumpR), c: Number(jumpC), f: newFCost, distance: newGCost, h: newHCost, parentNode: `${current.r},${current.c}`})
                    visited.set(`${jumpR},${jumpC}`, {parentNode: `${current.r},${current.c}`, f: newFCost, h: newHCost, distance: newGCost});
                   
                    queue.sort(sortObj)
                }
            }
        }
    }

    
}


const searchNeighbor = (array, r, c, visited) => {
    
    let neighborList = [];
    
    const parentNode = visited.get(`${r},${c}`).parentNode;
    if(!parentNode) {

        const directionC = [0, 1, 0, -1, 1, 1, -1, -1]
        const directionR = [-1, 0, 1, 0, -1, 1, 1, -1]
       
        for(let i = 0; i < directionC.length; i++) {
            
            if(isWalkable(array, r + directionR[i], c + directionC[i]))
                neighborList.push(`${r + directionR[i]},${c + directionC[i]}`)
            
        }

        return neighborList
    }
    
    const [parentNodeR, parentNodeC] = parentNode.split(',')
    const directionC = clamp(c - Number(parentNodeC), -1, 1)
    const directionR = clamp(r - Number(parentNodeR), -1, 1)

    // check diagonally
    if(directionC !== 0 && directionR !== 0) {
        const neighborUp = isWalkable(array, r + directionR, c)
        const neighborDown = isWalkable(array, r - directionR, c)
        const neighborLeft = isWalkable(array, r, c - directionC)
        const neighborRight = isWalkable(array, r, c + directionC)

        if(neighborUp)
            neighborList.push(`${r + directionR},${c}`)

        if(neighborRight)
            neighborList.push(`${r},${c + directionC}`)

        if((neighborUp || neighborRight) && isWalkable(array, r + directionR, c + directionC))
            neighborList.push(`${r + directionR},${c + directionC}`)

        // check forced neighbour 
        if(!neighborLeft && neighborUp) {

            if(isWalkable(array, r + directionR, c - directionC))
                neighborList.push(`${r + directionR},${c - directionC}`)
        }

        if(!neighborDown && neighborRight) {

            if(isWalkable(array, r - directionR, c + directionC))
                neighborList.push(`${r - directionR},${c + directionC}`)
        }
    } else {
        
        // check vertically
        if(directionC === 0) {

            if(isWalkable(array, r + directionR, c)) {
                neighborList.push(`${r + directionR},${c}`)

                // check forced neighbour
                if(!isWalkable(array, r, c + 1) && isWalkable(array, r + directionR, c + 1)) 
                    neighborList.push(`${r + directionR},${c + 1}`)

                if(!isWalkable(array, r, c - 1) && isWalkable(array, r + directionR, c - 1) )
                    neighborList.push(`${r + directionR},${c - 1}`)
            }
            // horizontally
        } else {

            if(isWalkable(array, r, c + directionC)) {
                neighborList.push(`${r + directionR},${c}`)

                if(!isWalkable(array, r + 1, c) && isWalkable(array, r + 1, c + directionC))
                    neighborList.push(`${r + 1},${c + directionC}`)

                if(!isWalkable(array, r - 1, c) && isWalkable(array, r - 1, c + directionC))
                    neighborList.push(`${r - 1},${c + directionC}`)
            }
        }
    }

    return neighborList

}

const jumpPoint = (array, currentC, currentR, directionC, directionR, endPoint, dispatch) => {

    
    if(!isWalkable(array, currentR, currentC))
        return null;
    
    
    // dispatch(findAndReplace({x: currentC, y: currentR, val: 'brown'}))

    if(endPoint.x === currentC && endPoint.y === currentR)
        return `${currentR},${currentC}`

    if(directionC !== 0 && directionR !== 0) {
        // await sleep(1)
        if((isWalkable(array, currentR - directionR, currentC + directionC) && !isWalkable(array, currentR - directionR, currentC)) || (isWalkable(array, currentR + directionR, currentC - directionC) && !isWalkable(array, currentR, currentC - directionC)))
            return `${currentR},${currentC}`

        if( jumpPoint(array, currentC + directionC, currentR, directionC, 0, endPoint, dispatch) !== null)
            return `${currentR},${currentC}`

        if( jumpPoint(array, currentC, currentR + directionR, 0, directionR, endPoint, dispatch) !== null)
            return `${currentR},${currentC}`

    } else if(directionC !== 0) {
        // await sleep(1)
        if((isWalkable(array, currentR + 1, currentC + directionC) && !isWalkable(array, currentR + 1, currentC)) || (isWalkable(array, currentR - 1, currentC + directionC) && !isWalkable(array, currentR - 1, currentC)))
            return `${currentR},${currentC}`

    } else if(directionR !== 0) {
        // await sleep(1)
        if((isWalkable(array, currentR + directionR, currentC + 1) && !isWalkable(array, currentR, currentC + 1)) || (isWalkable(array, currentR + directionR, currentC - 1) && !isWalkable(array, currentR, currentC - 1)))
            return `${currentR},${currentC}`
    }

    return jumpPoint(array, currentC + directionC, currentR + directionR, directionC, directionR, endPoint, dispatch);

}

const isWalkable = (array, r, c) => {
    const inbounceR = 0 <= r && r < array.length;
    const inbounceC = 0 <= c && c < array[0].length;

    if(!inbounceC || !inbounceR) return false

    if(array[r][c].isWall) return false

    return true
}

const chceckIsDiagonally = (parentNode, currentC, currentR) => {
   
    if(parentNode.r === currentR)
        return 10

    if(parentNode.c === currentC)
        return 10

    return 14
}

const getHCost = (endPoint, currentR, currentC) => (Math.abs(endPoint.y - currentR) + Math.abs(endPoint.x - currentC)) * 10

const isExistInQueue = (array, r, c) => {
    array.forEach((value, index) => {
      
        if (value.r === r && value.c === c) 
            return index  
    })

    return false 
}


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

const getPoints = (pointList, path, lastC, lastR, startPoint) => {
    path.unshift(`${lastR},${lastC}`)
    
    let [r, c] = pointList.get(`${lastR},${lastC}`).parentNode.split(',')
    
    
    if(Number(r) === startPoint.y && Number(c) === startPoint.x)
        return path.unshift(`${r},${c}`)

    // if(lastR !== r && lastC !== c)
    getPoints(pointList, path, Number(c), Number(r), startPoint)

}

const getPath = (pointsList) => {
    let path = [];
    
    for(let i = 0; i < pointsList.length - 1; i++) {
        
        let fR = parseInt(pointsList[i].split(',')[0])
        let fC = parseInt(pointsList[i].split(',')[1])
        let sR = parseInt(pointsList[i + 1].split(',')[0])
        let sC = parseInt(pointsList[i + 1].split(',')[1])
        
        if(i === 0)
            path.push(`${fR},${fC}`)

        while(fC !== sC || fR !== sR) {
            
            let directionC = clamp(fC - sC, -1, 1)
            let directionR = clamp(fR - sR, -1, 1)
           
            
            if(directionC !== 0 && directionR !== 0) {
               
                fR -= directionR
                fC -= directionC
                
                path.push(`${fR},${fC}`)
            } else {

                if(directionC !== 0) {
                    fC -= directionC
                    path.push(`${fR},${fC}`)
                }
                
                if(directionR !== 0) {
                    fR -= directionR
                    path.push(`${fR},${fC}`)
                }
            }


        }
    
    }

    return path
}