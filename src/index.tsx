import { ApolloProvider } from "@apollo/react-hooks";
import { jssPreset, StylesProvider, ThemeProvider } from "@material-ui/styles";
import { create } from "jss";
import compose from "jss-plugin-compose";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import client from "./graphql";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";

const jss = create({ plugins: [...jssPreset().plugins, compose()] });

ReactDOM.render(
  <ApolloProvider client={client}>
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StylesProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
