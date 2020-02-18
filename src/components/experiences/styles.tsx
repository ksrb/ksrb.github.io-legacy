import { makeStyles } from "@material-ui/styles";

import {
  marginBottomClass,
  primaryColor,
  secondaryColor,
  trinaryColor,
} from "src/styles";

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
  },
  history_title: {
    margin: "0 3px 10px",
    padding: "0 5px",
    borderRadius: "2px",
    color: "white",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  history_title__root: {},
  history_title__leaf: {},
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
