
import Link from "next/link";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  &:hover {
    color: ${({theme}) => theme.colors.sectionContent};
    text-decoration: underline;
  }
`;

export { LinkStyled as Link };
