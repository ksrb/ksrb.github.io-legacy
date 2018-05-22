import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from "react-apollo";

import registerServiceWorker from './registerServiceWorker';

import App from 'src/app';

import client from 'data/client';

import './index.scss';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));

registerServiceWorker();
