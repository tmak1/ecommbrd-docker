import React from 'react';

import {
  SkeletonProductName,
  SkeletonPrice,
  SkeletonRating,
  SkeletonMedia,
} from './SkeletonComponents';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  card: {
    width: theme.spacing(30),
    height: theme.spacing(50),
    padding: theme.spacing(1),
  },
  media: {
    height: '60%',
    transform: 'none',
  },
}));

const SkeletonProductList = ({ productCount }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      spacing={3}
      alignItems="center"
      className={classes.root}
    >
      {[...Array(productCount).keys()].map((num) => (
        <Grid item sm={4} md={3} key={num}>
          <Card className={classes.card}>
            <SkeletonMedia />
            <CardContent>
              <SkeletonProductName />
              <SkeletonPrice />
              <CardActions>
                <SkeletonRating />
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonProductList;
