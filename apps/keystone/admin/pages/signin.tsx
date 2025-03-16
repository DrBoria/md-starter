import type { FormEvent } from "react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation } from '@apollo/client';
import {
  useRawKeystone,
  useReinitContext,
} from "@keystone-6/core/admin-ui/context";
import { useRouter } from "@keystone-6/core/admin-ui/router";
import { VisuallyHidden } from "@keystone-ui/core";
import { SignInContainer } from "@md/sections/keystone";
import { BasicSection, Button, Form, Input, PageTitle, PlainText } from "@md/components";
import { useAuthenticate } from "@md/api/graphql";

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
  successTypename,
  failureTypename,
}: ISigninPageProps) {

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

  const { authenticateMutation: mutate, error, loading, data } = useAuthenticate({
    identityField: 'email',
    secretField: 'password',
    failureTypename: 'UserAuthenticationWithPasswordFailure',
    successTypename: 'UserAuthenticationWithPasswordSuccess',
    useMutation
  });

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
        email: state.identity,
        password: state.secret,
      });
      if (data.item?.__typename !== successTypename) return;
    } catch (e) {
      console.error(e);
      return;
    }

    await reinitContext();
    setSubmitted(true);
  };

  return (
    <SignInContainer title="Md App - Sign In">
      <Form onSubmit={onSubmit}>
        <PageTitle>Sign In</PageTitle>
        {error && (
          <PlainText>
            {error.message}
          </PlainText>
        )}
        {data?.authenticate?.__typename === failureTypename && (
          <PlainText>
            {data?.authenticate.message}
          </PlainText>
        )}
        <BasicSection>
          <VisuallyHidden as="label" htmlFor="identity">
            {identityField}
          </VisuallyHidden>
          <Input
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
              <Input
                id="password"
                name="password"
                value={state.secret}
                onChange={(e) => setState({ ...state, secret: e.target.value })}
                placeholder={secretField}
                type="password"
              />
            </>
          )}
        </BasicSection>

        {mode === "forgot password" ? (
          <BasicSection>
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
          </BasicSection>
        ) : (
          <BasicSection>
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
          </BasicSection>
        )}
      </Form>
    </SignInContainer>
  );
}

export default getSigninPage;
