import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '600px',
    margin: '70px 0',
    textAlign: 'left',
  },
  ratingBox: {
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
}));
const ratingLabels = {
  1: 'Bad',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};
const ReviewForm = ({ rating, setRating }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(-1);

  return (
    <div className={classes.root}>
      <Typography
        component="div"
        variant="body1"
        color="textSecondary"
        gutterBottom
      >
        Only show ratings and up
      </Typography>
      <div className={classes.ratingBox}>
        <Rating
          name="rating"
          label="Filter by Rating"
          value={Number(rating) || 3}
          onChange={(event) => {
            setRating(Number(event.target.value));
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          precision={1.0}
        />
        {rating !== null && (
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginLeft: '10px', lineHeight: '2rem' }}
          >
            <em>{ratingLabels[hover !== -1 ? hover : rating]}</em>
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
