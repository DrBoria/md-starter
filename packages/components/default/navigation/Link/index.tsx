
import Link from "next/link";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme.colors.sectionContent};
    text-decoration: underline;
  }
`;


const LinkInForm = styled(Link)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.highlighted};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export { LinkStyled as Link, LinkInForm };
