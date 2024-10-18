import styled from 'styled-components';

import { PlainText } from '../../Typography';

type TStyledCellProps = {
  align?: string;
};

export const StyledTextCell = styled.div<TStyledCellProps>`
  padding: ${({ theme: { offsets } }) => offsets.elementContent};

  text-align: ${({ align = 'center' }) => align};
`;

export const StyledHeaderCell = styled(StyledTextCell)`
  align-self: baseline;
`;

export const StyledValueCell = styled(StyledTextCell)`
  text-align: center;
`;

export const OneLineCell = styled(StyledTextCell)`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Percentage = styled.div<{ trend?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${PlainText} {
    margin-left: ${({ theme }) => theme.offsets.batweenElements};

    color: ${({ trend, theme }) => (trend ? theme.colors.disabled : theme.colors.highlighted)};
  }
`;
