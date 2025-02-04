import type { FormEvent } from "react";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  useRawKeystone,
  useReinitContext,
} from "@keystone-6/core/admin-ui/context";
import { useRouter } from "@keystone-6/core/admin-ui/router";
import { Button } from "@keystone-ui/button";
import { H1, Stack, VisuallyHidden } from "@keystone-ui/core";
import { TextInput } from "@keystone-ui/fields";
import { Notice } from "@keystone-ui/notice";

import { SigninContainer } from "../sections/SignInContainer";
import { ThemeProvider } from "@md/styles";
import { useAuthenticate } from "@md/api/graphql";

const useRedirect = () => {
  return useMemo(() => "/", []);
};

const identityField = "email";
const secretField = "password";
const failureTypename = "UserAuthenticationWithPasswordFailure";
const successTypename = "UserAuthenticationWithPasswordSuccess";

function SigninPage() {
  const [mode, setMode] = useState<"signin" | "forgot password">("signin");
  const [state, setState] = useState({ identity: "", secret: "" });
  const [submitted, setSubmitted] = useState(false);

  const identityFieldRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    identityFieldRef.current?.focus();
  }, [mode]);

  const { authenticateMutation, error, loading, data } = useAuthenticate({
    identityField,
    secretField,
    failureTypename,
    successTypename
  });

  const reinitContext = useReinitContext();
  const router = useRouter();
  const rawKeystone = useRawKeystone();
  const redirect = useRedirect();

  // if we are signed in, redirect immediately
  useEffect(() => {
    if (submitted) return;
    if (rawKeystone.authenticatedItem.state === "authenticated") {
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
      const { data } = await authenticateMutation({
        [identityField]: state.identity,
        [secretField]: state.secret,
      });
      if (data?.item?.__typename !== successTypename) return;
    } catch (e) {
      console.error(e);
      return;
    }

    await reinitContext();
    setSubmitted(true);
  };

  return (
    <ThemeProvider>
      <SigninContainer title="TruAgents - Sign In">
        <Stack gap="xlarge" as="form" onSubmit={onSubmit}>
          <H1>Sign In</H1>
          {error && (
            <Notice title="Error" tone="negative">
              {error.message}
            </Notice>
          )}
          {data?.item?.__typename === failureTypename && (
            <Notice title="Error" tone="negative">
              {data?.item.message}
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
              <Fragment>
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
              </Fragment>
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
                  data?.item?.__typename === successTypename
                }
                type="submit"
              >
                Sign in
              </Button>
            </Stack>
          )}
        </Stack>
      </SigninContainer>
    </ThemeProvider>
  );
}

export default SigninPage;
