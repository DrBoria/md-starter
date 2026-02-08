import type { FormEvent } from 'react';
import React, { useCallback, useState } from 'react';

import { Input } from '../Input';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';

import { Container, SearchIcon, CrossIcon, ButtonWrapper } from './styles';

export type TSearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  id?: string;
  value?: string;
  onChangeValue: (value?: string) => void;
} & TWithBasicElementOffsets &
  TFullWidth;

const SearchInput = ({ id, name, value, onChangeValue, $offsetBottom, $offsetRight, $fullWidth, ...props }: TSearchInputProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const handleChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;
      onChangeValue(newValue);
    },
    [onChangeValue]
  );

  const handleOpenSearchInput = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      onChangeValue();
    }
  };

  return (
    <Container $isOpen={isSearchOpen} $offsetBottom={$offsetBottom} $offsetRight={$offsetRight}>
      {isSearchOpen && (
        <Input placeholder='Search for an order' id={id} name={name} autoFocus value={value} onChange={handleChange} $fullWidth={$fullWidth} {...props} />
      )}
      <ButtonWrapper onClick={handleOpenSearchInput} tone="active">
        <SearchIcon />
        <CrossIcon />
      </ButtonWrapper>
    </Container>
  );
};

export { SearchInput };
