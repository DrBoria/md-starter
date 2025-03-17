import React from 'react';
import { SectionTitle, Select } from "@md/components";

export type TOption = {
  label: string;
  value: string | number;
};

const ThemeSelector: React.FC<{
  themes: string[];
  selectedTheme: string | null;
  onSelect: (theme: string) => void;
}> = ({ themes, selectedTheme, onSelect }) => {
  const options: TOption[] = themes.map((theme) => ({
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
