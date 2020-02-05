import { makeStyles } from "@material-ui/styles";

import { marginBottomClass } from "src/styles";

export default makeStyles({
  ...marginBottomClass,

  root: {
    composes: "$marginBottom",
    display: "flex",
    justifyContent: "center",
  },

  item: {
    margin: "0 5px 0 5px",
    fontWeight: 500,
  },
});
