import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useAuthenticate } from '@md/api/graphql';
import { BasicSection, Button, Input, PageTitle, SubTitle } from '@md/native/components';
import { useNavigate } from 'react-router-native';

const ContentContainer = styled(ScrollView)`
  min-height: 100%;
  background-color: ${({ theme }) => theme.colors.section};
  padding-top: ${({ theme }) => theme.offsets.section}px;
  flex-grow: 1;
`;

const ErrorText = styled(SubTitle)`
  color: red;
  margin-bottom: 20px;
  text-align: center;
`;

const SigninPage = () => {
  const [state, setState] = useState({ identity: '', secret: '' });
  const navigate = useNavigate();

  const { authenticateMutation, error, loading, data } = useAuthenticate({
    identityField: 'email',
    secretField: 'password',
    failureTypename: 'UserAuthenticationWithPasswordFailure',
    successTypename: 'UserAuthenticationWithPasswordSuccess'
  });

  const identityFieldRef = useRef(null);

  useEffect(() => {
    identityFieldRef.current?.focus();
  }, []);

  const onSubmit = async () => {
    if (!state.identity || !state.secret) return;

    try {
      const { data } = await authenticateMutation({
        email: state.identity,
        password: state.secret
      });

      if (data?.item?.__typename === 'UserAuthenticationWithPasswordSuccess') {
        navigate('/');
      };
    } catch (e) {
      console.error(e);
      return;
    }
  };


  return (
    <SafeAreaView>
      <ContentContainer
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ alignItems: 'center' }} // Move alignItems here
      >
        <BasicSection>
          <PageTitle>Sign In</PageTitle>
          {error && <ErrorText>{error.message}</ErrorText>}
          {data?.item?.__typename === 'UserAuthenticationWithPasswordFailure' && (
            <ErrorText>{data?.item.message}</ErrorText>
          )}
        </BasicSection>
        <BasicSection>
          <Input
            $offsetBottom
            placeholder="Email"
            value={state.identity}
            onChangeText={(text) => setState({ ...state, identity: text })}
            ref={identityFieldRef}
          />
          <Input
            $offsetBottom
            placeholder="Password"
            value={state.secret}
            onChangeText={(text) => setState({ ...state, secret: text })}
            secureTextEntry
          />
          <Button onClick={onSubmit} disabled={loading}>Sign In</Button>
        </BasicSection>
      </ContentContainer>
    </SafeAreaView>
  );
};

export default SigninPage;
