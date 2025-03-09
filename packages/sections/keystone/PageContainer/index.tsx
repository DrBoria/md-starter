import type { ReactNode } from "react";
import React, { useState } from "react";
import { Logo, Navigation } from "@keystone-6/core/admin-ui/components";
import { ThemeProvider } from "@md/styles";
import styled from 'styled-components';
import { MenuIcon, XCircleIcon } from '@keystone-ui/icons';


interface PageContainerProps {
  children: ReactNode;
  header: string | ReactNode;
}

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr);
  grid-template-rows: repeat(2, ${({ theme }) => theme.elements.header.height}) auto;
  height: 100vh;
  isolation: isolate;
  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};

  @media (min-width: 576px) {
    grid-template-columns: minmax(300px, 1fr) 4fr;
    grid-template-rows: ${({ theme }) => theme.elements.header.height} auto;
  }
`;

const Sidebar = styled.aside<{ isSidebarOpen: boolean }>`
  grid-column: 1/2;
  grid-row: 2/4;
  display: ${({isSidebarOpen}) => isSidebarOpen ? 'block' : 'none'};
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};


  @media (min-width: 576px) {
    grid-column: 1/2;
    grid-row: 2/3;
    display: block;
    height: 100%;
  }
`;

const Content = styled.main`
  background-color: ${({ theme }) => theme.colors.section};
  box-sizing: border-box;
  min-width: 0;
  
  padding-top: calc(${({ theme }) => theme.elements.header.height});
  padding-left: ${({ theme }) => theme.offsets.elementContent};
  padding-right: ${({ theme }) => theme.offsets.elementContent};
  position: relative;
  
  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};

`;

const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-width: 0;
  padding-left: ${({ theme }) => theme.offsets.elementContent};
  padding-right: ${({ theme }) => theme.offsets.elementContent};

  background-color: ${({ theme }) => theme.colors.section};
  border-bottom: 1px solid ${({ theme }) => theme.colors.sectionContent};
`;

const HeaderToggle = styled.div`
  display: block;
  @media (min-width: 576px) {
    display: none;
  }
`;

const PageContainer: React.FC<PageContainerProps> = ({ children, header }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <PageWrapper>
        <Header>
          <Logo />
          <HeaderToggle onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <XCircleIcon /> : <MenuIcon />}
          </HeaderToggle>
        </Header>
        <Sidebar isSidebarOpen={isSidebarOpen}>
          <Navigation />
        </Sidebar>
        <Content>{children}</Content>
      </PageWrapper>
    </ThemeProvider>
  );
};

export { PageContainer };
