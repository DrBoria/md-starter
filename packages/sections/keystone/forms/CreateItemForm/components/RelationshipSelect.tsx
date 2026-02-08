import React, { useMemo } from 'react';
import { useQueryList } from '@md/api/graphql';
import { useQuery } from '@apollo/client';
import { Select } from '@md/components/default/forms';
import type { TOption } from '@md/components/default/forms';
import { FormLabel } from '@md/components/default/forms';

interface FieldProps {
    fieldMeta: {
        refListKey: string;
        refLabelField?: string;
        [key: string]: unknown;
    } | null;
    path: string;
    label: string;
    [key: string]: unknown;
}

interface RelationshipSelectProps {
    field: FieldProps;
    value: { value: { id: string; label?: string } } | null;
    onChange: (value: unknown) => void;
}

export const RelationshipSelect: React.FC<RelationshipSelectProps> = ({
    field,
    value,
    onChange,
}) => {
    const listName = field.fieldMeta?.refListKey || '';
    const labelField = field.fieldMeta?.refLabelField || 'name';

    const { data } = useQueryList({
        listName,
        selectedFields: `id ${labelField}`,
        useQuery,
    });

    const options: TOption[] = useMemo(() => {
        if (!data?.items) return [];
        return data.items.map((item: { id: string;[key: string]: unknown }) => ({
            label: (item[labelField] as string) || item.id,
            value: item.id,
        }));
    }, [data, labelField]);

    const selectedOption = useMemo(() => {
        if (!value?.value) return null;
        return options.find((opt) => opt.value === value.value?.id) || null;
    }, [value, options]);

    const handleChange = (option: TOption | null) => {
        if (option) {
            onChange({
                kind: 'one',
                value: { id: option.value, label: option.label },
            });
        } else {
            onChange({ kind: 'one', value: null });
        }
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <FormLabel htmlFor={field.path}>{field.label}</FormLabel>
            <Select
                options={options}
                value={selectedOption}
                onChange={handleChange}
                placeholder={`Select ${field.label}...`}
                isClearable
                isSearchable
            />
        </div>
    );
};
