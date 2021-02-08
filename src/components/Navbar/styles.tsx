import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

export default makeStyles<Theme>(({ marginBottom }) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginBottom: marginBottom,
  },

  item: {
    margin: "0 5px 0 5px",
    fontWeight: 500,
  },
}));
