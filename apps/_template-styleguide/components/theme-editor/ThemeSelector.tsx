import React from 'react';
import { SectionTitle, Select } from "@md/components";

const ThemeSelector = ({ themes, selectedTheme, onSelect }) => {
  const options = themes.map((theme) => ({
    label: theme,
    value: theme,
  }));

  const selectedOption = selectedTheme
    ? options.find((option) => option.value === selectedTheme) || null
    : null;

  return (
    <div>
      <SectionTitle>Select Color Theme: </SectionTitle>
      <Select
        options={options}
        value={selectedOption}
        onChange={(option) => onSelect(option ? option.value.toString() : "")}
        placeholder="Select a color theme"
        isClearable={false}
        isSearchable={true}
      />
    </div>
  );
};

export { ThemeSelector };
