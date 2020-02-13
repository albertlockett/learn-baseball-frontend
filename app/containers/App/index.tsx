/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styles/styled-components';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import QuizPage from 'containers/QuizPage';

import GlobalStyle from '../../global-styles';

import { theme } from 'containers/Theme';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <ThemeProvider theme={theme}>
        <Helmet
          titleTemplate="%s - Learn Baseball"
          defaultTitle="Learn Baseball"
        >
          <meta name="description" content="learnbaseball.ca" />
        </Helmet>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/quiz" component={QuizPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </ThemeProvider>
    </AppWrapper>
  );
}
