import { isCancel, cancel, select } from '@clack/prompts';
import { ComponentDef } from '../config/features';

export class ComponentSelector {
    private selected = new Set<string>();
    private lastFocused: string | undefined;

    constructor(private components: ComponentDef[]) { }

    async select(): Promise<string[]> {
        while (true) {
            const options = this.buildOptions();

            const action = await select({
                message: 'Select components to install:',
                options,
                initialValue: this.lastFocused
            });

            if (isCancel(action)) {
                cancel('Operation cancelled.');
                process.exit(0);
            }

            if (action === 'DONE') break;

            this.handleToggle(action as string);
            this.lastFocused = action as string;
        }

        return this.getSelectedIds();
    }

    private buildOptions() {
        const options: { value: string; label: string; hint?: string }[] = [];
        const groups = Array.from(new Set(this.components.map(c => c.group))).sort();

        for (const group of groups) {
            const groupComponents = this.components.filter(c => c.group === group);
            const groupState = this.getSelectionState(groupComponents.map(c => c.id));
            const icon = this.stateIcon(groupState);

            options.push({
                value: `group:${group}`,
                label: `${icon} ${group.charAt(0).toUpperCase() + group.slice(1)}`,
                hint: groupState === 'ALL' ? 'All selected' : (groupState === 'PARTIAL' ? 'Partial' : '')
            });

            // Categories
            const categories = Array.from(new Set(groupComponents.map(c => c.category).filter(Boolean))) as string[];
            categories.sort().forEach(cat => {
                const catComps = groupComponents.filter(c => c.category === cat);
                const catState = this.getSelectionState(catComps.map(c => c.id));
                const catIcon = this.stateIcon(catState);

                options.push({
                    value: `cat:${group}:${cat}`,
                    label: `    ${catIcon} ${cat}`,
                    hint: `${catComps.length} items`
                });
            });

            // Direct Components (e.g. Textures/Cloud)
            const direct = groupComponents.filter(c => !c.category);
            direct.sort((a, b) => a.id.localeCompare(b.id)).forEach(comp => {
                const isSelected = this.selected.has(comp.id);
                const compIcon = isSelected ? '✔' : '·';
                let label = comp.label;

                options.push({
                    value: `id:${comp.id}`,
                    label: `    ${compIcon} ${label}`,
                });
            });
        }

        // Confirm at the bottom
        options.push({
            value: 'DONE',
            label: `→ Confirm selection`,
            hint: `${this.selected.size} items`
        });

        return options;
    }

    private handleToggle(action: string) {
        if (action.startsWith('group:')) {
            const group = action.split(':')[1];
            const comps = this.components.filter(c => c.group === group);
            const allSelected = comps.every(c => this.selected.has(c.id));

            if (allSelected) {
                comps.forEach(c => this.selected.delete(c.id));
            } else {
                comps.forEach(c => this.selected.add(c.id));
            }
        } else if (action.startsWith('cat:')) {
            const [, group, cat] = action.split(':');
            const comps = this.components.filter(c => c.group === group && c.category === cat);
            const allSelected = comps.every(c => this.selected.has(c.id));

            if (allSelected) {
                comps.forEach(c => this.selected.delete(c.id));
            } else {
                comps.forEach(c => this.selected.add(c.id));
            }
        } else if (action.startsWith('id:')) {
            const id = action.split(':')[1];
            if (this.selected.has(id)) {
                this.selected.delete(id);
            } else {
                this.selected.add(id);
            }
        }
    }

    private getSelectionState(ids: string[]): 'ALL' | 'PARTIAL' | 'NONE' {
        if (ids.length === 0) return 'NONE';
        const count = ids.filter(id => this.selected.has(id)).length;
        if (count === ids.length) return 'ALL';
        if (count > 0) return 'PARTIAL';
        return 'NONE';
    }

    private stateIcon(state: 'ALL' | 'PARTIAL' | 'NONE'): string {
        switch (state) {
            case 'ALL': return '✔';
            case 'PARTIAL': return '◐';
            case 'NONE': return '·';
        }
    }

    private getSelectedIds(): string[] {
        return Array.from(this.selected);
    }
}
