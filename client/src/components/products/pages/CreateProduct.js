import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import PageHeading from '../../shared/ui/PageHeading';
import FormikTextField from '../../shared/formElements/FormikTextField';
import ImageUpload from '../../shared/formElements/ImageUpload';
import LoadingLinear from '../../shared/ui/LoadingLinear';
import AlertMessage from '../../shared/ui/AlertMessage';

import { createProduct } from '../../../redux/actionCreators/productActionCreators';

import categories from '../../../categories';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '600px',
    padding: '20px',
    margin: '0 auto',
    textAlign: 'center',
  },
  btn: {
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
  iconButtonDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  select: {
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      fontSize: '13px',
    },
  },
  previewBox: {
    margin: '0 auto',
    '&>img': {
      width: '250px',
      height: '250px',
    },
  },
}));

const CreateProduct = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const ref = useRef();
  const [loadingImageUpload, setLoadingImageUpload] = useState(false);
  const { loading: loadingDelete } = useSelector(
    (state) => state.productDelete || {}
  );
  const { loading: loadingUpdate } = useSelector(
    (state) => state.productCreate || {}
  );
  const { loggedInUser } = useSelector((state) => state.userAuth);
  const { loading, error } = useSelector((state) => state.productCreate || {});
  const initialValues = {
    name: 'Placeholder name',
    price: 1,
    countInStock: 1,
    description: 'Placeholder description',
    brand: 'Placeholder brand',
    category: categories[0],
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Name required'),
    price: Yup.number('Must be a number')
      .required('Price required')
      .positive('Must be positive'),
    countInStock: Yup.number('Must be a number')
      .required('Count in Stock required')
      .positive('Must be positive')
      .integer('No decimal points'),
    description: Yup.string().required('Description required'),
    brand: Yup.string().required('Brand required'),
    category: Yup.string().required('Category required').oneOf(categories),
  });

  const onSuccess = () => {
    history.goBack();
  };
  const submitHandler = async (values, actions) => {
    let imageUrl;
    try {
      setLoadingImageUpload(true);
      imageUrl = await ref.current.handleUpload(values.name);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingImageUpload(false);
    }
    const productInfo = {
      name: values.name,
      price: values.price,
      countInStock: values.countInStock,
      imageUrl: imageUrl || '/images/placeholder.js',
      description: values.description,
      brand: values.brand,
      category: values.category,
    };
    console.log(productInfo);
    dispatch(createProduct(loggedInUser?.token, productInfo, onSuccess));
    actions.setSubmitting(false);
  };

  return (
    <>
      <PageHeading text="CREATE PRODUCT" paragraph size="medium" />
      {(loading || loadingImageUpload || loadingDelete || loadingUpdate) && (
        <LoadingLinear />
      )}
      {error && (
        <AlertMessage message={error} severity="error" variant="outlined" />
      )}
      <Paper className={classes.root} elevation={0}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
          validateOnMount
          enableReinitialize
        >
          {(formik) => (
            <>
              <div className={classes.iconButtonDiv}>
                <div></div>
                <Tooltip TransitionComponent={Zoom} title="Reset form">
                  <IconButton
                    color="primary"
                    onClick={() => formik.resetForm()}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <Form>
                <div className={classes.formControl}>
                  <FormikTextField
                    fieldName="name"
                    type="text"
                    label="Name"
                    variant="outlined"
                    values={formik.initialValues.name}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ImageUpload token={loggedInUser?.token} ref={ref} />
                </div>
                <div className={classes.formControl}>
                  <FormikTextField
                    fieldName="price"
                    type="number"
                    label="Price"
                    variant="outlined"
                    adornmentPosition="start"
                    adornment="$ "
                    values={formik.initialValues.price}
                  />
                </div>
                <div className={classes.formControl}>
                  <FormikTextField
                    fieldName="countInStock"
                    type="number"
                    label="Count in Stock"
                    variant="outlined"
                    values={formik.initialValues.countInStock}
                  />
                </div>
                <div className={classes.formControl}>
                  <FormikTextField
                    fieldName="description"
                    type="text"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    values={formik.initialValues.description}
                  />
                </div>
                <div style={{ textAlign: 'left', margin: '30px' }}>
                  <TextField
                    className={classes.select}
                    select
                    label="Category"
                    onChange={(event) =>
                      formik.setFieldValue('category', event.target.value)
                    }
                    value={
                      formik.values.category || formik.initialValues.category
                    }
                    SelectProps={{
                      native: true,
                    }}
                    variant="outlined"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div className={classes.formControl}>
                  <FormikTextField
                    fieldName="brand"
                    type="text"
                    label="Brand"
                    variant="outlined"
                    values={formik.initialValues.brand}
                  />
                </div>
                <Button
                  style={{ width: '200px' }}
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  variant="contained"
                  disableElevation
                  className={classes.btn}
                >
                  CREATE
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default CreateProduct;
