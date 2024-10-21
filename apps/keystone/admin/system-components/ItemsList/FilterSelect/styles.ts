
import styled from "styled-components";

// Styled components for filter styling
export const FilterButton = styled.button`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const FilterWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  min-width: 320px; // same as in keystone
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.section};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1;
`;

export const FilterTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

export const BackButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.sectionContent};
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 16px;
  margin-bottom: 16px;
`;
