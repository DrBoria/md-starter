// GoogleAuthButton.tsx
import React from 'react';
import { Button } from '@md/native';
import { useGoogleAuth } from './useGoogleAuth';

const GoogleAuthButton: React.FC = () => {
    const { signIn, signOut } = useGoogleAuth();

    return (
        <>
            <Button onClick={signIn} type="navigation">Google Sign In</Button>
            <Button onClick={signOut} type="navigation">Sign Out</Button>
        </>
    );
};

export { GoogleAuthButton };
