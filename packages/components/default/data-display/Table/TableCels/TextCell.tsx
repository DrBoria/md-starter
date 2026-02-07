import React from 'react';
import { PlainText } from '@md/components/default/data-display/Typography';
import { StyledTextCell } from './styles';

interface TextCellProps {
  text: string | number | React.ReactNode;
  align?: 'left' | 'center' | 'right';
  weight?: 'bold' | 'regular';
}

const TextCell: React.FC<TextCellProps> = ({ text, align, weight = 'regular' }) => {
  return (
    <StyledTextCell $align={align}>
      {weight === 'bold' ? (
        <PlainText><b>{text}</b></PlainText>
      ) : (
        <PlainText>{text}</PlainText>
      )}
    </StyledTextCell>
  );
};

export default TextCell;
