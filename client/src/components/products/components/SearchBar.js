import React, { useContext } from 'react';
import { Formik, Form } from 'formik';

import FormikTextField from '../../shared/formElements/FormikTextField';

import { ProductMetaDataContext } from '../../shared/contexts/ProductMetaDataContextProvider';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: '50px',
    height: '35px',
    '&>': {
      height: '35px',
    },
    [theme.breakpoints.down(760)]: {
      margin: '0 auto',
    },
  },
  formControl: {
    backgroundColor: '#FFF',
    '& input': {
      height: '35px',
      border: 'none',
      padding: '0px 6px',
    },
  },
  btn: {
    height: '35px',
    marginLeft: '15px',
    color: '#00a955',
    fontSize: '10px',
    fontWeight: 'bolder',
    border: '1px solid #00a955',
    borderRadius: '0px',
    '&:hover': {
      backgroundColor: '#00a955',
      color: '#fff',
    },
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const { searchTerm, setSearchTerm } =
    useContext(ProductMetaDataContext) || {};

  const initialValues = {
    searchTerm: searchTerm,
  };

  const handleSubmit = (values, actions) => {
    setSearchTerm('');
    setSearchTerm(values.searchTerm.trim());
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
            placeholder="Search for a product"
          />
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className={classes.btn}
          >
            Search
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
