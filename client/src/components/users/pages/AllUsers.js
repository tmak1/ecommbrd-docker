import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserList from '../components/UserList.js';
import UserUpdateModalForm from '../components/UserUpdateModalForm.js';
import ListSearchBar from '../components/ListSearchBar';
import SkeletonHistory from '../../shared/ui/skeletons/SkeletonHistory';

import {
  listUsers,
  deleteUser,
  updateUserByAdmin,
} from '../../../redux/actionCreators/userActionCreators.js';

import PageHeading from '../../shared/ui/PageHeading.js';
import AlertMessage from '../../shared/ui/AlertMessage.js';
import DecisionDialog from '../../shared/ui/DecisionDialog.js';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Toast from '../../shared/ui/Toast';

import RefreshIcon from '@material-ui/icons/RefreshSharp';

const useStyles = makeStyles((theme) => ({
  topBtns: {
    display: 'flex',
    width: '100%',
    marginBottom: '10px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const AllUsers = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openToast, setOpenToast] = useState(false);
  const [operation, setOperation] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState();
  const [userToDelete, setUserToDelete] = useState();
  const { loading, error, userInfo } = useSelector(
    (state) => state.userList || {}
  );
  const { loggedInUser } = useSelector((state) => state.userAuth);
  const onSuccess = () => {
    setOpenToast(true);
    dispatch(listUsers(loggedInUser?.token));
    if (modalOpen === true) {
      setModalOpen(false);
    }
  };
  const handleOperation = (operation, userToHandle) => {
    if (operation === 'delete') {
      setUserToDelete(userToHandle);
      setModalOpen(true);
      setOperation('delete');
    } else if (operation === 'update') {
      setUserToUpdate(userToHandle);
      setModalOpen(true);
      setOperation('update');
    }
  };
  const handleDeleteSubmit = () => {
    dispatch(deleteUser(userToDelete.id, loggedInUser?.token, onSuccess));
  };
  const handleUpdateSubmit = (userInfo) => {
    dispatch(
      updateUserByAdmin(
        userToUpdate.id,
        loggedInUser?.token,
        userInfo,
        onSuccess
      )
    );
  };
  const handlePageChange = (page, perPage) => {
    dispatch(listUsers(loggedInUser?.token, '', page, perPage));
  };
  const handlePerPageChange = (perPage) => {
    dispatch(listUsers(loggedInUser?.token, '', '', perPage));
  };
  useEffect(() => {
    if (loggedInUser?.token) {
      dispatch(listUsers(loggedInUser?.token));
    }
  }, [dispatch, loggedInUser?.token]);

  return (
    <>
      <PageHeading text="ALL USERS" gutterBottom />
      <DecisionDialog
        open={modalOpen}
        setDialogOpen={setModalOpen}
        title={operation === 'update' ? 'Change User Details' : 'Delete User'}
        content={
          operation === 'delete'
            ? `Are you sure you wish to delete user ${userToDelete.name}`
            : ''
        }
        actionBtnText={operation === 'delete' ? 'DELETE' : null}
        handleAction={operation === 'delete' ? handleDeleteSubmit : null}
      >
        {operation === 'update' && userToUpdate && (
          <UserUpdateModalForm
            userToUpdate={userToUpdate}
            handleUpdate={handleUpdateSubmit}
          />
        )}
      </DecisionDialog>
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        severity="success"
        message={
          operation === 'delete' ? 'User deleted!' : 'User details updated!'
        }
      />
      <div className={classes.topBtns}>
        <ListSearchBar item="user" args={[loggedInUser?.token]} />
        <Tooltip TransitionComponent={Zoom} title="Refresh">
          <IconButton
            className={classes.iconBtn}
            color="primary"
            onClick={() => dispatch(listUsers(loggedInUser?.token))}
            style={{ marginTop: '20px' }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </div>
      {loading && (
        <SkeletonHistory headings={['ID', 'NAME', 'EMAIL', 'ADMIN', '']} />
      )}
      {error && (
        <AlertMessage message={error} severity="error" variant="outlined" />
      )}
      {!loading && userInfo?.users && (
        <UserList
          userInfo={userInfo}
          handleOperation={handleOperation}
          loggedInUserId={loggedInUser?.user?.id}
          handlePageChange={handlePageChange}
          handlePerPageChange={handlePerPageChange}
        />
      )}
    </>
  );
};

export default AllUsers;
