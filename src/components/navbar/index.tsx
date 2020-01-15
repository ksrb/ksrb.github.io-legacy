import React, { FC } from "react";
import { Grid } from "@material-ui/core";

import useStyles from "./styles";

const Navbar: FC = props => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <div className={classes.item}>ABOUT</div>
      <div className={classes.item}>EXPERIENCE</div>
      <div className={classes.item}>SKILLS</div>
    </Grid>
  );
};

export default Navbar;
