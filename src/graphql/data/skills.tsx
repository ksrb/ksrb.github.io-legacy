import typenames from "src/graphql/typenames";
import {
  Displayed,
  Experience,
  History,
  Language,
  Skill,
  Tool,
  Use,
} from "src/graphql/__generated__";

import { RequiredBy } from "src/types";

import experiences from "./experiences";

type SkillRequiredProperties = RequiredBy<
  Skill,
  "experience" | "utilization" | "values"
>;
type SkillRequiredPropertiesMap = {
  [key: string]: SkillRequiredProperties;
};

function computeUtilization(
  utilization: number,
  parentDays: number,
  parent: History | undefined,
  histories: History[],
): number {
  if (utilization) {
    return utilization * parentDays;
  }

  if (!parent) {
    return parentDays / histories.length;
  }

  // Else parent exists

  // This typecast is necessary as Typescript complains that parent.children
  // could be null but this is impossible as the condition above check if the
  // parent exists, for a parent to exists it has to children
  const children = parent.children as History[];

  // Else no set utilizations
  const siblingUtilizations = children.reduce(
    (prev, { utilization }) => prev + (utilization ?? 0),
    0,
  );

  // Siblings do not have set utilizations
  if (!siblingUtilizations) {
    // Split utilization evenly between children
    return parentDays / children.length;
  }

  // Else siblings have set utilizations
  return (
    // Compute utilization from remainder of sibling utilizations
    ((1 - siblingUtilizations / 100) * parentDays) / children.length
  );
}

function computeSkills(
  histories: History[],
  parentDays: number,
  parent: History | undefined,
  experience: Experience,
): SkillRequiredProperties[] {
  const skills: SkillRequiredProperties[] = [];
  for (const history of histories) {
    const { children, values } = history;
    let { utilization } = history;
    utilization = (utilization ?? 0) / 100;

    let computedUtilization = computeUtilization(
      utilization,
      parentDays,
      parent,
      histories,
    );

    // Has parent
    if (parent) {
      const parentIsLanguages = !(parent.values as Language[]).find(
        value => value.__typename !== typenames.Language,
      );

      // Has parent and parent is a language
      if (parentIsLanguages) {
        const languages = parent.values as Language[];

        skills.push({
          experience,
          // Override languages with parent languages
          languages,
          utilization: computedUtilization,
          values,
        });
        continue;
      }
    }

    const uses = values as Use[];
    const isUses = !uses.find(({ __typename }) => __typename !== typenames.Use);

    // Values are uses
    if (isUses) {
      skills.push({
        experience,
        values,
        utilization: computedUtilization,
      });
    }

    const tools = values as Tool[];
    const isTools = !tools.find(
      ({ __typename }) => __typename !== typenames.Tool,
    );

    // Values are tools
    if (isTools) {
      const languages = tools.reduce<Language[]>((prev, { languages }) => {
        if (languages) {
          prev.push(...languages);
          return prev;
        }
        return prev;
      }, []);

      skills.push({
        experience,
        values,
        utilization: computedUtilization,
        languages,
      });
    }

    const languages = values as Language[];
    const isLanguages = !languages.find(
      ({ __typename }) => __typename !== typenames.Language,
    );

    // Values are languages
    if (isLanguages) {
      skills.push({
        experience,
        values,
        utilization: computedUtilization,
        languages,
      });
    }

    if (children) {
      skills.push(
        ...computeSkills(children, computedUtilization, history, experience),
      );
    }
  }
  return skills;
}

const skillsComputed = experiences
  .filter(({ hidden }) => !hidden)
  .reduce<SkillRequiredProperties[]>((prev, experience) => {
    const { history } = experience;
    const { startDate: startDateStr, endDate: endDateStr } = experience;

    const startDate = new Date(startDateStr);
    const endDate = endDateStr ? new Date(endDateStr) : new Date();
    const days =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    prev.push(...computeSkills(history, days, undefined, experience));
    return prev;
  }, []);

let id = 0;
function createSkill(skill: SkillRequiredProperties): Skill {
  return {
    __typename: typenames.Skill,
    id: (id++).toString(),
    languages: null,
    ...skill,
  };
}

function getIdForNode(node: Node | Displayed): string {
  // @ts-ignore all instances of Displayed implement Node, this would be better
  // described by having Displayed implement Node but this is not possible at
  // the moment see:
  // https://github.com/graphql/graphql-spec/pull/373
  const { __typename, id } = node;
  return `${__typename}:${id}`;
}
const skillsMap = skillsComputed.reduce<SkillRequiredPropertiesMap>(
  (skillsMap, skill) => {
    const { utilization, values } = skill;

    values.forEach(value => {
      const id = getIdForNode(value);
      const skillInSkillMap: SkillRequiredProperties = skillsMap[id];

      if (!skillInSkillMap) {
        skillsMap[id] = createSkill({
          ...skill,
          utilization,
        });
        return;
      }

      skillInSkillMap.utilization += utilization;
    });

    return skillsMap;
  },
  {},
);

let skills = Object.values(skillsMap);

const skillsUses = skills.filter(({ values }) =>
  (values as Use[]).find(use => use.__typename === typenames.Use),
);

const skillsTools = skills
  .filter(({ values }) =>
    (values as Tool[]).find(tool => tool.__typename === typenames.Tool),
  )
  .sort((a, b) => b.utilization - a.utilization);

const skillsLanguages = skillsComputed.reduce<SkillRequiredPropertiesMap>(
  (skillMap, skill) => {
    const { languages, utilization, experience } = skill;
    if (!languages) {
      return skillMap;
    }

    languages.forEach(language => {
      const { id } = language;
      const skillInSkillMap = skillMap[id];

      if (!skillInSkillMap) {
        skillMap[id] = createSkill({
          values: [language],
          utilization: utilization,
          experience,
        });
        return;
      }
      skillInSkillMap.utilization += utilization;
    });

    return skillMap;
  },
  {},
);

skills = skillsUses
  .concat(
    Object.values(skillsLanguages).sort(
      (a, b) => b.utilization - a.utilization,
    ),
  )
  .concat(skillsTools);

export default skills;
