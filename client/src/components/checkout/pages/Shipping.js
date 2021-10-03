import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ShippingForm from '../components/ShippingForm';
import LoadingLinear from '../../shared/ui/LoadingLinear';
import AlertMessage from '../../shared/ui/AlertMessage';
import Toast from '../../shared/ui/Toast';
import CheckoutAccordian from '../../shared/ui/CheckoutAccordian';
import { capitalize } from '../../../helpers';

import {
  getShippingAddresses,
  removeShippingAddress,
} from '../../../redux/actionCreators/shippingActionCreators';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
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

const dummyItemId = 'newAddToAddressAccordian';

const Shipping = ({ validateStep }) => {
  const classes = useStyles();
  const [disableAddNew, setDisableAddNew] = useState(false);
  const [toastObj, setToastObj] = useState({
    openToast: false,
    operation: null,
  });

  const dispatch = useDispatch();
  const {
    loggedInUser: { user, token },
  } = useSelector((state) => state.userAuth);
  const { loading, error, shippingAddresses } = useSelector(
    (state) => state.shipping
  );
  const { shippingError, selectedshipping } = useSelector(
    (state) => state.checkout
  );
  const [loadedShippingAddresses, setLoadedShippingAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const discardNewAddress = (shippingId) => {
    setLoadedShippingAddresses(
      loadedShippingAddresses.filter((address) => address.id !== shippingId)
    );
    setDisableAddNew(false);
  };
  const handleOpenToast = (open) => {
    setToastObj((prevState) => ({
      ...prevState,
      openToast: open,
    }));
  };
  const onSuccess = (operation) => {
    if (operation === 'removed') {
      setSelectedAddress(null);
    }
    setToastObj({ openToast: true, operation });
  };
  const handleRemoveAddress = (shippingId) => {
    dispatch(removeShippingAddress(user.id, token, shippingId, onSuccess));
  };

  useEffect(() => {
    if (selectedshipping) {
      setSelectedAddress(JSON.stringify(selectedshipping));
    }
  }, [selectedshipping]);

  useEffect(() => {
    if (token && user?.id) {
      dispatch(getShippingAddresses(user.id, token, onSuccess));
    }
  }, [user, token, dispatch]);

  useEffect(() => {
    setLoadedShippingAddresses(shippingAddresses);
    setDisableAddNew(false);
  }, [shippingAddresses]);

  useEffect(() => {
    if (selectedAddress && JSON.parse(selectedAddress)) {
      validateStep(JSON.parse(selectedAddress));
    } else {
      validateStep(selectedAddress);
    }
  }, [selectedAddress, validateStep, dispatch]);

  return (
    <>
      <Toast
        openToast={toastObj.openToast}
        setOpenToast={handleOpenToast}
        severity="success"
        message={`Address ${toastObj.operation}`}
      />
      <FormControl component="fieldset" className={classes.root}>
        <FormLabel component="legend" className={classes.formLabel}>
          <Typography variant="h6" component="span">
            Choose the shipping address
          </Typography>
          <Tooltip TransitionComponent={Zoom} title="Reload">
            <IconButton
              disabled={!token}
              color="primary"
              onClick={() => {
                setDisableAddNew(false);
                dispatch(getShippingAddresses(user.id, token));
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
                !loadedShippingAddresses.find(
                  (address) => address.id === dummyItemId
                )
              ) {
                setLoadedShippingAddresses([
                  {
                    id: dummyItemId,
                    street: '',
                    suburb: '',
                    postcode: '',
                    city: '',
                    country: '',
                  },
                  ...loadedShippingAddresses,
                ]);
                setDisableAddNew(true);
              }
            }}
          >
            <AddNewIcon style={{ marginRight: '10px' }} />
            <Typography variant="button" component="span">
              <strong>Add a new address</strong>
            </Typography>
          </IconButton>
        </FormLabel>
        {loading && <LoadingLinear />}
        {error && <AlertMessage message={error} severity="error" />}
        <RadioGroup
          name="shipping"
          value={selectedAddress}
          className={classes.others}
          onChange={(event) => setSelectedAddress(event.target.value)}
        >
          {loadedShippingAddresses?.length > 0
            ? loadedShippingAddresses.map((address) => {
                address = capitalize(address);
                return (
                  <CheckoutAccordian
                    key={address.id}
                    item={address}
                    control={
                      <Radio
                        checked={address?.id === selectedshipping?.id}
                        className={classes.radio}
                        disabled={address.id === dummyItemId}
                      />
                    }
                    error={
                      shippingError !== undefined && shippingError !== null
                        ? shippingError
                        : ''
                    }
                    label={[
                      address.street,
                      address.suburb,
                      address.postcode,
                      address.city,
                      address.country,
                    ].reduce((acc, curr) =>
                      curr ? acc + ', ' + curr : acc + ' '
                    )}
                    discardNew={discardNewAddress}
                    handleRemoveItem={handleRemoveAddress}
                    dummyItemId={dummyItemId}
                  >
                    <ShippingForm
                      address={address}
                      user={user}
                      token={token}
                      onSuccess={onSuccess}
                      shippingError={shippingError}
                      setDisableAddNew={setDisableAddNew}
                      dummyItemId={dummyItemId}
                    />
                  </CheckoutAccordian>
                );
              })
            : loadedShippingAddresses && (
                <AlertMessage
                  message="No shipping addresses saved"
                  severity="info"
                />
              )}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Shipping;
