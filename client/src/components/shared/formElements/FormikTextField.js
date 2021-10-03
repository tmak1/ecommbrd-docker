import React from 'react';
import { useField } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '95%',
    margin: theme.spacing(2, 'auto'),
    fontSize: theme.spacing(2),
  },
}));

const FormikTextField = ({
  fieldName,
  adornment,
  adornmentPosition = 'end',
  maxLength,
  multiline = false,
  rows = 0,
  ...props
}) => {
  const classes = useStyles();
  const [field, meta] = useField(fieldName);
  return (
    <TextField
      id={field.name}
      name={field.name}
      helperText={meta.touched ? meta.error : ''}
      error={meta.touched && Boolean(meta.error)}
      value={field.value}
      onInput={(e) => {
        let input = Number(e.target.value);
        if (input && input > 0 && maxLength) {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, maxLength);
        }
      }}
      InputProps={{
        [`${adornmentPosition}Adornment`]: adornment,
      }}
      onChange={field.onChange}
      onBlur={field.onBlur}
      className={classes.textField}
      multiline={multiline}
      inputProps={{ maxLength }}
      rows={rows}
      {...props}
    />
  );
};

export default FormikTextField;
