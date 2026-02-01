import React from 'react';
import KeystoneAppModule from '../../.keystone/admin/pages/_app';
import { LoggerProvider, ModalProvider } from '@md/components/keystone';
import { CentralModal, FullScreenModal } from '@md/components';
import { SideBarModal } from '@md/sections/keystone';
import { dark, viking, liquidGlass, ThemeProvider, GlobalStyles } from '@md/styles';
import type { ApolloClient } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@md/api/graphql';
import type { AppProps } from 'next/app';

const KeystoneApp = (KeystoneAppModule as { default?: React.ElementType }).default || (KeystoneAppModule as React.ElementType);

function WrappedApp({ Component, pageProps, ...otherProps }: AppProps) {
    // @ts-ignore
    const Wrapped = (props) => (
        <ApolloProvider client={apolloClient as unknown as ApolloClient<object>}>
            <ThemeProvider theme={liquidGlass}>
                <GlobalStyles />
                <LoggerProvider>
                    <ModalProvider>
                        <>
                            <FullScreenModal />
                            <SideBarModal />
                            <CentralModal />
                            <Component {...props} />
                        </>
                    </ModalProvider>
                </LoggerProvider>
            </ThemeProvider>
        </ApolloProvider>
    );

    return <KeystoneApp Component={Wrapped} pageProps={pageProps} {...otherProps} />;
}

// NOTE: Option 2, our wrapper above keystone wrapper
// // @ts-ignore
// function WrappedApp(props) {
//     return (
//         <ApolloProvider client={apolloClient as unknown as ApolloClient<any>}>
//             <ThemeProvider theme={dark}>
//                 <LoggerProvider>
//                     <ModalProvider>
//                         <FullScreenModal />
//                         <SideBarModal />
//                         <CentralModal />
//                         <KeystoneApp {...props} />
//                     </ModalProvider>
//                 </LoggerProvider>
//             </ThemeProvider>
//         </ApolloProvider>
//     );
// }

// // Copy static methods from KeystoneApp
// if (KeystoneApp.getInitialProps) {
//     // @ts-ignore
//     WrappedApp.getInitialProps = KeystoneApp.getInitialProps;
// }

export default WrappedApp;
