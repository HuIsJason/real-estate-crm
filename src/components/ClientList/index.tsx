import React, {useState, useCallback} from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Button
} from '@material-ui/core';
import {
  DeleteForever as DeleteForeverIcon,
  AccountBox as AccountBoxIcon
} from '@material-ui/icons';
import SearchBar from "material-ui-search-bar";

import {Link} from "react-router-dom"

import { AddClientButton } from '../.';

import { RowProps, DataFields} from './types';
import useStyles from './styles';

// Data would not be imported from a file when we have backend
import { fullRows } from './data';

const Row: React.FC<RowProps> = ({ name, email, tags, id, rows, handleSetRows}: RowProps) => {
  const classes = useStyles();

  const handleDelete = useCallback((id: string) => {
    // API call to delete to backend
    var indexOfRow = fullRows.findIndex(i => i.id === id)
    fullRows.splice(indexOfRow, 1);
    const newRows = fullRows.filter((row) => {
      return row.id !== id;
    });

    handleSetRows(newRows);
  },[handleSetRows]);

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          <Link to={"/client-details"} className={classes.linkStyle}>
            {name}
          </Link>
        </TableCell>
          <TableCell align="left">
            <Link to={"/client-details"} className={classes.linkStyle}>
            {tags}
            </Link>
          </TableCell>
        <Link to={"/client-details"} className={classes.linkStyle}>
          <TableCell>
            <IconButton size="small" >
              <AccountBoxIcon color="primary" /> 
            </IconButton>
          </TableCell>
        </Link>
        <TableCell>
          <Button color="primary" className={classes.EButton} onClick={() => handleDelete(id)} ><DeleteForeverIcon /></Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        </TableCell>
      </TableRow>
    </>
  );
}

const ClientList: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(8);
  const [rows, setRows] = useState<DataFields[]>(fullRows);
  const [searched, setSearched] = useState<string>("");

  // API call retrieve rows and set them to state, instead of using fullRows

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  },[]);

  const handleSetRows = useCallback((newRows: DataFields[]) => {
    setRows(newRows);
  },[]);
  
  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  },[]);

  const requestSearch = useCallback((searchedVal: string) => {
    const filteredRows = fullRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setPage(0);
    setRows(filteredRows);
  },[]);

  const cancelSearch = useCallback(() => {
    setSearched("");
    requestSearch(searched);
  },[searched, requestSearch]);

  return (
    <div className={classes.main}>
        <AddClientButton rows={rows} setRows={setRows}/>
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
                <TableCell classes={{ head: classes.clientCellHead, body: classes.cellBody }}>CLIENT</TableCell>
                <TableCell classes={{ head: classes.tagsCellHead, body: classes.cellBody }}>TAGS</TableCell>
                <TableCell classes={{ head: classes.emptyCellHead, body: classes.cellBody}}> PROFILE </TableCell>
                <TableCell align="center" classes={{ head: classes.tagsCellHead, body: classes.cellBody }}>DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <Row key = {row.id} {...row} rows={rows} handleSetRows={handleSetRows}/>
                );
              })}
              
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination classes={{ root: classes.pagination }}
              rowsPerPageOptions={[4, 8]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default ClientList;
