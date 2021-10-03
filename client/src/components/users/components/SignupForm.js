import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import PageHeading from '../../shared/ui/PageHeading';
import FormikTextField from '../../shared/formElements/FormikTextField';
import BigButton from '../../shared/ui/BigButton';
import ShowPasswordAdornment from '../../shared/ui/ShowPasswordAdornment';

import { authenticateUser } from '../../../redux/actionCreators/userActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(3),
  },
}));

const SignupForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Name required'),
    email: Yup.string()
      .required('Email required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password required')
      .test('len', 'Must be atleast (3) characters', (val) => val?.length >= 3),
  });

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const submitHandler = (values, actions) => {
    //console.log(values);
    dispatch(authenticateUser(values, 'signup'));
    actions.setSubmitting(false);
  };
  return (
    <Paper className={classes.root}>
      <PageHeading text="SIGNUP" gutterBottom />
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
                id="name"
                name="name"
                type="text"
                label="Name"
                variant="outlined"
              />
            </div>
            <div className={classes.formControl}>
              <FormikTextField
                fieldName="email"
                id="email"
                name="email"
                type="email"
                label="Email"
                variant="outlined"
              />
            </div>
            <div className={classes.formControl}>
              <FormikTextField
                fieldName="password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                adornment={
                  <ShowPasswordAdornment
                    showPassword={showPassword}
                    toggleShowPassword={toggleShowPassword}
                  />
                }
                adornmentPosition="end"
              />
            </div>
            <BigButton
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              SIGNUP
            </BigButton>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default SignupForm;
