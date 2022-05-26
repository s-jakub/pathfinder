import styled from "styled-components";
import { config } from '../../config'

export const Wrapper = styled.section`
  width: ${config.width - 20}px;
  height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, ${config.squareSize}px);
  grid-template-rows: repeat(auto-fill, ${config.squareSize}px);
  align-content: center;
  justify-content: center;
`;