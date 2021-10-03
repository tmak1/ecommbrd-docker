import React from 'react';
import { Link as Rlink } from 'react-router-dom';

import TablePaginationComp from '../../shared/ui/TablePaginationComp';
import AlertMessage from '../../shared/ui/AlertMessage';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import CrossIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import DeleteOutlineIcon from '@material-ui/icons/DeleteSharp';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      color: 'blue',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
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

const UserList = ({
  userInfo,
  handleOperation,
  loggedInUserId,
  handlePageChange,
  handlePerPageChange,
}) => {
  const classes = useStyles();
  return (
    <>
      {(
        userInfo?.users === null || userInfo?.users === undefined
          ? null
          : userInfo?.users.length <= 0
      ) ? (
        <AlertMessage
          message="NO USERS FOUND"
          severity="info"
          variant="outlined"
        />
      ) : (
        <TableContainer>
          <Table style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>USER ID</StyledTableCell>
                <StyledTableCell>NAME</StyledTableCell>
                <StyledTableCell>EMAIL</StyledTableCell>
                <StyledTableCell style={{ textAlign: 'center' }}>
                  ADMIN
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userInfo?.users?.map((user) => {
                return (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="All orders by this user"
                      >
                        <Link
                          className={classes.link}
                          component={Rlink}
                          to={`/orders/users/${user.id}`}
                          variant="body1"
                          color="inherit"
                        >
                          {user.id}
                        </Link>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell>{user.name}</StyledTableCell>
                    <StyledTableCell>{user.email}</StyledTableCell>
                    {user.isAdmin ? (
                      <StyledTableCell style={{ textAlign: 'center' }}>
                        <IconButton>
                          <DoneIcon
                            style={{ color: 'green', fontWeight: 'bolder' }}
                          />
                        </IconButton>
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell style={{ textAlign: 'center' }}>
                        <IconButton>
                          <CrossIcon
                            style={{ color: 'red', fontWeight: 'bolder' }}
                          />
                        </IconButton>
                      </StyledTableCell>
                    )}
                    <StyledTableCell style={{ textAlign: 'center' }}>
                      {user.id !== loggedInUserId && (
                        <Tooltip TransitionComponent={Zoom} title="Edit">
                          <IconButton
                            onClick={() => handleOperation('update', user)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {user.id !== loggedInUserId && (
                        <Tooltip TransitionComponent={Zoom} title="Delete">
                          <IconButton
                            onClick={() => handleOperation('delete', user)}
                          >
                            <DeleteOutlineIcon
                              style={{
                                color: '#FF4D4D',
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
            {userInfo && (
              <TablePaginationComp
                colSpan={5}
                itemInfo={userInfo}
                handlePageChange={handlePageChange}
                handlePerPageChange={handlePerPageChange}
              />
            )}
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserList;
