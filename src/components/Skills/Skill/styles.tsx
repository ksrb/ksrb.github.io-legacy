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
      "&:hover $meter_nodeToolTip": {
        maxWidth: 300,
        opacity: 1,
      },
      "&:hover $meter_rootIconFader": {
        opacity: 0,
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
    skill_title__meterRoot: {
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
    },

    meter_edgeVertical: {
      position: "absolute",
      top: 0,
      left: meter_rootSize / 2,
      height: "100%",
      width: stroke,
      backgroundColor: primary.main,
    },

    meter_edgeVertical__lastChild: {
      height: `calc(50% - ${skill_titleHeight / 2}px)`,
    },

    meter_rootIconFader: {},

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

    // Styles for <Skills> component
    meter_nodeWrapper: {
      ...meter_nodeExpanded,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    meter_text: {
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
      textAlign: "center",
      padding: spacing(0, 1),
      border: `${stroke}px solid ${primary.main}`,
      borderRadius: `${meter_rootSize / 2}px / 50%`,
      height: meter_rootSize,
    },
  }),
);
