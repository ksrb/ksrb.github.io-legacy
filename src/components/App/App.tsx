import { Container } from "@material-ui/core";
import React, { FC } from "react";
import About from "src/components/About";
import Experiences from "src/components/Experiences";
import Header from "src/components/Header";
import Navbar from "src/components/Navbar";
import Skills from "src/components/Skills";

import useStyles from "./styles";

const App: FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="md">
      <Header />
      <Navbar />
      <About />
      <Skills />
      <Experiences />
    </Container>
  );
};

export default App;
