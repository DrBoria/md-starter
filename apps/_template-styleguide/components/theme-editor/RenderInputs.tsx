import React from 'react';
import { Input, SectionTitle, Toggle } from "@md/components";
import styled from "styled-components";

const PropertyContainer = styled.div`margin-bottom: 10px;`;
const ColorInput = styled.input`width: 100px;`;

const RenderInputs: React.FC<{
  obj: any;
  keyPath: string[];
  onChange: (keyPath: string[], value: any) => void;
  collapsedSections: Set<string>;
  onToggleSection: (keyPathStr: string) => void;
}> = ({ obj, keyPath, onChange, collapsedSections, onToggleSection }) => {
  if (!obj || typeof obj !== 'object') return null;

  return (
    <>
      {Object.entries(obj).map(([key, value]) => {
        const newKeyPath = [...keyPath, key];
        const keyPathStr = newKeyPath.join('.');
        const isCollapsible = typeof value === 'object' && value !== null;

        return (
          <PropertyContainer key={key}>
            {isCollapsible ? (
              <Toggle
                defaultState={false}
                title={`${key}`}
                onClick={() => onToggleSection(keyPathStr)}
              >
                {!collapsedSections.has(keyPathStr) && (
                  <RenderInputs
                    obj={value}
                    keyPath={newKeyPath}
                    onChange={onChange}
                    collapsedSections={collapsedSections}
                    onToggleSection={onToggleSection}
                  />
                )}
              </Toggle>
            ) : (
              <div>
                <SectionTitle>{`${key}: `}</SectionTitle>
                {typeof value === 'string' && value.startsWith('#') ? (
                  <ColorInput
                    type='color'
                    value={value}
                    onChange={(e) => onChange(newKeyPath, e.target.value)}
                  />
                ) : (
                  <Input
                    type='text'
                    value={value}
                    onChange={(e) => onChange(newKeyPath, e.target.value)}
                  />
                )}
              </div>
            )}
          </PropertyContainer>
        );
      })}
    </>
  );
};

export { RenderInputs };
