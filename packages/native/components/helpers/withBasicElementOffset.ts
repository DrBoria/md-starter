import { css, DefaultTheme } from 'styled-components/native';

export type TWithBasicElementOffsets = {
  /** added offset right by multiplying theme baseOffset variable */
  $offsetRight?: boolean | number;
  /** added offset bottom by multiplying theme baseOffset variable */
  $offsetBottom?: boolean | number;
};

export const withOffsetsRight = css`
  ${({ $offsetRight, theme }: TWithBasicElementOffsets & { theme: DefaultTheme }) =>
    $offsetRight && theme.offsets.betweenElements}
`;

export const withOffsetBottom = css`
  ${
    ({ $offsetBottom, theme }: TWithBasicElementOffsets & { theme: DefaultTheme }) => $offsetBottom && theme.offsets.betweenElements
  }`
