import styled from 'styled-components';

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: ${({ theme }) => theme.offsets.betweenElements};
`;

export const ColoredDot = styled.div<{ $color: string }>`
  width: ${({ theme }) => theme.elements.icons.width};
  height: ${({ theme }) => theme.elements.icons.height};
  margin-right: ${({ theme }) => theme.offsets.betweenElements};

  background: ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.border.circle};
`;
