import styled from "styled-components";

export const Badge = styled.span`
  background-color: #10b981;
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-weight: 500;
  margin-left: 0.5rem;
`;

export const VerticalTabsContainer = styled.div<{ $expanded?: boolean }>`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: ${(props) => (props.$expanded ? "calc(100vh - 200px)" : "100%")};
  min-height: 0;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  overflow: hidden;
  transition: height 0.2s ease-in-out;
  position: relative;
`;

export const VerticalTabsList = styled.div`
  border-right: 1px solid #e5e7eb;
  background: #eff6ff;
  overflow-y: auto;
  height: 100%;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export const VerticalTabContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Important for nested flex containers */
`;

export const VerticalTab = styled.div<{ $isSelected: boolean }>`
  cursor: pointer;
  position: relative;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  border-left: 3px solid transparent;
  transition:
    border-left 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  .subject {
    color: #111827;
    font-weight: 500;
  }

  .metadata {
    color: #6b7280;
  }

  .preheader {
    color: #6b7280;
  }

  &:hover {
    background-color: #dbeafe;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    `
    background-color: white;
    border-left: 3px solid #2563eb;
    &:hover {
      background-color: white;
    }
  `}
`;
