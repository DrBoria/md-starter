import { css, TDefaultTheme } from 'styled-components';

export type TWithBasicElementOffsets = {
  /** added offset right by multiplying theme baseOffset variable */
  offsetRight?: boolean | number;
  /** added offset bottom by multiplying theme baseOffset variable */
  offsetBottom?: boolean | number;
};

export const withOffsetsRight = css`
  ${({ offsetRight, theme }: TWithBasicElementOffsets & { theme: TDefaultTheme }) =>
    offsetRight && theme.offsets.batweenElements}
`;

export const withOffsetBottom = css`
  ${({ offsetBottom, theme }: TWithBasicElementOffsets & { theme: TDefaultTheme }) =>
    offsetBottom && theme.offsets.batweenElements}
`;
