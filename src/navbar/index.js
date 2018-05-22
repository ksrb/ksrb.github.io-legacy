import React, { Component } from 'react';

import { gql } from 'apollo-boost';
import {
  Mutation,
  Query
} from 'react-apollo';

import styles from './styles.scss';

const items = [
  {
    title: 'ABOUT',
  },
  {
    title: 'SKILLS',
  },
  {
    title: 'EXPERIENCE',
  },
  {
    title: 'EDUCATION',
  },
];

const MUTATE_SELECTED_NAVBAR_ITEM = gql`
  mutation changeSelectedNavbarItem($item: String!) {
    changeSelectedNavbarItem(item: $item) @client {
      uiState {
        selectedItem
      }
    }
  }
`;

const QUERY_NAVBAR_STATE = gql`
  query {
    uiState {
      selectedItem
    }
  }
`;

class Navbar extends Component {

  render() {
    return (
      <Query query={QUERY_NAVBAR_STATE}>
        {({ data: { uiState: { selectedItem } } }) => (
          <Mutation mutation={MUTATE_SELECTED_NAVBAR_ITEM}>
            {(mutate) => (
              <div className={styles.root}>
                <div className={styles.logo}>
                  <div className={styles.logo_icon}>

                  </div>
                  <div className={styles.logo_text}>
                    K<span className={styles.logo_text_small}>EVIN</span>
                    &nbsp;
                    S<span className={styles.logo_text_small}>UEN</span>
                  </div>
                </div>
                <div className={styles.navbar}>
                  {items.map((item, index) => {
                    const {
                      title,
                    } = item;

                    return (
                      <div
                        className={`${styles.navbar_item} ${selectedItem === title ? styles.navbar_item__selected : ''}`}
                        key={index}
                        onClick={() => {
                          mutate({ variables: { item: title } });
                        }}>
                        {title}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default Navbar;

