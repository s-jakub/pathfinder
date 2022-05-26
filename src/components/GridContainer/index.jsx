import React from 'react'

import { Wrapper } from './GridContainer.styles'

function GridContainer({ children, widthContainer }) {
  
  return (
    <Wrapper ref={widthContainer}>{children}</Wrapper>
  )
}

export default GridContainer