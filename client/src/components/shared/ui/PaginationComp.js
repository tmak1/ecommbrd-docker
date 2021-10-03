import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(12, 'auto'),
    '& .MuiPaginationItem-root:hover': {
      backgroundColor: '#e4e4e4',
    },
    '& .Mui-selected': {
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: '#fff',
    },
    '& .Mui-selected:hover': {
      backgroundColor: 'rgba(0,0,0,1.0)',
      color: '#fff',
    },
  },
}));

const PaginationComp = ({ page, pages, setPage }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination
        page={Number(page)}
        count={pages}
        variant="outlined"
        shape="rounded"
        onChange={(event, page) => setPage(page)}
      />
    </div>
  );
};

export default PaginationComp;
