import type { FormEvent } from "react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { gql, useMutation } from "@keystone-6/core/admin-ui/apollo";
import {
  useRawKeystone,
  useReinitContext,
} from "@keystone-6/core/admin-ui/context";
import { useRouter } from "@keystone-6/core/admin-ui/router";
import { Button } from "@keystone-ui/button";
import { H1, Stack, VisuallyHidden } from "@keystone-ui/core";
import { TextInput } from "@keystone-ui/fields";
import { Notice } from "@keystone-ui/notice";
import { SignInContainer } from "@md/sections/keystone";

// TODO: use after approve and design update
// import { GoogleSignInButton } from "../components/GoogleSignInButton";
interface ISigninPageProps {
  identityField: string;
  secretField: string;
  mutationName: string;
  successTypename: string;
  failureTypename: string;
}

// NOTE: if you've changed User table name - update fields in props
const props = {
  identityField: "email",
  secretField: "password",
  mutationName: "authenticateUserWithPassword",
  successTypename: "UserAuthenticationWithPasswordSuccess",
  failureTypename: "UserAuthenticationWithPasswordFailure",
};
const getSigninPage = () => <SigninPage {...props} />;
const useRedirect = () => useMemo(() => "/", []);

function SigninPage({
  identityField,
  secretField,
  mutationName,
  successTypename,
  failureTypename,
}: ISigninPageProps) {
  const mutation = gql`
    mutation($identity: String!, $secret: String!) {
      authenticate: ${mutationName}(${identityField}: $identity, ${secretField}: $secret) {
        ... on ${successTypename} {
          item {
            id
          }
        }
        ... on ${failureTypename} {
          message
        }
      }
    }
  `;

  const [mode, setMode] = useState<"signin" | "forgot password">("signin");
  const [state, setState] = useState({ identity: "", secret: "" });
  const [submitted, setSubmitted] = useState(false);

  const searchParams = useSearchParams();
  const params = searchParams.toString();
  const licenseCode = searchParams.get("code");

  const identityFieldRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    identityFieldRef.current?.focus();
  }, [mode]);

  const [mutate, { error, loading, data }] = useMutation(mutation);
  const reinitContext = useReinitContext();
  const router = useRouter();
  const rawKeystone = useRawKeystone();
  const redirect = useRedirect();

  const connectLicenseToUser = async (code: string, userId: string) => {
    await fetch("/appsumo/license-connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        userId,
      }),
    });
  };

  // if we are signed in, redirect immediately
  useEffect(() => {
    if (submitted) return;
    if (rawKeystone.authenticatedItem.state === "authenticated") {
      if (licenseCode) {
        // If license code is provided - we need to connect License with current user
        // This will be user for logged in / logged of or just creted user
        void connectLicenseToUser(
          licenseCode,
          rawKeystone.authenticatedItem.id,
        );
      }
      void router.push(redirect);
    }
  }, [rawKeystone.authenticatedItem, router, redirect, submitted]);

  useEffect(() => {
    if (!submitted) return;

    // @ts-expect-error
    if (rawKeystone.adminMeta?.error?.message === "Access denied") {
      void router.push("/no-access");
      return;
    }

    void router.push(redirect);
  }, [rawKeystone.adminMeta, router, redirect, submitted]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    void event.preventDefault();

    if (mode !== "signin") return;

    try {
      const { data } = await mutate({
        variables: {
          identity: state.identity,
          secret: state.secret,
        },
      });
      if (data.authenticate?.__typename !== successTypename) return;
    } catch (e) {
      console.error(e);
      return;
    }

    await reinitContext();
    setSubmitted(true);
  };

  return (
    <SignInContainer title="TruAgents - Sign In">
      <Stack gap="xlarge" as="form" onSubmit={onSubmit}>
        <H1>Sign In</H1>
        {error && (
          <Notice title="Error" tone="negative">
            {error.message}
          </Notice>
        )}
        {data?.authenticate?.__typename === failureTypename && (
          <Notice title="Error" tone="negative">
            {data?.authenticate.message}
          </Notice>
        )}
        <Stack gap="medium">
          <VisuallyHidden as="label" htmlFor="identity">
            {identityField}
          </VisuallyHidden>
          <TextInput
            id="identity"
            name="identity"
            value={state.identity}
            onChange={(e) => setState({ ...state, identity: e.target.value })}
            placeholder={identityField}
            ref={identityFieldRef}
          />
          {mode === "signin" && (
            <>
              <VisuallyHidden as="label" htmlFor="password">
                {secretField}
              </VisuallyHidden>
              <TextInput
                id="password"
                name="password"
                value={state.secret}
                onChange={(e) => setState({ ...state, secret: e.target.value })}
                placeholder={secretField}
                type="password"
              />
            </>
          )}
        </Stack>

        {mode === "forgot password" ? (
          <Stack gap="medium" across>
            <Button type="submit" weight="bold" tone="active">
              Log reset link
            </Button>
            <Button
              weight="none"
              tone="active"
              onClick={() => setMode("signin")}
            >
              Go back
            </Button>
          </Stack>
        ) : (
          <Stack gap="medium" across>
            <Button
              weight="bold"
              tone="active"
              isLoading={
                loading ||
                // this is for while the page is loading but the mutation has finished successfully
                data?.authenticate?.__typename === successTypename
              }
              type="submit"
            >
              Sign in
            </Button>
            {/* <Stack gap="medium">
              <GoogleSignInButton />
            </Stack> */}
            <Button
              weight="none"
              tone="active"
              onClick={() =>
                router.push(`/signup${params ? `?${params}` : ""}`)
              }
            >
              Sign Up
            </Button>
            {/* Google Sign-In Button */}
            {/* <div id="google-signin-button" /> */}
          </Stack>
        )}
      </Stack>
    </SignInContainer>
  );
}

export default getSigninPage;
