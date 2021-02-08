import {
  createMuiTheme,
  Theme as MaterialUITheme,
} from "@material-ui/core/styles";

const args = {
  marginBottom: {
    marginBottom: "20px",
  },
};

type Theme = MaterialUITheme & { [key in keyof typeof args]: any };

export default createMuiTheme({}, args);
