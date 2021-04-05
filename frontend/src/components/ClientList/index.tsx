import React, {useState, useCallback, useEffect} from 'react';
import {getClientsList, deleteClient} from '../../actions/clients';

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

import { useUserContext } from '../../contexts/UserContext';

const Row: React.FC<RowProps> = ({ firstName, lastName, tags, id, handleDelete}: RowProps) => {
  const classes = useStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          <Link to={"/client-details"} className={classes.linkStyle}>
            {firstName} {lastName}
          </Link>
        </TableCell>
        <TableCell align="left">
            <Link to={"/client-details"} className={classes.linkStyle}>
            {tags}
            </Link>
        </TableCell>
        <TableCell>
          <Link to={"/client-details"} className={classes.linkStyle}>
            <IconButton size="small" >
              <AccountBoxIcon color="primary" /> 
            </IconButton>
          </Link>
        </TableCell>
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
  const [originalRows, setOriginalRows] = useState<DataFields[]>([]);
  const [rows, setRows] = useState<DataFields[]>([]);
  const [searched, setSearched] = useState<string>("");

  const {user} = useUserContext();

  useEffect(() => {
    getClientsList(handleSetRows, user);
  }, []);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  },[setRows, rows]);

  const handleSetRows = useCallback((newRows: DataFields[]) => {
    setRows(newRows);
    setOriginalRows(newRows);
  },[setRows, rows]); 
  
  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  },[setRows, rows]);

  const requestSearch = useCallback((searchedVal: string) => {
    const filteredRows = originalRows.filter((row) => {
      return (row.firstName + " " + row.lastName).toLowerCase().includes(searchedVal.toLowerCase());
    });
    setPage(0);
    setRows(filteredRows);
  },[setRows, rows, originalRows]);

  const cancelSearch = useCallback(() => {
    setSearched("");
    requestSearch(searched);
  },[originalRows, searched, requestSearch]);

  const handleDelete = useCallback((id: string) => {
    // API call to delete to backend

    deleteClient(id, rows, handleSetRows);

  },[rows]);

  return (
    <div className={classes.main}>
        <AddClientButton rows={rows} setRows={handleSetRows}/>
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
                  <Row key = {row._id} id = {row._id} firstName={row.firstName} lastName={row.lastName} tags={row.tags} handleDelete={handleDelete}/>
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
