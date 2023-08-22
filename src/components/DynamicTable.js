import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from '@mui/material'

const TableContainerStyled = styled(TableContainer)(() => ({
  borderRadius: '0px',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '& .MuiTableCell-root': {
    borderBottom: 'none',
  },
}))

const TableRowStyle = styled(TableRow)(({ theme }) => ({
  '&:not(:first-of-type)': {
    borderTop: `1px solid ${theme.palette.grey[500]}`,
  },
  [theme.breakpoints.down('sm')]: {
    '&:first-of-type': {
      borderTop: `1px solid ${theme.palette.primary.main}`,
    },
  },
}))

const TableCellHeader = styled(TableCell)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 'lighter',
  color: theme.palette.text.secondary,
}))

const TableCellStyle = styled(TableCell)(() => ({
  fontSize: '1rem',
}))

const TableHeadColumnStyled = styled(TableHead)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.primary.main}`,
  borderBottom: `1px solid ${theme.palette.primary.main}`,
}))

const DynamicTableDesktop = ({ data, columns }) => {
  return (
    <Box sx={{ display: { xs: 'none', sm: columns.length <= 3 ? 'flex' : 'none', md: 'flex' } }}>
      <TableContainerStyled component={Paper}>
        <Table>
          <TableHeadColumnStyled>
            <TableRowStyle>
              {columns.map((column) => (
                <TableCellHeader key={`head-${column.id}`} align={column.align || 'left'}>
                  {column.label}
                </TableCellHeader>
              ))}
            </TableRowStyle>
          </TableHeadColumnStyled>
          <TableBody>
            {data.map((row, id) => (
              <TableRowStyle key={`table-row-${id}`}>
                {columns.map((column) => (
                  <TableCellStyle
                    key={`table-row-${id}-${column.id}`}
                    align={column.align || 'left'}
                  >
                    {row[column.id]}
                  </TableCellStyle>
                ))}
              </TableRowStyle>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
    </Box>
  )
}

const DynamicTableMobile = ({ data, columns }) => {
  return (
    <Box sx={{ display: { xs: 'flex', sm: columns.length > 3 ? 'flex' : 'none', md: 'none' } }}>
      <TableContainerStyled component={Paper}>
        <Table>
          <TableBody>
            {data.map((row, id) => (
              <TableRowStyle key={`sm-table-row-${id}`}>
                <Stack spacing={2} component="td">
                  {columns.map((column) => (
                    <Stack
                      key={`sm-table-row-${id}-${column.id}`}
                      direction="row"
                      spacing={2}
                      sx={{ flexGrow: 1 }}
                    >
                      <TableCellHeader align={'left'} sx={{ flexBasis: '30%' }} component="div">
                        {column.label}
                      </TableCellHeader>
                      <TableCellStyle
                        align={column.align || 'left'}
                        sx={{ flexBasis: '70%' }}
                        component="div"
                      >
                        {row[column.id]}
                      </TableCellStyle>
                    </Stack>
                  ))}
                </Stack>
              </TableRowStyle>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
    </Box>
  )
}

function DynamicTable({ data, columns }) {
  return (
    <>
      <DynamicTableDesktop data={data} columns={columns} />
      <DynamicTableMobile data={data} columns={columns} />
    </>
  )
}

export default DynamicTable
