import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormikTextField from '../../shared/formElements/FormikTextField';
import PageHeading from '../../shared/ui/PageHeading';

import { createProductReview } from '../../../redux/actionCreators/reviewActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '600px',
    margin: '10px 0px 70px 20px',
    textAlign: 'left',
  },
  ratingBox: {
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  btn: {
    padding: '12px',
    width: '90px',
    backgroundColor: theme.palette.primary.dark,
    fontSize: '14px',
    fontWeight: '700',
    borderRadius: '0px',
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
const ratingLabels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};
const ReviewForm = ({ loggedInUser, product, review, refreshReviews }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [hover, setHover] = useState(-1);
  const initialValues = {
    rating: review?.rating || 0,
    comment: review?.comment || '',
  };
  const validationSchema = Yup.object({
    rating: Yup.number('Must be a number')
      .required('Price required')
      .positive('Must be positive')
      .oneOf([...Array(5).keys()].map((num) => num + 1)),
    comment: Yup.string().notRequired(),
  });
  const onSuccess = () => {
    refreshReviews();
  };
  const submitHandler = async (values, actions) => {
    const reviewInfo = {
      rating: Number(values.rating),
      comment: values.comment?.trim(),
    };

    dispatch(
      createProductReview(
        product.id,
        loggedInUser?.token,
        reviewInfo,
        onSuccess
      )
    );
    actions.setSubmitting(false);
  };

  return (
    <>
      <PageHeading text="Rate or post a review" size="medium" />
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
              <div className={classes.ratingBox}>
                <Rating
                  name="rating"
                  label="Leave a rating"
                  value={formik.values.rating || formik.initialValues.rating}
                  onChange={(event) => {
                    const val = Number(event.target.value);
                    formik.setFieldValue('rating', val);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  precision={1.0}
                />
                {formik.values.rating !== null && (
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ marginLeft: '10px', lineHeight: '2rem' }}
                  >
                    <em>
                      {
                        ratingLabels[
                          hover !== -1 ? hover : formik.values.rating
                        ]
                      }
                    </em>
                  </Typography>
                )}
              </div>
              <div className={classes.formControl}>
                <FormikTextField
                  fieldName="comment"
                  type="text"
                  label="Leave a comment"
                  as="textarea"
                  variant="outlined"
                  maxLength={1000}
                  multiline
                  rows={5}
                  placeholder="Write a review..."
                  values={formik.values.comment || formik.initialValues.comment}
                />
              </div>
              <Button
                type="submit"
                disabled={
                  !formik.isValid ||
                  formik.isSubmitting ||
                  (formik.values.rating === formik.initialValues.rating &&
                    formik.values.comment === formik.initialValues.comment)
                }
                variant="contained"
                disableElevation
                className={classes.btn}
              >
                POST
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default ReviewForm;
