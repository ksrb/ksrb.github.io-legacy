import { makeStyles } from "@material-ui/styles";

import {
  marginBottomClass,
  primaryColor,
  secondaryColor,
  trinaryColor,
} from "src/styles";

const history_titleTransitionDuration = "200ms";
const history_titleTransitionFunction = "ease";

const history_titleTransition = [
  `${history_titleTransitionDuration} height ${history_titleTransitionFunction}`,
  `${history_titleTransitionDuration} margin ${history_titleTransitionFunction}`,
].join(", ");

const history_titleFontSize = "16px";
const history_titleLineHeight = "1.2";

const history_title__expanded = {
  height: `calc(${history_titleFontSize} * ${history_titleLineHeight})`,
  width: "auto",
  margin: "0 3px 10px",
  padding: "0 5px",
  borderRadius: "2px",

  fontSize: history_titleFontSize,
  lineHeight: history_titleLineHeight,
};

export default makeStyles({
  ...marginBottomClass,

  root: {},

  experience: {
    composes: "$marginBottom",
  },

  header: {
    composes: "$marginBottom",
    display: "flex",
    justifyContent: "space-between",
  },

  company: {},
  company_name: {
    color: primaryColor,
    fontWeight: 600,
  },
  company_location: {
    color: "black",
    fontWeight: 500,
  },

  header_right: {
    textAlign: "right",
    color: "#555555",
    fontWeight: 500,
  },
  role: {},
  startEndDate: {},

  purpose: {
    composes: "$marginBottom",
  },

  accomplishments: {},

  // History
  history: {
    flex: 1,
    "&:hover > $histories > $history > $history_title": {
      ...history_title__expanded,
    },
  },
  history__expanded: {
    "& $history_title": {
      ...history_title__expanded,
    },
    "& > $histories": {
      flexWrap: "wrap",
    },
  },
  histories: {
    display: "flex",
  },
  history_title: {
    height: "0",
    width: "0",
    margin: "0",
    padding: "0",

    borderRadius: "0",

    color: "white",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textAlign: "center",

    transition: history_titleTransition,
  },
  history_title__root: {
    ...history_title__expanded,
    borderRadius: 0,
    margin: 0,
  },
  history_title__frontend: {
    backgroundColor: primaryColor,
  },
  history_title__backend: {
    backgroundColor: secondaryColor,
  },
  history_title__build: {
    backgroundColor: trinaryColor,
  },
});
