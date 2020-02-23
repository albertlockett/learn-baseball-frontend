import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';

import styled from 'styles/styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid, Paper,  Radio, Typography } from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';

import Header from 'components/Header';
import TeamLogo from 'components/TeamLogo';
import QuizControls from './QuizControls';

import './style.css';

const GET_PLAYERS = gql`
query getPlayers(
    $teams: [TeamCode]
    $maxFantasyRank: Int
  ){
  players(
    teams: $teams
    maxFantasyRank: $maxFantasyRank
  ) {
    name
    position
    team
  }
}
`;

const GET_TEAMS = gql`
{
  teams {
    city
    division
    league
    name
    code
  }
}
`;

const chooseRandomPlayer = players => {
  return players[Math.floor(Math.random() * players.length)];
};

const chooseTeamOptions = ({ player, teams }): ITeam[] => {
  const teamOptions = [
    teams.find(({ code }) => player.team === code),
  ];

  if (teamOptions[0] === undefined) {
    console.warn('Could not find team for code: ' + player.team);
  }

  while (teamOptions.length < 4) {
    const randomTeam = teams[Math.floor(Math.random() * teams.length)];
    if (!teamOptions.includes(randomTeam)) {
      teamOptions.push(randomTeam);
    }
  }

  return _.shuffle(teamOptions);
};

interface IPlayer {
  name: string;
  team: string;
  position: string;
}

interface ITeam {
  city: string;
  name: string;
  code: string;
  division: string;
  league: string;
}

export default function QuizPage() {

  const [maxFantasyRank, setMaxFantasyRank] = React.useState(20);
  const [selectedTeams, setSelectedTeams] = React.useState([
    'ARI', 'ATL', 'BAL', 'BOS', 'CHC', 'CIN', 'CLE', 'COL', 'CWS', 'DET', 'HOU', 'KC', 'LAA', 'LAD', 'MIA', 'MIL',
    'MIN', 'NYM', 'NYY', 'OAK', 'PHI', 'PIT', 'SD', 'SEA', 'SF', 'STL', 'TB', 'TEX', 'TOR', 'WSH',
  ]);

  console.log({ maxFantasyRank });
  const playersQuery = useQuery(GET_PLAYERS, { variables: { teams: selectedTeams, maxFantasyRank } });
  const teamsQuery = useQuery(GET_TEAMS);

  const [selectedTeam, setSelectedTeam] = React.useState('');
  const [answerRevealed, setAnswerRevealed] = React.useState(false);
  const [teamOptions, setTeamOptions] = React.useState<ITeam[] | null>(null);
  const [player, setPlayer] = React.useState<IPlayer | null>(null);

  const handleButtonClick = () => {
    if (answerRevealed) {
      setAnswerRevealed(false);
      setPlayer(null);
      setTeamOptions(null);
      setSelectedTeam('');
    } else {
      setAnswerRevealed(true);
    }
  };

  const ContentContainer = styled.div`
    padding: 16px;
  `;

  const SelectContainer = styled.div`
    padding-top: 16px;
  `;

  const Buttons = styled.div`
    display: flex;
    padding-top: 12px;
    justify-content: flex-end;
  `;

  if (teamsQuery.loading) {
    return <h1>Loading</h1>;
  }

  if (playersQuery.error) {
    return (
      <div>
        Players query error:
        <span>{'' + playersQuery.error}</span>
      </div>
    );
  }

  const players = _.get(playersQuery, ['data', 'players'], null);
  if (!players) {
    return <div />;
  }
  if (!player) {
    setPlayer(chooseRandomPlayer(players));
  }

  const { teams } = teamsQuery.data;

  if (!teamOptions && player) {
    const options = chooseTeamOptions({ player, teams });
    setTeamOptions(options);
  }

  const teamOptionRadios = (teamOptions || []).map(team => {
    return (
      <div key={team.name} className="quiz-answer-row" onClick={() => setSelectedTeam(team.name)}>
        <label>
        <Radio  checked={team.name === selectedTeam} value={team.name} name="team" />
        <div
          style={{
            display: 'inline-block',
            height: '16px',
            width: '16px',
            marginRight: '12px',
            position: 'relative',
            top: '-2px',
          }}>
          <TeamLogo code={team.code} />
        </div>
        <Typography style={{ display: 'inline-block'}}>{team.name.toUpperCase()}</Typography>
        {
          answerRevealed && (
            player != null && player.team === team.code
              ? <Check style={{ color: 'green' }}/>
              : <Clear style={{ color: 'red' }}/>
          )
        }
        </label>
      </div>
    );
  });

  return (
    <div className="page-container grey-background-page quiz-page">
      <Header title="LEARN BASEBALL" />
      <div className="page-content">
        <Grid container>
          <Grid item md={4} xs={12}>
            <Paper style={{ margin: '10px 24px', padding: '8px' }}>
              <div
                style={{
                  textAlign: 'left',
                  position: 'relative',
                  paddingBottom: '8px',
                  width: '100%',
                }}
              >
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    style={{
                      display: 'inline-block',
                      textAlign: 'left',
                      minWidth: '0',
                    }}
                >
                  Team Roster Quiz
                </Typography>
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: '8px',
                  }}
                >
                  <b>0/1</b>
                </div>
              </div>
              <Divider />
              <QuizControls
                teams={teams}
                selectedTeams={selectedTeams}
                setSelectedTeams={setSelectedTeams}
                maxFantasyRank={maxFantasyRank}
                setMaxFantasyRank={setMaxFantasyRank}
              />
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper style={{ margin: '24px' }}>
              <ContentContainer>
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  style={{ cursor: 'pointer' }}
                >
                  {player != null && (player.name + ` (${player.position})`)}
                </Typography>
                <SelectContainer>
                  {teamOptionRadios}
                </SelectContainer>
                <Buttons>
                  <Button variant="outlined" color="primary" onClick={handleButtonClick}>
                    {answerRevealed ? 'Next' : 'Check'}
                  </Button>
                </Buttons>
              </ContentContainer>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
