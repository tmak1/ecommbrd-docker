import React from 'react';
import { Link as Rlink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '450px',
    color: 'whitesmoke',
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    maxHeight: '90%',
  },
  image: {
    width: '400px',
    height: '400px',
  },
}));

const CarouselComp = ({ products }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Carousel animation="slide">
        {products.map((product) => (
          <div key={product?.id} className={classes.content}>
            <Typography
              component="div"
              variant="h5"
              style={{ color: '#00a955', fontWeight: 'lighter' }}
            >
              {product.name}
            </Typography>
            <Link component={Rlink} to={`/products/${product?.id}`}>
              <img
                src={product?.imageUrl}
                alt={product?.name}
                className={classes.image}
              />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComp;
