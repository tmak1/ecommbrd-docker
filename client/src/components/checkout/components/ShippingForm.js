import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormikTextField from '../../shared/formElements/FormikTextField';
import BigButton from '../../shared/ui/BigButton';
import AlertMessage from '../../shared/ui/AlertMessage';

import {
  saveShippingAddress,
  updateShippingAddress,
} from '../../../redux/actionCreators/shippingActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormikSelect from '../../shared/formElements/FormikSelect';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import RefreshIcon from '@material-ui/icons/RefreshSharp';

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
}));
const cityArray = [
  'melbourne',
  'sydney',
  'adelaide',
  'perth',
  'darwin',
  'canberra',
  'alice springs',
];
const ShippingForm = ({
  address,
  user,
  token,
  onSuccess,
  shippingError,
  setDisableAddNew,
  dummyItemId,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues = {
    street: address.street || '',
    suburb: address.suburb || '',
    postcode: address.postcode || '',
    city: address.city || '',
    country: address.country || '',
  };
  const [selectedCity, setSelectedCity] = useState(address.city);
  const validationSchema = Yup.object({
    street: Yup.string().required('Street address required'),
    suburb: Yup.string(),
    postcode: Yup.number('Must be a number')
      .required('Postcode required')
      .positive('Must be positive')
      .integer('No decimal points')
      .test(
        'len',
        'Must be exactly 4 characters',
        (val) => val && val.toString().length === 4
      ),
    city: Yup.string().required('City required'),
    country: Yup.string().required('Country required'),
  });

  const submitHandler = (values, actions) => {
    if (address.id === dummyItemId) {
      delete values.id;
      dispatch(saveShippingAddress(user.id, token, values, onSuccess));
    } else {
      dispatch(
        updateShippingAddress(user.id, token, address.id, values, onSuccess)
      );
    }
    actions.setSubmitting(false);
    setDisableAddNew(false);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        {shippingError && (
          <AlertMessage message={shippingError} severity="error" />
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
                {address.id === dummyItemId && (
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
                      fieldName="street"
                      type="text"
                      id="street"
                      name="street"
                      label="Street"
                      variant="standard"
                    />
                  </FormControl>
                  <div className={classes.sections}>
                    <FormControl size="small" margin="none">
                      <FormikTextField
                        fieldName="suburb"
                        type="text"
                        id="suburb"
                        name="suburb"
                        label="Suburb"
                        variant="standard"
                      />
                    </FormControl>
                    <FormControl size="small" margin="none">
                      <FormikTextField
                        fieldName="postcode"
                        type="number"
                        maxLength="4"
                        id="postcode"
                        name="postcode"
                        label="Postcode"
                        variant="standard"
                      />
                    </FormControl>
                  </div>
                  <div className={classes.sections}>
                    <FormControl size="small" variant="standard">
                      <FormikSelect
                        as="select"
                        fieldName="city"
                        id="city"
                        name="city"
                        label="City"
                        value={selectedCity}
                        itemsArray={cityArray}
                        onChange={(event) =>
                          setSelectedCity(event.target.value)
                        }
                      />
                    </FormControl>
                    <FormControl size="small" margin="none">
                      <FormikTextField
                        fieldName="country"
                        type="text"
                        id="country"
                        name="country"
                        label="Country"
                        variant="standard"
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
                  {address.id === dummyItemId ? 'SAVE' : 'EDIT'} ADDRESS
                </BigButton>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ShippingForm;
