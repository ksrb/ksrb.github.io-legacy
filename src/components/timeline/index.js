import React, { Component } from 'react';
import styles from './styles.scss';

class Timeline extends Component {

  render() {
    const { experiences } = this.props;
    let startDate = new Date();
    let endDate = new Date(1700, 1, 1);

    experiences.forEach(experience => {
      const experienceStartDate = new Date(experience.startDate);
      const experienceEndDate = new Date(experience.endDate);

      if (experienceStartDate < startDate) {
        startDate = experienceStartDate;
      }

      if (experienceEndDate > endDate) {
        endDate = experienceEndDate;
      }
    });

    let yearsBetween = endDate.getFullYear() - startDate.getFullYear();
    // Render extra node if work experience did not end at years end
    if (endDate.getMonth() !== 11) {
      yearsBetween++;
    }

    return (
      <div className={styles.root}>
        {(() => {
          let yearNodes = [];
          for (let i = yearsBetween; i >= 0; i--) {
            const date = new Date(startDate);
            date.setFullYear(date.getFullYear() + i);
            yearNodes.push(
              <div key={i} className={styles.node}>
                <div className={styles.node_bullet}>
                  <div className={styles.node_text}>{date.getFullYear()}</div>
                </div>
                {i !== 0 ? <div className={styles.node_connector} /> : null}
              </div>
            );
          }
          return yearNodes;
        })()}
      </div>
    );
  }

}

export default Timeline;
