import { PlainText } from '../../Typography';

import { StyledTextCell } from './styles';

type TNavigationCellProps = {
  text: string;
  link: string;
  align?: 'center' | 'left' | 'right';
};

const NavigationCell = ({ text, link, align, ...props }: TNavigationCellProps) => {
  return (
    <StyledTextCell align={align} {...props}>
      <PlainText>
        <a href={link}>{text}</a>
      </PlainText>
    </StyledTextCell>
  );
};

export default NavigationCell;
