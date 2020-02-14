/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { Button, Paper, Typography } from '@material-ui/core';
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
  },
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <div className="page-containe grey-background-page">
      <Header title="LEARN BASEBALL" />
      <div className="page-content">
        <main className={classes.layout}>
          <Paper style={{ padding: '16px' }}>
              <Typography
                component="h5"
                variant="h5"
                align="center"
              >
                Welcome to learnbaseball.ca
            </Typography>
            <div style={{
              marginTop: '12px',
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Link to={'/quiz'}>
                <Button variant="outlined" color="primary">
                  Test your knowlege
                </Button>
              </Link>
            </div>
          </Paper>
        </main>
      </div>
    </div>
  );
}
