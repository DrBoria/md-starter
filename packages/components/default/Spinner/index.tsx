import styled, { keyframes } from 'styled-components';

import { ReactComponent as DefaultSpinnerLoader } from './spinner-loader.svg';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinnerLoader = styled(DefaultSpinnerLoader)`
  color: ${({ theme }) => theme.colors.sectionContent};

  animation: ${rotate} 3s linear infinite;
`;

export const Spinner = () => {
  return <SpinnerLoader />;
};

export default Spinner;
