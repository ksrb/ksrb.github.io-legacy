import { fade } from "@material-ui/core/styles/colorManipulator";
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

export default makeStyles<Theme>(
  ({
    spacing,
    shape,
    typography,
    palette: {
      grey,
      primary,
      common: { white },
    },
  }) => ({
    root: {},

    skills: {
      "& $skill:last-child $meter_edgeVertical": {
        display: "none",
      },
    },

    skill: {
      position: "relative",
      paddingBottom: skill_titleHeight + spacing(1),
      overflow: "hidden",
      "&:hover $meter_rootIconFader": {
        opacity: 0,
      },
      "&:hover $meter_nodeToolTip": {
        maxWidth: 300,
        opacity: 1,
      },
    },

    meter_rootIcon: {
      position: "absolute",
      width: meter_rootIconSize,
    },
    meter_rootIconFader: {
      transition: ".5s ease opacity",
    },
    meter_edgeVertical: {
      position: "absolute",
      top: 0,
      left: meter_rootSize / 2,
      height: "100%",
      width: stroke,
      backgroundColor: primary.main,
    },
    meter_nodeToolTip: {
      maxWidth: 0,
      opacity: 0,
      overflow: "hidden",
      position: "absolute",
      left: `calc(100% + ${spacing(1)}px)`,
      top: "50%",
      transform: "translateY(-50%)",
      transition: "max-width .1s ease-in, opacity .1s ease-in",

      // Style copied from:
      // https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui/src/Tooltip/Tooltip.js#L82-L93
      whiteSpace: "nowrap",
      backgroundColor: fade(grey[700], 0.9),
      borderRadius: shape.borderRadius,
      color: white,
      fontFamily: typography.fontFamily,
      padding: "4px 8px",
      fontSize: typography.pxToRem(10),
      lineHeight: "1.4em",
      wordWrap: "break-word",
      fontWeight: typography.fontWeightMedium,
    },

    filters: {
      height: 0,
      width: 0,
    },
  }),
);
