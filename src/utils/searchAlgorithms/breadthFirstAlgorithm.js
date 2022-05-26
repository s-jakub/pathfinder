import { clear, findAndReplace } from "../../store/mainConfigSlice";
import { sleep } from "../sleep";


const directionR = [-1, 0, 1, 0];
const directionC = [0, 1, 0, -1];


let path = [];
let firstPath = [];

export const breadthFirstAlgorithm = async (array, startPoint, dispatch, isActiveNewPoint) => {

  let queueC = [];
  let queueR = [];
  let prevPath = new Map();

  dispatch(clear({val: 'isWeightWall'}))

  let visited = new Set();
  queueR.push( startPoint.y )
  queueC.push( startPoint.x )

  const position = `${startPoint.y},${startPoint.x}`
  visited.add(position)

  while (queueC.length > 0) {
    let currentR = queueR.shift()
    let currentC = queueC.shift()

    dispatch(findAndReplace({y: currentR, x: currentC, propName: 'isSearch'}))


    if(isActiveNewPoint) {

      if(array[currentR][currentC].isBetweenPoint) {
        
        getPath(prevPath, firstPath, currentR, currentC, startPoint)
        await breadthFirstAlgorithm(array, {x: currentC, y: currentR}, dispatch, false)
  
        return true;
      }

    }else {

      if(array[currentR][currentC].isEndPoint) {
        
        getPath(prevPath, path, currentR, currentC, startPoint)
        await animatePath([...firstPath, ...path], dispatch);

       
        path = []
        firstPath = []
        return true;
      }
    }
    
    await sleep(1);
    searchNeighbor(array, currentR, currentC, visited, queueC, queueR, prevPath)
    
    
  }  
}

const searchNeighbor = (array, r, c, visited, queueC, queueR, prevPath) => {
  let rr, cc;

  for(let i = 0; i < 4; i++) {
    rr = r + directionR[i];
    cc = c + directionC[i];

    let rowInbounce = 0 <= rr && rr < array.length
    let colInbounce = 0 <= cc && cc < array[0].length
    
    if(!rowInbounce || !colInbounce) continue
    
    if(array[rr][cc].isWall) continue

    const position = `${rr},${cc}`;
    if(visited.has(position)) continue

    visited.add(position);
    
    queueC.push(cc)
    queueR.push(rr)
    
    prevPath.set(`${rr},${cc}`, `${r},${c}`)

  }
  
}

const getPath = (prevPath, path, lastR, lastC, startPoint) => {
  let [r, c] = prevPath.get(`${lastR},${lastC}`).split(',')
  path.push(`${r},${c}`)

  if(Number(r) === startPoint.y && Number(c) === startPoint.x)
    return path.reverse();  


  getPath(prevPath, path, r, c, startPoint);   
}

export const animatePath = async (path, dispatch) => {
  
  for(let rcDim of path) {
    await sleep(100)
    let [r, c] = rcDim.split(',')
    dispatch(findAndReplace({x: Number(c), y: Number(r), propName: 'isPath'}))
  }
}

