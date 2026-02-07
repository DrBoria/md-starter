import Avatar from '@md/components/default/data-display/Avatar';
import { PlainText } from '@md/components/default/data-display/Typography';

import { OneLineCell } from './styles';

type TBrandCellProps = {
  text: string;
  src: string;
  alt?: string;
  align?: 'center' | 'left' | 'right';
};

const BrandCell = ({ text, src, alt, align }: TBrandCellProps) => {
  return (
    <OneLineCell $align={align}>
      <Avatar src={src} alt={alt} />
      <PlainText>{text}</PlainText>
    </OneLineCell>
  );
};

export default BrandCell;
