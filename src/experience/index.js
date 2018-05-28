import React, { Component } from 'react';

import { gql } from 'apollo-boost';
import {
  Query,
} from 'react-apollo';

import {
  Card,
  CardHeader,
  CardBody,
} from 'components/card';

import Timeline from 'components/timeline';
import SkillMeter from 'components/skillMeter';

import styles from './styles.scss';

const QUERY_EXPERIENCE = gql`
query {
  experiences {
    companyName
    iconPath
    purpose
    address {
      state
      county
    }
    role
    hours
    startDate
    endDate
    skills {
      name
      type
      utilization
    }
    accomplishments
  }
}
`;

class Experience extends Component {

  render() {
    return (
      <Query query={QUERY_EXPERIENCE}>
        {({ data: { experiences } }) => {
          return (
            <div className={styles.root}>
              <Timeline experiences={experiences} />
              {experiences.map((experience, index) => {
                let {
                  companyName,
                  iconPath,
                  purpose,
                  address: {
                    state,
                    county,
                  },
                  role,
                  hours,
                  startDate,
                  endDate,
                  skills,
                  accomplishments,
                } = experience;

                startDate = new Date(startDate);
                startDate = `${startDate.getMonth()}/${startDate.getFullYear()}`;
                endDate = new Date(endDate);
                endDate = `${endDate.getMonth()}/${endDate.getFullYear()}`;

                return (
                  <Card key={index}>
                    <CardHeader>
                      <img
                        className={styles.card_header_img}
                        src={iconPath}
                        alt={companyName} />
                    </CardHeader>
                    <CardBody>
                      <SkillMeter
                        className={styles.card_body_skills}
                        skills={skills} />
                      <div className={styles.card_body_header}>
                        <div className={styles.card_body_header_left}>
                          <div className={styles.card_body_company_name}>
                            {companyName}
                          </div>
                          <div>{county}, {state}</div>
                        </div>
                        <div className={styles.card_body_header_right}>
                          <div>{role} - {hours}</div>
                          <div>{startDate} - {endDate}</div>
                        </div>
                      </div>
                      <div className={styles.card_body_body}>
                        <div className={styles.card_body_purpose}>
                          {purpose}
                        </div>
                        <ul className={styles.card_body_list}>
                          {accomplishments.map(
                            (accomplishment, accomplishmentIndex) => (
                              <li
                                key={accomplishmentIndex}
                                className={styles.card_body_list_item}>
                                {accomplishment}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Experience;
