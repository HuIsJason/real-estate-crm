import React, { ChangeEvent, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

import useStyles from './styles';
import { useUserContext } from '../../contexts/UserContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { loginUser } = useUserContext();

  const classes = useStyles();

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      type: 'username' | 'password'
    ) => {
      switch (type) {
        case 'username':
          setUsername(e.currentTarget.value);
          break;
        case 'password':
          setPassword(e.currentTarget.value);
          break;
      }
    },
    []
  );

  const handleSubmit = useCallback(() => {
    loginUser(username, password);
  }, [username, password, loginUser]);

  return (
    <Paper className={classes.paper} elevation={5}>
      <Typography color="primary" variant="h3">
        Login
      </Typography>
      <FormControl
        onSubmit={handleSubmit}
        fullWidth={true}
        component="form"
        variant="filled"
      >
        <TextField
          className={classes.textField}
          fullWidth={true}
          value={username}
          onChange={(e) => handleChange(e, 'username')}
          label="Username"
          required
        />
        <TextField
          className={classes.textField}
          fullWidth={true}
          value={password}
          onChange={(e) => handleChange(e, 'password')}
          label="Password"
          type="password"
          required
        />
        <Typography align="center" variant="body1">
          Don't have an account? Sign up <Link to="/signup">here</Link>.
        </Typography>
        <Button
          color="primary"
          className={classes.button}
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </FormControl>
    </Paper>
  );
};

export default Login;
