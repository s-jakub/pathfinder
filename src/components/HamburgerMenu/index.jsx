import React from 'react'
import { HamburgerMenuContainer, HamburgerLine, CrossLineRight, CrossLineLeft } from './HamburgerMenu.styles'

function HamburgerMenu({callback, isActive}) {
  return (
    <HamburgerMenuContainer onClick={callback}>
      {!isActive && <>
          <HamburgerLine></HamburgerLine>
          <HamburgerLine></HamburgerLine>
          <HamburgerLine></HamburgerLine> 
        </>}

        {isActive && <>
          <CrossLineLeft></CrossLineLeft>
          <CrossLineRight></CrossLineRight>
        </>}
    </HamburgerMenuContainer>

  )
}

export default HamburgerMenu