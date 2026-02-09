import React from 'react';
import KeystoneAppModule from '@_app_original';
import { LoggerProvider, ModalProvider, CentralModal, FullScreenModal } from '@md/components/keystone';
// import { App } from "../../.keystone/admin/pages/_app_original";
import { RightSideBar } from "@/admin/components/RightSideBar";
import { viking, ThemeProvider, GlobalStyles } from '@md/styles';
import type { ApolloClient } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@md/api/graphql';
import type { AppProps } from 'next/app';

const KeystoneApp = (KeystoneAppModule as { default?: React.ElementType }).default || (KeystoneAppModule as React.ElementType);

function WrappedApp({ Component, pageProps, ...otherProps }: AppProps) {
    const Wrapped = (props: AppProps) => (
        <ApolloProvider client={apolloClient as ApolloClient<object>}>
            <ThemeProvider theme={viking}>
                <GlobalStyles />
                <LoggerProvider>
                    <ModalProvider>
                        <>
                            <FullScreenModal />
                            <RightSideBar />
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
// function WrappedApp(props) {
//     return (
//         <ApolloProvider client={apolloClient as ApolloClient<any>}>
//             <ThemeProvider theme={viking}>
//                 <LoggerProvider>
//                     <ModalProvider>
//                         <FullScreenModal />
//                         <RightSideBar />
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
//     WrappedApp.getInitialProps = KeystoneApp.getInitialProps;
// }

export default WrappedApp;
