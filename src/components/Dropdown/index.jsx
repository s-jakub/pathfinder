import React, {useState, useEffect} from 'react'

import {DropdownWrapper, Wrapper, BtnText, DropdownMenu} from './Dropdown.styles'
import { IoMdArrowDropup } from 'react-icons/io'

function Dropdown({ children, text }) {

    const [flag, setFlag] = useState(false)

    useEffect(() => {
        setFlag(false)
    }, [])

    document.addEventListener('click', (e) => {

        if(!flag ) return
        
        try {
            if(!e.target.parentNode.classList.contains('dropdown')) setFlag(false)
        } catch {
            setFlag(false)
        }

    })

  return (
    <DropdownWrapper className='dropdown'>

    <Wrapper className='dropdown' onClick={() => setFlag(!flag)}>

      <BtnText onClick={() => setFlag(!flag)}>{text}</BtnText>
      <IoMdArrowDropup style={{transform: `rotate(${flag ? '0deg' : '180deg'})` }}/>

    </Wrapper>

    <DropdownMenu isDisplay={flag} className='dropdown' onClick={() => setFlag(!flag)}>

        {children}  

    </DropdownMenu>

  </DropdownWrapper>
  )
}

export default Dropdown