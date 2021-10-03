import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingLinear from '../../shared/ui/LoadingLinear';
import AlertMessage from '../../shared/ui/AlertMessage';
import UserUpdateForm from './UserUpdateForm';
import Toast from '../../shared/ui/Toast';

const UserProfile = () => {
  const dispatch = useDispatch();
  const [openToast, setOpenToast] = useState(false);
  const { loading, error, updatedUser } = useSelector(
    (state) => state.userUpdate || {}
  );
  const {
    loading: loading2,
    error: error2,
    loggedInUser,
  } = useSelector((state) => state.userAuth);

  return (
    <>
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        severity="success"
        message="User details updated!"
      />
      {(loading || loading2) && <LoadingLinear />}
      {(error || error2) && (
        <AlertMessage
          message={error || error2}
          severity="error"
          variant="outlined"
        />
      )}
      {!loading && !loading2 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <UserUpdateForm
            loggedInUser={loggedInUser?.user}
            token={loggedInUser?.token}
            dispatch={dispatch}
            updatedUser={updatedUser?.user}
            passwordNotModified={updatedUser?.passwordNotModified}
            setOpenToast={setOpenToast}
          />
        </div>
      )}
    </>
  );
};

export default UserProfile;
