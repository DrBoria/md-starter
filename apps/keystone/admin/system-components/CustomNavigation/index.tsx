import type { NavigationProps } from "@keystone-6/core/admin-ui/components";
import type { ListMeta } from "@keystone-6/core/types";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ListNavItems,
  NavigationContainer,
} from "@keystone-6/core/admin-ui/components";

import { GlobalVars } from "../../state";
import { transformPathToReadableFormat } from "@md/utils";
import { Button, Toggle } from "@md/components";
import { MenuItem } from "@md/components";
import { Icons } from "@md/components/keystone";
import { NavigationContainerStyled } from "./styles";
import { NavItem } from "@md/components/keystone";
import { ThemeProvider } from "@md/styles";
import { SideBarModal, CentralModal, useSignOut, useGetSessionData } from "@md/sections/keystone";

const ClientNavigation = React.memo(
  ({ isAdminOwner }: { lists: ListMeta[]; isAdminOwner: boolean }) => {
    return (
      <>
        <MenuItem href="/" $offsetBottom>
          <Icons.HomeIcon />
          Dashboard
        </MenuItem>
        <MenuItem href="/examples" $offsetBottom>
          <Icons.SettingsIcon />
          Examples
        </MenuItem>
        {/* Show only for admin and owner */}
        {isAdminOwner && (
          <NavItem href="/users">
            <Icons.UsersIcon />
            Users
          </NavItem>
        )}
      </>
    );
  },
);

const CustomNavigation = ({ lists, authenticatedItem }: NavigationProps) => {
  const [signOut] = useSignOut();
  const router = useRouter();
  // Define access rights
  const sessionData = useGetSessionData(authenticatedItem);
  const session = sessionData?.length ? sessionData[0] : null;

  const isAdmin = session?.role?.name === "Admin";
  const isOwner = session?.role?.name === "Owner";

  const readablePath = transformPathToReadableFormat(router.pathname);
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Head>
          <title>Keystone {readablePath ? `| ${readablePath}` : ""}</title>
        </Head>

        <NavigationContainerStyled>
          {isAdmin ? (
            // Admin Navigation
            <>
              <Toggle title="SuperAdmin Pages">
                <ListNavItems lists={lists} />
              </Toggle>
              <Toggle title="Client Pages">
                <ClientNavigation
                  lists={lists}
                  isAdminOwner={isAdmin || isOwner}
                />
              </Toggle>
            </>
          ) : (
            // Contact Navigation
            <ClientNavigation lists={lists} isAdminOwner={isAdmin || isOwner} />
          )}

          {authenticatedItem.state === "authenticated" && (
            <Button type="menu" onClick={() => signOut()}>
              {"Sign out"}
            </Button>
          )}

          <SideBarModal
            modalData={GlobalVars.SideBarModalData}
            hide={() => GlobalVars.SideBarModalData = null}
          />

          <CentralModal modalData={GlobalVars.ModalData} hide={() => GlobalVars.ModalData = null} />
        </NavigationContainerStyled>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export { CustomNavigation };
