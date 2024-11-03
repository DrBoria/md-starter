import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
`;

const ColorInput = styled.input`
  width: 100px;
`;

const Button = styled.button`
  margin-top: 10px;
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
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetch('http://localhost:6061/themes');
        const data = await response.json();
        setTheme(data);
        setUpdatedTheme(data);
        const keys = Object.keys(data);
        setCollapsedSections(new Set(keys));
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };
    fetchTheme();
  }, []);

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

  const getChangedValues = (original: any, updated: any) => {
    const changes: any = {};
  
    const recurse = (orig: any, upd: any, path: string[] = []) => {
      Object.keys(upd).forEach((key) => {
        const currentPath = [...path, key];
        const origValue = orig[key];
        const updValue = upd[key];
  
        if (typeof origValue === 'object' && origValue !== null && typeof updValue === 'object' && updValue !== null) {
          // Recurse for nested objects
          recurse(origValue, updValue, currentPath);
        } else if (origValue !== updValue) {
          // Log changed values for debugging
          console.log(`Change detected at ${currentPath.join('.')} : ${origValue} -> ${updValue}`);
          
          // Assign the change
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
  
  const saveTheme = async () => {
    const changedValues = getChangedValues(theme, updatedTheme);
  
    console.log('Changed Values:', changedValues); // Debug output
  
    if (Object.keys(changedValues).length === 0) {
      alert('No changes to save');
      return;
    }
  
    try {
      await fetch('http://localhost:6061/themes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changedValues),
      });
      alert('Theme updated successfully!');
    } catch (error) {
      console.error('Error saving theme:', error);
      alert('Error saving theme');
    }
  };
  
  
  const toggleSection = (key: string) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const renderInputs = (obj: any, keyPath: string[] = []) => {
    return Object.entries(obj).map(([key, value]) => {
      const newKeyPath = [...keyPath, key];
      const isCollapsible = typeof value === 'object' && value !== null;

      return (
        <Section key={key}>
          {isCollapsible ? (
            <>
              <SectionHeader onClick={() => toggleSection(key)}>
                {key}
                {collapsedSections.has(key) ? '▼' : '►'}
              </SectionHeader>
              {!collapsedSections.has(key) && (
                <InputGroup>{renderInputs(value, newKeyPath)}</InputGroup>
              )}
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
      <h2>Edit Theme Variables</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {renderInputs(updatedTheme)}
        <Button type="button" onClick={saveTheme}>
          Save Changes
        </Button>
      </form>
    </Container>
  ) : (
    <p>Loading...</p>
  );
};

export default ThemeEditor;
