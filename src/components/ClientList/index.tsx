import React, {useState, useCallback} from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Paper
} from '@material-ui/core';

import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons';

import SearchBar from "material-ui-search-bar";
import { RowProps as Props, RowProps } from './types';
import useStyles from './styles';
import fullRows from './data';

const Row: React.FC<Props> = ({ name, email, tags }: Props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="left">
          {tags[0]}, {tags[1]}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Contact Information: . . .  Link to profile 
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const ClientList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<RowProps[]>(fullRows);
  const [searched, setSearched] = useState<string>("");

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  },[]);
  
  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  },[]);

  const requestSearch = useCallback((searchedVal: string) => {
    const filteredRows = fullRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  },[]);

  const cancelSearch = useCallback(() => {
    setSearched("");
    requestSearch(searched);
  },[searched, requestSearch]);

  return (
    <Paper className={classes.table}>
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        className={classes.searchBar}
      />
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell classes={{ head: classes.cellHead, body: classes.cellBody }} />
              <TableCell classes={{ head: classes.cellHead, body: classes.cellBody }}>CLIENT</TableCell>
              <TableCell align="left" classes={{ head: classes.cellHead, body: classes.cellBody }}>TAGS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <Row key = {row.name} {...row} />
              );
            })}
            
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination classes={{ root: classes.pagination }}
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default ClientList;
