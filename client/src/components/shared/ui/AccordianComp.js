import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ErrorAlert from './ErrorAlert';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    border: 'none',
    '&>*': {
      border: 'none',
    },
    '&::before': {
      background: 'none',
    },
  },
}));
const AccordianComp = ({ children, label, value, error, control }) => {
  const classes = useStyles();
  return (
    <Accordion elevation={0} className={classes.root}>
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
          <div>
            {error && <ErrorAlert />}
            <div>{label}</div>
          </div>
        )}
      </AccordionSummary>
      <Divider />
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
export default AccordianComp;
