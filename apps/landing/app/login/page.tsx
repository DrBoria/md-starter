import { Section, TextContainer } from '@md/components';
import { PageTitle } from '@md/components';
import { LoginForm } from './LoginForm';

export default function Login() {
  return (
    <Section $sectionSize="full" $direction="vertical">
      <TextContainer>
        <PageTitle $offsetBottom>Login</PageTitle>
        <LoginForm />
      </TextContainer>
    </Section>
  );
}
