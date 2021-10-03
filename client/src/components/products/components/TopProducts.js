import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CarouselComp from '../../shared/ui/CarouselComp';
import LoadingLinear from '../../shared/ui/LoadingLinear';
import AlertMessage from '../../shared/ui/AlertMessage';

import { listTopProducts } from '../../../redux/actionCreators/productActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '25px',
    marginBottom: '120px',
    minHeight: '500px',
    backgroundColor: '#2c3033',
    [theme.breakpoints.down(450)]: {
      minHeight: '370px',
    },
    [theme.breakpoints.down(370)]: {
      minHeight: '300px',
    },
  },
  showCloseBtn: {
    float: 'right',
    height: '40px',
    width: '40px',
    '&:hover': {
      cursor: 'pointer',
      '& .MuiButtonBase-root': {
        display: 'block',
      },
    },
  },
  closeBtn: {
    width: '100%',
    height: '100%',
    display: 'none',
    padding: '0',
  },
  closeIcon: {
    fontSize: '2rem',
    color: '#00a955',
    fontWeight: 'bolder',
  },
}));

const TopProducts = ({ setJumbotronOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productsListTop
  );
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return (
    <div className={classes.root}>
      {loading && <LoadingLinear />}
      {error && (
        <AlertMessage message={error} severity="error" variant="outlined" />
      )}
      <div className={classes.showCloseBtn}>
        <Tooltip TransitionComponent={Zoom} title="Close">
          <IconButton
            className={classes.closeBtn}
            onClick={() => setJumbotronOpen(false)}
          >
            <HighlightOffIcon className={classes.closeIcon} />
          </IconButton>
        </Tooltip>
      </div>
      {!loading && !error && products && products?.length > 0 && (
        <CarouselComp products={products} />
      )}
    </div>
  );
};

export default TopProducts;
