"use client";

import { Button, Form, Input } from '@md/components'
import { useAuthenticate } from '@md/api/graphql';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';

export function LoginForm() {
    const router = useRouter();

    const { authenticateMutation } = useAuthenticate({
        identityField: 'email',
        secretField: 'password',
        failureTypename: 'UserAuthenticationWithPasswordFailure',
        successTypename: 'UserAuthenticationWithPasswordSuccess',
        useMutation
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        const { data } = await authenticateMutation({
            email,
            password
        });
        if (data?.item?.__typename === 'UserAuthenticationWithPasswordSuccess') {
            router.push('/');
        };
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input name='email' $offsetBottom />
            <Input name='password' type='password' $offsetBottom />
            <Button type='submit'>Login</Button>
        </Form>
    )
}
