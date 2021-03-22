import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: "1px solid black",
    float: "left"
  },
  profileInfoContainer : {
    position: "absolute",
    backgroundColor: "#F7F9FD",
    top: "225px",
    left: "18%",
    width: "70%",
  },
  header: {
    fontSize: "30px"
  },
  contactInfo: {
    marginTop: "10px",
    marginBottom: "20px",
    width: "40%"
  },
  contactContainer: {
    float: "left"
  },
  statusButton: {
    marginLeft: "10px",
    borderRadius: '50px'
  },
  editButton: {
    marginBottom: '20px',
    background: 'white'
  },
  descriptionEdit: {
    height: "40%"
  },
  addTagButton: {
    marginBottom: "20px",
    background: 'white'
  },
  tags: {
    margin: "4px",
  }
}));