import React, { useState } from 'react';

import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

const TablePaginationComp = ({
  colSpan,
  itemInfo: { count, page, perPage },
  handlePageChange,
  handlePerPageChange,
}) => {
  const [rowPerPage, setRowPerPage] = useState(perPage);
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[
            3,
            5,
            10,
            {
              label: 'All',
              value:
                count === 3 || count === 5 || count === 10 ? count + 1 : count,
            },
          ]}
          colSpan={colSpan}
          count={count}
          rowsPerPage={rowPerPage}
          page={page - 1}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onChangePage={(event, page) => handlePageChange(page + 1, perPage)}
          onChangeRowsPerPage={(event) => {
            setRowPerPage(event.target.value);
            handlePerPageChange(event.target.value);
          }}
          // ActionsComponent={
          //   <PaginationItem
          //     component={Link}
          //     to={`/pages/${item.page}`}
          //     {...item}
          //   />
          // }
        />
      </TableRow>
    </TableFooter>
  );
};

export default TablePaginationComp;
