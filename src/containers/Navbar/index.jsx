import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearBoard, clear } from '../../store/mainConfigSlice'
import { setAlgName } from '../../store/flagSlice'

import { BtnsWrapper, Container, MenuWrapper, Title, WrapContent } from './Navbar.styles'

import Button from '../../components/Button'
import { dropdownTheme, playTheme, defaultTheme } from '../../components/Button/btnTheme'

import Dropdown from '../../components/Dropdown'
import HamburgerMenu from '../../components/HamburgerMenu'

import { breadthFirstAlgorithm } from '../../utils/searchAlgorithms/breadthFirstAlgorithm'
import { depthFirstAlgorithm } from '../../utils/searchAlgorithms/depthFirstAlgorithm'
import { dijkstraAlgorithm } from '../../utils/searchAlgorithms/dijkstraAlgorithm'
import { toggleFlag } from '../../store/flagSlice'
import { AStarSearch } from '../../utils/searchAlgorithms/AStarSearch'
import { greedyBestFirstSearch } from '../../utils/searchAlgorithms/greedyBestFirstSearch'
import { jumpPointSearch } from '../../utils/searchAlgorithms/jumpPointSearch'
import { bidirectionalDijkstraAlgorithm } from '../../utils/searchAlgorithms/bidirectionalDijkstraAlgorithm'

import { randomizedDepthFirst } from '../../utils/maze/randomizedDepthFirst'
import { recursiveDivision } from '../../utils/maze/recursiveDivision'
import { randomizedPrimsAlgorithm } from '../../utils/maze/randomizedPrimsAlgorithm'

import useMediaQuery from '../../hooks/useMediaQuery'
import Menu from '../../components/Menu'

