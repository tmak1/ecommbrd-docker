import React from 'react';

import { SkeletonPrice } from './SkeletonComponents';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const SkeletonHistory = ({ headings }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headings?.map((heading) => {
              return <TableCell key={heading}>{heading}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3].map((num) => {
            return (
              <TableRow key={num}>
                {headings?.map((heading) => {
                  return (
                    <TableCell key={heading}>
                      <SkeletonPrice />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkeletonHistory;
