import React, { FC, useCallback, useState } from "react";
import { Grid } from "@material-ui/core";
import clsx from "clsx";

import typenames from "src/graphql/typenames";
import uses from "src/graphql/data/uses";
import {
  HistoryFieldsFragment,
  Maybe,
  Scalars,
  Tool,
  Use,
  useExperienceGetQuery,
  useExperiencesGetQuery,
} from "src/graphql/__generated__";
import { computeUtilization } from "src/graphql/data/skills";

import { RequiredBy } from "src/types";

import useStyles from "./styles";
import { primaryColor, secondaryColor, trinaryColor } from "src/styles";

function renderDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getMonth()}/${date.getFullYear()}`;
}

type DisplayedNode = HistoryFieldsFragment["values"][0];

function getColorByType(
  displayedNode: DisplayedNode[],
  parentDisplayedNodes?: DisplayedNode[],
): string {
  const node = displayedNode[0];

  const { __typename } = node;

  switch (__typename) {
    case typenames.Use:
      return getColorByUse(node as Use);
    case typenames.Tool:
      return getColorByUse((node as Tool).use);
    case typenames.Language:
      return parentDisplayedNodes ? getColorByType(parentDisplayedNodes) : "";
  }

  return "";
}

function getColorByUse(use: Use): string {
  const { id } = use;

  switch (id) {
    case uses.Frontend.id:
      return primaryColor;
    case uses.Backend.id:
      return secondaryColor;
    case uses.Build.id:
      return trinaryColor;
  }

  return "";
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
}> = ({ history, historyParent, historyParentUtilization, depth }) => {
  const classes = useStyles();
  const { children, values } = history;
  let utilization = computeUtilization(
    // @ts-ignore consider typecasting
    history,
    historyParent,
    historyParentUtilization,
  );

  const utilizationRounded = Math.round(utilization);

  const backgroundColorValue = getColorByType(
    history.values,
    historyParent && historyParent.values,
  );

  return (
    <div className={classes.history} style={{ flexBasis: `${utilization}%` }}>
      <div
        className={clsx(
          classes.history_title,
          depth === 0 && classes.history_title__root,
        )}
        style={{
          backgroundColor: `${backgroundColorValue}`,
        }}
      >
        {values.map(({ title }, index) => {
          const space = index !== values.length - 1 ? " " : "";
          return title + space;
        })}{" "}
        {utilizationRounded}%
      </div>
      {children && (
        <div className={classes.histories}>
          {children.map(childHistory => {
            const component = (
              <History
                key={childHistory.id}
                history={childHistory}
                // Typecast is necessary as history is guaranteed to have
                // children here but TypeScript cannot identify
                historyParent={history as HistoryWithChildren}
                historyParentUtilization={100}
                depth={++depth}
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

const Experience: FC<{ id: Scalars["ID"] }> = ({ id }) => {
  const { data, error, loading } = useExperienceGetQuery({ variables: { id } });

  const [historyExpanded, setHistoryExpanded] = useState(false);

  const handleHistoryRootClick = useCallback(() => {
    setHistoryExpanded(!historyExpanded);
  }, [historyExpanded]);

  const classes = useStyles();

  if (error || loading) {
    return null;
  }

  if (!data || !data.experience) {
    return null;
  }

  const {
    experience: {
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
    },
  } = data;

  return (
    <Grid item xs={12} className={classes.experience}>
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

      <div
        className={clsx(
          classes.history,
          historyExpanded && classes.history__expanded,
        )}
        onClick={handleHistoryRootClick}
      >
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
            />
          ))}
        </div>
      </div>
    </Grid>
  );
};

const Experiences: FC = () => {
  const { data } = useExperiencesGetQuery();
  const experiences = data?.experiences ?? [];

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      {experiences
        .filter(({ hidden }) => !hidden)
        .map(({ id }) => (
          <Experience key={id} id={id} />
        ))}
    </Grid>
  );
};

export default Experiences;
