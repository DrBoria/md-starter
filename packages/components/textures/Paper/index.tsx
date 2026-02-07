/* stylelint-disable color-no-hex, font-family-no-missing-generic-family-keyword */
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
  background-color: rgb(195 203 205); /* base color for paper */
  background-image: linear-gradient(
    to right,
    rgb(128 149 153 / 40%),
    rgb(193 202 204 / 10%) 11%,
    rgb(240 255 255 / 0%) 35%,
    rgb(193 202 204 / 10%) 65%
  );
  box-shadow: inset 0 0 75px rgb(128 149 153 / 30%),
              inset 0 0 20px rgb(193 202 204 / 40%),
              inset 0 0 30px rgb(129 139 145 / 80%);
  color: rgb(0 0 0 / 50%);
  font-family: AustralisProSwash-Italic, serif;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;
