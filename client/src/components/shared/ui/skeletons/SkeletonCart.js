import React from 'react';

import SkeletonCartBody from './SkeletonCartBody';
import SkeletonCartSummary from './SkeletonCartSummary';

import Grid from '@material-ui/core/Grid';

const SkeletonCart = () => {
  return (
    <Grid container spacing={2}>
      <Grid item md={8} xs={12}>
        <SkeletonCartBody />
      </Grid>
      <Grid item md={4} sm={7} xs={12}>
        <SkeletonCartSummary />
      </Grid>
    </Grid>
  );
};

export default SkeletonCart;
