import React, { useState } from 'react';
import { Link as Rlink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import PageHeading from '../../shared/ui/PageHeading';
import FormikTextField from '../../shared/formElements/FormikTextField';
import BigButton from '../../shared/ui/BigButton';
import ShowPasswordAdornment from '../../shared/ui/ShowPasswordAdornment';

import { authenticateUser } from '../../../redux/actionCreators/userActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(3),
  },
  passwordreset: {
    margin: '10px 0 20px 10px',
  },
}));

const LoginForm = ({ loggedIn }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
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
    dispatch(authenticateUser(values, 'login'));
    //console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <Paper className={classes.root}>
      <div>{!loggedIn ? <LockOpenIcon /> : <LockIcon />}</div>
      <PageHeading
        text={!loggedIn ? 'SIGNIN' : 'You are logged in!'}
        size={loggedIn && 'small'}
        gutterBottom
      />
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
                fieldName="email"
                type="email"
                id="email"
                name="email"
                label="Enter your email"
                variant="outlined"
                disabled={loggedIn}
              />
            </div>
            <div className={classes.formControl}>
              <FormikTextField
                fieldName="password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                label="Enter your password"
                variant="outlined"
                disabled={loggedIn}
                adornment={
                  <ShowPasswordAdornment
                    showPassword={showPassword}
                    toggleShowPassword={toggleShowPassword}
                  />
                }
                adornmentPosition="end"
              />
              <Link
                component={Rlink}
                to="/pages/1"
                align="left"
                color="textSecondary"
                disabled={loggedIn}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="left"
                  gutterBottom
                  paragraph
                  className={classes.passwordreset}
                >
                  Forgot Password?
                </Typography>
              </Link>
            </div>
            <BigButton
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting || loggedIn}
            >
              LOGIN
            </BigButton>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default LoginForm;
