import React from 'react';
import KeystoneApp from '../../.keystone/admin/pages/_app.js';
import { LoggerProvider, ModalProvider } from '@md/components/keystone';
import { CentralModal, FullScreenModal } from '@md/components';
import { SideBarModal } from '@md/sections/keystone';
import { dark, ThemeProvider } from '@md/styles';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { apolloClient } from '@md/api/graphql';
import { type AppProps } from 'next/app'

function WrappedApp({ Component, pageProps, ...otherProps }: AppProps) {
    // @ts-ignore
    const Wrapped = (props) => (
        <ApolloProvider client={apolloClient as unknown as ApolloClient<any>}>
            <ThemeProvider theme={dark}>
                <LoggerProvider>
                    <ModalProvider>
                        <FullScreenModal />
                        <SideBarModal />
                        <CentralModal />
                        <Component {...props} />
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
