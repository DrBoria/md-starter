import React from 'react';
import { Toggle, Input, SectionTitle } from "@md/components";
import styled from "styled-components";

const ColorInput = styled.input`
  width: 100px;
`;

const PropertyContainer = styled.div`
  margin-bottom: 10px;
`;

const ThemePropertiesEditor: React.FC<{
    theme: any;
    onChange: (keyPath: string[], value: any) => void;
    collapsedSections: Set<string>;
    onToggleSection: (key: string) => void;
}> = ({ theme, onChange, collapsedSections, onToggleSection }) => {
    const renderInputs = (obj: any, keyPath: string[] = []) => {
        if (!obj || typeof obj !== "object") return null; // Guard against invalid input

        return Object.entries(obj).map(([key, value]) => {
            const newKeyPath = [...keyPath, key];
            const isCollapsible = typeof value === "object" && value !== null;

            return (
                <PropertyContainer key={key}>
                    {isCollapsible ? (
                        <Toggle
                            defaultState={false}
                            title={`${key}`}
                            onClick={() => onToggleSection(key)}
                        >
                            {!collapsedSections.has(key) && renderInputs(value, newKeyPath)}
                        </Toggle>
                    ) : (
                        <div>
                            <SectionTitle>{`${key}: `}</SectionTitle>
                            {typeof value === "string" && value.startsWith("#") ? (
                                <ColorInput
                                    type="color"
                                    value={value}
                                    onChange={(e) => onChange(newKeyPath, e.target.value)}
                                />
                            ) : (
                                <Input
                                    type="text"
                                    value={value}
                                    onChange={(e) => onChange(newKeyPath, e.target.value)}
                                />
                            )}
                        </div>
                    )}
                </PropertyContainer>
            );
        });
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            {theme ? renderInputs(theme) : <p>No theme data available</p>}
        </form>
    );
};

export { ThemePropertiesEditor };
