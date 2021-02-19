import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

const edgeIconSize = 14;
const edgeIconBorderWidth = 3;
export const edgeSize = edgeIconSize;
export const edgeSizeHalf = edgeSize / 2;

const vertexWidth = 1;
const vertexOverlayWidth = 2;

export default makeStyles<Theme>(
  ({
    spacing,
    primaryColor,
    trinaryColor,
    palette: {
      common: { white },
    },
  }) => ({
    root: {
      position: "relative",
      display: "flex",
      padding: spacing(0, 9, 0, 0),
    },
    vertex: {
      boxSizing: "border-box",
      border: `${vertexWidth}px solid ${primaryColor}`,
      height: "100%",
      position: "absolute",
      // Transform to center line with edge
      transform: `translate(${edgeSizeHalf - vertexWidth}px)`,
    },
    vertex_overlay: {
      extend: "vertex",
      border: `${vertexOverlayWidth}px solid ${trinaryColor}`,
      transform: `translate(${edgeSizeHalf - vertexOverlayWidth}px)`,
    },
    edge: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
    },
    edge_icon: {
      boxSizing: "border-box",
      background: white,
      border: `${edgeIconBorderWidth}px solid ${primaryColor}`,
      borderRadius: "50%",
      height: edgeIconSize,
      width: edgeIconSize,
    },
    edge_text: {
      position: "absolute",
      left: edgeSize + 5,
    },
  }),
);
