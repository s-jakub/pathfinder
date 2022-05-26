import React from 'react'
import { Title, Container, ContentWrapper } from './LegendSection.styles'
import { FiTarget} from 'react-icons/fi'
import { FaWeightHanging, FaFlagCheckered } from 'react-icons/fa'
import { IoMdArrowRoundUp } from 'react-icons/io'
import LegendItem from '../../components/LegendItem'


function LegendSection() {
  return (
    <Container>
        <Title>Legenda</Title>
        <ContentWrapper>

            <LegendItem text="Nieodwiedzony węzeł" squarecolor='white'/>

            <LegendItem text="Ściana" squarecolor='black'/>
            
            <LegendItem text="Punkt startowy" squarecolor='white'> 
                <IoMdArrowRoundUp style={{color: 'black', width: '80%', height: '80%'}}/>
            </LegendItem>

            <LegendItem text="Punkt końcowy" squarecolor='white'> 
                <FaFlagCheckered style={{color: 'black', width: '80%', height: '80%' }}/>
            </LegendItem>

            <LegendItem text="Punkt przejściowy" squarecolor='white'> 
                <FiTarget style={{color: 'black', width: '80%', height: '80%' }}/>
            </LegendItem>

            <LegendItem text="Waga" squarecolor='white'> 
                <FaWeightHanging style={{color: 'black', width: '80%', height: '80%'}}/>
            </LegendItem>

            <LegendItem text="Ścieżka" squarecolor='yellow'></LegendItem>

            <LegendItem text="Przeszukany węzeł" squarecolor='#5fdaff'></LegendItem>

        </ContentWrapper>

    </Container>
  )
}

export default LegendSection