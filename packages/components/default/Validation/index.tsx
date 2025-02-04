import styled from "styled-components";

const ErrorValidationMessage = styled.div`
  color: var(--color-error);
`;

const ErrorValidationContainer = styled.div<{ $isError: boolean }>`
  ${({ $isError }) =>
    $isError ? "border-bottom: 1px solid var(--color-error)" : ""}
`;

export { ErrorValidationMessage, ErrorValidationContainer };
