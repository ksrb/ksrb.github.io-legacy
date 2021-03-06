import { fade } from "@material-ui/core/styles/colorManipulator";
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
    skill: {
      position: "relative",
      paddingBottom: skill_titleHeight + spacing(1),
      overflow: "hidden",
      "&:hover $meter_nodeToolTip": {
        maxWidth: 300,
        opacity: 1,
      },
    },
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
      backgroundColor: primary.main,
    },

    meter_node: {
      ...meter_nodeExpanded,
      position: "relative",
      flexShrink: 0,
      borderRadius: "50%",
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
  }),
);
