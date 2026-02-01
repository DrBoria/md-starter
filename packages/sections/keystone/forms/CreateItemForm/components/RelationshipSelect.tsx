import React, { useMemo } from 'react';
import { useQueryList } from '@md/api/graphql';
import { useQuery } from '@apollo/client';
import { Select } from '@md/components/default/forms/Form/Select';
import type { TOption } from '@md/components/default/forms/Form/Select';
import { FormLabel } from '@md/components/default/forms/Form/FormLabel';
import { SubTitle } from '@md/components/default/data-display/Typography';

interface RelationshipSelectProps {
    field: any;
    value: any;
    onChange: (value: any) => void;
}

export const RelationshipSelect: React.FC<RelationshipSelectProps> = ({
    field,
    value,
    onChange,
}) => {
    const listName = field.fieldMeta.refListKey;
    const labelField = field.fieldMeta.refLabelField || 'name';

    const { data, loading } = useQueryList({
        listName,
        selectedFields: `id ${labelField}`,
        useQuery,
    });

    const options: TOption[] = useMemo(() => {
        if (!data?.items) return [];
        return data.items.map((item: any) => ({
            label: item[labelField] || item.id,
            value: item.id,
        }));
    }, [data, labelField]);

    const selectedOption = useMemo(() => {
        if (!value?.value) return null;
        return options.find((opt) => opt.value === value.value.id) || null;
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
