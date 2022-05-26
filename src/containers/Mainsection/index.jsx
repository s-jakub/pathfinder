import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

import GridContainer from '../../components/GridContainer'
import SquareItem from '../../components/SquareItem'

import useInitialize from '../../hooks/useInitialize'
import useNewPointController from '../../hooks/useNewPointController'


function Mainsection() {

  const gridContainer = useRef()
  const array = useSelector(state => state.mainConfig.value.mainArray)
  
  useInitialize(gridContainer)
  useNewPointController()

  return (
    <GridContainer widthContainer={gridContainer}>
        {array.map((col, indexCol) => {
          return col.map((val, indexRow) => {
              return <SquareItem key={`${indexRow},${indexCol}`} row={indexRow} col={indexCol} val={val}/> 
          })
        })}
    </GridContainer>
  )
}

export default Mainsection