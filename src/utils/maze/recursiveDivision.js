import { findAndReplace, removeWall } from "../../store/mainConfigSlice";
import { sleep } from "../sleep";

export const recursiveDivision = async (array, dispatch) => {

    let mazeWidth = array[0].length;
    let mazeHeight = array.length;
    
    let startWidth = 0;
    let startHeight = 0

    await divideMaze(array, startWidth, startHeight, mazeWidth, mazeHeight, getOrientation(mazeWidth, mazeHeight), dispatch)
}

const divideMaze = async (array, x, y, width, height, orientation, dispatch) => {
    
    let cpyArr = array.map(val => val.slice());

    if((width < 2 || height < 2) ) 
        return
    
    const setRandomWall = getRandomWall(orientation, x, y, width, height)

    const setRandomDoor = getRandomDoor(cpyArr, orientation, x, width, setRandomWall, y, height)
    
    let i = 0, j = 0;
    while(orientation === 'X' ? i < width : j < height ) {
            
        dispatch(findAndReplace({x: setRandomWall.x + i, y: setRandomWall.y + j, propName: "isWall"}))
        orientation === 'X' ? i++ : j++
    }
        
    dispatch(removeWall({x: setRandomDoor.x, y: setRandomDoor.y}))
    await sleep(1)
        
    // debugger
    if(orientation === 'X') {
        await divideMaze(cpyArr, x, y, width, setRandomWall.y - y, getOrientation(width, setRandomWall.y - y), dispatch)
        await divideMaze(cpyArr, x, setRandomWall.y + 1, width, y + height - setRandomWall.y - 1, getOrientation(width, y + height - setRandomWall.y - 1), dispatch)
    } else {
        await divideMaze(cpyArr, x, y, setRandomWall.x - x, height, getOrientation(setRandomWall.x - x, height), dispatch)
        await divideMaze(cpyArr, setRandomWall.x + 1, y, x + width - setRandomWall.x - 1, height, getOrientation(x + width - setRandomWall.x - 1, height), dispatch)
    }
}

const getOrientation = (width, height) => {
    if(width > height)
        return 'Y'
    else if(height > width)
        return 'X'
    else
        return Math.random() > 0.5 ? 'Y' : 'X'
}

        
const setRandomPoint = (min, max) => {

     return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomWall = (orientation, x, y, width, height) => {

    
    let setRandomWall = orientation === 'X' ? 
    {x, y: Math.floor(setRandomPoint(y, y + height - 1) / 2) * 2 } :
    {x: Math.floor(setRandomPoint(x, x + width - 1) / 2 ) * 2 , y } 
    // debugger
    
    return setRandomWall
 
}

const getRandomDoor = (array, orientation, x, width, setRandomWall, y, height) => {


    let setRandomDoor = orientation === 'X' ? 
        {x: Math.floor(setRandomPoint(x, x + width - 1) / 2) * 2 + 1 , y: setRandomWall.y} : 
        {x: setRandomWall.x, y: Math.floor(setRandomPoint(y, y + height - 1) / 2 ) * 2 + 1 }

    if(setRandomDoor.x > array[0].length - 1 ) {
        setRandomDoor =  {x: Math.floor(setRandomPoint(x, x + width - 1) / 2) * 2 - 1 , y: setRandomWall.y} 
    }

    if(setRandomDoor.y > array.length - 1 ) {
        setRandomDoor = {x: setRandomWall.x, y: Math.floor(setRandomPoint(y, y + height - 1) / 2 ) * 2 - 1 }
    }
  
    // debugger
    return setRandomDoor
      

}