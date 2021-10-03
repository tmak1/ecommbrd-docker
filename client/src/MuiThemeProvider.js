import React from 'react';

import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#FFF',
        },
      },
    },
    MuiTypography: {
      h5: {
        fontSize: '1.5rem',
        [createBreakpoints({}).down('xs')]: {
          fontSize: '1rem',
        },
      },
    },
  },
  palette: {
    primary: {
      light: '#55595c',
      main: '#2c3033',
      dark: '#00070c',
      contrastText: '#fff',
    },
  },
  skeleton: {
    text: [8, 16, 21, 32, 45, 64],
  },
  typography: {
    fontFamily: [
      'Nunito Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(', '),
  },
});

const MuiThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
