/**
 * Test the HomePage
 */

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import * as appActions from 'containers/App/actions';
import configureStore from '../../../configureStore';
import HomePage from '../index';
import { initialState } from '../reducer';
import { changeUsername } from '../actions';
import history from '../../../utils/history';

jest.mock('containers/App/actions');

const renderHomePage = store =>
  render(
    // tslint:disable-next-line: jsx-wrap-multiline
    <Provider store={store}>
      <IntlProvider locale="en">
        <HomePage />
      </IntlProvider>
    </Provider>,
  );

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    // loadRepos is mocked so that we can spy on it but also so that it doesn't trigger a network request
  });

  beforeEach(() => {
    store = configureStore({}, history);
  });

  afterEach(cleanup);
});
