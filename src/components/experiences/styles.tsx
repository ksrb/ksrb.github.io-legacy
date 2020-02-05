import { makeStyles } from "@material-ui/styles";

import { marginBottomClass, primaryColor } from "src/styles";

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
  histories: {
    display: "flex",
  },
  history: {
    flex: 1,
    boxSizing: "border-box",
    border: "1px solid black",
    textAlign: "center",
    "&:not(:first-child)": {
      borderLeft: "none",
    },
  },
  history__root: {},
  history__leaf: {},
  history_title: {},
});
