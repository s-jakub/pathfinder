import styled from 'styled-components'

export const ItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, .4);
    padding: .5rem 1rem;
    margin: .4rem .4rem;

`

export const SquareItem = styled.div`
    width: 25px;
    height: 25px;
    background-color: ${p => p.bgColor};
    border: 2px solid #00b3e9;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ItemDescription = styled.div`
    padding: 0 .4rem;
    
`