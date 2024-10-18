import { FiX } from 'react-icons/fi';
import styled from 'styled-components';

type TOverlayProps = {
  open: boolean;
};

export const Overlay = styled.div<TOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;

  display: ${({ open }) => (open ? 'block' : 'none')};
  width: 100%;
  height: 100%;

  background: #00000080;
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.alert};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ theme }) => `calc(${theme.screens.mobile.width} - ${theme.offsets.section})`};
  height: auto;
  margin: 0 auto;
  padding: ${({ theme }) => theme.offsets.section};

  background: ${({ theme }) => theme.colors.section};
  border: ${({ theme }) => `${theme.border.size} solid ${theme.colors.sectionContent}`};
  border-radius: ${({ theme }) => theme.border.radius};
  transform: translateY(-50%);

  :focus {
    outline: none;
  }
`;

export const CloseIcon = styled(FiX)`
  width: ${({ theme }) => theme.elements.icons.width};
  height: ${({ theme }) => theme.elements.icons.height};

  color: ${({ theme }) => theme.colors.sectionContent};

  cursor: pointer;
`;