function Navbar() {
  
  const dispatch = useDispatch()
  const mainConfig = useSelector(state => state.mainConfig.value)
  const weightFlag = useSelector(state => state.flag.value.weightFlag)
  const isActiveBeetwenPointFlag = useSelector(state => state.flag.value.isActiveBetweenPoint)
  const algName = useSelector(state => state.flag.value.algName);

  // const [algName, setAlgName] = useState('');
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false)
  const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false)

  let isDesktop = useMediaQuery(1140);

  const setStartAlgorithm = (algName) => {
    
    switch(algName) {

      case 'BFS': breadthFirstAlgorithm(mainConfig.mainArray, mainConfig.startPoint, dispatch, isActiveBeetwenPointFlag).then(() => setIsAlgorithmRunning(false)); break;
      case 'DFS': depthFirstAlgorithm(mainConfig.mainArray, mainConfig.startPoint, dispatch, isActiveBeetwenPointFlag).then(() => setIsAlgorithmRunning(false)); break;
      case 'Dijkstra': dijkstraAlgorithm(mainConfig.mainArray, mainConfig.startPoint, dispatch, isActiveBeetwenPointFlag).then(() => setIsAlgorithmRunning(false)); break;
      case 'A* Search': AStarSearch(mainConfig.mainArray, mainConfig.startPoint, mainConfig.endPoint, dispatch, isActiveBeetwenPointFlag, mainConfig.betweenPoint).then(() => setIsAlgorithmRunning(false)); break;
      case 'Greedy Best First Search': greedyBestFirstSearch(mainConfig.mainArray, mainConfig.startPoint, mainConfig.endPoint, dispatch, isActiveBeetwenPointFlag, mainConfig.betweenPoint).then(() => setIsAlgorithmRunning(false)); break;
      // case 'JPS': jumpPointSearch(mainConfig.mainArray, mainConfig.startPoint, mainConfig.endPoint, dispatch, isActiveBeetwenPointFlag, mainConfig.betweenPoint).then(() => setIsAlgorithmRunning(false)); break;
      case 'Bidirectional Dijkstra': bidirectionalDijkstraAlgorithm(mainConfig.mainArray, mainConfig.startPoint, mainConfig.endPoint, dispatch, isActiveBeetwenPointFlag, mainConfig.betweenPoint).then(() => setIsAlgorithmRunning(false)); break;
      default: alert('Najpierw musisz wybrać algorytm')
    }
  }

  return <WrapContent> 
    {isDesktop && <Container>

      <Title>PF Visualizer</Title>
      <Dropdown text="Wybierz algorytm">

          <Button text="Breadth First Search" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(setAlgName('BFS'))}/>
          <Button text="Depth First Search" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(setAlgName('DFS'))}/>
          <Button text="Dijkstra Search" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(setAlgName('Dijkstra'))}/>
          <Button text="A* Search" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(setAlgName('A* Search'))}/>
          <Button text="Greedy Best First Search" isDisabled={isAlgorithmRunning} theme={dropdownTheme} callback={() => dispatch(setAlgName('Greedy Best First Search'))}/>
          <Button text="Jump Point Search" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(setAlgName('JPS'))}/>
          <Button text="Bidirectional Dijkstra" isDisabled={isAlgorithmRunning} theme={dropdownTheme} callback={() => dispatch(setAlgName('Bidirectional Dijkstra'))}/>

      </Dropdown>

      <Dropdown text="Generuj labirynt">

          <Button text="Recursive Division MAZE" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => {
            
            setIsAlgorithmRunning(true)
            recursiveDivision(mainConfig.mainArray, dispatch).then(() => setIsAlgorithmRunning(false) )
            
            }}/>

          <Button text="Randomized Depth First MAZE" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => {
              
            setIsAlgorithmRunning(true)
            randomizedDepthFirst(mainConfig.mainArray, mainConfig.startPoint, mainConfig.endPoint, dispatch).then(() => setIsAlgorithmRunning(false))
              
            }}/>

          <Button text="Randomized Prims MAZE" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => {
            
            setIsAlgorithmRunning(true)
            randomizedPrimsAlgorithm(mainConfig.mainArray, dispatch).then(() => setIsAlgorithmRunning(false))
            
            }}/>
          
      </Dropdown>
      <div className='playBtn'>

        <Button theme={playTheme} text={`${algName ? `Uruchom ${algName}` : 'Wybierz algorytm'}`} isDisabled={isAlgorithmRunning} callback={() => {
            setStartAlgorithm(algName)

            if(!isAlgorithmRunning && algName) {
              dispatch(clear({firstVal: 'isPath', secondVal: 'isSearch'}))
              setIsAlgorithmRunning(true);
            } 

          }}/>
      </div>

      
      <Button text={`${!isActiveBeetwenPointFlag ? 'Dodaj kolejny cel' : 'Usuń punkt'}`} theme={defaultTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(toggleFlag('isActiveBetweenPoint'))}/>
      <Button text={`${!weightFlag ? 'Dodaj wagi' : 'Zatrzymaj dodawanie wag' }`} theme={defaultTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(toggleFlag('weightFlag'))}/>

      <Dropdown text="Wyczyść">

        <Button text={"Plansze"} theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(clearBoard())}/>
        <Button text={"Ścieżkę"} theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(clear({firstVal: 'isPath', secondVal: 'isSearch'}))}/>
        <Button text={"Ściany i Wagi"} theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(clear({firstVal: 'isWall', secondVal: 'isWeightWall'}))}/>
          
      </Dropdown>
    </Container> }

    {!isDesktop && <Container>
        <Title>PF Visualizer</Title>
        <HamburgerMenu callback={() => setIsHamburgerClicked(!isHamburgerClicked)} isActive={isHamburgerClicked}/>
        
        {isHamburgerClicked && <Menu>

          <MenuWrapper>

            <BtnsWrapper>
              <Dropdown text="Wybierz algorytm">

                <Button text={"BFS"} theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(setAlgName('BFS'))}/>
                <Button text="DFS" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(setAlgName('DFS'))}/>
                <Button text="Dijkstra" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(setAlgName('Dijkstra'))}/>
                <Button text="A* Search" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(setAlgName('A* Search'))}/>
                <Button text="Greedy Best First Search" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(setAlgName('Greedy Best First Search'))}/>
                {/* <Button text="JPS" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => setAlgName('JPS')}/> */}
                <Button text="Bidirectional Dijkstra" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(setAlgName('Bidirectional Dijkstra'))}/>

              </Dropdown>

              <Dropdown text="Generuj labirynt">

                <Button text="Recursive Division MAZE" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => {
              
                  setIsAlgorithmRunning(true)
                  recursiveDivision(mainConfig.mainArray, dispatch).then(() => setIsAlgorithmRunning(false) )
                  
                }}/>

                <Button text="Randomized Depth First MAZE" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => {
                
                  setIsAlgorithmRunning(true)
                  randomizedDepthFirst(mainConfig.mainArray, mainConfig.startPoint, mainConfig.endPoint, dispatch).then(() => setIsAlgorithmRunning(false))
                
                }}/>

                <Button text="Randomized Prims MAZE" theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => {
              
                  setIsAlgorithmRunning(true)
                  randomizedPrimsAlgorithm(mainConfig.mainArray, dispatch).then(() => setIsAlgorithmRunning(false))
              
                }}/>
                  
              </Dropdown>
          
              <Dropdown text="Wyczyść">

                <Button text={"Plansze"} theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(clearBoard())}/>
                <Button text={"Ścieżkę"} theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(clear({firstVal: 'isPath', secondVal: 'isSearch'}))}/>
                <Button text={"Ściany i Wagi"} theme={dropdownTheme} isDisabled={isAlgorithmRunning} callback={() => dispatch(clear({firstVal: 'isWall', secondVal: 'isWeightWall'}))}/>
                  
              </Dropdown>
            </BtnsWrapper>

            <BtnsWrapper>
              <Button text={`${!isActiveBeetwenPointFlag ? 'Dodaj kolejny cel' : 'Usuń punkt'}`} isDisabled={isAlgorithmRunning} theme={defaultTheme} callback={() => dispatch(toggleFlag('isActiveBetweenPoint'))}/>
              <Button text={`${!weightFlag ? 'Dodaj wagi' : 'Zatrzymaj dodawanie wag' }`} isDisabled={isAlgorithmRunning} theme={defaultTheme} callback={() => dispatch(toggleFlag('weightFlag'))}/>
            </BtnsWrapper>

            <div className='playBtn'>
              <Button theme={playTheme} text={`Uruchom ${algName ? algName : 'Algorytm'}`} isDisabled={isAlgorithmRunning} callback={() =>{ 
                setIsHamburgerClicked(false);
                setStartAlgorithm(algName)
                
                if(!isAlgorithmRunning && algName) {
                  dispatch(clear({firstVal: 'isPath', secondVal: 'isSearch'}))
                  setIsAlgorithmRunning(true);
                } 
              }}/>
            </div>

          </MenuWrapper>
        </Menu> }
      
      </Container>}

  </WrapContent>
}

export default Navbar