import type { ZIndexName } from '@md/styles';
import { getZIndex } from '@md/styles';
import styled from 'styled-components';

const Header = styled.div<{ $zIndex?: ZIndexName}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 2px -2px gray;
  z-index: ${({ $zIndex = 'content' }) => getZIndex($zIndex)};
`;

export { Header };
