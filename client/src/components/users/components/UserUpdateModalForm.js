import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormikTextField from '../../shared/formElements/FormikTextField';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    margin: '0 auto',
    textAlign: 'center',
  },
  btn: {
    width: '40%',
    margin: '30px auto 10px auto',
    padding: '12px',
    backgroundColor: theme.palette.primary.dark,
    fontSize: '14px',
    fontWeight: '700',
    borderRadius: '0',
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const UserUpdateModalForm = ({ userToUpdate, handleUpdate }) => {
  const classes = useStyles();
  const initialValues = {
    name: userToUpdate?.name,
    email: userToUpdate?.email,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Name required'),
    email: Yup.string()
      .required('Email required')
      .email('Invalid email format'),
  });

  const submitHandler = (values, actions) => {
    const userInfo = {
      name: values.name,
      email: values.email,
    };
    handleUpdate(userInfo);
    actions.setSubmitting(false);
  };

  return (
    <Paper className={classes.root} elevation={0}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
        validateOnMount
        enableReinitialize
      >
        {(formik) => (
          <Form>
            <div className={classes.formControl}>
              <FormikTextField
                fieldName="name"
                type="text"
                label="Name"
                variant="outlined"
                values={userToUpdate.name}
              />
            </div>
            <div className={classes.formControl}>
              <FormikTextField
                fieldName="email"
                type="email"
                label="Email"
                variant="outlined"
                values={userToUpdate?.email}
              />
            </div>
            <Button
              type="submit"
              disabled={
                !formik.isValid ||
                formik.isSubmitting ||
                (formik.values.name === formik.initialValues.name &&
                  formik.values.email === formik.initialValues.email)
              }
              variant="contained"
              disableElevation
              className={classes.btn}
            >
              CHANGE
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default UserUpdateModalForm;
