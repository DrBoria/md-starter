import styled from "styled-components";

export const NavStyledContainer = styled.div`
  div {
    margin: 0; // Remove margin for authentication div nested in navigation
  }
  nav {
    background: #f8f9fa;
    padding: 1rem;
    margin-top: 0; // Remove top padding
    background-color: #333;
    color: #fff;
  }

  nav > ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
  }

  nav > ul > li {
    padding: 0.5rem 1rem;

    color: #fff;
    text-decoration: none;

    a {
      color: #fff;
      text-decoration: none;
      &::hover {
        background-color: #555;
      }
    }
  }
`;

export const NavigationContainerStyled = styled.div`
  padding: 24px;
`;
