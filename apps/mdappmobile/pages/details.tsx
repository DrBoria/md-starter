import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useAuthenticate, useQueryList } from '@md/api/graphql';
import {
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GoogleSignin } from '../oauth';

const signIn = async () => {
  try {
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn().then((userInfo) => {
          console.log(JSON.stringify(userInfo))
        }).catch((e) => { console.log("ERROR IS THIS: " + JSON.stringify(e)); })
      }
    }).catch((e) => { console.log("ERROR PLAY SERVICE IS: " + JSON.stringify(e)); })
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("User cancelled the sign-in.");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("Sign-in is in progress.");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("Play services not available or outdated.");
    } else {
      console.log("Some other error happened:", error);
    }
  }
};

const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess(); // Clear cached token
    await GoogleSignin.signOut();
    console.log("User signed out.");
  } catch (error) {
    console.error(error);
  }
};

const SigninPage = () => {
  const [state, setState] = useState({ identity: '', secret: '' });
  const [submitted, setSubmitted] = useState(false);
  const { data: dataPosts, error: errorPosts, refetch } = useQueryList({
    listName: "Post",
    selectedFields: 'id name',
  });

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
      console.log('response what about ....', data);

      // UserAuthenticationWithPasswordSuccess means authentication successfull. If you choose users table - change mitation name
      if (data?.item?.__typename !== 'UserAuthenticationWithPasswordSuccess') return;
    } catch (e) {
      console.error(e);
      return;
    }

    setSubmitted(true);
  };

  const onPosts = async () => {
    await refetch();
    console.log('data: ', dataPosts, 'error: ', errorPosts);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      {error && <Text style={styles.error}>{error.message}</Text>}
      {data?.item?.__typename === 'UserAuthenticationWithPasswordFailure' && (
        <Text style={styles.error}>{data?.item.message}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={state.identity}
        onChangeText={(text) => setState({ ...state, identity: text })}
        ref={identityFieldRef}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={state.secret}
        onChangeText={(text) => setState({ ...state, secret: text })}
        secureTextEntry
      />

      <Button title="Sign In" onPress={onSubmit} disabled={loading} />

      <Button title="GetPosts" onPress={onPosts} disabled={loading} />
      <Button title="Google" onPress={signIn} />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default SigninPage;
