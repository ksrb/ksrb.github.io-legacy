import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

export default makeStyles<Theme>(
  ({ spacing, marginBottom, primaryColor, typography: { fontFamily } }) => ({
    "@global": {
      "html, body, #root": {
        width: "100%",
        height: "100%",
      },
      body: {
        margin: 0,
        fontFamily,
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      },
      code: {
        fontFamily:
          "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
      },
    },

    root: {
      padding: spacing(0, 2),
    },

    header: {
      justifyContent: "center",
      marginTop: spacing(6),
      marginBottom: marginBottom,
    },

    header_name: {
      fontSize: 36,
      "&:first-child": {
        marginRight: 5,
      },
      "&:last-child": {
        marginLeft: 5,
      },
    },
    header_name__last: {
      color: primaryColor,
    },
    header_name__small: {
      fontSize: 30,
    },

    graph: {
      width: "100%",
      height: "100%",
    },
  }),
);
