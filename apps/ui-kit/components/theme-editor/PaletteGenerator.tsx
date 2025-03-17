import React from 'react';
import { Button, SectionTitle } from "@md/components";

const PaletteGenerator: React.FC<{
  baseColor: string;
  onBaseColorChange: (color: string) => void;
  onGenerate: () => void;
}> = ({ baseColor, onBaseColorChange, onGenerate }) => (
  <div>
    <SectionTitle>Choose Base Color: </SectionTitle>
    <input type="color" value={baseColor} onChange={(e) => onBaseColorChange(e.target.value)} />
    <Button onClick={onGenerate}>Generate Palettes</Button>
  </div>
);

export { PaletteGenerator };
