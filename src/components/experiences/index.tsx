import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import { useExperienceGetQuery } from "src/graphql/__generated__";

import useStyles from "./styles";

function renderDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getMonth()}/${date.getFullYear()}`;
}

const Experience: FC = () => {
  const { data } = useExperienceGetQuery();
  const experiences = data?.experiences ?? [];

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      {experiences
        .filter(({ hidden }) => !hidden)
        .map(
          ({
            id,
            accomplishments,
            company,
            company: {
              purpose,
              address: { county, state },
            },
            endDate,
            // iconPath,
            role,
            // skills: { name, utilization },
            startDate,
          }) => (
            <Grid key={id} item xs={12} className={classes.experience}>
              <div className={classes.header}>
                <div className={classes.company}>
                  <div className={classes.company_name}>{company.name}</div>
                  <div className={classes.company_location}>
                    {county}, {state}
                  </div>
                </div>
                <div className={classes.header_right}>
                  <div className={classes.role}>{role}</div>
                  <div className={classes.startEndDate}>
                    {renderDate(startDate)} -{" "}
                    {endDate ? renderDate(endDate) : "Current"}
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
