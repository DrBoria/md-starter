
import React from 'react';
import { H3 } from '@keystone-ui/core';
import { Logo } from '@md/components';
import { CustomNavigation } from './components/CustomNavigation';

function CustomLogo() {
    return (
        <React.Fragment>
            <Logo variant="light" />
            <H3>MD Admin</H3>
        </React.Fragment>
    );
}

export const components = {
    Logo: CustomLogo,
    Navigation: CustomNavigation
};
