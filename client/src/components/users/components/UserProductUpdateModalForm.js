import React, { useState, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormikTextField from '../../shared/formElements/FormikTextField';
import ImageUpload from '../../shared/formElements/ImageUpload';
import LoadingLinear from '../../shared/ui/LoadingLinear';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '600px',
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
const UserProductUpdateModalForm = ({
  productToUpdate,
  handleUpdate,
  categories,
  loggedInUser,
}) => {
  const classes = useStyles();
  const ref = useRef();
  const [loadingImageUpload, setLoadingImageUpload] = useState(false);
  const initialValues = {
    name: productToUpdate?.name,
    price: productToUpdate?.price,
    countInStock: productToUpdate?.countInStock,
    imageUrl: productToUpdate?.imageUrl,
    description: productToUpdate?.description,
    brand: productToUpdate?.brand,
    category: productToUpdate.category,
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
    imageUrl: Yup.string().required('Image url required'),
    description: Yup.string().required('Description required'),
    brand: Yup.string().required('Brand required'),
    category: Yup.string().required('Category required').oneOf(categories),
  });
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
      imageUrl: imageUrl,
      description: values.description,
      brand: values.brand,
      category: values.category,
    };
    console.log(values);
    handleUpdate(productInfo);
    actions.setSubmitting(false);
  };

  return (
    <Paper className={classes.root} elevation={0}>
      {loadingImageUpload && <LoadingLinear />}
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
            <div style={{ textAlign: 'left', margin: '12px' }}>
              <TextField
                className={classes.select}
                select
                label="Category"
                onChange={(event) =>
                  formik.setFieldValue('category', event.target.value)
                }
                value={formik.values.category || formik.initialValues.category}
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
              type="submit"
              disabled={
                !formik.isValid ||
                formik.isSubmitting ||
                (formik.values.name === formik.initialValues.name &&
                  formik.values.price === formik.initialValues.price &&
                  formik.values.countInStock ===
                    formik.initialValues.countInStock &&
                  formik.values.image === formik.initialValues.image &&
                  formik.values.description ===
                    formik.initialValues.description &&
                  formik.values.brand === formik.initialValues.brand &&
                  formik.values.category === formik.initialValues.category)
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

export default UserProductUpdateModalForm;
