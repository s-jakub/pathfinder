import styled from 'styled-components'

export const HamburgerMenuContainer = styled.div`
    width: 49px;
    height: 39px;
    position: relative;
    display: grid;
    align-content: space-around;
    justify-items: center;
    z-index: 3;

`

export const HamburgerLine = styled.div`
    width: 80%;
    height: 4px;
    background-color: white;
    border-radius: .7rem;
`;

export const CrossLineLeft = styled.div`
    position: absolute;
    width: 80%;
    height: 4px;
    top: 50%;
    left: 50%;
    background-color: white;
    transform-origin: center;
    transform: translate(-50%, -50%) rotate(45deg);
    animation: makeCross .5s linear;

    @keyframes makeCross {
        from {
            transform: translate(-50%, -50%) rotate(0deg);
        }

        to {
            transform: translate(-50%, -50%) rotate(45deg));
        }
    }
`

export const CrossLineRight = styled.div`
    position: absolute;
    width: 80%;
    height: 4px;
    top: 50%;
    left: 50%;
    background-color: white;
    transform-origin: center;
    transform: translate(-50%, -50%) rotate(-45deg);
    animation: makeCross2 .5s linear;

    @keyframes makeCross2 {
        from {
            transform: translate(-50%, -50%) rotate(0deg);
        }

        to {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
    }
`