import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ExpandableSection from 'components/ExpandableSection';
import { Divider } from '@material-ui/core';
import TeamsControls from './TeamsControls';

export default function QuizControls(props) {
  return (
    <Fragment>
      <ExpandableSection title="Teams">
       <TeamsControls
        teams={props.teams}
        selectedTeams={props.selectedTeams}
        setSelectedTeams={props.setSelectedTeams}
      />
      </ExpandableSection>
      <Divider />
      <ExpandableSection title="Fantasy Ranking" />
      <Divider />
    </Fragment>
  );
}

QuizControls.propTypes = {
  selectedTeams: PropTypes.arrayOf(PropTypes.string),
  setSelectedTeams: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      division: PropTypes.string.isRequired,
      league: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

