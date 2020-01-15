import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import jss from "jss";
import preset from "jss-preset-default";
import { StylesProvider } from "@material-ui/styles";

import client from "./graphql";

import App from "./app";

import * as serviceWorker from "./serviceWorker";

jss.setup(preset());

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
