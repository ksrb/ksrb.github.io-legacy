import React, { FC, useMemo } from "react";
import { DAY } from "src/constants";
import {
  ExperiencesGetQuery,
  useExperiencesGetQuery,
} from "src/graphql/__generated__";
import { ExtractArrayType } from "src/types";
import useStyles, { edgeSizeHalf } from "./styles";

type TimelineValues = { year: number; position?: number };

const Timeline: FC<{
  experience: ExtractArrayType<ExperiencesGetQuery["experiences"]>;
}> = ({
  experience: { days, startDate: startDateStr, endDate: endDateStr, index },
}) => {
  const { data } = useExperiencesGetQuery();
  const experiences = data?.experiences ?? [];

  const isMostRecentExperience = index === 0;
  const isOldestExperience = index === experiences.length - 1;

  const startDate = useMemo(() => new Date(startDateStr), [startDateStr]);
  const endDate = useMemo(
    () => (endDateStr ? new Date(endDateStr) : new Date()),
    [endDateStr],
  );

  const startYearNum = startDate.getFullYear();
  const endYearNum = endDate.getFullYear();
  const numberOfYearsBetweenStartAndEndDates = endYearNum - startYearNum;
  const numberOfYearsBetweenStartAndEndDatesWithPadding =
    numberOfYearsBetweenStartAndEndDates + 2;

  const timelineValues = useMemo<TimelineValues[]>(() => {
    const values: TimelineValues[] = [];

    for (let i = 0; i < numberOfYearsBetweenStartAndEndDatesWithPadding; i++) {
      const year = endYearNum + 1 - i;
      values.push({
        year,
        position: (100 / numberOfYearsBetweenStartAndEndDatesWithPadding) * i,
      });
    }

    return values;
  }, [endYearNum, numberOfYearsBetweenStartAndEndDatesWithPadding]);

  const { height, top } = useMemo(() => {
    // Percentage of days worked between start year +1 and end year +1
    const height =
      days / (numberOfYearsBetweenStartAndEndDatesWithPadding * 365);

    const endDateEndOfYear = new Date(endYearNum, 11, 31);
    const daysFromEndDateTillEndDateEndOfYear =
      (endDateEndOfYear.getTime() - endDate.getTime()) / DAY;

    // Percentage of the last year at a job that wasn't worked
    const top =
      daysFromEndDateTillEndDateEndOfYear /
      365 /
      numberOfYearsBetweenStartAndEndDatesWithPadding;

    return {
      // Vertex needs padding when dates start/end near the begin/end of year as
      // edge will overlap and hide the ends of the vertex
      height: `calc(${height * 100}% + ${edgeSizeHalf}px)`,
      top: `calc(${top * 100}% - ${edgeSizeHalf}px)`,
    };
  }, [
    days,
    endDate,
    endYearNum,
    numberOfYearsBetweenStartAndEndDatesWithPadding,
  ]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.vertex} />
      <div className={classes.vertex_overlay} style={{ height, top }} />
      {timelineValues.map(({ year, position }, index) => {
        if (index === 0 && !isMostRecentExperience) {
          return null;
        }

        if (index === timelineValues.length - 1 && !isOldestExperience) {
          return null;
        }

        return (
          <div
            key={index}
            className={classes.edge}
            style={{ top: `${position}%` }}
          >
            <div className={classes.edge_icon} />
            <div className={classes.edge_text}>{year}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
