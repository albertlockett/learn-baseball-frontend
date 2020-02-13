import React from 'react';
import styled from 'styles/styled-components';

import { makeStyles } from '@material-ui/core/styles';
import { Button, MenuItem, Paper, Select, Typography } from '@material-ui/core';

import Header from 'components/Header';

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

export default function QuizPage() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = event => {
    setAge(event.target.value);
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
                Clayton Kershaw
              </Typography>
              <SelectContainer>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    fullWidth
                    onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                </Select>
              </SelectContainer>
              <Buttons>
                <Button variant="outlined" color="primary">
                  OK
                </Button>
              </Buttons>
            </ContentContainer>
          </Paper>
        </main>
      </div>
    </div>
  );
}
