import { makeStyles } from "@material-ui/styles";
import {
  meter_edgeExpanded,
  meter_nodeExpanded,
  meter_rootSize,
  skill_titleFontSize,
  skill_titleHeight,
  skill_titleLineHeight,
  stroke,
} from "src/components/Skills/styles";
import { Theme } from "src/theme";

export default makeStyles<Theme>(({ palette: { common: { white } } }) => ({
  skill_title: {
    position: "absolute",
    padding: "0 3px",

    height: skill_titleHeight,
    minWidth: meter_rootSize,

    fontSize: skill_titleFontSize,
    lineHeight: skill_titleLineHeight,
    textAlign: "center",

    overflow: "hidden",
    background: white,
    transition: "400ms height ease",
  },

  meter: {
    display: "flex",
    alignItems: "center",
    height: meter_rootSize,
  },

  meter_edge: {
    ...meter_edgeExpanded,
    height: stroke,
  },

  meter_node: {
    ...meter_nodeExpanded,
    position: "relative",
    flexShrink: 0,
    borderRadius: "50%",
  },
}));
