import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import UserProductList from '../components/UserProductList.js';
import UserProductUpdateModalForm from '../components/UserProductUpdateModalForm.js';
import SkeletonHistory from '../../shared/ui/skeletons/SkeletonHistory';

import {
  listAdminProducts,
  deleteProduct,
  updateProductByAdmin,
} from '../../../redux/actionCreators/productActionCreators.js';

import { formatFileName } from '../../../helpers';

import PageHeading from '../../shared/ui/PageHeading.js';
import AlertMessage from '../../shared/ui/AlertMessage.js';
import DecisionDialog from '../../shared/ui/DecisionDialog.js';

import initializeFirebase from '../../../firebase';
import categories from '../../../categories.js';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Toast from '../../shared/ui/Toast';
import RefreshIcon from '@material-ui/icons/RefreshSharp';
import ListSearchBar from '../components/ListSearchBar.js';

const useStyles = makeStyles((theme) => ({
  topBtns: {
    display: 'flex',
    width: '100%',
    marginBottom: '10px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconBtn: {
    padding: '0px',
    marginRight: '50px',
    marginBottom: '20px',
  },
  btn: {
    height: '50px',
    padding: '0 10px',
    backgroundColor: theme.palette.primary.dark,
    fontSize: '14px',
    fontWeight: '700',
    borderRadius: '0',
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const AllUserProducts = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [openToast, setOpenToast] = useState(false);
  const [operation, setOperation] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState();
  const [productToDelete, setProductToDelete] = useState();
  const { loading, error, productInfo } = useSelector(
    (state) => state.adminProductList || {}
  );
  const { loggedInUser } = useSelector((state) => state.userAuth);

  const deleteImage = async (fileName) => {
    const firebase = await initializeFirebase(loggedInUser?.token);
    try {
      const url = await firebase
        .storage()
        .ref('/products/images')
        .child(fileName)
        .getDownloadURL();
      if (!url) {
        throw new Error('That image does not exist');
      }
      const fileRef = firebase.storage().refFromURL(url);
      await fileRef?.delete();
      console.log('Deleted image');
    } catch (error) {
      console.log(error);
    }
  };
  const onSuccess = async () => {
    if (operation === 'delete') {
      const fileName = formatFileName(productToDelete.name);
      await deleteImage(fileName);
    }
    setOpenToast(true);
    dispatch(listAdminProducts(loggedInUser?.user?.id, loggedInUser?.token));
    if (modalOpen === true) {
      setModalOpen(false);
    }
  };
  const handleOperation = (operation, productToHandle) => {
    if (operation === 'delete') {
      setProductToDelete(productToHandle);
      setModalOpen(true);
      setOperation('delete');
    } else if (operation === 'update') {
      setProductToUpdate(productToHandle);
      setModalOpen(true);
      setOperation('update');
    }
  };
  const handleDeleteSubmit = () => {
    dispatch(deleteProduct(productToDelete.id, loggedInUser?.token, onSuccess));
  };
  const handleUpdateSubmit = (productInfo) => {
    dispatch(
      updateProductByAdmin(
        productToUpdate.id,
        loggedInUser?.token,
        productInfo,
        onSuccess
      )
    );
  };
  const handlePageChange = (page, perPage) => {
    dispatch(
      listAdminProducts(
        loggedInUser?.user?.id,
        loggedInUser?.token,
        '',
        page,
        perPage
      )
    );
  };
  const handlePerPageChange = (perPage) => {
    dispatch(
      listAdminProducts(
        loggedInUser?.user?.id,
        loggedInUser?.token,
        '',
        '',
        perPage
      )
    );
  };
  useEffect(() => {
    if (loggedInUser?.token) {
      dispatch(listAdminProducts(loggedInUser?.user?.id, loggedInUser?.token));
    }
  }, [loggedInUser, dispatch]);

  return (
    <>
      <PageHeading text="ALL PRODUCTS" gutterBottom />
      <DecisionDialog
        open={modalOpen}
        setDialogOpen={setModalOpen}
        title={
          operation === 'update' ? 'Change Product Details' : 'Delete Product'
        }
        content={
          operation === 'delete'
            ? `Are you sure you wish to delete product ${productToDelete.name}`
            : ''
        }
        actionBtnText={operation === 'delete' ? 'DELETE' : null}
        handleAction={operation === 'delete' ? handleDeleteSubmit : null}
      >
        {operation === 'update' && productToUpdate && (
          <UserProductUpdateModalForm
            productToUpdate={productToUpdate}
            handleUpdate={handleUpdateSubmit}
            categories={categories}
            loggedInUser={loggedInUser}
          />
        )}
      </DecisionDialog>
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        severity="success"
        message={
          operation === 'delete'
            ? 'Product deleted!'
            : 'Product details updated!'
        }
      />
      <div className={classes.topBtns}>
        <ListSearchBar
          item="product"
          args={[loggedInUser?.user.id, loggedInUser?.token]}
        />
        <div style={{ flex: 1 }}></div>
        <Tooltip TransitionComponent={Zoom} title="Refresh">
          <IconButton
            className={classes.iconBtn}
            color="primary"
            onClick={() =>
              dispatch(
                listAdminProducts(loggedInUser?.user?.id, loggedInUser?.token)
              )
            }
            style={{ marginTop: '20px' }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          disableElevation
          className={classes.btn}
          onClick={() => history.push('/products/new')}
        >
          + Create Product
        </Button>
      </div>
      {loading && (
        <SkeletonHistory
          headings={['ID', 'NAME', 'PRICE', 'CATEGRY', 'BRAND', '']}
        />
      )}
      {error && (
        <AlertMessage message={error} severity="error" variant="outlined" />
      )}
      {!loading && productInfo?.products && (
        <UserProductList
          productInfo={productInfo}
          handleOperation={handleOperation}
          loggedInUserId={loggedInUser?.user?.id}
          handlePageChange={handlePageChange}
          handlePerPageChange={handlePerPageChange}
        />
      )}
    </>
  );
};

export default AllUserProducts;
