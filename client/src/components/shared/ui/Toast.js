import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Toast = ({ message, severity, openToast, setOpenToast }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return setOpenToast(false);
    }
  };

  return (
    <Snackbar
      open={openToast}
      autoHideDuration={5000}
      onClose={() => setOpenToast(false)}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
