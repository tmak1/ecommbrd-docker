import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    minHeight: '100%',
    padding: '0',
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(3),
    '& div': {
      width: '40%',
    },
  },
  bars: {
    height: theme.spacing(1),
    margin: theme.spacing(0, 'auto'),
  },
  overlay: {
    position: 'absolute',
    margin: '0',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 10,
  },
  oneBarOnly: {
    width: '100%',
    margin: '0',
    padding: '0',
  },
}));

export default function LoadingLinear({ asOverlay, oneBarOnly }) {
  const classes = useStyles();
  const asOverlayClassName = asOverlay ? classes.overlay : '';
  const defaultClassName = classes.root + ' ' + asOverlayClassName;
  const oneBarOnlyClassName = classes.oneBarOnly;
  return (
    <div className={`${oneBarOnly ? oneBarOnlyClassName : defaultClassName}`}>
      <LinearProgress className={classes.bars} />
      {!oneBarOnly && (
        <LinearProgress color="secondary" className={classes.bars} />
      )}
    </div>
  );
}
