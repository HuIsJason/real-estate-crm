import React, { useCallback, useState } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import useStyles from './styles';

interface RowProps {
  property: string;
  date: Date;
  // isAdded: boolean
}

const createData = (property: string, date: Date) => ({ property, date });

const projectObjects: RowProps[] = [
  createData('7 Becca Hall Trail', new Date()),
  createData('123 Sesame Street', new Date()),
  createData('f354r re ', new Date()),
  createData('rg re ger egdf', new Date()),
  createData('rtg4re g ', new Date()),
  createData('rgreerter ', new Date()),
  createData('rg er g df d', new Date()),
  createData('fgfdgdsdhjtgd', new Date()),
  createData('fdgdfgdsgfhdfdgd', new Date()),
  createData('123 Sesame Street', new Date()),
  createData('dsfsd fsdfwewf', new Date()),
  createData('dfdsf  dsfsd ', new Date()),
  createData('fgfdfdbxvc', new Date()),
  createData('dsfdsfdsff', new Date()),
  createData('324767567', new Date()),
  createData('324234324234', new Date()),
];

const Row: React.FC<RowProps> = ({ property, date }: RowProps) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const classes = useStyles();

  const handleAdd = useCallback(() => {
    setIsAdded(true);
  }, []);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {property}
      </TableCell>
      <TableCell align="right">{date.toDateString()}</TableCell>
      <TableCell align="right">
        {isAdded ? (
          <Typography className={classes.statusCell} variant="body1">
            <CheckIcon /> Added
          </Typography>
        ) : (
          <Button onClick={handleAdd} color="primary" variant="contained">
            Add
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

const FavouriteProjects: React.FC = () => {
  const [projects, setProjects] = useState<RowProps[]>(projectObjects);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const classes = useStyles();

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    },
    []
  );

  const handleChangePage = useCallback((_, page: number) => {
    setPage(page);
  }, []);

  return (
    <>
      <TableContainer className={classes.paper} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell color="primary">Property</TableCell>
              <TableCell color="primary" align="right">
                Date
              </TableCell>
              <TableCell color="primary" align="right">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, id) => (
                <Row key={id} {...row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={projects.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        {...{ rowsPerPage, page }}
      />
    </>
  );
};

export default FavouriteProjects;
