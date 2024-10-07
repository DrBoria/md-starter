
import Link from "next/link";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

export { LinkStyled as Link };
