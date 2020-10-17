import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBlockStart: "0.75em",
      marginBlockEnd: "0.5em"
    },
    h3: {
      fontSize: "1.17rem",
      fontWeight: 700
    }
  }
});

export default theme;