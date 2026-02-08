import { FiX, FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

import { Button } from '@md/components/default/forms';

import type { TWithBasicElementOffsets } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

export const ButtonWrapper = styled(Button)`
  border: none;
`;

export const SearchIcon = styled(FiSearch)`
  visibility: visible;
  opacity: 1;
  transition: visibility 0s, opacity 0.2s linear;
`;

export const CrossIcon = styled(FiX)`
  display: none;
`;

export const Container = styled.div<TWithBasicElementOffsets & { $isOpen: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: ${({ $isOpen, theme }) => $isOpen ? '100%' : theme.elements.form.height};
  height: ${({ theme }) => theme.elements.form.height};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme.offsets.elementContent};
  background-color: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.border.radius};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* VIKING THEME OVERRIDE */
  ${({ theme, $isOpen }) => theme.theme === 'viking' && `
    border-radius: 0;
    clip-path: ${theme.geometry?.ragged};
    background-image: ${theme.effects?.texture};
    box-shadow: ${$isOpen ? theme.effects?.glow?.soft : theme.effects?.depth?.inner?.medium};
    
    /* Ensure full width when open in viking theme too */
    width: ${$isOpen ? '100%' : theme.elements.form.height};
  `}

  ${CrossIcon} {
    display: ${({ $isOpen }) => $isOpen && 'block'};
  }
  ${SearchIcon} {
    display: ${({ $isOpen }) => $isOpen && 'none'};
  }
`;
