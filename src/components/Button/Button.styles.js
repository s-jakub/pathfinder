import styled from 'styled-components'

export const Wrapper = styled.div`
    color: ${p => p.theme.textColor};
    background-color: ${p => p.theme.bgColor};
    padding: ${p => p.theme.paddingTheme ? p.theme.paddingTheme : '.5rem 1rem'};
    border-radius: ${p => p.theme.borderRadius ? p.theme.borderRadius : ''};
    transition: all 1s;
    border: ${p => p.theme.borderTheme ? p.theme.borderTheme : ''};
    text-align: center;
    box-shadow: ${p => p.theme.boxShadow ? p.theme.boxShadow : ''};
    user-select: none;
    opacity: ${p => p.theme.opacityTheme ? p.theme.opacityTheme : 1};

    :hover {
        cursor: ${p => p.theme.hoverCursor ? p.theme.hoverCursor : 'pointer'};
        opacity: ${p => p.theme.hoverOpacityTheme ? p.theme.hoverOpacityTheme : .75};
        background-color: ${p => p.theme.hoverBgColor};
        color: ${p => p.theme.hoverTextColor};
    }
`;