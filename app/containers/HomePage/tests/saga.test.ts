/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import ActionTypes from 'containers/App/constants';

import githubData, { getRepos } from '../saga';

const username = 'mxstbr';

describe('getRepos Saga', () => {
  let getReposGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposGenerator = getRepos();

    const selectDescriptor = getReposGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getReposGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });
});

describe('githubDataSaga Saga', () => {
  const githubDataSaga = githubData();

  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = githubDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(ActionTypes.LOAD_REPOS, getRepos));
  });
});
