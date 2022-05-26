import styled from 'styled-components'

export const WrapContent = styled.div`
    height: 74px;
`

export const Container = styled.nav`
    position: fixed;
    width: 100%;
    z-index: 1;
    background-color: #3d3d3d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .8rem 2rem;
`;

export const Title = styled.h1`
    text-align: center;
`;

export const MenuWrapper = styled.div`
    height: 90%;
    padding: 2rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`

export const BtnsWrapper = styled.div`
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;