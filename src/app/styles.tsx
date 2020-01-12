import { createUseStyles } from "react-jss";

export default createUseStyles({
  "@global": {
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
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

// Cytoscape stylesheet see: https://js.cytoscape.org/#style
export const graphStyle = [
  {
    selector: "node",
    style: {
      height: 10,
      width: 10,
      "background-color": "black",
      opacity: 1,
    },
  },
  {
    selector: "edge",
    style: {
      "curve-style": "haystack",
      "haystack-radius": 0,
      "line-color": "black",
      width: 2,
    },
  },
];
