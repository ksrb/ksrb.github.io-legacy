import { makeStyles } from "@material-ui/styles";
import defaultTheme, { Theme } from "src/theme";
import { header__navbarHeight } from "src/components/Header/styles";

export const content__fixedExpandedPaddingUsingSpacing = 1;
export const navbarHeight =
  header__navbarHeight +
  defaultTheme.spacing(content__fixedExpandedPaddingUsingSpacing) * 2;

export default makeStyles<Theme>(
  ({
    spacing,
    palette: {
      common: { white },
    },
    marginBottom,
  }) => ({
    content: {
      display: "flex",
      overflow: "hidden",
    },
    content__centered: {
      justifyContent: "center",
      marginBottom: marginBottom,
    },
    content__fixed: {
      display: "flex",
      alignItems: "center",
      position: "fixed",
      width: "100%",
      left: 0,
      top: 0,
      background: white,
      zIndex: 1,
      maxHeight: 0,
      padding: spacing(0, 1, 0, 3),
      transition: "padding-top .3s ease, max-height .3s ease",
    },
    content__fixedExpanded: {
      maxHeight: navbarHeight,
      padding: spacing(
        content__fixedExpandedPaddingUsingSpacing,
        1,
        content__fixedExpandedPaddingUsingSpacing,
        3,
      ),
    },

    item: {
      margin: "0 5px",
    },
    item__active: {
      textDecoration: "underline",
    },

    header: {
      marginRight: spacing(2),
    },
  }),
);
