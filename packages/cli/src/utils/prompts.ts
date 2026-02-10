import { isCancel, cancel, multiselect } from '@clack/prompts';
import { ComponentDef } from '../config/features';

/**
 * Checks if a prompt was cancelled and exits if so.
 */
export function checkCancel(value: any) {
    if (isCancel(value)) {
        cancel('Operation cancelled.');
        process.exit(0);
    }
}

/**
 * Interactive 2-step component selection: Category -> Components.
 */
export async function selectComponents(allComponents: ComponentDef[]): Promise<string[]> {
    const options: { value: string; label: string; hint?: string }[] = [];
    const groups = Array.from(new Set(allComponents.map(c => c.group))).sort();

    for (const group of groups) {
        const groupComponents = allComponents.filter(c => c.group === group);

        // Categories
        const categories = Array.from(new Set(groupComponents.map(c => c.category).filter(Boolean))) as string[];
        categories.sort().forEach(cat => {
            const count = groupComponents.filter(c => c.category === cat).length;
            options.push({
                value: `cat:${group}:${cat}`,
                label: `${group.charAt(0).toUpperCase() + group.slice(1)} / ${cat}`,
                hint: `${count} items`
            });
        });

        // Direct Components
        const directComponents = groupComponents.filter(c => !c.category);
        directComponents.sort((a, b) => a.id.localeCompare(b.id)).forEach(comp => {
            let label = comp.label;
            if (group === 'textures') label = label.replace(/^Texture:\s*/, '');
            if (group === 'keystone') label = label.replace(/^Keystone:\s*/, '');

            options.push({
                value: `id:${comp.id}`,
                label: `${group.charAt(0).toUpperCase() + group.slice(1)} / ${label}`,
                hint: 'Component'
            });
        });
    }

    if (options.length === 0) return [];

    const selection = await multiselect({
        message: 'Select categories (groups) or components:',
        options: options,
        required: false
    });
    checkCancel(selection);

    if (!Array.isArray(selection)) return [];

    let selectedIds: string[] = [];

    for (const val of selection as string[]) {
        if (val.startsWith('cat:')) {
            const [, group, cat] = val.split(':');
            const comps = allComponents.filter(c => c.group === group && c.category === cat);
            selectedIds.push(...comps.map(c => c.id));
        } else if (val.startsWith('id:')) {
            selectedIds.push(val.substring(3));
        }
    }

    return Array.from(new Set(selectedIds));
}
