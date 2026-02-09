
import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useAuthenticate } from '@md/api/graphql';
import { BasicSection, Button, Input, PageTitle, SubTitle } from '@md/native/components';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';

const ContentContainer = styled(ScrollView)`
  min-height: 100%;
  background-color: ${({ theme }) => theme.colors.section};
  padding-top: ${({ theme }) => theme.offsets.section}px;
  flex-grow: 1;
`;

const ErrorText = styled(SubTitle)`
  color: ${({ theme }) => theme.colors.errorText};
  margin-bottom: ${({ theme }) => theme.font.sizes.large};
  text-align: center;
`;

const SigninPage = () => {
  const theme = useTheme();
  const identityFieldRef = useRef<React.ElementRef<typeof Input>>(null);
  const [state, setState] = useState({ identity: '', secret: '' });
  const navigate = useNavigate();

  const { authenticateMutation, error, loading, data } = useAuthenticate({
    identityField: 'email',
    secretField: 'password',
    failureTypename: 'UserAuthenticationWithPasswordFailure',
    successTypename: 'UserAuthenticationWithPasswordSuccess',
    useMutation
  });

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
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.section }}>
      <ContentContainer
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <BasicSection>
          <PageTitle>Sign In</PageTitle>
          {error && <ErrorText>{error.message}</ErrorText>}
          {data?.item?.__typename === 'UserAuthenticationWithPasswordFailure' && (
            <ErrorText>{data?.item.message}</ErrorText>
          )}
          <Input
            $offsetBottom
            placeholder="Email"
            name="identity"
            value={state.identity}
            onChangeText={(text) => setState({ ...state, identity: text })}
            ref={identityFieldRef}
          />
          <Input
            $offsetBottom
            placeholder="Password"
            name="password"
            value={state.secret}
            onChangeText={(text) => setState({ ...state, secret: text })}
            secureTextEntry
          />
          <Button onClick={onSubmit} disabled={loading} type="navigation">Sign In</Button>
        </BasicSection>
      </ContentContainer>
    </SafeAreaView>
  );
};

export default SigninPage;
