declare module '@_app_original' {
    import type { AppProps } from 'next/app';
    import type { ElementType } from 'react';

    const KeystoneAppModule: {
        default?: ElementType<AppProps>;
    } | ElementType<AppProps>;

    export default KeystoneAppModule;
}
