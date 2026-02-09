import styled from 'styled-components';

export const Paper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  filter: url('#paperFilter');
  opacity: 0.3;
`;

export const PaperTexture = () => (
  <svg viewBox="0 0 640 480" width="0" height="0" style={{ position: 'absolute' }}>
    <filter id="paperFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" stitchTiles="stitch" result="NOISE"></feTurbulence>
      <feDiffuseLighting lightingColor="white" surfaceScale="4" in=".." result="..">
        <feDistantLight azimuth="45" elevation="60"></feDistantLight>
      </feDiffuseLighting>
    </filter>
  </svg>
);

export const PaperContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.section};
  background-image: ${({ theme }) => theme.effects.texture};
  box-shadow: ${({ theme }) => theme.shadows.large};
  color: ${({ theme }) => theme.colors.sectionContent};
  font-family: ${({ theme }) => theme.font.family.title};
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;
