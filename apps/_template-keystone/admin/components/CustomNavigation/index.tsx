import type { NavigationProps } from "@keystone-6/core/admin-ui/components";
import type { ListMeta } from "@keystone-6/core/types";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  NavigationContainer,
} from "@keystone-6/core/admin-ui/components";

import { transformPathToReadableFormat } from "@md/utils";
import { Button } from "@md/components";
import { Icons, Toggle } from "@md/components/keystone";
import { NavigationContainerStyled } from "./styles";
import { NavItem } from "@md/components/keystone";
import { useSignOut, useGetSessionData } from "@md/sections/keystone";

const USERS_LIST_KEY = "Users";

const LIST_ICONS = {
  Users: Icons.UsersIcon,
  Role: Icons.KeyIcon,
  Post: Icons.FileTextIcon,
};

const getIconForList = (listKey) => {
  const IconComponent = LIST_ICONS[listKey];
  return IconComponent ? <IconComponent /> : <Icons.BoxIcon />;
};

const renderListItem = (list, isAdmin, currentUserId) => {
  if (list.key === USERS_LIST_KEY) {
    if (isAdmin) {
      return (
        <NavItem key={list.key} href="/users">
          <Icons.UsersIcon />
          Users
        </NavItem>
      );
    }
    return (
      <NavItem
        key={list.key}
        href={currentUserId ? `/users/${currentUserId}` : "/users"}
      >
        <Icons.SettingsIcon />
        Settings
      </NavItem>
    );
  }

  return (
    <NavItem key={list.key} href={`/${list.path}`}>
      {getIconForList(list.key)}
      {list.label}
    </NavItem>
  );
};

const CustomNavigation = ({ lists, authenticatedItem }: NavigationProps) => {
  const [signOut] = useSignOut();
  const router = useRouter();
  const sessionData = useGetSessionData(authenticatedItem);
  const session = sessionData?.length ? sessionData[0] : null;

  const isAdmin = session?.role?.name === "Admin";
  const currentUserId = session?.id || null;

  const readablePath = transformPathToReadableFormat(router.pathname);

  const clientNavigation = (
    <>
      <NavItem href="/">
        <Icons.HomeIcon />
        Dashboard
      </NavItem>
      {lists.map((list) => renderListItem(list, isAdmin, currentUserId))}
    </>
  );

  return (
    <NavigationContainer>
      <Head>
        <title>Keystone {readablePath ? `| ${readablePath}` : ""}</title>
      </Head>

      <NavigationContainerStyled>
        {isAdmin ? (
          <>
            <Toggle title="SuperAdmin Pages">
              {lists.map((list) => (
                <NavItem key={list.key} href={`/${list.path}`}>
                  {getIconForList(list.key)}
                  {list.label}
                </NavItem>
              ))}
            </Toggle>
            <Toggle title="Client Pages">
              {clientNavigation}
            </Toggle>
          </>
        ) : (
          clientNavigation
        )}

        {authenticatedItem.state === "authenticated" && (
          <Button type="button" onClick={() => signOut()}>
            {"Sign out"}
          </Button>
        )}
      </NavigationContainerStyled>
    </NavigationContainer>
  );
};

export { CustomNavigation };
