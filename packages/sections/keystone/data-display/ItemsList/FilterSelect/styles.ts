import styled from "styled-components";

export const FilterButton = styled.button`
  padding: ${({ theme }) => theme.offsets.elementContent};
  background-color: ${({ theme }) => theme.colors.highlighted};
  color: ${({ theme }) => theme.colors.highlightedText};
  border: none;
  border-radius: ${({ theme }) => `${theme.variables.border.radius}px`};
  cursor: pointer;
`;

export const FilterWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: ${({ theme }) => theme.screens.mobile.width}px;
  padding: ${({ theme }) => `calc(2 * ${theme.offsets.elementContent})`};
  background-color: ${({ theme }) => theme.colors.section};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border-radius: ${({ theme }) => `calc(2 * ${theme.variables.border.radius}px)`};
  z-index: ${({ theme }) => theme.zIndex.overlay};
`;

export const FilterTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.sizes.regular};
  font-weight: 600;
  font-family: ${({ theme }) => theme.font?.family?.title};
`;

export const BackButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.highlighted};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.sizes.regular};
  margin-bottom: ${({ theme }) => theme.offsets.betweenElements};
`;
