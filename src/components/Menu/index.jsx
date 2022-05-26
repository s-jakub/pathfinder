import React from 'react'

import { Container, Title } from './Menu.styles'

function Menu({children}) {

  return <Container>
        <Title>USTAWIENIA</Title>
        {children}
    </Container>

}

export default Menu