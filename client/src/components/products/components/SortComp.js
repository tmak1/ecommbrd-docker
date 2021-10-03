import React, { useContext } from 'react';
import { ProductMetaDataContext } from '../../shared/contexts/ProductMetaDataContextProvider';

import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  select: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '35px',
    marginBottom: '40px',
    '& .MuiInputBase-root': {
      minWidth: '180px',
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

const SortComp = () => {
  const classes = useStyles();
  const { sort, setSort } = useContext(ProductMetaDataContext) || {};

  return (
    <div className={classes.select}>
      <Select
        value={sort}
        onChange={(event) => setSort(event.target.value)}
        variant="outlined"
      >
        <MenuItem value="price|DESC">
          <Typography component="span" variant="body1">
            Price (High to Low)
          </Typography>
        </MenuItem>
        <MenuItem value="price|ASC">
          <Typography component="span" variant="body1">
            Price (Low to High)
          </Typography>
        </MenuItem>
        <MenuItem value="rating|DESC">
          <Typography component="span" variant="body1">
            Rating
          </Typography>
        </MenuItem>
      </Select>
    </div>
  );
};

export default SortComp;
