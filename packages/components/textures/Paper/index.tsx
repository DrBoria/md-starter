import styled from 'styled-components';

export const Paper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  filter: url('#paperFilter');
  opacity: 0.3;
`;

export const PaperTexture = () => (
  // We need to set absolute. I other way it adds offsets
  <svg viewBox="0 0 640 480" width="0" height="0" style={{position: 'absolute'}}>
    <filter id="paperFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" stitchTiles="stitch" result="NOISE"></feTurbulence>
      <feDiffuseLighting lightingColor="white" surfaceScale="4" in=".." result="..">
        <feDistantLight azimuth="45" elevation="60"></feDistantLight>
      </feDiffuseLighting>
    </filter>
  </svg>
);

export const PaperContainer = styled.div`
  background-color: #c3cbcd; /* base color for paper */
  background-image: linear-gradient(
    to right,
    rgba(128, 149, 153, 0.4),
    rgba(193, 202, 204, 0.1) 11%,
    rgba(240, 255, 255, 0) 35%,
    rgba(193, 202, 204, 0.1) 65%
  );
  box-shadow: inset 0 0 75px rgba(128, 149, 153, 0.3),
              inset 0 0 20px rgba(193, 202, 204, 0.4),
              inset 0 0 30px rgba(129, 139, 145, 0.8);
  color: rgba(0, 0, 0, 0.5);
  font-family: "AustralisProSwash-Italic";
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;
