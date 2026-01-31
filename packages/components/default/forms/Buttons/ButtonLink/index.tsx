import React from "react";
import Link from "next/link";
import styled from "styled-components";

import type { ButtonProps } from "../../Button";
import { Button } from "../../Button";

interface ButtonLinkProps extends Omit<ButtonProps, "onClick"> {
  href: string;
}

const StyledLink = styled(Link)<{ $fullWidth?: boolean }>`
  display: inline-block;
  text-decoration: none;
  ${({ $fullWidth }) => ($fullWidth ? "width: 100%;" : "")}
`;

const ButtonWrapper = styled.span<{ $fullWidth?: boolean }>`
  & > button {
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  }
`;

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  text,
  children,
  $fullWidth,
  ...buttonProps
}) => (
  <StyledLink href={href} $fullWidth={$fullWidth}>
    <ButtonWrapper $fullWidth={$fullWidth}>
      <Button $fullWidth={$fullWidth} {...buttonProps}>
        {text}
        {children}
      </Button>
    </ButtonWrapper>
  </StyledLink>
);
