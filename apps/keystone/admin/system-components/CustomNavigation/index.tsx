import type { NavigationProps } from "@keystone-6/core/admin-ui/components";
import type { ListMeta } from "@keystone-6/core/types";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ListNavItems,
  NavigationContainer,
} from "@keystone-6/core/admin-ui/components";

import type { TModalData, TSideBarModalData } from "../../state";
import { transformPathToReadableFormat } from "../../../utils/transformPathToReadableFormat";
import { Button, MenuItemContainer, Toggle } from "@md/components";
import { MenuItem } from "@md/components/next";
import { Icons } from "@md/components/keystone";
import { CentralModal } from "../../sections//Modals/CentralModal";
import { SideBarModal } from "../../sections/Modals/SideBarModal";
import { ModalData, SideBarModalData, useGlobalVariable } from "../../state";
import { NavigationContainerStyled } from "./styles";
import { useGetSessionData } from "../utils/useGetSessionData";
import { useSignOut } from "../utils/useSignOut";
import { NavItem } from "../NavItem";

const ClientNavigation = React.memo(
  ({ isAdminOwner }: { lists: ListMeta[]; isAdminOwner: boolean }) => {
    return (
      <>
        <MenuItem href="/" offsetBottom>
          <Icons.HomeIcon />
          Dashboard
        </MenuItem>
        <MenuItem href="/examples" offsetBottom>
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
  const [sideBarModalData, setSideBarModalData] =
    useGlobalVariable<TSideBarModalData>(SideBarModalData, "SideBarModalData");
  const [modalData, setModalData] = useGlobalVariable<TModalData>(
    ModalData,
    "ModalData",
  );

  const isAdmin = session?.role?.name === "Admin";
  const isOwner = session?.role?.name === "Owner";

  const readablePath = transformPathToReadableFormat(router.pathname);
  return (
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
          modalData={sideBarModalData}
          hide={() => setSideBarModalData(null)}
        />

        <CentralModal modalData={modalData} hide={() => setModalData(null)} />
      </NavigationContainerStyled>
    </NavigationContainer>
  );
};

export { CustomNavigation };
