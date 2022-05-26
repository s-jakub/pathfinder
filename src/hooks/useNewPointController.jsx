import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setArrayValue, setPoint, clear } from '../store/mainConfigSlice'

function useNewPointController() {
    
    const dispatch = useDispatch()
    const isActiveBetweenPoint = useSelector(state => state.flag.value.isActiveBetweenPoint)
    const array = useSelector(state => state.mainConfig.value.mainArray)

    useEffect(() => {
        
        if(isActiveBetweenPoint)
            setNewPoint()

        if(!isActiveBetweenPoint)
            dispatch(clear({val: 'isBetweenPoint'}))


        
    }, [isActiveBetweenPoint])


    const setNewPoint = () => {
        let point = setRandomPoint(array)

        dispatch(setPoint({...point, propName: 'betweenPoint'}))

        let cpyArr = array.map(arr => arr.slice())
        cpyArr[point.y][point.x] = {...cpyArr[point.y][point.x], isBetweenPoint: true, isRoad: false}

        dispatch(setArrayValue(cpyArr))
    }

    const setRandomPoint = (array) => {
        const randomY = Math.floor(Math.random() * (array.length - 1))
        const randomX = Math.floor(Math.random() * (array[0].length - 1))
    
        if(array[randomY][randomX].isRoad)
          return {x: randomX, y: randomY}
    
        setRandomPoint(array);
      }

}

export default useNewPointController