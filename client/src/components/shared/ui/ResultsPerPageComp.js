import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  select: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '35px',
    marginBottom: '40px',
    '& .MuiInputBase-root': {
      minWidth: '120px',
    },
    '& .MuiSelect-root': {
      padding: '10px',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  menuitem: { margin: '6px' },
}));

const ResultsPerPageComp = ({ perPage, setPerPage }) => {
  const classes = useStyles();
  return (
    <div className={classes.select}>
      <Select
        value={perPage}
        onChange={(event) => setPerPage(event.target.value)}
        variant="outlined"
      >
        <MenuItem value={5}>
          <Typography component="span" variant="body1">
            5
          </Typography>
          <Typography
            className={classes.menuitem}
            component="span"
            variant="caption"
            color="textSecondary"
          >
            {' '}
            per page
          </Typography>
        </MenuItem>
        <MenuItem value={10}>
          <Typography component="span" variant="body1">
            10
          </Typography>
          <Typography
            className={classes.menuitem}
            component="span"
            variant="caption"
            color="textSecondary"
          >
            {' '}
            per page
          </Typography>
        </MenuItem>
        <MenuItem value={20}>
          <Typography component="span" variant="body1">
            20
          </Typography>
          <Typography
            className={classes.menuitem}
            component="span"
            variant="caption"
            color="textSecondary"
          >
            {' '}
            per page
          </Typography>
        </MenuItem>
      </Select>
    </div>
  );
};

export default ResultsPerPageComp;
