import styled from 'styled-components';

export const StyledTextCell = styled.div<{ $align?: 'left' | 'center' | 'right' }>`
  padding: ${({ theme }) => theme.offsets.elementContent};
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) =>
    $align === 'center' ? 'center' : $align === 'right' ? 'flex-end' : 'flex-start'};
  color: inherit;
  
  a {
    color: inherit;
    text-decoration: underline;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;

export const StyledHeaderCell = styled.th<{ $align?: 'left' | 'center' | 'right' }>`
  padding: ${({ theme }) => theme.offsets.elementContent};
  text-align: ${({ $align }) => $align || 'left'};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.labelText};
  border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};
`;

export const OneLineCell = styled(StyledTextCell)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;
