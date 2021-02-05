import React, {
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import clsx from "clsx";
import gsap from "gsap";
import { AddCircle } from "@material-ui/icons";
import { Grid, IconButton } from "@material-ui/core";

import typenames from "src/graphql/typenames";
import {
  Language,
  SkillsGetQuery,
  Tool,
  useSkillsGetQuery,
} from "src/graphql/__generated__";

import { getColorByType } from "src/components/util";

import {
  languagesColor,
  primaryColor,
  secondaryColor,
  trinaryColor,
} from "src/styles";
import useStyles from "./styles";

const Filter: FC<{ color: string }> = ({ color }) => (
  <filter id={color.substring(1)}>
    <feColorMatrix
      in="SourceGraphic"
      type="matrix"
      values=".33 .33 .33 0 0
              .33 .33 .33 0 0
              .33 .33 .33 0 0
               0   0   0  1 0"
      result="desaturate"
    />
    <feFlood floodColor={color} result="flood" />
    <feComposite
      in="desaturate"
      in2="flood"
      operator="arithmetic"
      k1="1"
      k2="0"
      k3="0"
      k4="0"
    />
  </filter>
);

function getLogo({ values }: SkillsGetQuery["skills"][0]): string {
  const languages = values as Language[];
  const isOnlyLanguages = !languages.some(
    ({ __typename }) => __typename !== typenames.Language,
  );

  if (isOnlyLanguages) {
    return languages[0].logo;
  }

  const tools = values as Tool[];
  const isOnlyTools = !tools.some(
    ({ __typename }) => __typename !== typenames.Tool,
  );

  if (isOnlyTools) {
    return tools[0].logo;
  }

  return "";
}

const Skill: FC<{
  skill: SkillsGetQuery["skills"][0];
  skillsExpanded: boolean;
}> = ({ skill }) => {
  const classes = useStyles();

  const { values, utilization } = skill;

  const title = values.reduce((prev, { title }) => {
    if (prev) {
      return prev + " " + title;
    }
    return title;
  }, "");
  const logUtilization = Math.round(Math.log(utilization));

  const timeline = useMemo(() => gsap.timeline(), []);
  const meterRef = useCallback(
    (element: HTMLDivElement) => {
      if (!element) {
        return;
      }

      const meterRootElement = element.querySelector(`.${classes.meter_root}`);
      const meterEdgeElements = element.querySelectorAll(
        `.${classes.meter_edge}`,
      );
      const meterNodeElements = element.querySelectorAll(
        `.${classes.meter_node}`,
      );

      timeline.from(meterRootElement, {
        duration: 0.5,
        ease: "power1",
        height: 0,
        width: 0,
      });

      for (let i = 0; i < meterEdgeElements.length; i++) {
        const meterEdgeElement = meterEdgeElements[i];
        timeline.from(meterEdgeElement, {
          duration: 0.1,
          ease: "power1",
          flexBasis: 0,
        });

        const meterNodeElement = meterNodeElements[i];
        timeline.from(meterNodeElement, {
          duration: 0.1,
          ease: "power1",
          height: 0,
          width: 0,
        });
      }
    },
    [classes.meter_edge, classes.meter_node, classes.meter_root, timeline],
  );

  const color = getColorByType(values);
  const nodes: ReactNode[] = [];
  for (let i = 0; i < logUtilization; i++) {
    nodes.push(
      <Fragment key={i}>
        <div
          className={classes.meter_edge}
          style={{ backgroundColor: color }}
        />
        <div
          className={classes.meter_node}
          style={{ backgroundColor: color }}
        />
      </Fragment>,
    );
  }

  const logo = getLogo(skill);

  return (
    <div className={classes.skill}>
      <div ref={meterRef} className={classes.meter}>
        <div className={classes.meter_root}>
          <div
            className={classes.meter_rootContent}
            style={{ borderColor: color }}
          >
            {logo && (
              <>
                <img
                  className={clsx(classes.meter_rootIcon)}
                  src={logo}
                  alt={title}
                />
                <img
                  className={clsx(
                    classes.meter_rootIcon,
                    classes.meter_rootIconFader,
                    // @ts-ignore
                    classes[color.substring(1)],
                  )}
                  src={logo}
                  alt={title}
                />
              </>
            )}
          </div>
        </div>
        {nodes}
      </div>
      <div className={classes.skill_title}>{title}</div>
    </div>
  );
};

const Skills: FC = () => {
  const { data } = useSkillsGetQuery();
  const skills = data?.skills ?? [];

  const [skillsExpanded, setSkillsExpanded] = useState(true);

  const classes = useStyles();

  const handleExpandButtonClick = useCallback(() => {
    setSkillsExpanded(!skillsExpanded);
  }, [skillsExpanded]);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <IconButton onClick={handleExpandButtonClick}>
            <AddCircle />
          </IconButton>
          <div
            className={clsx(
              classes.skills,
              skillsExpanded && classes.skills__expanded,
            )}
          >
            {skills.map((skill) => (
              <Skill
                key={skill.id}
                skill={skill}
                skillsExpanded={skillsExpanded}
              />
            ))}
          </div>
        </Grid>
      </Grid>

      <svg className={classes.filters}>
        <Filter color={primaryColor} />
        <Filter color={secondaryColor} />
        <Filter color={trinaryColor} />
        <Filter color={languagesColor} />
      </svg>
    </>
  );
};

export default Skills;
