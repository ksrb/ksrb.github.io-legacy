import { makeStyles } from "@material-ui/styles";

const primaryColor = "#4a679b";

export default makeStyles({
  "@global": {
    "html, body, #root": {
      width: "100%",
      height: "100%",
    },
    body: {
      margin: 0,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
    },
    code: {
      fontFamily:
        "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    },
  },

  root: {},

  header: {
    display: "flex",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 20,
  },

  header_name: {
    fontSize: 30,
    "&:first-child": {
      marginRight: 5,
    },
    "&:last-child": {
      marginLeft: 5,
    },
  },
  header_name__first: {
    color: primaryColor,
  },

  navbar: { display: "flex" },
  navbar_item: {},

  graph: {
    width: "100%",
    height: "100%",
  },
});
