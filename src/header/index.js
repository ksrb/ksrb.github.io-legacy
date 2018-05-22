import React, { Component } from 'react';
import styles from './styles.scss';

class Header extends Component {

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.title}>
          <div className={styles.title_name}>
            K<span className={styles.title_name_small}>EVIN</span>
            &nbsp;
            S<span className={styles.title_name_small}>UEN</span>
            <hr />
          </div>
          <div className={styles.title_tagline}>
            Developer • Designer
          </div>
        </div>
        <div className={styles.tagline}>
          Think • Design • Create
        </div>
      </div>
    );
  }
}

export default Header;
