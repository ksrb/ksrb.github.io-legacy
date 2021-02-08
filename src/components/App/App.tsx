import React, { FC } from "react";
import clsx from "clsx";
import { Grid } from "@material-ui/core";
import About from "src/components/About";
import Experiences from "src/components/Experiences";
import Navbar from "src/components/Navbar";
import Skills from "src/components/Skills";

import useStyles from "./styles";

const App: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.header}>
        <div className={clsx(classes.header_name)}>
          K<span className={classes.header_name__small}>EVIN</span>
        </div>
        <div className={clsx(classes.header_name, classes.header_name__last)}>
          S<span className={classes.header_name__small}>UEN</span>
        </div>
      </Grid>
      <Navbar />
      <About />
      <Experiences />
      <Skills />
    </div>
  );
};

export default App;
