import styled from 'styled-components';

const Avatar = styled.img`
  width: ${({ theme }) => theme.elements.icons.width};
  height: ${({ theme }) => theme.elements.icons.height};
  border-radius: 50%;
`;

/** @component */
export default Avatar;
