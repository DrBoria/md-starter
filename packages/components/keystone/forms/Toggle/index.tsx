import React from 'react';
import styled from 'styled-components';
import { Switch } from '@keystone-ui/fields';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.offsets.elementContent};
`;

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
    return (
        <ToggleContainer>
            <Switch checked={checked} onClick={() => onChange(!checked)}>
                {label}
            </Switch>
        </ToggleContainer>
    );
};
