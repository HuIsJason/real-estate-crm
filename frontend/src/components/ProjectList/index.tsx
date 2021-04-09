import React, { useEffect } from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import BinarySelector from '../BinarySelector/index';
import AddProjectModal from './modal';
import { useHistory } from 'react-router-dom';
import send from '../../requests/request';
import { Project } from '../../utils/types';
import { TagFaces } from '@material-ui/icons';

const selectorOptions = [
  {
    value: 'active',
    displayName: 'Active',
  },
  {
    value: 'closed',
    displayName: 'Closed',
  },
];

const projects: Project[] = [
  // {
  //   _id: "734987439",
  //   title: 'Investment Condo in Downtown',
  //   status: "active"
  // }, {
  //   _id: "8764232",
  //   title: 'Dream House',
  //   status: "closed",
  // },
  // {
  //   _id: "190",
  //   title: 'Commercial Investment Property',
  //   status: "active",
  // },
];

const ProjectList: React.FC<any> = ({ clientId, title }: any) => {
  const classes = useStyles();
  const history = useHistory();

  const [showActive, setShowActive] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [allProjects, setProjects] = React.useState(projects);

  useEffect(() => {
    // TODO: Get a list of all projects (summarized) from server
    send('getAllProjects', {}, `/${clientId}`)
      .then((response) => response.json())
      .then((json) => {
        const { projects } = json;
        setProjects(projects);
      });
  }, [clientId]);

  const addProject = (projectName: string) => {
    // const newId = allProjects[allProjects.length - 1].id + 1;
    // allProjects.push({id: newId, name: projectName, active: true});
    // setProjects(allProjects);
    // TODO: send request to server to add a new empty project with name <projectName>
    send('addProject', { title: projectName }, `/${clientId}`)
      .then((response) => {
        if (response.status === 201) {
          console.log(`Project added`);
          return response.json();
        } else {
          console.log(`Project could not be added.. Error ${response.status}`);
          // throw
        }
      })
      .then((data) => {
        setProjects([...allProjects, data]);
      });

    setOpenModal(false);
  };

  const openProject = (projectId: string, projectLabel: string) => {
    /* TODO: update to navigate to detailed project view */
    console.log(`Opening project ${projectId}`);
    history.push({
      pathname: '/client-details/' + clientId + '/project-details',
      state: {
        projectId: projectId,
        clientId: clientId,
        title: title,
        projectLabel: projectLabel
      },
    });
  };

  return (
    <div className={classes.main}>
      <div style={{ minHeight: '40px' }}>
        <button
          className={classes.buttonFilled}
          onClick={() => setOpenModal(true)}
        >
          {' '}
          <Typography variant="button"> + New Project </Typography>
        </button>
      </div>
      <BinarySelector
        options={selectorOptions}
        selection={showActive ? 'active' : 'closed'}
        setSelection={(value: string) => setShowActive(value === 'active')}
      />
      <div className={classes.root}>
        <table className={classes.table}>
          <tbody>
            {allProjects
              .filter((project) =>
                showActive
                  ? project.status === 'active'
                  : project.status === 'closed'
              )
              .map((project) => (
                <tr key={project._id} onClick={() => openProject(project._id, project.title)}>
                  <td>
                    {' '}
                    <Typography className={classes.text} variant="subtitle1">
                      {' '}
                      {project.title}{' '}
                    </Typography>
                    <span
                      style={{ float: 'right', color: '#d3d5db', marginTop: 5 }}
                    >
                      {' '}
                      {'>'}{' '}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AddProjectModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onContinue={addProject}
      />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    margin: theme.spacing(5),
    width: '70%',
    position: 'absolute',
    top: '165px',
    left: '15%',
  },
  root: {
    margin: theme.spacing(2),
    background: 'white',
    borderRadius: '10px',
    border: '1px solid #0C3A77',
    boxShadow: '2px 2px #F1F2F5',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    '& td, th': {
      padding: '1.3rem',
      textAlign: 'left',
      color: "#0C3A77",
      borderRadius: '10px',
    },
    '& tbody tr': {
      height: '50px',
      borderBottom: '1px solid #F1F2F5',
      '&:last-child': {
        borderBottom: 'none'
      },
      '&:hover' : {
        backgroundColor: '#fcfcfc',
        opacity: 1,
      }
    }
  },
  text: {
    display: 'inline-block',
    fontSize: '16px', 
    marginBottom: 5,
  },
  button: {
    background: 'white',
    color: '#0C3A77',
    padding: '8px 10px',
    border: '1px solid #F1F2F5',
    borderRadius: '5%',
    outline: 'none',
    '&:hover': {
      opacity: 0.7,
    },
  },
  buttonContainer: {
    marginBottom: 0,
    minHeight: '35px',
  },
  buttonFilled: {
    margin: theme.spacing(3),
    background: '#0C3A77',
    color: 'white',
    padding: '7px 12px',
    border: 'none',
    outline: 'none',
    float: 'right',
    borderRadius: '5px',
    marginBottom: 10,
    marginLeft: 10,
    '&:hover' : {
        opacity: .7,
        
    }  
  },
  tagContainer: {
    background: "#e6f0ff",
    color: '#0C3A77',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '10px',
    marginLeft: 4,
    marginRight: 4,
    marginTop: "5px",
  }
}));

export default ProjectList;
