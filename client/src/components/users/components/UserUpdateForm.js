import React, { useState, useEffect } from 'react';
import { Link as Rlink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormikTextField from '../../shared/formElements/FormikTextField';
import ShowPasswordAdornment from '../../shared/ui/ShowPasswordAdornment';

import {
  logoutUser,
  updateUser,
  userChangedName,
} from '../../../redux/actionCreators/userActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    padding: '20px',
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
  },
  emailsec: {
    display: 'flex',
    gap: '30px',
    marginLeft: '30px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  link: {
    '& p:hover': {
      pointer: 'cursor',
      color: 'blue',
    },
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

const UserUpdateForm = ({
  loggedInUser,
  token,
  dispatch,
  updatedUser,
  passwordNotModified,
  setOpenToast,
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    name: updatedUser?.name || loggedInUser?.name,
    email: updatedUser?.email || loggedInUser?.email,
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Name required'),
    email: Yup.string()
      .required('Email required')
      .email('Invalid email format'),
    password: Yup.string().test(
      'len',
      'Must be atleast (3) characters',
      (val) => !val || val.trim().length >= 3
    ),
    confirmPassword: Yup.string()
      .test(
        'len',
        'Must be atleast (3) characters',
        (val) => !val || val.trim().length >= 3
      )
      .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
  });

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const submitHandler = (values, actions) => {
    const userInfo = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    dispatch(updateUser(loggedInUser?.id, token, userInfo));
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (passwordNotModified !== null && passwordNotModified !== undefined) {
      if (passwordNotModified === false) {
        dispatch(logoutUser());
      } else {
        dispatch(userChangedName(updatedUser?.name));
        setOpenToast(true);
      }
    }
  }, [passwordNotModified, dispatch, updatedUser, setOpenToast]);

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Change your details
      </Typography>
      {loggedInUser && (
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
                  values={updatedUser?.name || loggedInUser?.name}
                />
              </div>
              <div className={classes.formControl}>
                <FormikTextField
                  fieldName="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  values={updatedUser?.email || loggedInUser?.name}
                  disabled
                />
                <div className={classes.emailsec}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="left"
                    gutterBottom
                    paragraph
                    style={{ margin: '0', display: 'inline-block' }}
                  >
                    <em>Email change disabled</em>
                  </Typography>
                  <Link
                    component={Rlink}
                    to="/auth"
                    align="left"
                    color="textSecondary"
                    className={classes.link}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="left"
                      gutterBottom
                      paragraph
                    >
                      <em>Register another account instead?</em>
                    </Typography>
                  </Link>
                </div>
              </div>
              <div className={classes.formControl}>
                <FormikTextField
                  fieldName="password"
                  type={showPassword ? 'text' : 'password'}
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
              <div className={classes.formControl}>
                <FormikTextField
                  fieldName="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  label="confirm password"
                  variant="outlined"
                />
              </div>
              <Button
                type="submit"
                disabled={
                  !formik.isValid ||
                  formik.isSubmitting ||
                  (!formik.values.password &&
                    formik.values.name === formik.initialValues.name)
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
      )}
    </Paper>
  );
};

export default UserUpdateForm;
