import React, { Component } from 'react';
import Navbar from 'src/navbar';
import Header from 'src/header';
import About from 'src/about';
import Experience from 'src/experience';
import Skills from 'src/skills';

import styles from './styles.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Navbar />
        <Header />
        <About />
        <Experience />
        <Skills />
      </div>
    );
  }
}

export default App;
