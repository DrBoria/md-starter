'use client'

import { FC, ReactElement, ElementType } from 'react';

type TConditionalWrapperProps = {
  Wrapper?: ElementType;
  children: ReactElement;
};

const ConditionalWrapper: FC<TConditionalWrapperProps> = ({ Wrapper, children }) =>
  Wrapper ? <Wrapper>{children}</Wrapper> : children;

ConditionalWrapper.displayName = 'ConditionalWrapper';
export default ConditionalWrapper;
