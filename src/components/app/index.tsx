import React, { FC } from "react";
import classnames from "classnames";
import { Grid } from "@material-ui/core";

import About from "../about";
import Experience from "../experience";
import Navbar from "../navbar";

import useStyles from "./styles";

const App: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.header}>
        <div className={classnames(classes.header_name)}>
          K<span className={classes.header_name__small}>EVIN</span>
        </div>
        <div
          className={classnames(classes.header_name, classes.header_name__last)}
        >
          S<span className={classes.header_name__small}>UEN</span>
        </div>
      </Grid>
      <Navbar />
      <About />
      <Experience />
    </div>
  );
};

export default App;
