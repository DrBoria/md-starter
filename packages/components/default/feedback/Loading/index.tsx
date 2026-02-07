import React from 'react';
import { LoadingWrapper, LoaderContainer, StyledLoaderImage } from './styles';

interface LoaderProps {
  $size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ $size = 'medium', className }) => {
  return (
    <LoaderContainer $size={$size} className={className}>
      <StyledLoaderImage src="/ouroboros.svg" alt="Loading..." priority width={100} height={100} />
    </LoaderContainer>
  );
};

export const LoaderImage = StyledLoaderImage; // Backward compatibility

interface LoadingProps {
  hidden: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ hidden }) => (
  <LoadingWrapper $hidden={hidden}>
    <Loader $size="large" />
  </LoadingWrapper>
);
