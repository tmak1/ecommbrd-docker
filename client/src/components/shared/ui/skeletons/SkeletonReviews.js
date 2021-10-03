import React from 'react';

import PageHeading from '../PageHeading';

import {
  SkeletonPrice,
  SkeletonRating,
  SkeletonProductName,
} from './SkeletonComponents';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '600px',
    margin: '10px 0px 70px 20px',
    textAlign: 'left',
    '& > *': {
      marginTop: '20px',
    },
  },
  ratingBox: {
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  formControl: {
    display: 'block',
    width: '100%',
    '& > *': {
      width: '100%',
    },
  },
  btn: {
    padding: '12px',
    width: '90px',
    backgroundColor: theme.palette.primary.dark,
    fontSize: '14px',
    fontWeight: '700',
    borderRadius: '0px',
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  listItem: {
    '& > *': {
      marginTop: '10px',
    },
    '& > p': {
      marginTop: '10px',
    },
  },
}));

const SkeletonReviews = ({ userreviews }) => {
  const classes = useStyles();
  return (
    <>
      {!userreviews && (
        <>
          <PageHeading text="Rate or post a review" size="medium" />
          <Paper className={classes.root} elevation={0} component="div">
            <SkeletonRating showNumReviews={false} />
            <TextField
              className={classes.formControl}
              variant="outlined"
              multiline
              rows={5}
              placeholder="Write a review..."
            />
            <Button
              disabled
              variant="contained"
              disableElevation
              className={classes.btn}
            >
              POST
            </Button>
          </Paper>
        </>
      )}
      <PageHeading text="Reviews" size="medium" />
      <List className={classes.root}>
        {[1, 2, 3].map((num) => (
          <ListItem key={num} component="div">
            <ListItem divider component="div">
              <div style={{ width: '100%' }}>
                <div className={classes.listItem}>
                  <SkeletonPrice width="small" height="medium" />
                </div>
                <div className={classes.listItem}>
                  <SkeletonRating showNumReviews={false} />
                  <SkeletonPrice height="small" />
                  <SkeletonProductName />
                </div>
              </div>
            </ListItem>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SkeletonReviews;
