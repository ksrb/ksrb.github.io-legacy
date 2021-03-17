import { Grid } from "@material-ui/core";
import clsx from "clsx";
import React, { FC, useCallback, useMemo, useState } from "react";
import Link from "src/components/Link";
import { useScrollProviderRefCallback } from "src/components/ScrollProvider";
import { useColorByType } from "src/components/util";
import { experiencesListenerId } from "src/constants";
import {
  ExperienceFieldsFragment,
  ExperiencesGetQuery,
  useExperiencesGetQuery,
} from "src/graphql/__generated__";
import {
  computeUtilization,
  HistoryWithChildren,
} from "src/graphql/data/skills";
import typenames from "src/graphql/typenames";
import { ExtractArrayType } from "src/types";
import useStyles from "./styles";
import Timeline from "./Timeline";

function renderDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getFullYear()}`;
}

type HistoryType = ExtractArrayType<ExperienceFieldsFragment["histories"]>;

const History: FC<{
  history: HistoryType;
  historyParent?: HistoryWithChildren;
  historyParentUtilization: number;
  histories?: HistoryType[];
  depth: number;
}> = ({
  history,
  historyParent,
  historyParentUtilization,
  histories,
  depth,
}) => {
  const { children, title, values } = history;
  let utilization = computeUtilization(
    history,
    historyParent,
    historyParentUtilization,
    histories,
  );

  const utilizationRounded = Math.round(utilization);

  const backgroundColor = useColorByType(
    values,
    historyParent && historyParent.values,
  );

  const url = useMemo(() => {
    const value = values[0];
    // Value type is Language or Tool
    if (
      value.__typename === typenames.Language ||
      value.__typename === typenames.Tool
    ) {
      return value.url;
    }
  }, [values]);

  const stopPropagation = useCallback((e) => url && e.stopPropagation(), [url]);

  const classes = useStyles();

  return (
    <div className={classes.history} style={{ flexBasis: `${utilization}%` }}>
      <div
        className={clsx(
          classes.history_title,
          depth === 0 && classes.history_title__root,
        )}
        style={{ backgroundColor }}
      >
        <Link
          href={url}
          className={classes.history_titleText}
          onClick={stopPropagation}
        >
          {title} {utilizationRounded}%
        </Link>
      </div>
      {children && (
        <div className={classes.histories}>
          {children.map((childHistory) => {
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

const Experience: FC<{
  experience: ExtractArrayType<ExperiencesGetQuery["experiences"]>;
}> = ({ experience }) => {
  const [historyExpanded, setHistoryExpanded] = useState(false);

  const handleHistoryRootClick = useCallback(() => {
    setHistoryExpanded(!historyExpanded);
  }, [historyExpanded]);

  const classes = useStyles();

  const {
    accomplishments,
    company,
    company: {
      address: { county, state },
      purpose,
      url,
    },
    endDate,
    role,
    histories,
    startDate,
  } = experience;

  return (
    <Grid item xs={12} className={classes.experience}>
      <Timeline experience={experience} />
      <div className={classes.experience_content}>
        <div className={classes.header}>
          <div className={classes.company}>
            <div className={classes.company_name}>
              <Link color="primary" href={url}>
                {company.name}
              </Link>
            </div>
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
            {histories.map((history) => (
              <History
                key={history.id}
                history={history}
                historyParentUtilization={100}
                histories={histories}
                depth={0}
              />
            ))}
          </div>
        </div>
      </div>
    </Grid>
  );
};

const Experiences: FC = () => {
  const { data } = useExperiencesGetQuery();
  const experiences = data?.experiences ?? [];

  const scrollProviderRef = useScrollProviderRefCallback(experiencesListenerId);

  const classes = useStyles();

  return (
    <Grid container className={classes.root} ref={scrollProviderRef}>
      {experiences
        .filter(({ hidden }) => !hidden)
        .map((experience) => (
          <Experience key={experience.id} experience={experience} />
        ))}
    </Grid>
  );
};

export default Experiences;
