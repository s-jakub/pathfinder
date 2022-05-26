import styled from 'styled-components'

export const Item = styled.div`
  border: 1px solid #00b3e9;
  background-color: white;
  width: 100%;
  height: 100%;
  text-align: center;
  user-select: none;
 
  :hover {
    cursor: pointer;
    opacity: .7
  }
`;


export const Element = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.colorBackground};
  animation-name: ${p => p.theme.animationName};
  animation-duration: 1s;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
    opacity: .7
  }
  
  
@keyframes animateWall {
  0% {
    transform: scale(.3);
    border-radius: 100%;
  }
  
  70% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes animateSearch {
  0% {
    background-color: yellow;
    transform: scale(.3);
    border-radius: 100%;
  }
  
  40% {
    background-color: yellow;
  }

  70% {
    transform: scale(1.3);
  }

  100% {
    background-color: #5fdaff;
    transform: scale(1);
  }
}

`