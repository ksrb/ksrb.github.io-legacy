import React, { Component } from 'react';
import styles from './styles.scss';

class Skill extends Component {

  renderNodes(skill) {
    const {
      level,
      comment,
      type,
    } = skill;

    const levelFloor = Math.floor(level);
    const decimal = level - levelFloor;

    let skillNodes = [];

    for (let i = 0; i < levelFloor; i++) {
      skillNodes.push(
        <div
          key={i * 2}
          className={styles.node_connector}>
          <div
            className={`${styles.node_connector_fill} ${styles[`node_connector_fill__${type}`]}`} />
        </div>
      );
      skillNodes.push(
        <div
          key={i * 2 + 1}
          className={`${styles.node_bullet} ${styles[`node_bullet__${type}`]}`}>
          {i === levelFloor - 1 && !decimal &&
          <div className={styles.node_bullet_text}>
            {comment}
          </div>
          }
        </div>
      );
    }

    const decimalCeil = Math.ceil(decimal);

    if (decimalCeil) {
      skillNodes.push(
        <div
          key={levelFloor * 2}
          className={styles.node_connector}>
          <div
            className={`${styles.node_connector_fill} ${styles[`node_connector_fill__${type}`]}`}
            style={{ width: `calc(${decimal * 100}% + 2px)` }} />
          <div
            className={`${styles.node_bullet_small} ${styles[`node_bullet__${type}`]}`}
            style={{ left: `calc(${decimal * 100}% - 2px)` }}>
            <div className={styles.node_bullet_text_small}>
              {comment}
            </div>
          </div>
        </div>
      );
    }

    const maxSkillLevel = 6;
    const placeHolderCount = maxSkillLevel - levelFloor;

    for (let i = decimalCeil; i < placeHolderCount + decimalCeil; i++) {
      if (i !== decimalCeil || !decimalCeil) {
        skillNodes.push(
          <div
            key={(levelFloor + i) * 2}
            className={styles.node_connector} />
        );
      }
      skillNodes.push(
        <div
          key={(levelFloor + i) * 2 + 1}
          className={styles.node_bullet_placeholder} />
      );
    }

    return skillNodes;
  }

  render() {
    let {
      className,
      skill,
    } = this.props;

    skill = skill ? skill : {};

    const {
      name,
      iconPath,
      type,
      link,
    } = skill;

    return (
      <div className={`${styles.root} ${className || ''}`}>
        <a href={link}
           target='_blank'>
          <div
            className={`${styles.node_bullet_large} ${styles[`node_bullet__${type}`]}`}>

            <img
              className={styles.node_large_icon}
              src={iconPath}
              alt={name} />
            {name}
          </div>
        </a>

        {this.renderNodes(skill)}
      </div>
    );
  }
}

export default Skill;

