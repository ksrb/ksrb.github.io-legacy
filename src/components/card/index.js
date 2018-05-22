import React, { Component } from 'react';
import styles from './styles.scss';


class Card extends Component {

  render() {
    return (
      <div className={styles.root}>
        {this.props.children.find(child => child.type === CardHeader)}
        {this.props.children.find(child => child.type === CardBody)}
      </div>
    );
  }
}

const CardHeader = ({ children }, context) => {
  return (
    <div className={styles.header}>
      {children && children}
    </div>
  );
};

const CardBody = ({ children }, context) => {
  return (
    <div className={styles.body}>
      {children && children}
    </div>
  );
};

export { Card, CardHeader, CardBody };
