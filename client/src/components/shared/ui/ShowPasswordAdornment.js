import React from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const ShowPasswordAdornment = ({ showPassword, toggleShowPassword }) => {
  return (
    <InputAdornment>
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => toggleShowPassword()}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};

export default ShowPasswordAdornment;
