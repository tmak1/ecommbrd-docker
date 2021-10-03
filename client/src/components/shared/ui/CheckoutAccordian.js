import React, { useState } from 'react';

import DecisionDialog from './DecisionDialog';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AccordianComp from '../../shared/ui/AccordianComp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';

import CloseIcon from '@material-ui/icons/CloseSharp';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(2, 0),
  },
  iconButtonDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const CheckoutAccordian = ({
  children,
  item,
  label,
  error,
  control,
  discardNew,
  handleRemoveItem,
  dummyItemId,
}) => {
  const classes = useStyles();
  const [slide, setSlide] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleRemove = () => {
    setDialogOpen(false);
    handleRemoveItem(item.id);
  };
  return (
    <>
      <DecisionDialog
        open={dialogOpen}
        title="Remove Address"
        content="This will remove this shipping item from your list of saved
        itemes"
        actionBtnText="Remove"
        setDialogOpen={setDialogOpen}
        handleAction={handleRemove}
      />
      <Slide direction="up" in={slide} mountOnEnter unmountOnExit>
        <Paper className={classes.paper} key={item.id}>
          <div className={classes.iconButtonDiv}>
            <div></div>
            <Tooltip TransitionComponent={Zoom} title="Remove Address">
              <IconButton
                style={{ color: 'red' }}
                onClick={() => {
                  if (item.id === dummyItemId) {
                    setSlide(false);
                    setTimeout(() => {
                      discardNew(item.id);
                    }, 500);

                    return;
                  }
                  setDialogOpen(true);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
          <AccordianComp
            label={label}
            value={JSON.stringify(item)}
            error={error}
            control={control}
          >
            {children}
          </AccordianComp>
        </Paper>
      </Slide>
    </>
  );
};

export default CheckoutAccordian;
