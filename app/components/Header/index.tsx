import * as React from 'react';
import { AppBar } from '@material-ui/core';
import styled from 'styles/styled-components';

interface Props {
  title: string;
}

export default function Header(props: Props) {

  const ContentContainer = styled.span`
    align-items: center;
    display: flex;
    height: 56px;
    padding-left: 24px;
    font-size: 14px;
  `;

  const TextContainer = styled.span`
    color: rbg(255, 255, 255);
    opacity: 0.8;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  `;

  return(
    <div className="comp-header">
      <AppBar position="static" color="primary">
        <ContentContainer>
          <TextContainer>{props.title}</TextContainer>
        </ContentContainer>
      </AppBar>
    </div>
  );
}

