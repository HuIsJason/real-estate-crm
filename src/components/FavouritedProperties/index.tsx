import React, { useCallback, useState } from 'react';
import {
  Button,
  Modal,
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
import { v4 as uuid } from 'uuid';

import useStyles from './styles';

interface RowProps {
  id: string;
  property: string;
  date: Date;
}

const projectsData = [
  {
    id: 123,
    name: 'Investment Condo in Downtown',
    active: false,
  },
  {
    id: 154,
    name: 'Dream House',
    active: false,
  },
  {
    id: 190,
    name: 'Commercial Investment Property',
    active: false,
  },
];

const createData = (property: string, date: Date) => ({
  property,
  date,
  id: uuid(),
});

const propertyObjects: RowProps[] = [
  createData('7 Becca Hall Trail', new Date()),
  createData('123 Sesame Street', new Date()),
  createData('6 Drewent Close', new Date()),
  createData('56 Ridge Paddock', new Date()),
  createData('45 Drewent Close', new Date()),
  createData('4 Huntley Road', new Date()),
  createData('1 Heys Hunt Avenue', new Date()),
  createData('509 Compania Cres', new Date()),
  createData('144 Military Trail', new Date()),
];

const Row: React.FC<RowProps> = ({ property, date }: RowProps) => {
  const [projects, setProjects] = useState(projectsData);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const classes = useStyles();

  const handleOpen = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleAddProject = useCallback(
    (id) => {
      const updatedProjects = projects.map((project) =>
        project.id === id ? { ...project, active: true } : project
      );
      /**
       * here there would be a server call to change this property's linked projects list
       */
      setProjects(updatedProjects);
    },
    [projects]
  );

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {property}
        </TableCell>
        <TableCell align="right">{date.toDateString()}</TableCell>
        <TableCell align="right">
          <Button onClick={handleOpen} color="primary" variant="contained">
            Add
          </Button>
        </TableCell>
      </TableRow>
      <Modal open={openModal} onClose={handleClose}>
        <Paper className={classes.modal}>
          <Typography variant="h6" color="primary">
            Add to a project:
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell color="primary">Project</TableCell>
                  <TableCell align="right" color="primary">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell component="th" scope="row">
                      {project.name}
                    </TableCell>
                    <TableCell align="right">
                      {' '}
                      {project.active ? (
                        <Typography
                          className={classes.statusCell}
                          variant="body1"
                        >
                          <CheckIcon /> Added
                        </Typography>
                      ) : (
                        <Button
                          onClick={() => handleAddProject(project.id)}
                          color="primary"
                          variant="contained"
                        >
                          Add
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Modal>
    </>
  );
};

interface FavouritedPropertiesProps {
  page: string;
}

const FavouritedProperties: React.FC<FavouritedPropertiesProps> = ({
  page,
}: FavouritedPropertiesProps) => {
  const [properties] = useState<RowProps[]>(propertyObjects);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const classes = useStyles();

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setCurrentPage(0);
    },
    []
  );

  const handleChangePage = useCallback((_, page: number) => {
    setCurrentPage(page);
  }, []);

  const render = page === 'fav projects';

  return (
    <>
      {render && (
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
                {properties
                  .slice(
                    currentPage * rowsPerPage,
                    currentPage * rowsPerPage + rowsPerPage
                  )
                  .map((row) => (
                    <Row key={row.id} {...row} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className={classes.pagination}
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={properties.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={currentPage}
            {...{ rowsPerPage }}
          />
        </>
      )}
    </>
  );
};

export default FavouritedProperties;
