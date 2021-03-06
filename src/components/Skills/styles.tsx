import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

export const stroke = 3;

export const skill_titleFontSize = 12;
export const skill_titleLineHeight = 1.4;
export const skill_titleHeight = skill_titleFontSize * skill_titleLineHeight;

export const meter_rootPadding = 3;
export const meter_rootIconSize = 32;
export const meter_rootSize =
  meter_rootIconSize + meter_rootPadding * 2 + stroke * 2;
export const meter_rootExpanded = {
  height: meter_rootSize,
  width: meter_rootSize,
};

export const meter_nodeSize = 16;
export const meter_nodeExpanded = {
  height: meter_nodeSize,
  width: meter_nodeSize,
};

export const meter_edgeSize = 50;
export const meter_edgeExpanded = {
  flexBasis: meter_edgeSize,
};

export default makeStyles<Theme>(({ spacing }) => ({
  root: {},

  skills: {
    "& $skill:last-child $meter_edgeVertical": {
      display: "none",
    },
  },

  skill: {},
  meter_edgeVertical: {},

  skill__search: {
    paddingBottom: skill_titleHeight * 2 + spacing(1),
  },

  filters: {
    height: 0,
    width: 0,
  },
}));
