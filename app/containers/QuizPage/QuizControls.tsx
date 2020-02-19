import React, { Fragment } from 'react';

import ExpandableSection from 'components/ExpandableSection';
import { Divider } from '@material-ui/core';
import TeamsControls from './TeamsControls';

export default function QuizControls(props) {
  return (
    <Fragment>
      <ExpandableSection title="Teams">
       <TeamsControls />
      </ExpandableSection>
      <Divider />
      <ExpandableSection title="Fantasy Ranking" />
      <Divider />
    </Fragment>
  );
}

