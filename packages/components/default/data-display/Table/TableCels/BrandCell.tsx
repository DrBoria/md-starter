import Avatar from '../../Avatar';
import { PlainText } from '../../Typography';

import { OneLineCell } from './styles';

type TBrandCellProps = {
  text: string;
  src: string;
  alt?: string;
  align?: 'center' | 'left' | 'right';
};

const BrandCell = ({ text, src, alt, align, ...props }: TBrandCellProps) => {
  return (
    <OneLineCell align={align} {...props}>
      <Avatar src={src} alt={alt} />
      <PlainText>{text}</PlainText>
    </OneLineCell>
  );
};

export default BrandCell;
