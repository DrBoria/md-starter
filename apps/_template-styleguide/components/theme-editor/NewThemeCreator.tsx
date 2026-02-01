import React from 'react';
import { BasicSection, Button, OneLineContainer, SectionTitle } from "@md/components";
import { ThemeProvider } from "@md/styles";
import { PalettePreview } from "./PalettePreview";

const NewThemeCreator = ({ newThemeName, onNewThemeNameChange, onSave, palettes }) => (
  <div style={{ overflow: 'auto', width: '100%' }}>
    <BasicSection style={{background: 'transparent'}}>
      <SectionTitle>Create New Color Theme: </SectionTitle>
      <input
        type="text"
        value={newThemeName}
        onChange={(e) => onNewThemeNameChange(e.target.value)}
        placeholder="Color Theme Name"
      />
    </BasicSection>
    {palettes.length > 0 && (
      <OneLineContainer>
        {palettes.map((palette, index) => (
          <ThemeProvider theme={palette} key={`palette-${index}`}>
            <BasicSection>
              <SectionTitle>Palette {index + 1}</SectionTitle>
              <PalettePreview palette={palette} />
              <Button onClick={() => onSave(palette)}>Choose this Palette</Button>
            </BasicSection>
          </ThemeProvider>
        ))}
      </OneLineContainer>
    )}
  </div>
);

export { NewThemeCreator };
