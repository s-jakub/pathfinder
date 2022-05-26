import React, { useEffect, useRef, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { disabledDefaultTheme, disabledDropdownTheme, disabledPlayTheme } from './btnTheme'
import { Wrapper } from './Button.styles'

function Button({text, callback, theme, isDisabled}) {
  
  const btnRef = useRef()
  const [disabledTheme, setDisabledTheme] = useState(disabledDefaultTheme) 

  useEffect(() => {
    btnRef
      .current
      .parentNode
      .classList
      .forEach(val => val === 'dropdown' ? setDisabledTheme(disabledDropdownTheme) : val === 'playBtn' ? setDisabledTheme(disabledPlayTheme) : setDisabledTheme(disabledDefaultTheme) )
  })


  return (
    <ThemeProvider theme={isDisabled ? disabledTheme : theme}>
      <Wrapper ref={btnRef} onClick={isDisabled ? null : callback}>
          {text}
      </Wrapper>
    </ThemeProvider>
  )
}

export default Button