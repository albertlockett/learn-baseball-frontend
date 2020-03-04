import * as React from 'react';
import { AppBar } from '@material-ui/core';
import styled from 'styles/styled-components';
import OktaSignIn from '@okta/okta-signin-widget';

interface Props {
  title: string;
}

const ContentContainer = styled.span`
  align-items: center;
  display: flex;
  height: 56px;
  padding-left: 24px;
  font-size: 14px;
  width: 100%
`;

const TextContainer = styled.span`
  color: rbg(255, 255, 255);
  opacity: 0.8;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const UserContainer = styled.span`
  position: absolute;
  cursor: pointer;
  right: 20px;
  color: white;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

export default function Header(props: Props) {

  const config = {
    el: '#signin',
    baseUrl: 'https://dev-398621.okta.com',
    // clientId: '0oa2ug4pqarbxJfjb4x6',
    authParams: {
      // issuer: 'https://dev-398621.okta.com/oauth2/default',
      pkce: true,
    },
  };

  const onClickSignIn = () => {
    const signIn = new  OktaSignIn(config);
    signIn.showSignInToGetTokens({

      clientId: '0oa2ug4pqarbxJfjb4x6',

      // must be in the list of redirect URIs enabled for the OIDC app
      redirectUri: 'http://localhost:3000/cllback',

      // Return an access token from the authorization server
      getAccessToken: true,

      // Return an ID token from the authorization server
      getIdToken: true,
      scope: 'openid profile',
    });
  };

  return(
    <div className="comp-header">
      <AppBar position="static" color="primary">
        <ContentContainer>
          <TextContainer>{props.title}</TextContainer>
          <UserContainer>
            <a onClick={onClickSignIn}>Sign In</a>
            <div id="signin" />
          </UserContainer>
        </ContentContainer>
      </AppBar>
    </div>
  );
}

