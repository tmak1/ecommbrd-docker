import React from 'react';

import BigButton from '../BigButton';
import { SkeletonPrice } from './SkeletonComponents';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const SkeletonCartSummary = () => {
  return (
    <TableContainer style={{ border: '1px solid silver' }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} align="center">
              SUBTOTAL ( 0 ) ITEMS
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SkeletonPrice />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <BigButton disabled variant="contained" disableElevation>
                Proceed to checkout
              </BigButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkeletonCartSummary;
