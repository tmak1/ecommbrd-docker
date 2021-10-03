import React from 'react';

import { useTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Rating from '@material-ui/lab/Rating';

export const SkeletonMedia = ({ animation = 'wave', size = 'medium' }) => {
  return (
    <Skeleton
      style={{
        minHeight:
          size === 'small'
            ? '60px'
            : 'medium'
            ? '200px'
            : 'big'
            ? '300px'
            : '60px',
        height: size === 'medium' ? '60%' : '100%',
        minWidth:
          size === 'small'
            ? '60px'
            : 'medium'
            ? '200px'
            : 'big'
            ? '300px'
            : '60px',
        width: '100%',
        transform: 'none',
      }}
      animation={animation}
    />
  );
};

export const SkeletonProductName = ({
  animation = 'wave',
  size = 'medium',
}) => {
  const theme = useTheme();
  return (
    <div>
      <Skeleton
        height={
          size === 'medium' ? theme.skeleton.text[1] : theme.skeleton.text[2]
        }
        animation={animation}
      />
      <Skeleton
        height={
          size === 'medium' ? theme.skeleton.text[1] : theme.skeleton.text[2]
        }
        width="65%"
        animation={animation}
      />
      <Skeleton
        height={
          size === 'medium' ? theme.skeleton.text[1] : theme.skeleton.text[2]
        }
        width="35%"
        animation={animation}
      />
    </div>
  );
};

export const SkeletonProductDescription = ({ animation = 'wave' }) => {
  const theme = useTheme();
  return (
    <div>
      <Skeleton height={theme.skeleton.text[2]} animation={animation} />
      <Skeleton height={theme.skeleton.text[2]} animation={animation} />
      <Skeleton
        height={theme.skeleton.text[2]}
        animation={animation}
        width="80%"
      />
      <Skeleton
        height={theme.skeleton.text[2]}
        animation={animation}
        width="65%"
      />
    </div>
  );
};

export const SkeletonPrice = ({ animation = 'wave', width, height }) => {
  const maxHeight =
    height === 'small'
      ? '10px'
      : height === 'medium'
      ? '20px'
      : height === 'large'
      ? '30px'
      : '30px';
  const maxWidth =
    width === 'small'
      ? '20%'
      : width === 'medium'
      ? '30%'
      : width === 'large'
      ? '40%'
      : '40%';
  return <Skeleton animation={animation} width={maxWidth} height={maxHeight} />;
};

export const SkeletonRating = ({
  animation = 'wave',
  showNumReviews = true,
  readOnly = true,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="half-rating"
        value={0}
        precision={1.0}
        readOnly={readOnly}
      />
      {showNumReviews && (
        <Skeleton
          animation={animation}
          height="35px"
          width="35px"
          style={{ marginLeft: '10px' }}
        />
      )}
    </div>
  );
};

export const SkeletonCountInStock = ({ animation = 'wave' }) => {
  return <Skeleton animation={animation} width="40%" height="30px" />;
};
