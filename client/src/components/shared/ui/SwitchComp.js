import React, { useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const ColoredSwitch = withStyles({
  switchBase: {
    color: red[400],
    '&$checked': {
      color: green[500],
    },
    '&:not($checked) + $track': {
      backgroundColor: red[300],
    },
    '&$checked + $track': {
      backgroundColor: green[400],
    },
  },
  checked: {},
  track: {},
})(Switch);

const SwitchComp = ({ value, label, labelColor, handleChange, info }) => {
  const [checked, setChecked] = React.useState(false);
  const changeHandler = () => {
    setChecked((prevChecked) => !prevChecked);
    handleChange(info, !checked);
  };
  useEffect(() => {
    setChecked(value);
  }, [value]);
  return (
    <FormControl component="fieldset">
      <FormGroup>
        <FormControlLabel
          control={<ColoredSwitch checked={checked} onChange={changeHandler} />}
          label={checked ? label[0] : label[1]}
          labelPlacement="top"
          style={{ color: checked ? labelColor[0] : labelColor[1] }}
        />
      </FormGroup>
      <br />
    </FormControl>
  );
};

export default SwitchComp;
