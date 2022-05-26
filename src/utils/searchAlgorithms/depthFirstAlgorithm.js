import { clear, findAndReplace } from "../../store/mainConfigSlice";
import { animatePath } from "./breadthFirstAlgorithm";
import { sleep } from "../sleep"


let stackR = [ ];
let stackC = [ ];

let path = [ ];
let firstPath = [ ];

export const depthFirstAlgorithm = async (array, startPoint, dispatch, isActiveNewPoint) => {

    dispatch(clear({val: 'isWeightWall'}))
    stackR.push(startPoint.y);
    stackC.push(startPoint.x);

    let visited = new Set();
    

    while(stackC.length > 0) {

        let currentR = stackR.pop();
        let currentC = stackC.pop();

        await sleep(1)
        path.push(`${currentR},${currentC}`);
        dispatch(findAndReplace({x: currentC, y: currentR, propName: 'isSearch'}))
        
        if(isActiveNewPoint) {

            if(array[currentR][currentC].isBetweenPoint) {
                
                stackC = []
                stackR = []
                firstPath = path
                path = []
                await depthFirstAlgorithm(array, {x: currentC, y: currentR}, dispatch, false)
                
                return true;
            }
        }else {
            
            if(array[currentR][currentC].isEndPoint) {
                await animatePath([...firstPath, ...path], dispatch)
    
                stackC = []
                stackR = []
                path = []
                firstPath = []
                
                return true;
            }
        }

        
        searchNeighbor(array, currentC, currentR, visited, dispatch)
    }
    
}

const searchNeighbor = (array, c, r, visited, dispatch) => {

        
    const inbounceR = 0 <= r && r < array.length;
    const inbounceC = 0 <= c && c < array[0].length;
    
    if(!inbounceC || !inbounceR) return;
    
    if(array[r][c].isWall) return;
    
    let position = `${c},${r}`;
    if(visited.has(position)) return
    
    visited.add(position);

    stackC.unshift(c)
    stackR.unshift(r)

    searchNeighbor(array, c, r - 1 , visited, dispatch)
    searchNeighbor(array, c + 1, r, visited, dispatch)
    searchNeighbor(array, c, r + 1, visited, dispatch)
    searchNeighbor(array, c - 1, r, visited, dispatch)





}