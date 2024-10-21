import styled, { keyframes } from 'styled-components';
import footstepSvg from '/public/footstep.svg'

const svgImage = encodeURIComponent(footstepSvg).replace(/'/g, '%27').replace(/"/g, '%22');

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export type TStepCoordinate = {
  id: number,
  x: number,
  y: number,
  r: number
};

export class CoordinatesGenerator {
  private resultCoordinates: TStepCoordinate[];
  private lastDirection: 'up' | 'down' | 'left' | 'right';
  private distanceBetweenStepsHorizontal = 0.8; // (64 - 18) / 50  (step height + distance between steps) / step height 
  private stepHeight: number;

  constructor(initialValue: TStepCoordinate[] = [], isBigScreen: boolean,  direction:  'up' | 'down' | 'left' | 'right' = 'down') {
    this.resultCoordinates = initialValue;
    this.lastDirection = direction;
    this.stepHeight = isBigScreen ? 64 : 32;
  }

  getAmmountBySize(size: number) {
    return Math.floor(size / (this.stepHeight + this.stepHeight * 0.75)); // 112 = 64 + 75% - it's real size 2 steps (step + other step - offset of last one)
  }

  // VERTICAL
  up(size: number) {
    const right = this.resultCoordinates[this.resultCoordinates.length - 2];
    const left = this.resultCoordinates[this.resultCoordinates.length - 1];
    const sign = Math.sign(right.x);
    
    const requiredAmmountLimit = this.getAmmountBySize(size);

    for (let i = 0; i < requiredAmmountLimit; i++) {
      this.resultCoordinates.push(

        // Left and right X could be equal (cause we've got auto offset one from another - like one element push another)
        { id: left.id + (i + 1) * 2 - 1, x: right.x, y: right.y - (1.75 * (i + 1)), r: -left.r },
        { id: left.id + (i + 2) * 2 - 2, x: right.x, y: left.y - (1.75 * (i + 1)), r: left.r }
      );
    }

    this.lastDirection = 'up';
    return this;
  }

  down(size: number) {
    const right = this.resultCoordinates[this.resultCoordinates.length - 2];
    const left = this.resultCoordinates[this.resultCoordinates.length - 1];
    const sign = Math.sign(right.x);
    
    const requiredAmmountLimit = this.getAmmountBySize(size);
    
    for (let i = 0; i < requiredAmmountLimit; i++) {
      this.resultCoordinates.push(
        
        // Left and right X could be equal (cause we've got auto offset one from another - like one element push another)
        { id: left.id + (i + 1) * 2 - 1, x: left.x, y: right.y + (1.75 * (i + 1)), r: -left.r },
        { id: left.id + (i + 2) * 2 - 2, x: left.x, y: left.y + (1.75 * (i + 1)), r: left.r }
      );
    }

    this.lastDirection = 'down';
    return this;
  }

  // HORIZONTAL
  left(size: number) {
    const right = this.resultCoordinates[this.resultCoordinates.length - 2];
    const left = this.resultCoordinates[this.resultCoordinates.length - 1];
    const sign = Math.sign(left.y);

    const requiredAmmountLimit = this.getAmmountBySize(size);


    for (let i = 0; i < requiredAmmountLimit; i++) {
      this.resultCoordinates.push(
        { id: left.id + (i + 1) * 2 - 1, x: right.x +  (1.75 * (i + 1)), y: right.y, r: -left.r },
        { id: left.id + (i + 2) * 2 - 2, x: left.x +  (1.75 * (i + 1)), y: sign * (Math.abs(right.y) + this.distanceBetweenStepsHorizontal), r: left.r },
      );
    }

    this.lastDirection = 'left';
    return this;
  }

  right(size: number) {
    const right = this.resultCoordinates[this.resultCoordinates.length - 2];
    const left = this.resultCoordinates[this.resultCoordinates.length - 1];
    const sign = Math.sign(right.y);

    const requiredAmmountLimit = this.getAmmountBySize(size);

    for (let i = 0; i < requiredAmmountLimit; i++) {
      this.resultCoordinates.push(
        { id: left.id + (i + 1) * 2 - 1, x: right.x -  (1.75 * (i + 1)), y: sign * (Math.abs(left.y) + this.distanceBetweenStepsHorizontal), r: -left.r },
        { id: left.id + (i + 2) * 2 - 2, x: left.x -  (1.75 * (i + 1)), y: left.y, r: left.r },
      );
    }

    this.lastDirection = 'right';
    return this;
  }

  /*************************************************************/
  /************************** TURNS ****************************/
  /*************************************************************/

  turnRight() {
    const right = this.resultCoordinates[this.resultCoordinates.length - 2];
    const left = this.resultCoordinates[this.resultCoordinates.length - 1];

      if (this.lastDirection === 'down') {
        // Default X and Y
        this.resultCoordinates.push(
          { id: left.id + 1, x: right.x + 0.25, y: right.y + 1.75, r: -left.r - 15},
          { id: left.id + 2, x: left.x + 0.5, y: left.y + 2, r: left.r + (15 * 2) },
          { id: left.id + 3, x: right.x + 1, y: right.y + 1.75 + 1.25, r: -left.r - (15 * 3) },
          { id: left.id + 4, x: left.x + 2, y: left.y + 2.25 + 1.25, r: left.r + (15 * 4) },
          { id: left.id + 5, x: right.x + 2.4, y: right.y + 2 + 1.25 + 0.75, r: -left.r - (15 * 5) },
          { id: left.id + 6, x: left.x + 4, y: left.y + 2 + 1.25 + 0.75, r: left.r + (15 * 6) },
        );
      }

      if (this.lastDirection === 'up') {
        // All default becomes -
        this.resultCoordinates.push(
          { id: left.id + 1, x: right.x - 0.25, y: right.y - 1.75, r: -left.r - 15},
          { id: left.id + 2, x: left.x - 0.5, y: left.y - 2, r: left.r + (15 * 2) },
          { id: left.id + 3, x: right.x - 1, y: right.y - (1.75 + 1.25), r: -left.r - (15 * 3) },
          { id: left.id + 4, x: left.x - 2, y: left.y - (2.25 + 1.25), r: left.r + (15 * 4) },
          { id: left.id + 5, x: right.x - 2.4, y: right.y - (2 + 1.25 + 0.75), r: -left.r - (15 * 5) },
          { id: left.id + 6, x: left.x - 4, y: left.y - (2 + 1.25 + 0.75), r: left.r + (15 * 6) },
        );
      }

      if (this.lastDirection === 'left') {
        // defauly X becomes -Y, default Y becomes +X
        this.resultCoordinates.push(
          { id: left.id + 1, x: right.x + 1.75, y: right.y - 0.25, r: -left.r - 15},
          { id: left.id + 2, x: left.x + 2, y: left.y - 0.5, r: left.r + (15 * 2) },
          { id: left.id + 3, x: right.x + 1.75 + 1.25, y: right.y - 1, r: -left.r - (15 * 3) },
          { id: left.id + 4, x: left.x + 2.25 + 1.25, y: left.y - 2, r: left.r + (15 * 4) },
          { id: left.id + 5, x: right.x + 2 + 1.25 + 0.75, y: right.y - 2.4, r: -left.r - (15 * 5) },
          { id: left.id + 6, x: left.x + 2 + 1.25 + 0.75, y: left.y - 4, r: left.r + (15 * 6) },
        );
      }

      if (this.lastDirection === 'right') {
        // defauly X becomes Y, default Y becomes -X
        this.resultCoordinates.push(
          { id: left.id + 1, x: right.x - 1.75, y: right.y + 0.25, r: -left.r - 15},
          { id: left.id + 2, x: left.x - 2, y: left.y + 0.5, r: left.r + (15 * 2) },
          { id: left.id + 3, x: right.x - (1.75 + 1.25), y: right.y + 1, r: -left.r - (15 * 3) },
          { id: left.id + 4, x: left.x - (2.25 + 1.25), y: left.y + 2, r: left.r + (15 * 4) },
          { id: left.id + 5, x: right.x - (2 + 1.25 + 0.75), y: right.y + 2.4, r: -left.r - (15 * 5) },
          { id: left.id + 6, x: left.x - (2 + 1.25 + 0.75), y: left.y + 4, r: left.r + (15 * 6) },
        );
      }
    return this;
  }
  
  turnLeft() {
    const right = this.resultCoordinates[this.resultCoordinates.length - 2];
    const left = this.resultCoordinates[this.resultCoordinates.length - 1];

      if (this.lastDirection === 'down') {
        // Default X and Y
        this.resultCoordinates.push(
          { id: left.id + 1, x: right.x - 0.25, y: right.y + 2, r: -left.r + 15},
          { id: left.id + 2, x: left.x - 0.5, y: left.y + 1.75, r: left.r - (15 * 2) },
          { id: left.id + 3, x: right.x - 1, y: right.y + 2.5 + 1.25, r: -left.r + (15 * 3) },
          { id: left.id + 4, x: left.x - 1.5, y: left.y + 1.75 + 1, r: left.r - (15 * 4) },
          { id: left.id + 5, x: right.x - 3, y: right.y + 2 + 1.25 + 1.5, r: -left.r + (15 * 5) },
          { id: left.id + 6, x: left.x - 3.21, y: left.y + 2 + 1.35, r: left.r - (15 * 6) },
        );
      }

      if (this.lastDirection === 'up') {
        // All default becomes -
        this.resultCoordinates.push(
          { id: left.id + 1, x: right.x + 0.25, y: right.y - 2, r: -left.r + 15},
          { id: left.id + 2, x: left.x + 0.5, y: left.y - 1.75, r: left.r - (15 * 2) },
          { id: left.id + 3, x: right.x + 1, y: right.y - (2.5 + 1.25), r: -left.r + (15 * 3) },
          { id: left.id + 4, x: left.x + 1.5, y: left.y - (1.75 + 1), r: left.r - (15 * 4) },
          { id: left.id + 5, x: right.x + 3, y: right.y - (2 + 1.25 + 1.5), r: -left.r + (15 * 5) },
          { id: left.id + 6, x: left.x + 3.21, y: left.y - (2 + 1.35), r: left.r - (15 * 6) },
        );
      }


      if (this.lastDirection === 'left') {
        // defauly X becomes -Y, default Y becomes +X
        this.resultCoordinates.push(
          { id: left.id + 1, x: right.x + 2, y: right.y + 0.25, r: -left.r + 15},
          { id: left.id + 2, x: left.x + 1.75, y: left.y + 0.5, r: left.r - (15 * 2) },
          { id: left.id + 3, x: right.x + 2.5 + 1.25, y: right.y + 1, r: -left.r + (15 * 3) },
          { id: left.id + 4, x: left.x + 1.75 + 1, y: left.y + 1.5, r: left.r - (15 * 4) },
          { id: left.id + 5, x: right.x + 2 + 1.25 + 1.5, y: right.y + 3, r: -left.r + (15 * 5) },
          { id: left.id + 6, x: left.x + 2 + 1.35, y: left.y + 3.21, r: left.r - (15 * 6) },
        );
      }

      if (this.lastDirection === 'right') {
        // defauly X becomes Y, default Y becomes -X
        this.resultCoordinates.push(
          { id: left.id + 1, x: right.x - 2, y: right.y - 0.25, r: -left.r + 15},
          { id: left.id + 2, x: left.x - 1.75, y: left.y - 0.5, r: left.r - (15 * 2) },
          { id: left.id + 3, x: right.x - (2.5 + 1.25), y: right.y - 1, r: -left.r + (15 * 3) },
          { id: left.id + 4, x: left.x - (1.75 + 1), y: left.y - 1.5, r: left.r - (15 * 4) },
          { id: left.id + 5, x: right.x - (2 + 1.25 + 1.5), y: right.y - 3, r: -left.r + (15 * 5) },
          { id: left.id + 6, x: left.x - (2 + 1.35), y: left.y - 3.21, r: left.r - (15 * 6) },
        );
      }
    return this;
  }

  getCoordinates(): TStepCoordinate[] {
    return this.resultCoordinates;
  }
}

type TFootstep = {
  $y?: number;
  $x?: number;
  $r?: number;
  $direction?: 'left' | 'right';
  $isBigScreen?: boolean;
}

export const Footstep = styled.div<TFootstep>`
  ${({$isBigScreen, $x = 0, $y = 0}) => {
    const width = $isBigScreen ? 50 : 25;
    const height = $isBigScreen ? 64 : 32;

    return `
      position: absolute;
      left: calc(50% - ${width + ($x * height)}px);
      top: ${height * $y}px; // 1.5 = visual margin. It's not defined, but it should be between steps

      width: ${width}px;
      height: ${height}px;
    `
  }}

  background-image: url('data:image/svg+xml;utf8,${svgImage}');
  opacity: 0;
  animation: ${fadeIn} 0.15s linear forwards;

  transform: ${({ $direction, $r = 0 }) => $direction === 'left' ? `translateX(50%) scaleY(-1) scaleX(-1) rotate(${$r}deg)` : `translateX(-50%) scaleY(-1) rotate(${$r}deg)`};
`;
