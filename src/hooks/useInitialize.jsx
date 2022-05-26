import { useEffect } from 'react'
import { config, initConfigSquare } from '../config'
import { useDispatch } from 'react-redux'
import { setArrayValue, setPoint} from '../store/mainConfigSlice'

function useInitialize(container) {
    
  const dispatch = useDispatch()
  
  const make2DArray = () => {
    
    const containerHeight = container.current.offsetHeight;
    const containerWidth =  container.current.offsetWidth;
    
    const rows = Math.floor(containerHeight / config.squareSize)
    const cols = Math.floor(containerWidth / config.squareSize)
    
    const tempArray = new Array(rows).fill().map(val => new Array(cols).fill(initConfigSquare))

    const startPoint = setRandomPoint(tempArray)
    const endPoint = setRandomPoint(tempArray)

    tempArray[startPoint.y][startPoint.x] = {
      ...tempArray[startPoint.y][startPoint.x],
      isStartPoint: true,
      isRoad: false
    }
  

    tempArray[endPoint.y][endPoint.x] = {
      ...tempArray[endPoint.y][endPoint.x],
      isEndPoint: true,
      isRoad: false
    }

    dispatch(setPoint({...startPoint, propName: 'startPoint'}))      
    dispatch(setPoint({...endPoint, propName: 'endPoint'}))      
    dispatch(setArrayValue(tempArray));
      
       
  }
  
  const setRandomPoint = (array) => {
    const randomY = Math.floor(Math.random() * (array.length - 1))
    const randomX = Math.floor(Math.random() * (array[0].length - 1))

    if(array[randomY][randomX].isRoad)
      return {x: randomX, y: randomY}

    setRandomPoint(array);
  }

  
  useEffect(() => {
    make2DArray()
  }, [])

  
}

export default useInitialize