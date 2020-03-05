import { makeStyles } from "@material-ui/styles";

import {
  languagesColor,
  marginBottomClass,
  primaryColor,
  secondaryColor,
  trinaryColor,
} from "src/styles";

const stroke = "3px";

const skill_titleFontSize = "12px";
const skill_titleLineHeight = "1.4";

const skill_titleExpanded = {
  height: `calc(${skill_titleFontSize} * ${skill_titleLineHeight})`,
};

const meter_rootPadding = "3px";
const meter_rootIconSize = "32px";
const meter_rootSize = `calc(${meter_rootIconSize} + ${meter_rootPadding} * 2 + ${stroke} * 2)`;
const meter_rootExpanded = {
  height: meter_rootSize,
  width: meter_rootSize,
};

const meter_nodeSize = "16px";
const meter_nodeExpanded = {
  height: meter_nodeSize,
  width: meter_nodeSize,
};

const meter_edgeSize = "50px";
const meter_edgeExpanded = {
  flexBasis: meter_edgeSize,
};

export default makeStyles({
  ...marginBottomClass,

  root: {},

  skills: {},
  skills__expanded: {
    "& $skill $skill_title": {
      ...skill_titleExpanded,
    },
  },
  skill: {
    marginBottom: "5px",
    "&:hover $skill_title": {
      ...skill_titleExpanded,
    },
    "&:hover $meter_rootIconFader": {
      opacity: 0,
    },
  },
  skill_title: {
    height: 0,
    fontSize: skill_titleFontSize,
    lineHeight: skill_titleLineHeight,
    overflow: "hidden",
    transition: "200ms height ease",
  },

  meter: {
    display: "flex",
    alignItems: "center",
    height: meter_rootSize,
  },

  meter_rootWrapper: {
    ...meter_rootExpanded,
    position: "relative",
  },

  meter_root: {
    ...meter_rootExpanded,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,

    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    borderRadius: "50%",
    border: `${stroke} solid ${primaryColor}`,
    padding: meter_rootPadding,
    overflow: "hidden",

    boxSizing: "border-box",
  },

  meter_rootIcon: {
    width: meter_rootIconSize,
  },

  meter_rootIconFader: {
    position: "absolute",
    transition: "1s ease opacity",
  },

  meter_edge: {
    ...meter_edgeExpanded,
    height: stroke,
    backgroundColor: primaryColor,
  },

  meter_node: {
    ...meter_nodeExpanded,
    flexShrink: 0,
    borderRadius: "50%",
    backgroundColor: primaryColor,
  },

  [primaryColor.substring(1)]: {
    filter: `url(${primaryColor})`,
  },
  [secondaryColor.substring(1)]: {
    filter: `url(${secondaryColor})`,
  },
  [trinaryColor.substring(1)]: {
    filter: `url(${trinaryColor})`,
  },
  [languagesColor.substring(1)]: {
    filter: `url(${languagesColor})`,
  },
});
