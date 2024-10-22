import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

export const PaperContainer = styled(View)`
  flex: 1; // Takes full available space
  background-color: #c3cbcd; /* Base color for paper */
  background-image: linear-gradient(
    to right,
    rgba(128, 149, 153, 0.4),
    rgba(193, 202, 204, 0.1) 11%,
    rgba(240, 255, 255, 0) 35%,
    rgba(193, 202, 204, 0.1) 65%
  ); /* Note: Gradients aren't supported directly in React Native */
  box-shadow: inset 0 0 75px rgba(128, 149, 153, 0.3),
              inset 0 0 20px rgba(193, 202, 204, 0.4),
              inset 0 0 30px rgba(129, 139, 145, 0.8); /* React Native doesn't support box-shadow */
  color: rgba(0, 0, 0, 0.5);
  font-family: "AustralisProSwash-Italic";
  padding: 20px; // Optional padding
  overflow: hidden;
  position: relative;
`;

export const Paper = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background-color: transparent; // Since we don't have filter support
`;

// Create a fallback for PaperTexture
export const PaperTexture = () => (
  <View style={{ position: 'absolute', width: 0, height: 0 }}>
    {/* Placeholder for the SVG filter since it's not supported in React Native */}
  </View>
);
