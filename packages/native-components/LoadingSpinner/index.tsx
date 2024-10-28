// LoadingSpinner.js
import React from 'react';
import styled from 'styled-components/native';
import { Animated, Easing } from 'react-native';

const SpinnerContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const LoadingSpinner = ({ size = 100, children }) => {
  const rotateValue = new Animated.Value(0);

  // Animation function
  const startRotation = () => {
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => startRotation());
  };

  // Start rotation on component mount
  React.useEffect(() => {
    startRotation();
  }, []);

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SpinnerContainer>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        {children}
      </Animated.View>
    </SpinnerContainer>
  );
};

export { LoadingSpinner };
