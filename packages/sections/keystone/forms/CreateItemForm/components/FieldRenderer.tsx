import React from 'react';
import { Input } from '@md/components/default/forms/Form/Input';
import { TextCheckbox } from '@md/components/default/forms/Form/TextCheckbox';
import { Select } from '@md/components/default/forms/Form/Select';
import { FormLabel } from '@md/components/default/forms/Form/FormLabel';
import { RelationshipSelect } from './RelationshipSelect';


import type { FieldMeta } from '@keystone-6/core/types';

// Define a local type intersection that adds the properties we check for
type FieldConfigMeta = {
    refListKey?: string;
    refLabelField?: string;
    displayMode?: string;
    options?: { label: string; value: string | number }[];
    type?: string;
    [key: string]: unknown;
};

interface FieldRendererProps {
    field: FieldMeta;
    value: unknown;
    onChange: (value: unknown) => void;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
    field,
    value,
    onChange,
}) => {
    // field.fieldMeta is JSONValue in Keystone types, so we cast it to our expected shape
    const fieldMeta = field.fieldMeta as FieldConfigMeta | null;
    const { path, label, controller } = field;

    // Handle Relationship Fields (e.g., Role)
    // Handle Relationship Fields (e.g., Role)
    if (fieldMeta && typeof fieldMeta.refListKey === 'string') {
        const relationshipField = {
            ...field,
            // Cast strictly for RelationshipSelect which expects specific shape
            fieldMeta: {
                ...fieldMeta,
                refListKey: fieldMeta.refListKey,
            }
        };

        return (
            <RelationshipSelect
                field={relationshipField}
                value={value as { value: { id: string; label?: string } } | null}
                onChange={onChange}
            />
        );
    }

    // Handle Boolean Fields (Checkbox)
    // We cast controller to any to safely access 'type' property as it might not be strictly typed in FieldController
    const controllerType = (controller as { type?: string } | undefined)?.type;

    if (fieldMeta?.type === 'Boolean' || controllerType === 'Checkbox') {
        // Checkbox value usually comes as boolean directly or wrapped
        const isChecked = value === true || (value as { value?: boolean })?.value === true;

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
    if (fieldMeta && 'displayMode' in fieldMeta && fieldMeta.displayMode === 'select' && 'options' in fieldMeta && Array.isArray(fieldMeta.options)) {
        const options = (fieldMeta.options as { label: string; value: string | number }[]).map((opt) => ({
            label: opt.label,
            value: opt.value
        }));

        // Value might be simple string or object depending on controller
        const selectedValue = options.find((opt: { label: string; value: string | number }) => opt.value === (value as { value: string | number })?.value || opt.value === value);

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

    const isPassword = path.toLowerCase().includes('password');
    const fieldType = (fieldMeta && 'type' in fieldMeta) ? fieldMeta.type : undefined;
    const type = isPassword ? 'password' : (fieldType === 'Integer' || fieldType === 'Float' ? 'number' : 'text');

    // Extract simple value
    let displayValue = "";
    if (value && typeof value === 'object' && 'value' in value) {
        displayValue = (value as { value: string }).value ?? "";
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
                    const params = (typeof value === "object" && value !== null) ? { ...value, value: val } : { value: val };
                    onChange(params);
                }}
                placeholder={label}
                $fullWidth
            />
        </div>
    );
};
