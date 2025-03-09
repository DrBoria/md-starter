"use client";

// layout.jsx
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@md/api/graphql';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    );
}
