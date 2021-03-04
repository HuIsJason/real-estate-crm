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
  Paper,
  Button
} from '@material-ui/core';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  DeleteForever as DeleteForeverIcon
} from '@material-ui/icons';
import SearchBar from "material-ui-search-bar";


import { AddClientButton } from '../.';

import { RowProps, DataFields} from './types';
import useStyles from './styles';
import { fullRows } from './data';

const Row: React.FC<RowProps> = ({ name, email, tags, id, rows, setRows}: RowProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useStyles();

  const handleDelete = useCallback((id: string) => {
    var indexOfRow = fullRows.findIndex(i => i.id === id)
    fullRows.splice(indexOfRow, 1);
    const newRows = fullRows.filter((row) => {
      return row.id !== id;
    });

    setRows(newRows);
  },[setRows]);

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
          {tags}
        </TableCell>
        <TableCell>
          <Button color="primary" className={classes.EButton} onClick={() => handleDelete(id)} ><DeleteForeverIcon /></Button>
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

const ClientList: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [rows, setRows] = useState<DataFields[]>(fullRows);
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
    setPage(0);
    setRows(filteredRows);
  },[]);

  const cancelSearch = useCallback(() => {
    setSearched("");
    requestSearch(searched);
  },[searched, requestSearch]);

  return (
    <>
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
                <TableCell classes={{ head: classes.emptyCellHead, body: classes.cellBody}} />
                <TableCell classes={{ head: classes.clientCellHead, body: classes.cellBody }}>CLIENT</TableCell>
                <TableCell classes={{ head: classes.tagsCellHead, body: classes.cellBody }}>TAGS</TableCell>
                <TableCell align="center" classes={{ head: classes.tagsCellHead, body: classes.cellBody }}>DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <Row key = {row.name} {...row} rows={rows} setRows={setRows}/>
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
    </>
  );
}

export default ClientList;
