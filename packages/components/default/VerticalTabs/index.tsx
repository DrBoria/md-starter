import styled from "styled-components";

// Styled component for Badge
export const Badge = styled.span`
  background-color: ${({ theme }) => theme.colors.successBackground}; // Success background from theme
  color: ${({ theme }) => theme.colors.successText}; // Success text color from theme
  font-size: ${({ theme }) => theme.font.size}; // Responsive font size from theme
  padding: ${({ theme }) => `${theme.variables.offsets.elementContent.mobile / 2}px ${theme.variables.offsets.elementContent.mobile}px`}; // Half mobile offset for top/bottom, full for left/right
  border-radius: ${({ theme }) => theme.variables.border.radius}px; // Border radius from theme
  font-weight: 500;
  margin-left: ${({ theme }) => theme.variables.offsets.betweenElements.mobile}px; // Spacing between elements from theme
`;

// Styled container for VerticalTabs
export const VerticalTabsContainer = styled.div<{ $expanded?: boolean }>`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: ${(props) => (props.$expanded ? "calc(100vh - 200px)" : "100%")};
  min-height: 0;
  border: ${({ theme }) => `${theme.variables.border.size}px solid ${theme.colors.section}`}; // Border size and section color from theme
  border-radius: ${({ theme }) => theme.variables.border.radius}px; // Border radius from theme
  background: ${({ theme }) => theme.colors.section}; // Section background from theme
  overflow: hidden;
  transition: height 0.2s ease-in-out;
  position: relative;
`;

// Styled list for VerticalTabs
export const VerticalTabsList = styled.div`
  border-right: ${({ theme }) => `${theme.variables.border.size}px solid ${theme.colors.section}`}; // Border size and section color from theme
  background: ${({ theme }) => theme.colors.overlay}; // Overlay background from theme
  overflow-y: auto;
  height: 100%;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.section}; // Section color for scrollbar track
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.labelBackground}; // Label color for scrollbar thumb
    border-radius: ${({ theme }) => theme.variables.border.radius}px; // Border radius from theme
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.highlighted}; // Highlighted color on hover
  }
`;

// Styled content for VerticalTab
export const VerticalTabContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Important for nested flex containers */
`;

// Styled component for VerticalTab
export const VerticalTab = styled.div<{ $isSelected: boolean }>`
  cursor: pointer;
  position: relative;
  padding: ${({ theme }) => theme.variables.offsets.elementContent.mobile}px; // Mobile content offset from theme
  border-bottom: ${({ theme }) => `${theme.variables.border.size}px solid ${theme.colors.section}`}; // Border size and section color from theme
  border-left: ${({ theme }) => `${theme.variables.border.size * 3}px solid transparent`}; // Triple border size with transparent color
  transition:
    border-left 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  .subject {
    color: ${({ theme }) => theme.colors.highlightedText}; // Highlighted text color from theme
    font-weight: 500;
  }

  .metadata {
    color: ${({ theme }) => theme.colors.labelBackground}; // Label color from theme
  }

  .preheader {
    color: ${({ theme }) => theme.colors.labelBackground}; // Label color from theme
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.overlayActive}; // Overlay active color on hover
  }

  ${({ $isSelected }) =>
    $isSelected &&
    `
    background-color: ${({ theme }) => theme.colors.section}; // Section background when selected
    border-left: ${({ theme }) => `${theme.variables.border.size * 3}px solid ${theme.colors.highlighted}`}; // Triple border size with highlighted color
    &:hover {
      background-color: ${({ theme }) => theme.colors.section}; // Section background on hover when selected
    }
  `}
`;
