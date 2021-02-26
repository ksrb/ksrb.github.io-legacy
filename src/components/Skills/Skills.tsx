import { Grid, Switch, TextField, Tooltip } from "@material-ui/core";
import {
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
} from "@material-ui/lab";
import clsx from "clsx";
import gsap from "gsap";
import React, {
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import Link from "src/components/Link";
import { useColorByType } from "src/components/util";
import { cache } from "src/graphql";
import {
  Language,
  SkillsGetQuery,
  Tool,
  useSkillsGetQuery,
} from "src/graphql/__generated__";
import uses from "src/graphql/data/uses";
import typenames from "src/graphql/typenames";
import { useHover } from "src/hooks";
import theme from "src/theme";
import { ExtractArrayType } from "src/types";
import useStyles from "./styles";

function printDateString(
  valueParam: number,
  type: "year" | "month" | "day",
): string {
  const value = (() => {
    switch (type) {
      case "day":
        return Math.floor(valueParam % 30);
      case "month":
        return Math.floor((valueParam % 365) / 30);
      case "year":
        return Math.floor(valueParam / 365);
      default:
        return 0;
    }
  })();

  if (value === 0) {
    return "";
  }

  if (value === 1) {
    return `${value} ${type}`;
  }

  return `${value} ${type}s`;
}
const { primaryColor, trinaryColor, secondaryColor, languagesColor } = theme;

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

function getLogo({
  values,
}: ExtractArrayType<SkillsGetQuery["skills"]>): string {
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

type SkillType = ExtractArrayType<SkillsGetQuery["skills"]>;

const Skill: FC<{
  skill: SkillType;
  skillsExpanded: boolean;
}> = ({ skill }) => {
  const { title, utilization, value } = skill;
  const url = useMemo(() => {
    // Value type is Language or Tool
    if (
      value.__typename === typenames.Language ||
      value.__typename === typenames.Tool
    ) {
      return value.url;
    }
  }, [value]);

  const timeline = useMemo(() => gsap.timeline(), []);
  const classes = useStyles();

  const skillRef = useCallback(
    (element: HTMLDivElement) => {
      if (!element) {
        return;
      }

      const meterRootElement = element.querySelector(
        `.${classes.meter_rootContent}`,
      );
      const meterEdgeElements = element.querySelectorAll(
        `.${classes.meter_edge}`,
      );
      const meterEdgeVerticalElements = element.querySelectorAll(
        `.${classes.meter_edgeVertical}`,
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

      timeline.from(meterEdgeVerticalElements, {
        duration: 0.5,
        ease: "power1",
        height: 0,
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
    [
      classes.meter_edge,
      classes.meter_edgeVertical,
      classes.meter_node,
      classes.meter_rootContent,
      timeline,
    ],
  );

  const nodeCount = useMemo(() => Math.round(Math.log(utilization)), [
    utilization,
  ]);
  const color = useColorByType(value);
  const nodes: ReactNode[] = [];
  const tooltipTitle = useMemo(
    () =>
      `${printDateString(utilization, "year")} ${printDateString(
        utilization,
        "month",
      )} ${printDateString(utilization, "day")}`,
    [utilization],
  );

  const { isHovering, ...hoverHandlers } = useHover();

  for (let i = 0; i < nodeCount; i++) {
    const lastNode = i === nodeCount - 1;
    nodes.push(
      <Fragment key={i}>
        <div
          className={classes.meter_edge}
          style={{ backgroundColor: color }}
        />
        {lastNode ? (
          <Tooltip
            disableHoverListener
            open={isHovering}
            placement="right"
            title={tooltipTitle}
          >
            <div
              className={classes.meter_node}
              style={{ backgroundColor: color }}
            />
          </Tooltip>
        ) : (
          <div
            className={classes.meter_node}
            style={{ backgroundColor: color }}
          />
        )}
      </Fragment>,
    );
  }

  const logo = getLogo(skill);

  return (
    <div className={classes.skill} ref={skillRef} {...hoverHandlers}>
      <div
        className={classes.meter_edgeVertical}
        style={{ backgroundColor: color }}
      />
      <div className={classes.meter}>
        <Link
          href={url}
          className={classes.meter_root}
          rel="noreferrer"
          target="_blank"
        >
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
                    classes[color.substring(1)],
                  )}
                  src={logo}
                  alt={title}
                />
              </>
            )}
          </div>
        </Link>
        {nodes}
      </div>
      <div className={classes.skill_title}>{title}</div>
    </div>
  );
};

const Skills: FC = () => {
  const { data } = useSkillsGetQuery();
  const skills = useMemo(() => data?.skills ?? [], [data]);

  const [skillsExpanded, setSkillsExpanded] = useState(true);

  const handleExpandButtonClick = useCallback(() => {
    setSkillsExpanded(!skillsExpanded);
  }, [skillsExpanded]);

  const [selectedSkill, setSelectedSkill] = useState<SkillType | undefined>(
    undefined,
  );

  const handleAutoCompleteChange = useCallback(
    (event, data) => setSelectedSkill(data),
    [],
  );

  const [toggles, setToggles] = useState<string[]>(
    Object.values(uses)
      .map((use) => cache.identify(use)!)
      .concat([typenames.Language]),
  );

  const handleToggleButtonGroupOnChange = useCallback(
    (events, toggles) => setToggles(toggles),
    [],
  );

  const skillsFiltered = useMemo(
    () =>
      skills
        .filter((skill) => {
          if (!selectedSkill) {
            return true;
          }

          return skill.id === selectedSkill.id;
        })
        .filter(({ value }) => {
          if (value.__typename === typenames.Tool) {
            const identity = cache.identify(value.use);
            return toggles.find((toggle) => toggle === identity);
          }

          return toggles.find((toggle) => toggle === value.__typename);
        }),
    [selectedSkill, skills, toggles],
  );

  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Autocomplete
            options={skills}
            getOptionLabel={({ title }) => title}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
            onChange={handleAutoCompleteChange}
          />
          <ToggleButtonGroup
            value={toggles}
            onChange={handleToggleButtonGroupOnChange}
          >
            <ToggleButton value={typenames.Language}>Language</ToggleButton>
            <ToggleButton value={cache.identify(uses.Frontend)}>
              {uses.Frontend.title}
            </ToggleButton>
            <ToggleButton value={cache.identify(uses.Backend)}>
              {uses.Backend.title}
            </ToggleButton>
            <ToggleButton value={cache.identify(uses.Build)}>
              {uses.Build.title}
            </ToggleButton>
          </ToggleButtonGroup>
          <Tooltip title={`${skillsExpanded ? "Hide" : "Show"} title`}>
            <Switch
              color="primary"
              checked={skillsExpanded}
              onClick={handleExpandButtonClick}
            />
          </Tooltip>
          <div
            className={clsx(
              classes.skills,
              skillsExpanded && classes.skills__expanded,
            )}
          >
            {skillsFiltered.map((skill) => (
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
