import React from 'react'
import { Button, Form, Input, Section, TextContainer } from '@md/components'
import { PageTitle } from '@md/components'
import { useAuthenticate } from '@md/api/graphql';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import type { FormEvent } from 'react';

export default function Login() {
    // LOADING
    const router = useRouter();

    const { authenticateMutation } = useAuthenticate({
        identityField: 'email',
        secretField: 'password',
        failureTypename: 'UserAuthenticationWithPasswordFailure',
        successTypename: 'UserAuthenticationWithPasswordSuccess',
        useMutation
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // @ts-ignore
        const email = e.target.elements.email.value;
        // @ts-ignore
        const password = e.target.elements.password.value;

        const { data } = await authenticateMutation({
            email,
            password
        });
        // UserAuthenticationWithPasswordSuccess means authentication successfull. If you choose users table - change mitation name
        if (data?.item?.__typename === 'UserAuthenticationWithPasswordSuccess') {
            await router.push('/');
        };
    };

    return (
        <Section $sectionSize='full' $direction='vertical'>
            <TextContainer>
                <PageTitle $offsetBottom>Login</PageTitle>
                <Form onSubmit={handleSubmit}>
                    <Input name='email' $offsetBottom />
                    <Input name='password' type='password' $offsetBottom />
                    <Button type='submit'>Login</Button>
                </Form>
            </TextContainer>
        </Section>
    )
}
