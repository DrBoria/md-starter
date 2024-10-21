import { css } from 'styled-components';

export type TWithSpaceBetween = {
  /** expand component into 100% width */
  spaceBetween?: boolean;
};

export const withSpaceBetween = css<TWithSpaceBetween>`
  ${({ spaceBetween }) => (spaceBetween ? 'display: flex;' : '')}
  ${({ spaceBetween }) => (spaceBetween ? 'justify-content: space-between;' : '')}
`;
