import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import { useExperienceGetQuery } from "../../graphql/__generated__";
import useStyles from "./styles";

const Experience: FC = props => {
  const { data } = useExperienceGetQuery();
  const experiences = data?.experiences ?? [];

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      {experiences
        .filter(({ hidden }) => !hidden)
        .map(
          ({
            accomplishments,
            address: { county, state },
            companyName,
            endDate,
            hidden,
            iconPath,
            purpose,
            role,
            // skills: { name, utilization },
            startDate,
          }) => (
            <Grid key={companyName} item xs={12} className={classes.experience}>
              <div className={classes.header}>
                <div className={classes.company}>
                  <div className={classes.company_name}>{companyName}</div>
                  <div className={classes.company_location}>
                    {county}, {state}
                  </div>
                </div>
                <div className={classes.header_right}>
                  <div className={classes.role}>{companyName}</div>
                  <div className={classes.startEndDate}>
                    {county}, {state}
                  </div>
                </div>
              </div>

              <div className={classes.purpose}>{purpose}</div>

              <div className={classes.accomplishments}>
                <ul>
                  {accomplishments.map((accomplishment, index) => (
                    <li key={index}>{accomplishment}</li>
                  ))}
                </ul>
              </div>
            </Grid>
          ),
        )}
    </Grid>
  );
};

export default Experience;
