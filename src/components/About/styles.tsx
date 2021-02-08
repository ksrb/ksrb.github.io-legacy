import { makeStyles } from "@material-ui/styles";

import { marginBottomClass } from "src/styles";

export default makeStyles({
  ...marginBottomClass,
  root: {
    composes: "$marginBottom",
  },
});
