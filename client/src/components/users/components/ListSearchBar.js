import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';

import FormikTextField from '../../shared/formElements/FormikTextField';

import { listAdminProducts } from '../../../redux/actionCreators/productActionCreators';
import { listUsers } from '../../../redux/actionCreators/userActionCreators';
import {
  getOrderListByUser,
  getOrderListByProduct,
} from '../../../redux/actionCreators/orderActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    backgroundColor: '#FFF',
    '& input': {
      height: '40px',
      width: '250px',
      border: 'none',
      padding: '0px 6px',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '0px',
    },
  },
  btn: {
    height: '40px',
    marginLeft: '15px',
    backgroundColor: 'rgba(0,0,0,1.0)',
    color: '#fff',
    fontSize: '10px',
    fontWeight: 'bolder',
    borderRadius: '0px',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.8)',
    },
  },
}));

const ListSearchBar = ({ item, args }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialValues = {
    searchTerm: '',
  };
  let dispatchFunc;
  switch (item) {
    case 'product':
      dispatchFunc = listAdminProducts;
      break;
    case 'user':
      dispatchFunc = listUsers;
      break;
    case 'user order':
      dispatchFunc = getOrderListByUser;
      break;
    case 'product order':
      dispatchFunc = getOrderListByProduct;
      break;
    default:
      break;
  }
  const handleSubmit = (values, actions) => {
    // console.log(dispatchFunc);
    // console.log(...args, values.searchTerm);
    dispatch(dispatchFunc(...args, values.searchTerm));
    actions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formik) => (
        <Form className={classes.root}>
          <FormikTextField
            className={classes.formControl}
            fieldName="searchTerm"
            type="text"
            variant="outlined"
            placeholder={`Search by ${item} id`}
          />
          <IconButton
            edge="start"
            type="submit"
            disabled={formik.isSubmitting}
            className={classes.btn}
          >
            <SearchIcon />
          </IconButton>
        </Form>
      )}
    </Formik>
  );
};

export default ListSearchBar;
