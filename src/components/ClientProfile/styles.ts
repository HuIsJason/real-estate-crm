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
    top: "230px",
    left: "18%",
    width: "80%",
  },
  header: {
    fontSize: "30px"
  },
  contactInfo: {
    marginLeft: "20%",
    marginBottom: "20px",
    width: "100%"
  },
  contactContainer: {
    float: "left"
  },
  linkButton: {
    marginLeft: "50px"
  },
  editButton: {
    float: "left",
    left: "30%",
    width: "100px"
  }
}));