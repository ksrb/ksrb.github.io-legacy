import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

const stroke = 3;

const skill_titleFontSize = 12;
const skill_titleLineHeight = 1.4;
const skill_titleHeight = skill_titleFontSize * skill_titleLineHeight;
const skill_titleExpanded = {
  height: skill_titleHeight,
};

const meter_rootPadding = 3;
const meter_rootIconSize = 32;
const meter_rootSize = meter_rootIconSize + meter_rootPadding * 2 + stroke * 2;
const meter_rootExpanded = {
  height: meter_rootSize,
  width: meter_rootSize,
};

const meter_nodeSize = 16;
const meter_nodeExpanded = {
  height: meter_nodeSize,
  width: meter_nodeSize,
};

const meter_edgeSize = 50;
const meter_edgeExpanded = {
  flexBasis: meter_edgeSize,
};

export default makeStyles<Theme>(
  ({
    spacing,
    palette: {
      common: { white },
    },
    primaryColor,
    languagesColor,
    trinaryColor,
    secondaryColor,
  }) => ({
    root: {},

    skills: {
      "& $skill:last-child $meter_edgeVertical": {
        display: "none",
      },
    },
    skills__expanded: {
      "& $skill $skill_title": {
        ...skill_titleExpanded,
      },
    },
    skill: {
      position: "relative",
      paddingBottom: skill_titleHeight + spacing(1),
      overflow: "hidden",
      "&:hover $skill_title": {
        ...skill_titleExpanded,
      },
      "&:hover $meter_rootIconFader": {
        opacity: 0,
      },
    },
    skill_title: {
      position: "absolute",
      padding: "0 3px",

      height: "0px",
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

    meter_root: {
      ...meter_rootExpanded,
      position: "relative",
      background: white,
    },

    meter_rootContent: {
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
      border: `${stroke}px solid ${primaryColor}`,
      padding: meter_rootPadding,
      overflow: "hidden",

      boxSizing: "border-box",
    },

    meter_rootIcon: {
      position: "absolute",
      width: meter_rootIconSize,
    },

    meter_rootIconFader: {
      transition: "1s ease opacity",
    },

    meter_edge: {
      ...meter_edgeExpanded,
      height: stroke,
    },

    meter_edgeVertical: {
      position: "absolute",
      top: 0,
      left: meter_rootSize / 2,
      height: "100%",
      width: stroke,
    },

    meter_node: {
      ...meter_nodeExpanded,
      flexShrink: 0,
      borderRadius: "50%",
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
    filters: {
      height: 0,
      width: 0,
    },
  }),
);
