import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

import { selectEnv } from "@app/env";
import { loginUrl, ssoDirectUrl, ssoFailureUrl } from "@app/routes";

import { HeroBgLayout } from "../layouts";
import {
  Banner,
  Box,
  Button,
  ButtonLink,
  ExternalLink,
  FormGroup,
  Input,
  Loading,
  tokens,
} from "../shared";

export const SsoLoginPage = () => {
  const navigate = useNavigate();
  const [org, setOrg] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(ssoDirectUrl(org));
  };

  return (
    <HeroBgLayout>
      <div className="text-center mt-16">
        <h1 className={`${tokens.type.h1} text-center`}>Single Sign On</h1>
        <p className="my-6 text-gray-600">
          Use your organization's single sign-on provider to authenticate with
          Aptible.
        </p>
      </div>
      <Box>
        <form onSubmit={onSubmit}>
          <FormGroup label="Organization ID / Name" htmlFor="org">
            <Input
              type="text"
              name="org"
              id="org"
              onChange={(e) => setOrg(e.currentTarget.value)}
            />
          </FormGroup>

          <Button type="submit" className="w-full mt-4" disabled={org === ""}>
            Log In
          </Button>
        </form>
      </Box>
    </HeroBgLayout>
  );
};

export const SsoDirectPage = () => {
  const { orgId = "" } = useParams();
  const env = useSelector(selectEnv);

  useEffect(() => {
    if (orgId === "") return;
    const redirect = encodeURIComponent(`${env.appUrl}${ssoFailureUrl()}`);
    const url = `${env.authUrl}/organizations/${orgId}/saml/login?redirect_uri=${redirect}`;
    window.location.href = url;
  }, [orgId]);

  return (
    <HeroBgLayout>
      <Loading />
    </HeroBgLayout>
  );
};

export const SsoFailurePage = () => {
  const [params] = useSearchParams();
  const message = params.get("message");

  return (
    <HeroBgLayout>
      <div className="text-center mt-16">
        <h1 className={`${tokens.type.h1} text-center`}>
          We could not process your Single Sign-On (SSO) login
        </h1>
        <Banner variant="error" className="my-6">
          {message}
        </Banner>
      </div>
      <Box>
        <ButtonLink to={loginUrl()} className="font-semibold w-full">
          Back to Login
        </ButtonLink>

        <p className="mt-4">
          Not an Enterprise customer?{" "}
          <ExternalLink
            href="https://aptible.zendesk.com/hc/en-us/requests/new"
            variant="info"
          >
            Contact support
          </ExternalLink>{" "}
          to learn more about upgrading your account to support SSO.
        </p>
      </Box>
    </HeroBgLayout>
  );
};