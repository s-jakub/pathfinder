import styled from 'styled-components'

export const DropdownWrapper = styled.div`  
    position: relative;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, .5);
    padding: .5rem 1rem;
    user-select: none;
    border-radius: .25rem;
    border: .2rem solid white;

    :hover {
        cursor: pointer;
    }
        
`;

export const DropdownMenu = styled.div`
    position: absolute;
    left: 0;
    top: calc(100% + .25rem);
    background-color: white;
    padding: .75rem;
    border-radius: .25rem;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .5);
    display: ${p => p.isDisplay ? 'block' : 'none'};
    z-index: 2;

    & > div {
        border-bottom: 1px solid gray;
    }
`;

export const BtnText = styled.div`
    padding: 0 .5rem;
`;