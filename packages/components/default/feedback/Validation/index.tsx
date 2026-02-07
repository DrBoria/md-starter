import React from "react";
import { StyledErrorValidationMessage, StyledErrorValidationContainer } from "./styles";

/** @component */
const ErrorValidationMessage: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <StyledErrorValidationMessage {...props} />
);

const ErrorValidationContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { $isError: boolean }
> = ({ $isError, ...props }) => (
  <StyledErrorValidationContainer $isError={$isError} {...props} />
);

export { ErrorValidationMessage, ErrorValidationContainer };
export default ErrorValidationMessage;
