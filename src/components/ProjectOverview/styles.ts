import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  root: {
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: "1px solid black",
    float: "left"
  },
  profileInfoContainer : {
    position: "absolute",
    backgroundColor: "#F7F9FD",
    top: "25%",
    left: "18%",
    width: "60%",
  },
  header: {
    fontSize: "30px"
  },
  contactInfo: {
    marginBottom: "20px",
    width: "40%"
  },
  contactContainer: {
    float: "left"
  },
  linkButton: {
    marginLeft: "20px"
  },
  editButton: {
    left: "100%",
    bottom: "100%",
    position: "absolute",
    width: "100px"
  },
  descriptionEdit: {
    height: "40%"
  },
  addTagButton: {
    marginBottom: "10px"
  }
}));