import React from 'react';

import {
  SkeletonProductName,
  SkeletonPrice,
  SkeletonMedia,
} from './SkeletonComponents';

import Hidden from '@material-ui/core/Hidden';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DeleteIcon from '@material-ui/icons/Delete';

const SkeletonCartBody = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Hidden xsDown>
              <TableCell></TableCell>
            </Hidden>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="left">Qty</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[0, 1, 2].map((num) => {
            return (
              <TableRow key={num}>
                <Hidden xsDown>
                  <TableCell>
                    <SkeletonMedia size="small" />
                  </TableCell>
                </Hidden>
                <TableCell>
                  <SkeletonProductName />
                </TableCell>
                <TableCell>
                  <SkeletonPrice />
                </TableCell>
                <TableCell>
                  <FormControl variant="outlined">
                    <Select native></Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <IconButton disabled color="inherit" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkeletonCartBody;
