import typenames from "src/graphql/typenames";
import {
  DisplayedNode,
  Experience,
  History,
  Language,
  Skill,
  Tool,
  Use,
} from "src/graphql/__generated__";

import { RequiredBy } from "src/types";

import experiences from "./experiences";
import tools from "./tools";
import uses from "./uses";

type SkillRequiredProperties = RequiredBy<
  Skill,
  "experience" | "utilization" | "values"
>;
type SkillRequiredPropertiesMap = {
  [key: string]: SkillRequiredProperties;
};

type HistoryWithChildren = RequiredBy<History, "children">;

export function computeUtilization(
  history: History,
  historyParent: HistoryWithChildren,
  historyParentDays: number,
): number {
  let { utilization } = history;

  if (utilization) {
    return historyParentDays * (utilization / 100);
  }

  // Else no utilization

  // This typecast is necessary as TypeScript complains that parent.children
  // could be null but this is impossible as the condition above checks if the
  // parent exists, for a parent to exists it has to children
  const children = historyParent.children as History[];

  // Else no set utilizations

  const childrenWithUtilization = children.filter(
    ({ utilization }) => utilization,
  );

  // Siblings do not have set utilizations
  if (!childrenWithUtilization) {
    // Split utilization evenly between children
    return historyParentDays / children.length;
  }

  const siblingUtilizations =
    children.reduce((prev, { utilization }) => prev + (utilization ?? 0), 0) /
    100;

  // Else siblings have set utilizations
  return (
    // Compute utilization from remainder of sibling utilizations
    (historyParentDays * (1 - siblingUtilizations)) /
    (children.length - childrenWithUtilization.length)
  );
}

function computeSkillsFromHistory(
  history: History,
  historyParent: HistoryWithChildren,
  historyParentDays: number,
  experience: Experience,
  onlyLanguages: boolean = false,
): SkillRequiredProperties[] {
  const skills: SkillRequiredProperties[] = [];
  const { children, values } = history;

  let computedUtilization = computeUtilization(
    history,
    historyParent,
    historyParentDays,
  );

  // Has parent
  if (historyParent) {
    const parentIsOnlyLanguages = !(historyParent.values as Language[]).some(
      value => value.__typename !== typenames.Language,
    );

    // Has parent and parent is only languages
    if (parentIsOnlyLanguages) {
      const languages = historyParent.values as Language[];

      skills.push({
        experience,
        // Override languages with parent languages
        languages,
        utilization: computedUtilization,
        values,
      });
      return skills;
    }
  }

  const uses = values as Use[];
  const isOnlyUses = !uses.some(
    ({ __typename }) => __typename !== typenames.Use,
  );

  // Values are only uses
  if (isOnlyUses) {
    skills.push({
      experience,
      values,
      utilization: computedUtilization,
    });
  }

  const tools = values as Tool[];
  const isOnlyTools = !tools.some(
    ({ __typename }) => __typename !== typenames.Tool,
  );

  // Values are only tools
  if (isOnlyTools) {
    // Extract languages if they exists
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
      // If tool doesn't have languages then set to null
      languages: languages.length !== 0 ? languages : null,
    });
  }

  const languages = values as Language[];
  const isOnlyLanguages = !languages.some(
    ({ __typename }) => __typename !== typenames.Language,
  );

  // Values are only languages
  if (isOnlyLanguages) {
    skills.push({
      experience,
      values,
      utilization: computedUtilization,
      languages,
    });

    // If computing only languages don't recurse to children, as history which
    // are languages are always wrappers for the children and would result in
    // doubling of the language utilization
    if (onlyLanguages) {
      return skills;
    }
  }

  // If history has children
  if (children) {
    // Loop through children
    for (const childrenHistory of children) {
      skills.push(
        // Recurse
        ...computeSkillsFromHistory(
          childrenHistory,
          history,
          computedUtilization,
          experience,
          onlyLanguages,
        ),
      );
    }
  }

  return skills;
}

function computeSkillsFromExperiences(
  onlyLanguages?: boolean,
): SkillRequiredProperties[] {
  return experiences.reduce<SkillRequiredProperties[]>((skills, experience) => {
    const { histories } = experience;
    const { startDate: startDateStr, endDate: endDateStr } = experience;

    const startDate = new Date(startDateStr);
    const endDate = endDateStr ? new Date(endDateStr) : new Date();
    const days =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    for (const history of histories) {
      skills.push(
        ...computeSkillsFromHistory(
          history,
          {
            values: [uses.None],
            children: histories,
          },
          days,
          experience,
          onlyLanguages,
        ),
      );
    }

    return skills;
  }, []);
}

let id = 0;
function createSkill(skill: SkillRequiredProperties): Skill {
  return {
    __typename: typenames.Skill,
    id: (id++).toString(),
    languages: null,
    ...skill,
  };
}

function getCacheKey(displayedNode: DisplayedNode): string {
  const { __typename, id } = displayedNode;
  return `${__typename}:${id}`;
}

function aggregateSkillUtilization(
  skills: SkillRequiredProperties[],
): SkillRequiredProperties[] {
  const skillsMap = skills.reduce<SkillRequiredPropertiesMap>(
    (skillsMap, skill) => {
      const { utilization, values } = skill;

      values.forEach(value => {
        const id = getCacheKey(value);
        const skillInSkillMap: SkillRequiredProperties = skillsMap[id];

        if (!skillInSkillMap) {
          skillsMap[id] = createSkill({
            ...skill,
            values: [value],
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

  return Object.values(skillsMap).filter(({ values }) =>
    (values as Tool[]).find(tool => tool.id !== tools.timeOff.id),
  );
}

const skills = aggregateSkillUtilization(computeSkillsFromExperiences());

const skillsLanguages = computeSkillsFromExperiences(true).reduce<
  SkillRequiredPropertiesMap
>((skillMap, skill) => {
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
        utilization,
        experience,
        languages: [language],
      });
      return;
    }
    skillInSkillMap.utilization += utilization;
  });

  return skillMap;
}, {});

const skillsTools = skills
  .filter(({ values }) =>
    (values as Tool[]).find(tool => tool.__typename === typenames.Tool),
  )
  .sort((a, b) => b.utilization - a.utilization);

export default Object.values(skillsLanguages)
  .sort((a, b) => b.utilization - a.utilization)
  .concat(skillsTools);
