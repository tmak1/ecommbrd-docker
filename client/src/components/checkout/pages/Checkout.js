import React, { useState, useEffect } from 'react';

import Shipping from './Shipping';
import Payment from './Payment';
import PlaceOrder from './PlaceOrder';
import PageHeading from '../../shared/ui/PageHeading';

import {
  validateShipping,
  validatePayment,
} from '../../../redux/actionCreators/checkoutActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import CheckoutStepper from '../../shared/ui/CheckoutStepper';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}));

const Checkout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { shippingError, paymentError, selectedshipping, selectedpayment } =
    useSelector((state) => state.checkout);
  const [steps, setSteps] = useState([
    {
      label: 'shipping',
      comp: <Shipping validateStep={handleShippingStepDone} />,
      done: false,
    },
    {
      label: 'payment',
      comp: <Payment validateStep={handlePaymentStepDone} />,
      done: false,
    },
    {
      label: 'place order',
      comp: <PlaceOrder />,
      done: false,
    },
  ]);

  const modifyShipping = useCallback(
    (noSelection = false) => {
      let done;
      if (noSelection) {
        done = false;
      } else {
        done = !shippingError && !!selectedshipping;
      }
      setSteps((prevState) => [
        {
          ...prevState.find((step) => step.label === 'shipping'),
          done,
        },
        ...prevState.slice(1),
      ]);
    },
    [selectedshipping, shippingError]
  );
  const modifyPayment = useCallback(
    (noSelection = false) => {
      let done;
      if (noSelection) {
        done = false;
      } else {
        done = !paymentError && !!selectedpayment;
      }
      setSteps((prevState) => [
        prevState.slice(0, 1)[0],
        {
          ...prevState.find((step) => step.label === 'payment'),
          done,
        },
        prevState.slice(2)[0],
      ]);
    },
    [selectedpayment, paymentError]
  );
  function handleShippingStepDone(shipping) {
    if (!shipping || (shipping && Object.keys(shipping).length <= 0)) {
      return modifyShipping(true);
    }
    dispatch(validateShipping(shipping, ['suburb']));
  }
  function handlePaymentStepDone(payment) {
    if (!payment || (payment && Object.keys(payment).length <= 0)) {
      return modifyPayment(true);
    }
    dispatch(
      validatePayment(payment, [
        'nameOnCard',
        'cardNumber',
        'expiryMonth',
        'expiryYear',
      ])
    );
  }
  useEffect(() => {
    modifyShipping();
  }, [shippingError, selectedshipping, modifyShipping]);

  useEffect(() => {
    modifyPayment();
  }, [paymentError, selectedpayment, modifyPayment]);
  // console.log(steps);
  return (
    <>
      <PageHeading text="CHECKOUT" gutterBottom />
      <div className={classes.root}>
        <CheckoutStepper steps={steps} />
      </div>
    </>
  );
};

export default Checkout;
