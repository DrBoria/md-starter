import styled from 'styled-components';

const Avatar = styled.img`
  width: ${({ theme }) => theme.elements.icons.width};
  height: ${({ theme }) => theme.elements.icons.height};
  object-fit: cover;

  border-radius: ${({ theme }) => theme.border.circle};
`;

export default Avatar;
