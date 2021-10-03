import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PaymentForm from '../components/PaymentForm';
import LoadingLinear from '../../shared/ui/LoadingLinear';
import AlertMessage from '../../shared/ui/AlertMessage';
import Toast from '../../shared/ui/Toast';
import CheckoutAccordian from '../../shared/ui/CheckoutAccordian';
import { capitalize } from '../../../helpers';

import {
  getPaymentMethods,
  removePaymentMethod,
} from '../../../redux/actionCreators/paymentActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import RefreshIcon from '@material-ui/icons/RefreshSharp';
import AddNewIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    margin: theme.spacing(2, 'auto'),
    marginBottom: theme.spacing(6),
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  formLabel: {
    width: '100%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 'auto'),
    },
  },
  addNewBtn: {
    display: 'block',
    '&:hover': {
      borderRadius: '3px',
    },
  },
}));

const dummyItemId = 'newAddToPaymentMethodAccordian';

const Payment = ({ validateStep }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [disableAddNew, setDisableAddNew] = useState(false);

  const [toastObj, setToastObj] = useState({
    openToast: false,
    operation: null,
  });

  const {
    loggedInUser: { user, token },
  } = useSelector((state) => state.userAuth);
  const { loading, error, paymentMethods } = useSelector(
    (state) => state.payment
  );
  const { paymentError } = useSelector((state) => state.checkout);
  const [loadedPaymentMethods, setLoadedPaymentMethods] = useState([]);
  const discardNewPaymentMethod = (paymentId) => {
    setLoadedPaymentMethods(
      loadedPaymentMethods.filter(
        (paymentMethod) => paymentMethod.id !== paymentId
      )
    );
    setDisableAddNew(false);
  };
  const handleOpenToast = (open) => {
    setToastObj((prevState) => ({
      ...prevState,
      openToast: open,
    }));
  };
  const onSuccess = useCallback(
    (operation) => {
      if (operation === 'removed') {
        validateStep({});
      }
      setToastObj({ openToast: true, operation });
    },
    [validateStep]
  );
  const handleRemoveMethod = (paymentId) => {
    dispatch(removePaymentMethod(user.id, token, paymentId, onSuccess));
  };
  useEffect(() => {
    validateStep({});
  }, [validateStep]);
  useEffect(() => {
    if (token && user?.id) {
      dispatch(getPaymentMethods(user.id, token, onSuccess));
    }
  }, [user, token, onSuccess, dispatch]);
  useEffect(() => {
    setLoadedPaymentMethods(paymentMethods);
    setDisableAddNew(false);
  }, [paymentMethods]);

  return (
    <>
      <Toast
        openToast={toastObj.openToast}
        setOpenToast={handleOpenToast}
        severity="success"
        message={`Payment Method ${toastObj.operation}`}
      />
      <FormControl component="fieldset" className={classes.root}>
        <FormLabel component="legend" className={classes.formLabel}>
          <Typography variant="h6" component="span">
            Choose the payment method
          </Typography>
          <Tooltip TransitionComponent={Zoom} title="Reload">
            <IconButton
              disabled={!token}
              color="primary"
              onClick={() => {
                setDisableAddNew(false);
                dispatch(getPaymentMethods(user.id, token));
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            edge="end"
            color="primary"
            className={classes.addNewBtn}
            disabled={!token || disableAddNew}
            disableRipple
            onClick={() => {
              if (
                !loadedPaymentMethods.find(
                  (paymentMethod) => paymentMethod.id === dummyItemId
                )
              ) {
                setLoadedPaymentMethods([
                  {
                    id: dummyItemId,
                    nameOnCard: '',
                    cardNumber: 'XXXX XXXX XXXX XXXX',
                    expiryMonth: 1,
                    expiryYear: 21,
                    cvv: '',
                  },
                  ...loadedPaymentMethods,
                ]);
                setDisableAddNew(true);
              }
            }}
          >
            <AddNewIcon style={{ marginRight: '10px' }} />
            <Typography variant="button" component="span">
              <strong>Add a new Payment Method</strong>
            </Typography>
          </IconButton>
        </FormLabel>
        {loading && <LoadingLinear />}
        {error && <AlertMessage message={error} severity="error" />}

        {loadedPaymentMethods?.length > 0
          ? loadedPaymentMethods.map((paymentMethod) => {
              paymentMethod = capitalize(paymentMethod);
              let cardType = ['MasterCard', 'VISA'][
                Math.floor(Math.random() * 2)
              ];
              return (
                <CheckoutAccordian
                  key={paymentMethod.id}
                  item={paymentMethod}
                  error={
                    paymentError !== undefined && paymentError !== null
                      ? paymentError
                      : ''
                  }
                  label={[
                    cardType,
                    ' xxxx xxxx xxxx ',
                    paymentMethod.cardNumber.toString().slice(-4),
                  ].join(' ')}
                  discardNew={discardNewPaymentMethod}
                  handleRemoveItem={handleRemoveMethod}
                  dummyItemId={dummyItemId}
                >
                  <PaymentForm
                    paymentMethod={paymentMethod}
                    user={user}
                    token={token}
                    onSuccess={onSuccess}
                    paymentError={paymentError}
                    validateStep={validateStep}
                    setDisableAddNew={setDisableAddNew}
                    dummyItemId={dummyItemId}
                  />
                </CheckoutAccordian>
              );
            })
          : loadedPaymentMethods && (
              <AlertMessage
                message="No Payment Methodes saved"
                severity="info"
              />
            )}
      </FormControl>
    </>
  );
};

export default Payment;
