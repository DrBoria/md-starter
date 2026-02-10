import { isCancel, cancel } from '@clack/prompts';
import { ComponentDef } from '../config/features';
import { ComponentSelector } from './component-selector';

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
 * Interactive component selection using Tree UI.
 */
export async function selectComponents(allComponents: ComponentDef[]): Promise<string[]> {
    const selector = new ComponentSelector(allComponents);
    return selector.select();
}
