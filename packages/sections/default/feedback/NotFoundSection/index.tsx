import React from "react";
import styled from "styled-components";

import { Button } from "@md/components";

const StyledButton = styled(Button)`
  background-color: #3172f5;
  color: #fff;

  &:hover {
    background-color: #3172f5;
    color: #fff;
    text-decoration: underline;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-height: 400px;
  justify-content: center;
`;

const NotFoundSection: React.FC<{
  name: string;
  buttonText?: string;
  onClick?: () => void;
}> = ({ name, buttonText, onClick }) => (
  <Container>
    <b>No {name}s found.</b>
    {onClick && (
      <>
        <span className="mb-5">Import your {name} data to begin.</span>
        <StyledButton onClick={onClick}>{buttonText}</StyledButton>
      </>
    )}
  </Container>
);

export { NotFoundSection };
