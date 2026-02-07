import { PlainText } from '@md/components/default/data-display/Typography';

import { StyledTextCell } from './styles';

type TNavigationCellProps = {
  text: string;
  link: string;
  align?: 'center' | 'left' | 'right';
};

const NavigationCell = ({ text, link, align }: TNavigationCellProps) => {
  return (
    <StyledTextCell $align={align}>
      <PlainText>
        <a href={link}>{text}</a>
      </PlainText>
    </StyledTextCell>
  );
};

export default NavigationCell;
