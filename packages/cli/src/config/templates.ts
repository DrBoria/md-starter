import { getTemplatePath } from '../utils/paths';

export const TEMPLATES = {
    landing: {
        dir: getTemplatePath('_template-landing'),
        componentPkg: '@md/components',
        label: 'Landing Page (Next.js)',
        infraType: 'static-site'
    },
    keystone: {
        dir: getTemplatePath('_template-keystone'),
        componentPkg: null,
        label: 'Keystone CMS (Backend)',
        infraType: 'container-service'
    },
    mobile: {
        dir: getTemplatePath('_template-native'),
        componentPkg: '@md/native',
        label: 'Mobile App (React Native)',
        infraType: null
    },
    styleguide: {
        dir: getTemplatePath('_template-styleguide'),
        componentPkg: '@md/components',
        label: 'UI Kit (Styleguidist)',
        infraType: 'static-site'
    }
} as const;

export type TemplateKey = keyof typeof TEMPLATES;
