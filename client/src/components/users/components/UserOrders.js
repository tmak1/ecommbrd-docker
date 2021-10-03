import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ListSearchBar from '../components/ListSearchBar';

import { dateFormatter } from '../../../helpers';

import {
  getOrderListByUser,
  updateOrderIsDelivered,
} from '../../../redux/actionCreators/orderActionCreators';

import PageHeading from '../../shared/ui/PageHeading';
import TablePaginationComp from '../../shared/ui/TablePaginationComp';
import AlertMessage from '../../shared/ui/AlertMessage';
import SwitchComp from '../../shared/ui/SwitchComp';
import SkeletonHistory from '../../shared/ui/skeletons/SkeletonHistory';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.action.white,
    color: theme.palette.common.black,
    border: '1px solid rgba(0,0,0,0.08)',
  },
  body: {
    fontSize: theme.spacing(2),
    border: '1px solid rgba(0,0,0,0.08)',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const UserOrders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userIdFromUrl = useParams().uid;
  const history = useHistory();
  const fromAdminPage =
    history.location?.pathname.indexOf('/orders/users/') === -1 ? false : true;

  const { loading, error, orderInfo } = useSelector(
    (state) => state.orderListByUser
  );
  const {
    loading: loading2,
    error: error2,
    loggedInUser,
  } = useSelector((state) => state.userAuth);

  const changeIsDelivered = (orderId, delivered) => {
    if (loggedInUser?.token) {
      const updateInfo = {
        isDelivered: delivered,
        deliveredAt: delivered ? new Date().toISOString() : null,
      };
      dispatch(
        updateOrderIsDelivered(orderId, loggedInUser?.token, updateInfo)
      );
    }
  };
  const handlePageChange = (page, perPage) => {
    dispatch(
      getOrderListByUser(
        fromAdminPage ? userIdFromUrl : loggedInUser?.user.id,
        loggedInUser?.token,
        '',
        page,
        perPage
      )
    );
  };
  const handlePerPageChange = (perPage) => {
    dispatch(
      getOrderListByUser(
        fromAdminPage ? userIdFromUrl : loggedInUser?.user.id,
        loggedInUser?.token,
        '',
        '',
        perPage
      )
    );
  };
  useEffect(() => {
    if (loggedInUser) {
      dispatch(
        getOrderListByUser(
          fromAdminPage ? userIdFromUrl : loggedInUser?.user.id,
          loggedInUser?.token
        )
      );
    }
  }, [loggedInUser, fromAdminPage, userIdFromUrl, dispatch]);

  return (
    <>
      {fromAdminPage && (
        <PageHeading size="medium" text="ALL USER ORDERS" paragraph />
      )}
      <div className={classes.topBtns}>
        <ListSearchBar
          item="user order"
          args={[
            fromAdminPage ? userIdFromUrl : loggedInUser?.user.id,
            loggedInUser?.token,
          ]}
        />
        <Tooltip TransitionComponent={Zoom} title="Refresh">
          <IconButton
            className={classes.iconBtn}
            color="primary"
            onClick={() =>
              dispatch(
                getOrderListByUser(
                  fromAdminPage ? userIdFromUrl : loggedInUser?.user.id,
                  loggedInUser?.token
                )
              )
            }
            style={{ marginTop: '20px' }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </div>
      {(loading || loading2) && (
        <SkeletonHistory
          headings={['ORDER ID', 'TOTAL', 'PAID', 'DELIVERED', '']}
        />
      )}
      {(error || error2) && (
        <AlertMessage
          message={error || error2}
          severity="error"
          variant="outlined"
        />
      )}
      {!loading &&
      !loading2 &&
      (orderInfo?.orders === null || orderInfo?.orders === undefined
        ? null
        : orderInfo?.orders.length <= 0) ? (
        <AlertMessage
          message="NO ORDER HISTORY"
          severity="info"
          variant="outlined"
        />
      ) : (
        !loading &&
        !loading2 && (
          <TableContainer style={{ marginTop: '70px' }}>
            <Table style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ORDER ID</StyledTableCell>
                  <StyledTableCell>Total</StyledTableCell>
                  <StyledTableCell>Paid</StyledTableCell>
                  <StyledTableCell style={{ textAlign: 'center' }}>
                    Delivered
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderInfo?.orders?.map(
                  ({ id, subTotal, paidAt, isDelivered, deliveredAt }) => {
                    paidAt = dateFormatter(paidAt);
                    deliveredAt = isDelivered
                      ? dateFormatter(deliveredAt)
                      : null;
                    return (
                      <StyledTableRow key={id}>
                        <StyledTableCell>{id}</StyledTableCell>
                        <StyledTableCell>
                          <strong>${subTotal.toFixed(2)}</strong>
                        </StyledTableCell>
                        <StyledTableCell>{paidAt}</StyledTableCell>
                        <StyledTableCell style={{ textAlign: 'center' }}>
                          <SwitchComp
                            label={['Delivered', 'Not delivered']}
                            labelColor={['green', 'red']}
                            value={isDelivered}
                            info={id}
                            handleChange={changeIsDelivered}
                          />
                        </StyledTableCell>
                        <StyledTableCell style={{ textAlign: 'center' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            disableElevation
                            onClick={() => history.push(`/orders/${id}`)}
                          >
                            DETAILS
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                )}
              </TableBody>
              {orderInfo && (
                <TablePaginationComp
                  colSpan={6}
                  itemInfo={orderInfo}
                  handlePageChange={handlePageChange}
                  handlePerPageChange={handlePerPageChange}
                />
              )}
            </Table>
          </TableContainer>
        )
      )}
    </>
  );
};

export default UserOrders;
