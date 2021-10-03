import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorAlert from './ErrorAlert';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0',
    padding: '0',
    border: 'none',
    '&>*': {
      margin: '0',
      padding: '0',
      border: 'none',
      width: '100%',
    },
    '&::before': {
      background: 'none',
    },
  },
  details: {
    padding: 0,
    '& div': {
      width: '100%',
      borderRadius: '0px',
    },
  },
}));
const AccordianOrder = ({
  children,
  label,
  value,
  error,
  control,

  fullWidth,
}) => {
  const classes = useStyles();
  return (
    <Accordion elevation={0} className={classes.root} expanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand">
        {control ? (
          <FormControlLabel
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            label={
              <>
                {error && <ErrorAlert />}
                <div>{label}</div>
              </>
            }
            value={value}
            control={control}
          />
        ) : (
          <>
            {error && <ErrorAlert />}
            <div>{label}</div>
          </>
        )}
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
export default AccordianOrder;
