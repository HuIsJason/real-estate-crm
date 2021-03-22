import {
  createMuiTheme,
  Theme,
  ThemeProvider as Provider,
} from '@material-ui/core';

import { ProviderProps as Props } from '../types';

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0C3A77',
    },
  },
});

const ThemeProvider: React.FC<Props> = ({ children }) => (
  <Provider theme={theme}>{children}</Provider>
);

export default ThemeProvider;
