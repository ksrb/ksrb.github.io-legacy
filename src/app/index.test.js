import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './index';
import { ApolloProvider } from "react-apollo";
import client from 'data/client';

it('renders without crashing again', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Navbar />
    </ApolloProvider>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
