import { makeStyles } from "@material-ui/styles";
import {
  meter_nodeSize,
  meter_rootExpanded,
  meter_rootIconSize,
  meter_rootPadding,
  meter_rootSize,
  stroke,
} from "src/components/Skills/styles";
import { Theme } from "src/theme";

export default makeStyles<Theme>(
  ({
    palette: {
      primary,
      common: { white },
    },
    primaryColor,
    secondaryColor,
    trinaryColor,
    languagesColor,
  }) => ({
    meter: {
      display: "flex",
      alignItems: "center",
      height: meter_rootSize,
    },

    meter__search: {
      marginLeft: meter_rootSize / 2 - meter_nodeSize / 2 + 1,
      height: meter_nodeSize,
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
      border: `${stroke}px solid ${primary.main}`,
      padding: meter_rootPadding,
      overflow: "hidden",

      boxSizing: "border-box",
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
  }),
);
