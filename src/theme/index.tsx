import { createMuiTheme, Theme as MaterialUITheme } from "@material-ui/core";

const primaryColor = "#4a679b";
const secondaryColor = "#909b4a";
const trinaryColor = "#9b554a";
const languagesColor = "#2988d4";

const { spacing } = createMuiTheme();

const args = {
  marginBottom: spacing(3),
  primaryColor,
  secondaryColor,
  trinaryColor,
  languagesColor,
};

export type Theme = MaterialUITheme & typeof args;

export default createMuiTheme({}, args) as Theme;
