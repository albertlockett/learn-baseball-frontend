import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import styled from 'styles/styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography, Radio } from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';

import Header from 'components/Header';

const GET_PLAYERS = gql`
{
  players {
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
  }
}
`;

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      // padding: theme.spacing(3),
      padding: '24px',
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    select: {
      padding: '16px',
    },
    buttons: {
      display: 'flex',
      marginTop: '12px',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  },
}));

const chooseRandomPlayer = players => {
  return players[Math.floor(Math.random() * players.length)];
};

const chooseTeamOptions = ({ player, teams }): ITeam[] => {
  const teamOptions = [
    teams.find(({ name }) => player.team === name),
  ];

  while (teamOptions.length < 4) {
    const randomTeam = teams[Math.floor(Math.random() * teams.length)];
    if (!teamOptions.includes(randomTeam)) {
      teamOptions.push(randomTeam);
    }
  }

  return teamOptions;
};

interface IPlayer {
  name: string;
  team: string;
}

interface ITeam {
  name: string;
}

export default function QuizPage() {

  const playersQuery = useQuery(GET_PLAYERS);
  const teamsQuery = useQuery(GET_TEAMS);

  const classes = useStyles();

  const [selectedTeam, setSelectedTeam] = React.useState('');
  const [answerRevealed, setAnswerRevealed] = React.useState(false);
  const [teamOptions, setTeamOptions] = React.useState<ITeam[] | null>(null);
  const [player, setPlayer] = React.useState<IPlayer | null>(null);

  const handleChange = event => {
    setSelectedTeam(event.target.value);
  };

  const handleButtonClick = () => {
    if (answerRevealed) {
      setAnswerRevealed(false);
      setPlayer(null);
      setTeamOptions(null);
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

  if (playersQuery.loading || teamsQuery.loading) {
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

  const { players } = playersQuery.data;
  if (!player) {
    setPlayer(chooseRandomPlayer(players));
  }

  const { teams } = teamsQuery.data;

  if (!teamOptions && player) {
    const options = chooseTeamOptions({ player, teams });
    setTeamOptions(options);
  }

  const teamOptionRadios = (teamOptions || []).map(team => {
    console.log({ team });
    return (
      <div key={team.name}>
        <label>
        <Radio  checked={team.name === selectedTeam} value={team.name} name="team" onClick={handleChange} />
        <Typography style={{ display: 'inline-block'}}>{team.name.toUpperCase()}</Typography>
        {
          answerRevealed && (
            player != null && player.team === team.name
              ? <Check style={{ color: 'green' }}/>
              : <Clear style={{ color: 'red' }}/>
          )
        }
        </label>
      </div>
    );
  });

  return (
    <div className="page-container grey-background-page">
      <Header title="LEARN BASEBALL" />
      <div className="page-content">
        <main className={classes.layout}>
          <Paper>
            <ContentContainer>
              <Typography
                component="h1"
                variant="h4"
                align="center"
              >
                {player != null && player.name}
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
        </main>
      </div>
    </div>
  );
}
