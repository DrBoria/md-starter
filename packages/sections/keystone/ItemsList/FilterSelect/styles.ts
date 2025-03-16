import styled from "styled-components";

export const FilterButton = styled.button`
  padding: ${({ theme }) => theme.offsets.elementContent};
  background-color: ${({ theme }) => theme.colors.highlighted};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};
  cursor: pointer;
`;

export const FilterWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  min-width: ${({ theme }) => theme.screens.mobile.width}px;
  padding: ${({ theme }) => `calc(2 * ${theme.offsets.elementContent})`};
  background-color: ${({ theme }) => theme.colors.section};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => `calc(2 * ${theme.border.radius})`};
  z-index: ${({ theme }) => theme.zIndex.overlay};
`;

export const FilterTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size};
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.family.title};
`;

export const BackButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.highlighted};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size};
  margin-bottom: ${({ theme }) => theme.offsets.betweenElements};
`;
