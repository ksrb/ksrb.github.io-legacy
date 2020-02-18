import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import clsx from "clsx";

import uses from "src/graphql/data/uses";
import {
  HistoryFieldsFragment,
  Maybe,
  useExperienceGetQuery,
} from "src/graphql/__generated__";
import { computeUtilization } from "src/graphql/data/skills";

import { RequiredBy } from "src/types";

import useStyles from "./styles";

function renderDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getMonth()}/${date.getFullYear()}`;
}

type History = HistoryFieldsFragment & {
  children?: Maybe<Array<History & { __typename?: "History" }>>;
};

type HistoryWithChildren = RequiredBy<History, "children">;
const History: FC<{
  history: History;
  historyParent: HistoryWithChildren;
  historyParentUtilization: number;
  depth: number;
  classes: ReturnType<typeof useStyles>;
}> = ({ history, historyParent, historyParentUtilization, depth, classes }) => {
  const { children, values } = history;
  let utilization = computeUtilization(
    // @ts-ignore consider typecasting
    history,
    historyParent,
    historyParentUtilization,
  );

  utilization = Math.round(utilization);

  const backgroundColorValue = 255 * (((depth * 1.1 + 5) * 10) / 100);
  return (
    <div
      className={clsx(
        classes.history,
        depth === 0 && classes.history__root,
        !children && classes.history__leaf,
      )}
      style={{
        flexBasis: `${utilization}%`,
        backgroundColor: `rgba(${backgroundColorValue}, ${backgroundColorValue}, ${backgroundColorValue})`,
      }}
    >
      <div className={classes.history_title}>
        {values.map(({ title }, index) => {
          const space = index !== values.length - 1 ? " " : "";
          return title + space;
        })}{" "}
        {utilization}%
      </div>
      {children && (
        <div className={classes.histories}>
          {children.map(childHistory => {
            const component = (
              <History
                key={childHistory.id}
                history={childHistory}
                // Typecast as history is guaranteed to have children here
                historyParent={history as HistoryWithChildren}
                historyParentUtilization={utilization}
                depth={++depth}
                classes={classes}
              />
            );
            --depth;
            return component;
          })}
        </div>
      )}
    </div>
  );
};

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
            role,
            histories,
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

              <div className={classes.histories}>
                {histories.map(history => (
                  <History
                    key={history.id}
                    history={history}
                    historyParent={{
                      values: [uses.None],
                      children: histories,
                    }}
                    historyParentUtilization={100}
                    depth={0}
                    classes={classes}
                  />
                ))}
              </div>
            </Grid>
          ),
        )}
    </Grid>
  );
};

export default Experience;
