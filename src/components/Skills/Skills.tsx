import { Grid, TextField } from "@material-ui/core";
import {
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
} from "@material-ui/lab";
import React, { FC, useCallback, useMemo, useState } from "react";
import { useStylesShared } from "./index";
import { publicUrl } from "src/constants/config";
import { cache } from "src/graphql";
import { useSkillsGetQuery } from "src/graphql/__generated__";
import uses from "src/graphql/data/uses";
import typenames from "src/graphql/typenames";
import theme from "src/theme";
import MeterRoot from "./MeterRoot";
import Skill, { SkillType } from "./Skill";

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

const { primaryColor, trinaryColor, secondaryColor, languagesColor } = theme;

const Skills: FC = () => {
  const { data } = useSkillsGetQuery();
  const skills = useMemo(() => data?.skills ?? [], [data]);

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

  const { classesSkills: classes, classesSkill } = useStylesShared();

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
          <div className={classes.skills}>
            <div className={classes.skill}>
              <MeterRoot
                title="Search"
                logo={`${publicUrl}/assets/icons/Search.svg`}
              />
              <div className={classesSkill.skill_title}>Search</div>
            </div>
            {skillsFiltered.map((skill) => (
              <Skill key={skill.id} skill={skill} />
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
