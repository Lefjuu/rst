import {
  TablePagination,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export interface TableColumn<T> {
  id: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newPerPage: number) => void;
  renderActions: (row: T) => React.ReactNode;
  onRowClick?: (row: T) => void;
}

export const DataTable = <T,>({
  columns,
  data,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  renderActions,
  onRowClick,
}: DataTableProps<T>) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id as string}>{column.label}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIdx) => {
              const rowKey = JSON.stringify(row) + rowIdx;
              return (
                <TableRow
                  key={rowKey}
                  hover={!!onRowClick}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id as string}>
                      {column.render
                        ? column.render(row[column.id], row)
                        : (row[column.id] as unknown as React.ReactNode)}
                    </TableCell>
                  ))}
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    {renderActions(row)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={(_, newPage) => onPageChange(newPage + 1)}
        onRowsPerPageChange={(e) => onRowsPerPageChange(Number(e.target.value))}
      />
    </div>
  );
};
