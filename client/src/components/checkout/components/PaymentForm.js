import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormikTextField from '../../shared/formElements/FormikTextField';
import BigButton from '../../shared/ui/BigButton';
import AlertMessage from '../../shared/ui/AlertMessage';

import { savePaymentMethod } from '../../../redux/actionCreators/paymentActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormikSelect from '../../shared/formElements/FormikSelect';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2, 5),
    backgroundColor: 'rgba(245,245,245,0.3)',
    borderRadius: theme.spacing(1),
    '&>*': {
      width: '99%',
      display: 'block',
    },
  },
  sections: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '&>*': {
      width: '99%',
      display: 'block',
    },
  },
  iconButtonDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cvv: {
    backgroundColor: 'white',
    fontWeight: '900',
  },
}));

const PaymentForm = ({
  paymentMethod,
  user,
  token,
  onSuccess,
  paymentError,
  validateStep,
  setDisableAddNew,
  dummyItemId,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialValues = {
    id: paymentMethod.id,
    nameOnCard: paymentMethod.nameOnCard || '',
    cardNumber: paymentMethod.cardNumber || '',
    expiryMonth: paymentMethod.expiryMonth || '',
    expiryYear: paymentMethod.expiryYear || '',
    cvv: ' ',
  };
  const [selectedExpiryMonth, setSelectedExpiryMonth] = useState(
    paymentMethod.expiryMonth
  );
  const [selectedExpiryYear, setSelectedExpiryYear] = useState(
    paymentMethod.expiryYear
  );
  const validationSchema = Yup.object({
    nameOnCard: Yup.string(),
    cardNumber: Yup.number('Must be a number')
      .required('Card number required')
      .positive('Must be positive')
      .integer('No decimal points')
      .test(
        'len',
        'Must be exactly 16 digits',
        (val) => val && val.toString().length === 16
      ),
    expiryMonth: Yup.number('Must be a number')
      .required('Expiry month required')
      .positive('Must be positive')
      .integer('No decimal points')
      .oneOf([...Array(12).keys()].map((num) => num + 1)),
    expiryYear: Yup.number('Must be a number')
      .required('Expiry year required')
      .positive('Must be positive')
      .integer('No decimal points')
      .oneOf(
        [...Array(7).keys()].map((num) => {
          return num + new Date().getFullYear() - 2000;
        })
      ),
    cvv: Yup.number('Must be a number')
      .required('Required')
      .positive('Must be positive')
      .integer('No decimal points')
      .test(
        'len',
        'Invalid format',
        (val) => val && val.toString().length === 3
      ),
  });

  const submitHandler = (values, actions) => {
    if (paymentMethod.id === dummyItemId) {
      delete values.id;
      delete values.cvv;
      dispatch(savePaymentMethod(user.id, token, values, onSuccess));
    } else {
      //console.log('here ', values);
      validateStep(values);
    }
    actions.setSubmitting(false);
    setDisableAddNew(false);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        {paymentError && (
          <AlertMessage message={paymentError} severity="error" />
        )}
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
          validateOnMount
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form className={classes.root}>
                {paymentMethod.id === dummyItemId && (
                  <div className={classes.iconButtonDiv}>
                    <div></div>
                    <Tooltip TransitionComponent={Zoom} title="Reset form">
                      <IconButton
                        disabled={!token}
                        color="primary"
                        onClick={() => formik.resetForm()}
                      >
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
                <FormControl style={{ marginBottom: '25px' }}>
                  <FormControl size="small" margin="none" fullWidth>
                    <FormikTextField
                      fieldName="nameOnCard"
                      type="text"
                      id="nameOnCard"
                      name="nameOnCard"
                      label="Name on Card"
                      disabled={paymentMethod.id !== dummyItemId}
                      variant="standard"
                    />
                  </FormControl>
                  <div className={classes.sections}>
                    <FormControl size="small" margin="none">
                      <FormikTextField
                        fieldName="cardNumber"
                        type="number"
                        maxLength="16"
                        id="cardNumber"
                        name="cardNumber"
                        label="Card Number"
                        disabled={paymentMethod.id !== dummyItemId}
                        variant="standard"
                      />
                    </FormControl>
                  </div>
                  <div className={classes.sections}>
                    <FormControl size="small" variant="standard">
                      <FormikSelect
                        as="select"
                        fieldName="expiryMonth"
                        id="expiryMonth"
                        name="expiryMonth"
                        disabled={paymentMethod.id !== dummyItemId}
                        label="Month"
                        value={selectedExpiryMonth}
                        itemsArray={[...Array(12).keys()].map((num) => num + 1)}
                        onChange={(event) =>
                          setSelectedExpiryMonth(event.target.value)
                        }
                      />
                    </FormControl>
                    <FormControl size="small" variant="standard">
                      <FormikSelect
                        as="select"
                        fieldName="expiryYear"
                        id="expiryYear"
                        name="expiryYear"
                        disabled={paymentMethod.id !== dummyItemId}
                        label="Year"
                        value={selectedExpiryYear}
                        itemsArray={[...Array(7).keys()].map((num) => {
                          return num + new Date().getFullYear() - 2000;
                        })}
                        onChange={(event) =>
                          setSelectedExpiryYear(event.target.value)
                        }
                      />
                    </FormControl>
                    <FormControl size="small" margin="none">
                      <FormikTextField
                        fieldName="cvv"
                        type="number"
                        maxLength="3"
                        id="cvv"
                        name="cvv"
                        label="CVV"
                        color="primary"
                        variant="standard"
                        className={classes.cvv}
                        required
                      />
                    </FormControl>
                  </div>
                </FormControl>

                <BigButton
                  type="submit"
                  disabled={
                    !formik.isValid ||
                    formik.isSubmitting ||
                    JSON.stringify(initialValues) ===
                      JSON.stringify(formik.values)
                  }
                >
                  {paymentMethod.id === dummyItemId ? 'SAVE' : 'USE'} PAYMENT
                  METHOD
                </BigButton>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default PaymentForm;
