import React from 'react';
import { useField } from 'formik';

// import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MuiSelect from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

// const useStyles = makeStyles((theme) => ({
//   textField: {
//     width: '95%',
//     margin: theme.spacing(2, 'auto'),
//     fontSize: theme.spacing(2),
//   },
// }));

const FormikSelect = ({ fieldName, label, itemsArray, ...props }) => {
  // const classes = useStyles();
  const [field, meta] = useField(fieldName);
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        id={field.name}
        name={field.name}
        error={meta.touched && Boolean(meta.error)}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        native
      >
        {itemsArray.map((item) => (
          <option key={item} value={item}>
            {typeof item === 'string'
              ? [...item.slice(0, 1).toUpperCase(), ...item.slice(1)]
              : item}
          </option>
        ))}
      </MuiSelect>
      <FormHelperText>{meta.touched ? meta.error : ''}</FormHelperText>
    </>
  );
};

export default FormikSelect;
