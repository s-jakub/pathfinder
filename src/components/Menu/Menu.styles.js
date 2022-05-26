import styled from 'styled-components'


export const Container = styled.div`
    position: fixed;
    width: 320px;
    height: 100%;
    background-color: #393939;
    z-index: 1;
    top: 0;
    right: 0;
    animation: appearMenu .5s linear;
    padding-top: 70px;
    border-left: 2px solid white;

    @keyframes appearMenu {
        0% {
            top: -100%;
        }

        100% {
            top: 0;
        }
    }
`;

export const Title = styled.h1`
    text-align: center;
    font-weight: bold;
    letter-spacing: .2rem;
    border-bottom: 1px solid white;
    padding: .5rem 2rem;
`