import React, { FC } from "react";
import { Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";

import { useSkillsGetQuery } from "src/graphql/__generated__";

import useStyles from "./styles";

function pluralize(value: string, number: number): string {
  return number > 1 ? value + "s" : value;
}

const Skills: FC = () => {
  const { data } = useSkillsGetQuery();
  const skills = data?.skills ?? [];

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Table>
          <TableBody>
            {skills.map(({ values, utilization }, index) => {
              const title = values.reduce((prev, { title }) => {
                return prev + " " + title;
              }, "");
              const years = Math.floor(utilization / 365);
              const months = Math.floor((utilization % 365) / (365 / 12));
              const days = Math.floor(utilization % (365 / 12));

              return (
                <TableRow key={index}>
                  <TableCell>{title}</TableCell>
                  <TableCell>
                    {years} {pluralize("year", years)}
                  </TableCell>
                  <TableCell>
                    {months} {pluralize("month", months)}
                  </TableCell>
                  <TableCell>
                    {days} {pluralize("day", days)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default Skills;
