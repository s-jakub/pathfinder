import { findAndReplace } from "../../store/mainConfigSlice";
import { animatePath } from "./breadthFirstAlgorithm";
import { sleep } from "../sleep";

const distanceC = [1, -1, 0, 0]
const distanceR = [0, 0, 1, -1]

let path = []
let firstPath = []

export const dijkstraAlgorithm = async (array, startPoint, dispatch, isActiveNewPoint ) => {
    
    let unvisitedR = [ ];
    let unvisitedC = [ ];

    unvisitedR.push([ startPoint.y, 0 ]);
    unvisitedC.push([ startPoint.x, 0 ]);

    let visited = new Set();

    let adjacencyList = new Map();
    adjacencyList.set(`${startPoint.y},${startPoint.x}`, {distance: 0, prevNode: ``})

    while(unvisitedC.length > 0) {

        let currentR = unvisitedR.shift()[0];
        let currentC = unvisitedC.shift()[0];

        await sleep(1)
        dispatch(findAndReplace({x: currentC, y: currentR, propName: 'isSearch'}))

        if(isActiveNewPoint) {

            if(array[currentR][currentC].isBetweenPoint) {
    
                getPath(adjacencyList, firstPath, currentR, currentC, startPoint)
                await dijkstraAlgorithm(array, {x: currentC, y: currentR}, dispatch, false)
    
                return true;
            }

        } else {
            
            if(array[currentR][currentC].isEndPoint) {
    
                getPath(adjacencyList, path, currentR, currentC, startPoint)
                await animatePath([...firstPath, ...path], dispatch)

                path = []
                firstPath = []
    
                return true;
            }
        }


        visited.add(`${currentR},${currentC}`);
        searchNeighbors(array, currentC, currentR, adjacencyList, visited, unvisitedC, unvisitedR)
        getLeast(unvisitedC, unvisitedR)
    }
}

const searchNeighbors = (array, c, r, adjacencyList, visited, unvisitedC, unvisitedR) => {
    let rr, cc;
    let distance;

    for(let i = 0; i < 4; i++) {
        rr = r + distanceR[i]
        cc = c + distanceC[i]

        let inbounceR = 0 <= rr && rr < array.length 
        let inbounceC = 0 <= cc && cc < array[0].length 

        if(!inbounceR || !inbounceC) continue

        if(array[rr][cc].isWall) continue

        let currPos = `${rr},${cc}`
        if(visited.has(currPos)) continue

        if(array[rr][cc].isWeightWall) {
            distance = 5;
        } else 
            distance = 1
        
        let prevNode = adjacencyList.get(`${r},${c}`)

        let distanceFrom = prevNode.distance + distance;

        if(adjacencyList.has(currPos)) {
            let currNode = adjacencyList.get(currPos);

            if(currNode.distance > distanceFrom) {
                currNode.distance = distanceFrom
                currNode.prevNode = `${r},${c}`
            }
            continue
        }

        adjacencyList.set(currPos, {distance: distanceFrom, prevNode: `${r},${c}`})

        unvisitedC.push([cc, distanceFrom])
        unvisitedR.push([rr, distanceFrom])
        
    }
}

const getLeast = (array, unvisitedR) => {

    for(let i = 0; i < array.length - 1; i++) {
        for(let j = 0; j < array.length - 1 - i; j++) {

            if(array[j][1] > array[j + 1][1]) {
                let tmp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = tmp
                
                let tmp2 = unvisitedR[j]
                unvisitedR[j] = unvisitedR[j + 1]
                unvisitedR[j + 1] = tmp2 
            }
            
        }
    }
}

const getPath = (adjacencyList, path, lastR, lastC, startPoint) => {
    let [r, c] = adjacencyList.get(`${lastR},${lastC}`).prevNode.split(',')
    path.push(`${r},${c}`)

    if(Number(r) === startPoint.y && Number(c) === startPoint.x)
        return path.reverse();

    getPath(adjacencyList, path, r, c, startPoint);

}