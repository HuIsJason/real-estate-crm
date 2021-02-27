import React from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SearchBar from "material-ui-search-bar";

import { RowProps as Props, RowProps } from './types';
import useStyles from './styles';

function createData(name: string, email: string, tags: string[]) {
  return {
    name,
    email,
    tags
  };
}

const fullRows = [
  createData('George Smith', "GeorgeS@Outlook.com", ["Active", "expensive"]),
  createData('Johnny Smith', "JohnnyeS@Outlook.com", ["Active", "expensive"]),
  createData('Jill Smith', "JillS@Outlook.com", ["Active", "expensive"]),
  createData('Jenny Smith', "JennyS@Outlook.com", ["Active", "expensive"]),
  createData('Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('2Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('3Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('4Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('5Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('6Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('7Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('8Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('9Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('0Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('11Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('12Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('13Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('14Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
  createData('15Joey Smith', "JoeyS@Outlook.com", ["Active", "expensive"]),
];

const Row: React.FC<Props> = ({ name, email, tags }: Props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

const ClientList = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<RowProps[]>(fullRows);
  const [searched, setSearched] = React.useState<string>("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const requestSearch = (searchedVal: string) => {
    const filteredRows = fullRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

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
            {/* {rows.map((row) => (
              <Row key={row.name} {...row} />
            ))} */}

            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <Row key = {row.name} {...row} />
              );
            })}
            
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
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
