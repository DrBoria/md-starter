import React from 'react';
import { Input } from '@md/components/default/forms/Form/Input';
import { TextCheckbox } from '@md/components/default/forms/Form/TextCheckbox';
import { Select } from '@md/components/default/forms/Form/Select';
import { FormLabel } from '@md/components/default/forms/Form/FormLabel';
import { RelationshipSelect } from './RelationshipSelect';
import { SubTitle } from '@md/components/default/data-display/Typography';

interface FieldRendererProps {
    field: any;
    value: any;
    onChange: (value: any) => void;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
    field,
    value,
    onChange,
}) => {
    const { path, label, fieldMeta, controller } = field;

    // Handle Relationship Fields (e.g., Role)
    if (fieldMeta?.refListKey) {
        return (
            <RelationshipSelect
                field={field}
                value={value}
                onChange={onChange}
            />
        );
    }

    // Handle Boolean Fields (Checkbox)
    if (fieldMeta?.type === 'Boolean' || controller?.type === 'Checkbox') {
        // Checkbox value usually comes as boolean directly or wrapped
        const isChecked = value === true || value?.value === true;

        return (
            <div style={{ marginBottom: '1rem' }}>
                <TextCheckbox
                    id={path}
                    name={path}
                    checked={isChecked}
                    onChange={(e) => onChange(e.target.checked)}
                    label={label}
                />
            </div>
        );
    }

    // Handle Select Fields (Enum)
    if (fieldMeta?.displayMode === 'select' && fieldMeta?.options) {
        const options = fieldMeta.options.map((opt: any) => ({
            label: opt.label,
            value: opt.value
        }));

        // Value might be simple string or object depending on controller
        const selectedValue = options.find((opt: any) => opt.value === value?.value || opt.value === value);

        return (
            <div style={{ marginBottom: '1rem' }}>
                <FormLabel htmlFor={path}>{label}</FormLabel>
                <Select
                    options={options}
                    value={selectedValue}
                    onChange={(opt) => onChange(opt ? opt.value : null)}
                    placeholder={`Select ${label}...`}
                />
            </div>
        );
    }

    // Handle Text/String/Password/Number
    const isPassword = path.toLowerCase().includes('password');
    const type = isPassword ? 'password' : (fieldMeta?.type === 'Integer' || fieldMeta?.type === 'Float' ? 'number' : 'text');

    // Extract simple value
    let displayValue = "";
    if (value && typeof value === 'object' && 'value' in value) {
        displayValue = value.value ?? "";
    } else if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
            // Fallback for unexpected objects to avoid [object Object]
            displayValue = JSON.stringify(value);
        } else {
            displayValue = String(value);
        }
    }

    return (
        <div style={{ marginBottom: '1rem' }}>
            <FormLabel htmlFor={path}>{label}</FormLabel>
            <Input
                id={path}
                name={path}
                type={type}
                value={displayValue}
                onChange={(e) => {
                    const val = e.target.value;
                    // For numbers, we might need to cast? default controller usually handles string -> valid types
                    onChange({ ...value, value: val });
                }}
                placeholder={label}
                $fullWidth
            />
        </div>
    );
};
