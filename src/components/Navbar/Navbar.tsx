import { Grid } from "@material-ui/core";
import clsx from "clsx";
import React, { FC, useCallback } from "react";
import {
  useScrollProvider,
  useScrollProviderRefCallback,
} from "src/components/ScrollProvider";
import {
  aboutListenerId,
  experiencesListenerId,
  navbarListenerId,
  skillsListenerId,
} from "src/constants";
import Header from "src/components/Header";
import useStyles from "./styles";

const Navbar: FC = () => {
  const scrollProviderRef = useScrollProviderRefCallback(navbarListenerId);

  const {
    [aboutListenerId]: aboutListener,
    [navbarListenerId]: navbarListener,
    [experiencesListenerId]: experiencesListener,
    [skillsListenerId]: skillsListener,
  } = useScrollProvider();

  const classes = useStyles();

  const Items = useCallback(
    () => (
      <>
        <div
          className={clsx(
            classes.item,
            aboutListener.inViewPort && classes.item__active,
          )}
        >
          ABOUT
        </div>
        <div
          className={clsx(
            classes.item,
            skillsListener.inViewPort && classes.item__active,
          )}
        >
          SKILLS
        </div>
        <div
          className={clsx(
            classes.item,
            experiencesListener.inViewPort && classes.item__active,
          )}
        >
          EXPERIENCE
        </div>
      </>
    ),
    [
      aboutListener.inViewPort,
      classes.item,
      classes.item__active,
      experiencesListener.inViewPort,
      skillsListener.inViewPort,
    ],
  );

  return (
    <div className={classes.root} ref={scrollProviderRef}>
      <Grid
        item
        xs={12}
        className={clsx(classes.content, classes.content__centered)}
      >
        <Items />
      </Grid>
      <Grid
        item
        xs={12}
        className={clsx(
          classes.content,
          classes.content__fixed,
          !navbarListener.inViewPort && classes.content__fixedExpanded,
        )}
      >
        <Header classes={{ root: classes.header }} variant="navbar" />
        <Items />
      </Grid>
    </div>
  );
};

export default Navbar;
