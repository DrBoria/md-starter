import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

const Container = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionHeader = styled.h3`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
`;

const InputGroup = styled.div`
  padding-left: 20px;
`;

const Label = styled.label`
  display: block;
  margin-right: 10px;
`;

const ColorInput = styled.input`
  width: 100px;
`;

const Button = styled.button`
  margin: 10px 10px 0 0;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ThemeEditor: React.FC = () => {
  const [theme, setTheme] = useState<any>(null);
  const [updatedTheme, setUpdatedTheme] = useState<any>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [baseColor, setBaseColor] = useState('#ffffff');
  const [newThemeName, setNewThemeName] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  // Fetch themes when the component mounts
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetch('http://localhost:6061/themes');
        const data = await response.json();
        setTheme(data);
        setUpdatedTheme(data);
        const keys = Object.keys(data);
        if (keys.length > 0) {
          setSelectedTheme(keys[0]); // Select the first theme by default
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };
    fetchTheme();
  }, []);

  // Handle changes in input fields for theme properties
  const handleInputChange = (keyPath: string[], value: any) => {
    setUpdatedTheme((prev: any) => {
      const newTheme = JSON.parse(JSON.stringify(prev));
      let target = newTheme;
      for (let i = 0; i < keyPath.length - 1; i++) {
        target = target[keyPath[i]];
      }
      target[keyPath[keyPath.length - 1]] = value;
      return newTheme;
    });
  };

  // Find differences between original and updated theme
  const getChangedValues = (original: any, updated: any) => {
    const changes: any = {};
    const recurse = (orig: any, upd: any, path: string[] = []) => {
      Object.keys(upd).forEach((key) => {
        const currentPath = [...path, key];
        const origValue = orig[key];
        const updValue = upd[key];
        if (typeof origValue === 'object' && origValue !== null && typeof updValue === 'object' && updValue !== null) {
          recurse(origValue, updValue, currentPath);
        } else if (origValue !== updValue) {
          let target = changes;
          currentPath.forEach((p, index) => {
            if (index === currentPath.length - 1) {
              target[p] = updValue;
            } else {
              target[p] = target[p] || {};
              target = target[p];
            }
          });
        }
      });
    };
    recurse(original, updated);
    return changes;
  };

  // Save changes to the current theme
  const saveTheme = async () => {
    if (!selectedTheme) return;
    const original = theme[selectedTheme];
    const updated = updatedTheme[selectedTheme];
    const changedValues = getChangedValues(original, updated);
    if (Object.keys(changedValues).length === 0) return;

    try {
      await fetch('http://localhost:6061/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [selectedTheme]: changedValues }),
      });
      alert('Theme successfully saved');
    } catch (error) {
      console.error('Error saving theme:', error);
      alert('Error saving theme');
    }
  };

  // Generate a color palette based on the selected base color
  const generatePalette = () => {
    if (!selectedTheme) return;

    const color = tinycolor(baseColor);
    const baseHsl = color.toHsl();
    const isDark = baseHsl.l < 0.5; // Determine if the base color is dark or light

    // **section**: The base background color
    const section = color.toHexString();

    // **sectionContent**: Text/icons, same hue as section, contrasting lightness
    const sectionContentHsl = { ...baseHsl };
    sectionContentHsl.l = isDark ? 0.9 : 0.1; // Light if section is dark, dark if light
    const sectionContent = tinycolor(sectionContentHsl).toHexString();

    // **overlay**: Modal/card background, lighter for light base, darker for dark base
    const overlayHsl = { ...baseHsl };
    overlayHsl.l = isDark ? 0.8 : 0.2; // Slightly less extreme than sectionContent
    const overlay = tinycolor(overlayHsl).toHexString(); // Opaque, as it’s the modal background

    // **overlayActive**: More contrasting version of overlay
    const overlayActiveHsl = { ...overlayHsl };
    overlayActiveHsl.l = isDark ? 0.7 : 0.3; // Adjust lightness further
    const overlayActive = tinycolor(overlayActiveHsl).toHexString();

    // **label**: Text color, similar hue, less contrasting than sectionContent
    const labelHsl = { ...baseHsl };
    labelHsl.l = isDark ? 0.7 : 0.3;
    const label = tinycolor(labelHsl).toHexString();

    // Helper function to mix colors with base
    const mixColor = (targetColor: string, amount: number = 50) => {
      return tinycolor.mix(color, tinycolor(targetColor), amount).toHexString();
    };

    // Backgrounds with logical derivation from base color
    const warningBackground = mixColor('yellow'); // Mix with yellow
    const errorBackground = mixColor('red'); // Mix with red
    const successBackground = mixColor('green'); // Mix with green

    // Helper function for contrasting text with same hue as base
    const generateTextColor = (background: string) => {
      const bg = tinycolor(background);
      const textHsl = { ...baseHsl };
      textHsl.l = bg.getLuminance() > 0.5 ? 0.2 : 0.8; // Dark text on light bg, light on dark
      return tinycolor(textHsl).toHexString();
    };

    // Text colors contrasting their backgrounds
    const warningText = generateTextColor(warningBackground);
    const errorText = generateTextColor(errorBackground);
    const successText = generateTextColor(successBackground);

    // Assemble the palette
    const palette = {
      section,
      sectionContent,
      overlay,
      overlayActive,
      label,
      warningBackground,
      warningText,
      errorBackground,
      errorText,
      successBackground,
      successText,
    };

    // Theme update
    const newTheme = { ...updatedTheme };
    const themeToUpdate = newTheme[selectedTheme];
    Object.assign(themeToUpdate, palette);
    setUpdatedTheme(newTheme);
  };

  // Save the palette as a new theme
  const saveAsNewTheme = async () => {
    if (!newThemeName) {
      alert('Please enter a name for the new theme');
      return;
    }

    const color = tinycolor(baseColor);

    // Generate palette for the new theme
    const palette = {
      section: color.darken(20).toHexString(),
      sectionContent: color.lighten(40).toHexString(),
      overlay: color.setAlpha(0.5).toRgbString(),
      overlayActive: color.darken(30).setAlpha(0.7).toRgbString(),
      label: color.lighten(10).toHexString(),
      warningBackground: color.analogous()[1].toHexString(),
      warningText: color.analogous()[1].darken(20).toHexString(),
      errorBackground: color.complement().toHexString(),
      errorText: color.complement().darken(20).toHexString(),
      successBackground: color.triad()[1].toHexString(),
      successText: color.triad()[1].darken(20).toHexString(),
    };

    const newThemeData = {
      theme: newThemeName,
      ...palette,
    };

    try {
      await fetch('http://localhost:6061/themes/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newThemeName, data: newThemeData }),
      });
      setTheme((prev: any) => ({ ...prev, [newThemeName]: newThemeData }));
      setUpdatedTheme((prev: any) => ({ ...prev, [newThemeName]: newThemeData }));
      setSelectedTheme(newThemeName);
      setNewThemeName('');
      alert('New theme successfully created');
    } catch (error) {
      console.error('Error creating new theme:', error);
      alert('Error creating new theme');
    }
  };

  // Toggle collapsing of sections
  const toggleSection = (key: string) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      return newSet;
    });
  };

  // Render input fields for theme properties
  const renderInputs = (obj: any, keyPath: string[] = []) => {
    return Object.entries(obj).map(([key, value]) => {
      const newKeyPath = [...keyPath, key];
      const isCollapsible = typeof value === 'object' && value !== null;
      return (
        <Section key={key}>
          {isCollapsible ? (
            <>
              <SectionHeader onClick={() => toggleSection(key)}>
                {key} {collapsedSections.has(key) ? '►' : '▼'}
              </SectionHeader>
              {!collapsedSections.has(key) && <InputGroup>{renderInputs(value, newKeyPath)}</InputGroup>}
            </>
          ) : (
            <div>
              <Label>{`${key}: `}</Label>
              {typeof value === 'string' && value.startsWith('#') ? (
                <ColorInput
                  type="color"
                  value={value}
                  onChange={(e) => handleInputChange(newKeyPath, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(newKeyPath, e.target.value)}
                />
              )}
            </div>
          )}
        </Section>
      );
    });
  };

  return theme ? (
    <Container>
      <h2>Theme Editor</h2>
      <div>
        <Label>Select Theme: </Label>
        <select value={selectedTheme || ''} onChange={(e) => setSelectedTheme(e.target.value)}>
          {Object.keys(theme).map((themeName) => (
            <option key={themeName} value={themeName}>
              {themeName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Choose Base Color: </Label>
        <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} />
        <Button onClick={generatePalette}>Generate Palette</Button>
      </div>
      <div>
        <Label>Create New Theme: </Label>
        <input
          type="text"
          value={newThemeName}
          onChange={(e) => setNewThemeName(e.target.value)}
          placeholder="Theme Name"
        />
        <Button onClick={saveAsNewTheme}>Save as New Theme</Button>
      </div>
      {selectedTheme && (
        <form onSubmit={(e) => e.preventDefault()}>
          {renderInputs(updatedTheme[selectedTheme], [selectedTheme])}
          <Button type="button" onClick={saveTheme}>
            Save Changes
          </Button>
        </form>
      )}
    </Container>
  ) : (
    <p>Loading...</p>
  );
};

export default ThemeEditor;
