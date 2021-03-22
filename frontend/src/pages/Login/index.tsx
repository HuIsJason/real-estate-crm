import React, { useCallback, useState } from 'react';
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
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      type: 'username' | 'password'
    ) => {
      const input = e.currentTarget.value;

      switch (type) {
        case 'username':
          setUsername(input);
          break;
        case 'password':
          setPassword(input);
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
        fullWidth
        component="form"
        variant="filled"
      >
        <TextField
          className={classes.textField}
          fullWidth
          value={username}
          onChange={(e) => handleChange(e, 'username')}
          label="Username"
          required
        />
        <TextField
          className={classes.textField}
          fullWidth
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
          /**
           * here the button would call loginUser() from the context
           */
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
