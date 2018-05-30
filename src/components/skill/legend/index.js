import React, { Component } from 'react';
import styles from './styles.scss';
import skill_styles from '../styles.scss';

const legendLevels = [
  {
    label: 'Beginner',
  },
  {
    label: 'Familiar',
  },
  {
    label: 'Proficient',
  },
  {
    label: 'Instructor',
  },
  {
    label: 'Expert',
  },
  {
    label: 'Master',
  },
];

class Legend extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchOpen: false
    };
  }

  renderNodes() {
    let legendNodes = [];
    for (let i = 0; i < legendLevels.length; i++) {
      const { label } = legendLevels[i];
      legendNodes.push(
        <div
          key={i + (i * 2)}
          className={skill_styles.node_connector}>
          <div className={skill_styles.node_connector_fill} />
        </div>
      );
      legendNodes.push(
        <div
          key={i + (i * 2) + 1}
          className={skill_styles.node_bullet}>
          <div className={skill_styles.node_bullet_text}>
            {label}
          </div>
        </div>
      );
    }
    return legendNodes;
  };

  handleSearchClicked = () => {
    this.setState({ searchOpen: !this.state.searchOpen });
  };

  render() {
    const { className } = this.props;
    const { searchOpen } = this.state;

    return (
      <div className={`${styles.root} ${className || ''}`}>
        <div className={skill_styles.root}>
          <div className={skill_styles.node_bullet_large}
               onClick={this.handleSearchClicked}>
            <img
              className={skill_styles.node_large_icon}
              src={require('data/img/search.svg')}
              alt='search' />
            Search
          </div>
          {this.renderNodes()}
        </div>

        <div
          className={`${styles.search} ${searchOpen ? styles.search__visible : styles.search__hidden}`}>

          <div className={styles.search_connector_vertical}>
            <div className={styles.search_connector_vertical_fill} />
          </div>

          <div className={styles.search_bullet_container}>
            <div className={`${skill_styles.node_bullet} ${styles.node_bullet}`} />

            <div className={styles.search_bar}>
              <div
                className={`${skill_styles.node_connector} ${styles.search_node_connector}`}>
                <div className={`${skill_styles.node_connector_fill} ${styles.node_connector_fill}`} />
              </div>
              <div className={styles.search_input_container}>
                <input
                  className={styles.search_input}
                  type='text'
                  placeholder='Enter a skill (Javascript, Photoshop, sass, ...)' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Legend;
