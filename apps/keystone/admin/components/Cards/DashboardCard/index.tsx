import React from "react";
import Link from "next/link";
import styled from "styled-components";

const DashboardCardContainer = styled.div`
  border-color: #e1e5e9;
  border-radius: 8px;
  border-width: 1px;
  min-width: 280px;
  padding: 16px;
  text-decoration: none;
  width: fit-content;

  // Fix to not display hover on create link
  &:hover:not(:has(svg:hover)) {
    cursor: pointer;
    border-color: #3b82f6;

    a {
      text-decoration: underline;
    }
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleLink = styled(Link)`
  color: #3b82f6;
  text-decoration: none;
`;

const CreateLink = styled(Link)`
  background-color: #ccd1d5;
  border-radius: 4px;
  color: white;
  transition: background-color 80ms linear;

  &:hover {
    color: white;
    background-color: #16a34a;
  }
  svg {
    fill: none;
    stroke: currentColor;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2;
  }
`;

const CountText = styled.span`
  color: #374151;
  text-decoration: none;
`;

// Define the DashboardCard component
const DashboardCard: React.FC<{
  title: string;
  itemCount?: number;
  link: string;
  noCreate?: boolean;
}> = ({ title, link, itemCount = 0, noCreate }) => (
  <DashboardCardContainer>
    <LinksContainer>
      <TitleLink title={`List ${title}`} href={`${link}`}>
        <h3>{title}</h3>
      </TitleLink>
      {!noCreate && (
        <CreateLink title={`Create ${title}`} href={`${link}/create`}>
          <svg
            aria-hidden="true"
            focusable="false"
            height="32px"
            width="32px"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </CreateLink>
      )}
    </LinksContainer>
    <CountText>{`${itemCount} items`}</CountText>
  </DashboardCardContainer>
);

export { DashboardCard };
