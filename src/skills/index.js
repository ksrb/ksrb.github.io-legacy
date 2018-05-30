import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import {
  Query,
} from 'react-apollo';

import Skill from 'components/skill';
import Legend from 'components/skill/legend';


import styles from './styles.scss';

const QUERY_SKILLS = gql`
query {
  skills {
    name
    iconPath
    level
    comment
    type
    link
  }
}
`;

class Skills extends Component {

  render() {
    return (
      <Query query={QUERY_SKILLS}>
        {({ data: { skills } }) => {
          return (
            <div className={styles.root}>
              <Legend className={styles.skill} />
              {skills.map((skill, index) => {
                return (
                  <Skill
                    key={index}
                    className={styles.skill}
                    skill={skill} />
                );
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Skills;
