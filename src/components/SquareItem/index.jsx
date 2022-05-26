import React, { useMemo, useState } from 'react'

import { useSelector } from 'react-redux'


import { ThemeProvider } from 'styled-components'
import { Item, Element } from './SquareItem.styles'
import { FiTarget} from 'react-icons/fi'
import { FaWeightHanging, FaFlagCheckered } from 'react-icons/fa'
import { IoMdArrowRoundUp } from 'react-icons/io'

import { getStartDirection } from '../../utils/getStartDirection'
import { themeRoad, themeWall, themeEndPoint, themeStartPoint, themeWeightWall, themePath, themeSearch } from './squareTheme'
import useHandleCursorListeners from '../../hooks/useHandleCursorListeners'

function SquareItem({row, col, val}) {

  const mainConfig = useSelector(state => state.mainConfig.value)

  const obj = {
    x: row,
    y: col,
  }

  const [handleMouseDown, handleMouseUp, handleMouseOver] = useHandleCursorListeners(val, obj)
  const [theme, setTheme] = useState(themeRoad)

  useMemo(() => {

    if(val.isRoad)
      setTheme({...themeRoad})

    if(val.isWall)
      setTheme({...themeWall})

    if(val.isEndPoint)
      setTheme({...themeEndPoint})

    if(val.isStartPoint) 
      setTheme({...themeStartPoint})

    if(val.isWeightWall) 
      setTheme({...themeWeightWall})

    if(val.isPath) 
      setTheme({...themePath})

    if(val.isSearch)
      setTheme({...themeSearch})

  }, [val])

  

  return (
    <ThemeProvider theme={theme}>
      <Item className={`${col} ${row}`}
        onMouseOver={() => handleMouseOver()}
        onMouseDown={() => handleMouseDown()}
        onMouseUp={() => handleMouseUp()}
      >  
        <Element>

          {val.isEndPoint && <FaFlagCheckered style={{color: 'black', width: '80%', height: '80%' }}/> }
          {val.isBetweenPoint && <FiTarget style={{color: 'black', width: '80%', height: '80%' }}/> }
          {val.isStartPoint && <IoMdArrowRoundUp style={{color: 'black', width: '80%', height: '80%', transform: `rotate(${getStartDirection(mainConfig.startPoint, mainConfig.endPoint)}deg)`}}/> }
          {val.isWeightWall && <FaWeightHanging style={{color: 'black', width: '80%', height: '80%'}}/> }

        </Element>

      </Item>
    </ThemeProvider>
  )
}

export default SquareItem