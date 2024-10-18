import { FiX, FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

import Button from '@md/components/Button';

import { TWithBasicElementOffsets, withOffsetBottom, withOffsetsRight } from '@md/styles';

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

export const Container = styled.div<TWithBasicElementOffsets & { isOpen: boolean }>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: ${({ theme }) => theme.elements.form.height};
  height: ${({ theme }) => theme.elements.form.height};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme.offsets.elementContent};

  background-color: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.border.radius};

  transition: all 0.5s ease;

  & {
    width: ${({ isOpen }) => isOpen && '100%'};
  }
  ${CrossIcon} {
    display: ${({ isOpen }) => isOpen && 'block'};
  }
  ${SearchIcon} {
    display: ${({ isOpen }) => isOpen && 'none'};
  }
`;
