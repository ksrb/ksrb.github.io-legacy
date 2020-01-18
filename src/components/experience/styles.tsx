import { makeStyles } from "@material-ui/styles";

import { marginBottom, primaryColor } from "src/styles";

export default makeStyles({
  root: {},

  experience: {
    margin: `0 0 ${marginBottom}`,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: `0 0 ${marginBottom}`,
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
    margin: `0 0 ${marginBottom}`,
  },

  accomplishments: {},
});
