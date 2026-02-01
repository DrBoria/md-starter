import { StyledTextCell } from './styles';

type TStatusCellProps = {
  status: 'Active' | 'InActive';
  align?: 'center' | 'left' | 'right';
};

const StatusCell = ({ status, align, ...props }: TStatusCellProps) => {
  return (
    <StyledTextCell $align={align}>
      {status}
    </StyledTextCell>
  );
};

export default StatusCell;
