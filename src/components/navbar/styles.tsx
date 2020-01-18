import { makeStyles } from "@material-ui/styles";

import { marginBottom } from "src/styles";

export default makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: `0 0 ${marginBottom}`,
  },
  item: {
    margin: "0 5px 0 5px",
    fontWeight: 500,
  },
});
