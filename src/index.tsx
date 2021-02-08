import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { create } from "jss";
import compose from "jss-plugin-compose";
import { jssPreset, StylesProvider } from "@material-ui/styles";

import client from "./graphql";

import App from "./components/App";

import * as serviceWorker from "./serviceWorker";

const jss = create({ plugins: [...jssPreset().plugins, compose()] });

ReactDOM.render(
  <ApolloProvider client={client}>
    <StylesProvider jss={jss}>
      <App />
    </StylesProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
