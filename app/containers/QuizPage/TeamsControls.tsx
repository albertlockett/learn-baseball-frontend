import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Checkbox, Grid, Modal, Typography } from '@material-ui/core';
import TeamLogo from 'components/TeamLogo';


const SelectedTeamModalContainer = styled.div`
  height: 32px;
  width: 32px;
  display: inline-block;
  margin: 8px;
`;

const ModalTeamLogoContainer = styled.div`
  height: 14px;
  width: 14px;
  display: inline-block;
  margin-left: 2px;
`;

const makeTeamList = (teams, selectedTeams, toggleSelectedTeam) => {
  return teams.map(team => {
    return (
      <div key={'team-list-' + team.code}>
        <Checkbox
          checked={selectedTeams.includes(team.code)}
          onClick={() => toggleSelectedTeam(team.code)}
        />
        <ModalTeamLogoContainer>
          <TeamLogo code={team.code}/>
        </ModalTeamLogoContainer> {team.city} {team.name}
      </div>
    );
  });
};

const emptyArray: string[] = [];

export default function TeamsControls(props) {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSelectedTeams, setModalSelectedTeams] = useState(emptyArray);

  const teams = props.teams.reduce((acc, curr) => {
    if (undefined === acc[curr.league]) {
      acc[curr.league] = {};
    }

    if (undefined === acc[curr.league][curr.division]) {
      acc[curr.league][curr.division] = [];
    }

    acc[curr.league][curr.division].push(curr);
    return acc;
  }, {});

  const toggleSelectedTeam = code => {
    if (modalSelectedTeams.includes(code)) {
      setModalSelectedTeams(_.without(modalSelectedTeams, code));
    } else {
      setModalSelectedTeams([...modalSelectedTeams, code]);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {props.selectedTeams.map(code => {
          return (
            <SelectedTeamModalContainer key={`selected-${code}`}>
              <TeamLogo code={code} />
            </SelectedTeamModalContainer>
          );
        })}
      </div>
      <Button variant="outlined" color="primary" onClick={() => {
        setModalSelectedTeams(props.selectedTeams);
        setModalOpen(true);
      }}>
        Edit
      </Button>
      <Modal open={modalOpen}>
        <div className="quiz-page-choose-teams-modal">
          <Typography variant="h4">Choose Teams</Typography>
          <Typography variant="h5">American League</Typography>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h6">East</Typography>
              {makeTeamList(teams['AL']['east'], modalSelectedTeams, toggleSelectedTeam)}
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">Central</Typography>
              {makeTeamList(teams['AL']['central'], modalSelectedTeams, toggleSelectedTeam)}
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">West</Typography>
              {makeTeamList(teams['AL']['west'], modalSelectedTeams, toggleSelectedTeam)}
            </Grid>
          </Grid>

          <Typography variant="h5">National League</Typography>
          <Grid container>
            <Grid item xs={4}>
            <Typography variant="h6">East</Typography>
            {makeTeamList(teams['NL']['east'], modalSelectedTeams, toggleSelectedTeam)}
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">Central</Typography>
              {makeTeamList(teams['NL']['central'], modalSelectedTeams, toggleSelectedTeam)}
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">West</Typography>
              {makeTeamList(teams['NL']['west'], modalSelectedTeams, toggleSelectedTeam)}
            </Grid>
          </Grid>

          <Button variant="outlined" color="primary" onClick={() => {
            props.setSelectedTeams(modalSelectedTeams);
            setModalOpen(false);
          }}>
            OK
          </Button>
        </div>
      </Modal>
    </div>
  );

}

TeamsControls.propTypes = {
  selectedTeams: PropTypes.arrayOf(PropTypes.string).isRequired,
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

