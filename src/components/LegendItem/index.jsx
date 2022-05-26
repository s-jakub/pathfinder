import React from 'react'
import { ItemWrapper, SquareItem, ItemDescription } from './LegendItem.styles'


function LegendItem({text, squarecolor, children}) {
  return (
    <ItemWrapper>
        <SquareItem bgColor={squarecolor}> {children} </SquareItem>
        <ItemDescription> {text} </ItemDescription>
    </ItemWrapper>
  )
}

export default LegendItem