import { useDispatch, useSelector } from 'react-redux'
import { movePoint, findAndReplace } from '../store/mainConfigSlice'
import { setToFalseFlag, setToTrueFlag } from '../store/flagSlice'

function useHandleCursorListeners(val, obj) {
    
    const dispatch = useDispatch()
    const flag = useSelector(state => state.flag.value)

    const handleMouseOver = () => {

        if(flag.startPointFlag) 
          dispatch(movePoint({...obj, propName: 'isStartPoint'}))
    
        if(flag.endPointFlag)
          dispatch(movePoint({...obj, propName: 'isEndPoint'}))
    
        if(flag.betweenPoint) {
          dispatch(movePoint({...obj, propName: 'isBetweenPoint'}))
        }
    
        if(flag.wallFlag) 
          dispatch(findAndReplace({...obj, propName: 'isWall'}))
    
      }
    
      const handleMouseDown = () => {
    
        if(val.isStartPoint) 
         dispatch(setToTrueFlag('startPointFlag'))
        
        if(val.isEndPoint)
          dispatch(setToTrueFlag('endPointFlag'))
    
        if(val.isBetweenPoint) 
          dispatch(setToTrueFlag('betweenPoint'))
        
        if(flag.weightFlag) {
          dispatch(findAndReplace({...obj, propName: 'isWeightWall'}))
        } else {
          dispatch(setToTrueFlag('wallFlag'))
          dispatch(findAndReplace({...obj, propName: 'isWall'}))
        }
        
        if(val.isWall) 
         dispatch(findAndReplace({...obj, propName: 'isRoad'}))
      }
    
      const handleMouseUp = () => {
    
        if(flag.startPointFlag) 
          dispatch(setToFalseFlag('startPointFlag')) 
      
        if(flag.endPointFlag)
          dispatch(setToFalseFlag('endPointFlag'))
    
        if(flag.betweenPoint)
          dispatch(setToFalseFlag('betweenPoint'))
        
        if(flag.wallFlag)
          dispatch(setToFalseFlag('wallFlag'))
      }

      return [handleMouseDown, handleMouseUp, handleMouseOver]

}

export default useHandleCursorListeners