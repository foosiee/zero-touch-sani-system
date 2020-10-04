import { createMuiTheme } from '@material-ui/core/styles';

const blue = '#1652f0';

export const SiteTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue,
    },
    secondary: {
      main: '#ffffff',
    },
  },
  overrides: {
    MuiInput: {
      underline: {
        borderBottom: blue,
        '&:before': {
          borderBottom: `2px solid ${blue}`,
        },
        '&:after': {
          borderBottom: `2px solid ${blue}`,
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid ${blue}`,
        },
        '&:click': {
          borderBottom: `2px solid ${blue}`,
        },
      },
    },
  },
});
