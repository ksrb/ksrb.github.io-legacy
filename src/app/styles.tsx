import { createUseStyles } from "react-jss";

export default createUseStyles({
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

  graph: {
    width: "100%",
    height: "100%",
  },
});
