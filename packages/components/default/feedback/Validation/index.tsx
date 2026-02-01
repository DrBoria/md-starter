import React from "react";
import styled from "styled-components";

const StyledErrorValidationMessage = styled.div`
  color: var(--color-error);
`;

/** @component */
const ErrorValidationMessage: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <StyledErrorValidationMessage {...props} />
);

const ErrorValidationContainer = styled.div<{ $isError: boolean }>`
  ${({ $isError }) =>
    $isError ? "border-bottom: 1px solid var(--color-error)" : ""}
`;

export { ErrorValidationMessage, ErrorValidationContainer };
export default ErrorValidationMessage;
