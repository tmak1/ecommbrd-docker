import React, { useEffect, useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PaymentIcon from '@material-ui/icons/Payment';
import ShopTwoIcon from '@material-ui/icons/ShopTwo';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <LocalShippingIcon />,
    2: <PaymentIcon />,
    3: <ShopTwoIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(6),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '55vh',
  },
  navButtons: {
    marginLeft: theme.spacing(16),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 'auto'),
    },
  },
  navButtons2: {
    margin: '0',
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 'auto'),
    },
  },
}));

const CheckoutStepper = ({ steps }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [goingBack, setGoingBack] = useState(false);
  const handleNext = () => {
    setGoingBack(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setGoingBack(true);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (!goingBack && steps[activeStep].done) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }, [steps, goingBack, activeStep]);
  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div className={classes.content}>{steps[activeStep].comp}</div>
        <div
          className={
            steps[activeStep].label === 'place order'
              ? classes.navButtons2
              : classes.navButtons
          }
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Back
          </Button>
          {!(activeStep === steps.length - 1) && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={!steps[activeStep].done}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? 'FINISH' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutStepper;
