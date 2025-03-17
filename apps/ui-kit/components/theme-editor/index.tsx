import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';
import { Button, Tabs } from '@md/components';
import { ThemeProvider } from '@md/styles';
import { ThemeSelector } from './ThemeSelector';
import { PaletteGenerator } from './PaletteGenerator';
import { NewThemeCreator } from './NewThemeCreator';
import { RenderInputs } from './RenderInputs';

const Container = styled.div`
  padding: 20px;
`;

const NewThemeContainer = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
`;

const ThemeEditor: React.FC = () => {
  const [theme, setTheme] = useState<any>(null);
  const [updatedTheme, setUpdatedTheme] = useState<any>(null);
  const [selectedColorTheme, setSelectedColorTheme] = useState<string | null>(null);
  const [baseColor, setBaseColor] = useState('#ffffff');
  const [newThemeName, setNewThemeName] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [palettes, setPalettes] = useState<any[]>([]);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetch('http://localhost:6061/themes');
        const data = await response.json();
        setTheme(data);
        setUpdatedTheme(data);
        if (data.colors && Object.keys(data.colors).length > 0) {
          setSelectedColorTheme(Object.keys(data.colors)[0]);
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };
    fetchTheme();
  }, []);

  const handleInputChange = (section: string, keyPath: string[], value: any) => {
    setUpdatedTheme((prev: any) => {
      const newTheme = JSON.parse(JSON.stringify(prev));
      let target = newTheme;
      if (section === 'colors') {
        target = target.colors[selectedColorTheme!];
      } else {
        target = target[section];
      }
      for (let i = 0; i < keyPath.length - 1; i++) {
        target = target[keyPath[i]];
      }
      target[keyPath[keyPath.length - 1]] = value;
      return newTheme;
    });
  };

  const toggleSection = (keyPathStr: string) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(keyPathStr)) newSet.delete(keyPathStr);
      else newSet.add(keyPathStr);
      return newSet;
    });
  };

  const saveTheme = async () => {
    if (!selectedColorTheme) return;
    const original = theme.colors[selectedColorTheme];
    const updated = updatedTheme.colors[selectedColorTheme];
    const changedValues = getChangedValues(original, updated);
    if (Object.keys(changedValues).length === 0) return;

    try {
      await fetch('http://localhost:6061/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colors: { [selectedColorTheme]: changedValues } }),
      });
      alert('Theme successfully saved');
    } catch (error) {
      console.error('Error saving theme:', error);
      alert('Error saving theme');
    }
  };

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

  const generatePalettes = () => {
    const color = tinycolor(baseColor);
    const baseHsl = color.toHsl();
    const isDark = baseHsl.l < 0.5;

    const palette1 = generatePalette1(color, baseHsl, isDark);
    const palette2 = generatePalette2(color, baseHsl, isDark);
    const palette3 = generatePalette3(color, baseHsl, isDark);

    setPalettes([palette1, palette2, palette3]);
  };

  const saveAsNewTheme = async (palette: any) => {
    if (!newThemeName) {
      alert('Please enter a name for the new theme');
      return;
    }

    const newThemeData = { ...palette };

    try {
      await fetch('http://localhost:6061/themes/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newThemeName, data: newThemeData }),
      });
      setTheme((prev: any) => ({
        ...prev,
        colors: {
          ...prev.colors,
          [newThemeName]: newThemeData,
        },
      }));
      setUpdatedTheme((prev: any) => ({
        ...prev,
        colors: {
          ...prev.colors,
          [newThemeName]: newThemeData,
        },
      }));
      setSelectedColorTheme(newThemeName);
      setNewThemeName('');
      setPalettes([]);
      alert('New theme successfully created');
    } catch (error) {
      console.error('Error creating new theme:', error);
      alert('Error creating new theme');
    }
  };

  const sections = ['colors', 'offsets', 'border', 'elements', 'font', 'zIndexes'];

  return theme ? (
    <Container>
      <ThemeProvider>
        <h2>Theme Editor</h2>
        {selectedColorTheme && (
          <Tabs
            tabs={sections.map((section) => ({
              label: section.charAt(0).toUpperCase() + section.slice(1),
              content: (
                <>
                  {section === 'colors' && (
                    <ThemeSelector
                      themes={Object.keys(theme.colors)}
                      selectedTheme={selectedColorTheme}
                      onSelect={setSelectedColorTheme}
                    />
                  )}
                  <RenderInputs
                    obj={section === 'colors' ? updatedTheme.colors[selectedColorTheme] : updatedTheme[section]}
                    keyPath={[section]}
                    onChange={(keyPath, value) => handleInputChange(section, keyPath, value)}
                    collapsedSections={collapsedSections}
                    onToggleSection={toggleSection}
                  />
                </>
              ),
            }))}
          />
        )}
        <NewThemeContainer>
          <h3>Create New Theme</h3>
          <PaletteGenerator
            baseColor={baseColor}
            onBaseColorChange={setBaseColor}
            onGenerate={generatePalettes}
          />
          <NewThemeCreator
            newThemeName={newThemeName}
            onNewThemeNameChange={setNewThemeName}
            onSave={saveAsNewTheme}
            palettes={palettes}
          />
        </NewThemeContainer>
        {selectedColorTheme && <Button onClick={saveTheme}>Save Changes</Button>}
      </ThemeProvider>
    </Container>
  ) : (
    <p>Loading...</p>
  );
};

// Palette generation functions (unchanged)
const generatePalette1 = (color: tinycolor.Instance, baseHsl: tinycolor.HSL, isDark: boolean) => {
  const section = color.toHexString();
  const sectionContentHsl = { ...baseHsl, l: isDark ? 0.95 : 0.05 };
  const sectionContent = tinycolor(sectionContentHsl).toHexString();
  const overlayHsl = { ...baseHsl, l: isDark ? 0.85 : 0.15 };
  const overlay = tinycolor(overlayHsl).toHexString();
  const overlayActiveHsl = { ...baseHsl, l: isDark ? 0.75 : 0.25 };
  const overlayActive = tinycolor(overlayActiveHsl).toHexString();
  const labelHsl = { ...baseHsl, l: isDark ? 0.15 : 0.85 };
  const label = tinycolor(labelHsl).toHexString();
  const highlighted = tinycolor(section).complement().toHexString();
  const highlightedHsl = tinycolor(highlighted).toHsl();
  const isHighlightedDark = highlightedHsl.l < 0.5;
  const highlightedTextHsl = { ...highlightedHsl, l: isHighlightedDark ? 0.95 : 0.05 };
  const highlightedText = tinycolor(highlightedTextHsl).toHexString();

  const warningBackground = tinycolor.mix(color, tinycolor('yellow'), 50).toHexString();
  const errorBackground = tinycolor.mix(color, tinycolor('red'), 50).toHexString();
  const successBackground = tinycolor.mix(color, tinycolor('green'), 50).toHexString();

  const warningText = generateTextColor(warningBackground);
  const errorText = generateTextColor(errorBackground);
  const successText = generateTextColor(successBackground);

  return {
    section,
    sectionContent,
    overlay,
    overlayActive,
    label,
    highlighted,
    highlightedText,
    warningBackground,
    warningText,
    errorBackground,
    errorText,
    successBackground,
    successText,
  };
};

const generatePalette2 = (color: tinycolor.Instance, baseHsl: tinycolor.HSL, isDark: boolean) => {
  const sectionContent = color.toHexString();
  const sectionHsl = { ...baseHsl, l: isDark ? 0.95 : 0.05 };
  const section = tinycolor(sectionHsl).toHexString();
  const overlayHsl = { ...baseHsl, l: isDark ? 0.85 : 0.15 };
  const overlay = tinycolor(overlayHsl).toHexString();
  const overlayActiveHsl = { ...baseHsl, l: isDark ? 0.75 : 0.25 };
  const overlayActive = tinycolor(overlayActiveHsl).toHexString();
  const labelHsl = { ...baseHsl, l: isDark ? 0.15 : 0.85 };
  const label = tinycolor(labelHsl).toHexString();
  const highlighted = tinycolor(section).complement().toHexString();
  const highlightedHsl = tinycolor(highlighted).toHsl();
  const isHighlightedDark = highlightedHsl.l < 0.5;
  const highlightedTextHsl = { ...highlightedHsl, l: isHighlightedDark ? 0.95 : 0.05 };
  const highlightedText = tinycolor(highlightedTextHsl).toHexString();

  const warningBackground = tinycolor.mix(color, tinycolor('yellow'), 50).toHexString();
  const errorBackground = tinycolor.mix(color, tinycolor('red'), 50).toHexString();
  const successBackground = tinycolor.mix(color, tinycolor('green'), 50).toHexString();

  const warningText = generateTextColor(warningBackground);
  const errorText = generateTextColor(errorBackground);
  const successText = generateTextColor(successBackground);

  return {
    section,
    sectionContent,
    overlay,
    overlayActive,
    label,
    highlighted,
    highlightedText,
    warningBackground,
    warningText,
    errorBackground,
    errorText,
    successBackground,
    successText,
  };
};

const generatePalette3 = (color: tinycolor.Instance, baseHsl: tinycolor.HSL, isDark: boolean) => {
  const highlighted = color.toHexString();
  const sectionHsl = { ...baseHsl, l: isDark ? 0.95 : 0.05 };
  const section = tinycolor(sectionHsl).toHexString();
  const sectionContentHsl = { ...baseHsl, l: isDark ? 0.05 : 0.95 };
  const sectionContent = tinycolor(sectionContentHsl).toHexString();
  const overlayHsl = { ...baseHsl, l: isDark ? 0.85 : 0.15 };
  const overlay = tinycolor(overlayHsl).toHexString();
  const overlayActiveHsl = { ...baseHsl, l: isDark ? 0.75 : 0.25 };
  const overlayActive = tinycolor(overlayActiveHsl).toHexString();
  const labelHsl = { ...baseHsl, l: isDark ? 0.15 : 0.85 };
  const label = tinycolor(labelHsl).toHexString();
  const highlightedHsl = baseHsl;
  const isHighlightedDark = isDark;
  const highlightedTextHsl = { ...highlightedHsl, l: isHighlightedDark ? 0.95 : 0.05 };
  const highlightedText = tinycolor(highlightedTextHsl).toHexString();

  const warningBackground = tinycolor.mix(color, tinycolor('yellow'), 70).toHexString();
  const errorBackground = tinycolor.mix(color, tinycolor('red'), 70).toHexString();
  const successBackground = tinycolor.mix(color, tinycolor('green'), 70).toHexString();

  const warningText = generateTextColor(warningBackground);
  const errorText = generateTextColor(errorBackground);
  const successText = generateTextColor(successBackground);

  return {
    section,
    sectionContent,
    overlay,
    overlayActive,
    label,
    highlighted,
    highlightedText,
    warningBackground,
    warningText,
    errorBackground,
    errorText,
    successBackground,
    successText,
  };
};

const generateTextColor = (background: string) => {
  const bg = tinycolor(background);
  const bgHsl = bg.toHsl();
  const textLuminance = bg.getLuminance() > 0.5 ? 0.1 : 0.9;
  const textHsl = { ...bgHsl, l: textLuminance };
  return tinycolor(textHsl).toHexString();
};

export default ThemeEditor;
