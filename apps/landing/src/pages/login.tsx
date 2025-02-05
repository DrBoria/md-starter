import Head from 'next/head'
import { Button, Form, Input, Section, TextContainer } from '@md/components'
import { PageTitle } from '@md/components'
import { useAuthenticate } from '@md/api/graphql';
import { useRouter } from 'next/router';

export default function Login() {
    // LOADING
    const router = useRouter();

    const { authenticateMutation } = useAuthenticate({
        identityField: 'email',
        secretField: 'password',
        failureTypename: 'UserAuthenticationWithPasswordFailure',
        successTypename: 'UserAuthenticationWithPasswordSuccess'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        const { data } = await authenticateMutation({
            email,
            password
        });
        // UserAuthenticationWithPasswordSuccess means authentication successfull. If you choose users table - change mitation name
        if (data?.item?.__typename === 'UserAuthenticationWithPasswordSuccess') {
            router.push('/');
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
