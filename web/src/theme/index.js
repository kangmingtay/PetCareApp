import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.indigo[500]
    },
    secondary: {
      main: colors.indigo[500]
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography,
  zIndex: {
// set these to whatever, I just set the appbar to 1
    mobileStepper: 1000,
    appBar: 998,
    drawer: 998,
    modal: 999,
    snackbar: 1400,
    tooltip: 1500,
    mobileStepper: 1000,
    // appBar: 1100
    // drawer: 1200
    // modal: 1300
    // snackbar: 1400
    // tooltip: 1500
  },
});

export default theme;
