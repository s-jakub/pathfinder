import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import  algsInfo  from '../../algsInfo.json'


import { Description, Title, Wrapper } from './InfoSection.styles'

function InfoSection() {
    
    const algorithmName = useSelector(state => state.flag.value.algName);

    useEffect(() => {

    }, [algorithmName])

    return (
    algorithmName && <Wrapper>
        <Title>{algsInfo[algorithmName].algName}</Title>
        <Description>{algsInfo[algorithmName].algDesc}</Description>
    </Wrapper>
  )
}

export default InfoSection