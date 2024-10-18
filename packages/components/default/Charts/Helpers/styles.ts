import styled from 'styled-components';

export const YAxisContainer = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: ${({ theme }) => theme.elements.icons.width};
  height: 100%;
  padding: ${({ theme }) => theme.offsets.batweenElements};
`;

export const Container = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.offsets.batweenElements};

  background-color: ${({ theme }) => theme.colors.overlay};
`;
