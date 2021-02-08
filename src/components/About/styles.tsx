import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

export default makeStyles<Theme>(({ marginBottom }) => ({
  root: {
    marginBottom: marginBottom,
  },
}));
