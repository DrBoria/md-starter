// useGoogleAuth.ts
import { useCallback } from 'react';
import { statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleSignin } from './oauth';

interface GoogleUser {
  id: string;
  email: string;
  name?: string;
  photoUrl?: string;
}

interface GoogleError {
  code: string;
  message: string;
}

const useGoogleAuth = () => {
  const signIn = useCallback(async (): Promise<void> => {
    try {
      const hasPlayService = await GoogleSignin.hasPlayServices();
      if (hasPlayService) {
        const userInfo = await GoogleSignin.signIn();
        console.log(JSON.stringify(userInfo));
      }
    } catch (error) {
      if (error instanceof Error) {
        handleSignInError(error);
      }
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log("User signed out.");
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSignInError = (error: { code: string }) => {
    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        console.log("User cancelled the sign-in.");
        break;
      case statusCodes.IN_PROGRESS:
        console.log("Sign-in is in progress.");
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        console.log("Play services not available or outdated.");
        break;
      default:
        console.log("Some other error happened:", error);
    }
  };

  return { signIn, signOut };
};

export { useGoogleAuth };
