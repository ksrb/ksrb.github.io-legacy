import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import renderer from 'react-test-renderer';

import Navbar from './index';
import client from 'data/client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Navbar />
    </ApolloProvider>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});

const MUTATE_SELECTED_NAVBAR_ITEM = gql`
  mutation changeSelectedNavbarItem($item: String!) {
    changeSelectedNavbarItem(item: $item) @client {
      uiState {
        selectedItem
      }
    }
  }
`;

it('changes navbar item style when item clicked', (done) => {
  const component = renderer.create(
    <ApolloProvider client={client}>
      <Navbar />
      <Mutation mutation={MUTATE_SELECTED_NAVBAR_ITEM}>
        {(mutate) => {
          mutate({ variables: { item: 'ABOUT' } }).then(() => {
            done();
          });
          return (
            <div />
          );
        }}
      </Mutation>
    </ApolloProvider>);

  let tree = component.toJSON();

  let aboutItem = tree.children[1].children[0];
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
