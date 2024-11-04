import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { SectionTitle } from "@md/components/default/Typography";

const DashboardCardContainer = styled.div`
  min-width: 280px;
  text-decoration: none;
  width: fit-content;
  padding: ${({ theme }) => theme.offsets.elementContent};
  border: ${({ theme }) => theme.border.size} solid ${({ theme }) => theme.colors.sectionContent};;
  border-radius: ${({ theme }) => theme.border.radius};

  // Fix to not display hover on create link
  &:hover:not(:has(svg:hover)) {
    cursor: pointer;
    border-color: ${({ theme }) => theme.colors.highlighted};

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
  text-decoration: none;
  color: ${({ theme }) => theme.colors.highlighted};
`;

const CreateLink = styled(Link)`
  background-color: ${({ theme }) => theme.colors.section};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.sectionContent};
  transition: background-color 80ms linear;

  &:hover {
    color: ${({ theme }) => theme.colors.highlightedText};
    background-color: ${({ theme }) => theme.colors.highlighted};
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
  color: ${({ theme }) => theme.colors.sectionContent};
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
        <SectionTitle>{title}</SectionTitle>
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
