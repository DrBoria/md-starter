import React from 'react';
import { StyledTextCell } from './styles';
import type { StatusLabelProps } from '../../StatusLabel';
import { StatusLabel } from '../../StatusLabel';

interface StatusCellProps extends StatusLabelProps {
  align?: 'center' | 'left' | 'right';
  // Legacy support
  status?: StatusLabelProps['state'];
}

const StatusCell = ({ status, align, ...props }: StatusCellProps) => {
  // Map 'status' prop to StatusLabel 'state' or 'label' if needed, 
  // but StatusLabel already handles legacy 'state' prop which usually matches 'status'.

  return (
    <StyledTextCell $align={align}>
      <StatusLabel state={status} {...props} />
    </StyledTextCell>
  );
};

export default StatusCell;
