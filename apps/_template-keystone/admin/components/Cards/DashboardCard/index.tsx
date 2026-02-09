import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { SectionTitle } from "@md/components";

const DashboardCardContainer = styled.div`
  min-width: ${({ theme }) => theme.elements.form.minWidth};
  text-decoration: none;
  width: fit-content;
  padding: ${({ theme }) => theme.offsets.elementContent};
  border: ${({ theme }) => theme.border.size} solid ${({ theme }) => theme.colors.sectionContent};;
  border-radius: ${({ theme }) => theme.border.radius};

  /* Fix to not display hover on create link */
  &:hover:not(:has(svg:hover)) {
    cursor: pointer;
    border-color: ${({ theme }) => theme.colors.highlighted};

    a {
      text-decoration: underline;
    }
  }

  /* VIKING THEME OVERRIDE */
  ${({ theme }) => theme.theme === 'viking' && css`
    background-color: ${theme.colors.section};
    background-image: ${theme.effects?.texture};
    border: none;
    border-radius: 0;
    clip-path: ${(theme.geometry as unknown as Record<string, string>)?.card || (theme.geometry as unknown as Record<string, string>)?.ragged};
    box-shadow: ${theme.effects?.depth?.outer?.medium};
    padding: ${theme.variables?.offsets?.elementContent?.desktop || 20}px;

    &:hover:not(:has(svg:hover)) {
        box-shadow: ${theme.effects?.depth?.outer?.strong}, inset 0 0 0 1px ${theme.colors.highlighted};
        transform: translateY(-2px);
        transition: all 0.2s ease;
    }
  `}
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
  border-radius: ${({ theme }) => theme.border.radius};
  color: ${({ theme }) => theme.colors.sectionContent};
  transition: background-color 80ms linear;

  &:hover {
    color: ${({ theme }) => theme.colors.highlightedText};
    background-color: ${({ theme }) => theme.colors.highlighted};
  }

  svg {
    fill: none;
    stroke: currentcolor;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2;
  }

  /* VIKING THEME OVERRIDE */
  ${({ theme }) => theme.theme === 'viking' && css`
    background-color: transparent;
    border: 1px solid ${theme.colors.highlighted};
    border-radius: 0;
    color: ${theme.colors.highlighted};
    
    &:hover {
        background-color: ${theme.colors.highlighted};
        color: ${theme.colors.highlightedText};
        box-shadow: ${theme.effects?.glow?.medium};
    }
  `}
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
