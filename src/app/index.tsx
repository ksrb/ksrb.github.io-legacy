import React, { FC } from "react";
import classnames from "classnames";
import { Grid } from "@material-ui/core";

import { useExperienceGetQuery } from "../graphql/__generated__";

import useStyles from "./styles";

const App: FC = () => {
  const { data } = useExperienceGetQuery();
  const experiences = data?.experiences ?? [];
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.header}>
          <div
            className={classnames(
              classes.header_name,
              classes.header_name__first,
            )}
          >
            KEVIN
          </div>
          <div className={classes.header_name}>SUEN</div>
        </Grid>
        <Grid item xs={12} className={classes.navbar}>
          <div className={classes.navbar_item}>ABOUT</div>
          <div className={classes.navbar_item}>EXPERIENCE</div>
          <div className={classes.navbar_item}>SKILLS</div>
        </Grid>

        <Grid item xs={12}>
          {experiences
            .filter(({ hidden }) => !hidden)
            .map(({ companyName }) => {
              return <div key={companyName}>{companyName}</div>;
            })}
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
