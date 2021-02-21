import {
  Displayed,
  Experience,
  History,
  Language,
  Skill,
  Tool,
  Use,
} from "src/graphql/__generated__";
import typenames from "src/graphql/typenames";
import { NonNullableBy, RequiredByElsePartial } from "src/types";
import experiences from "./experiences";
import tools from "./tools";

type SkillRequiredProperties = RequiredByElsePartial<
  Skill,
  "experience" | "utilization" | "values"
>;

type SkillRequiredPropertiesMap = {
  [key: string]: SkillRequiredProperties;
};

export type HistoryWithChildren = NonNullableBy<History, "children">;

export function computeUtilization(
  history: History,
  historyParent: HistoryWithChildren | undefined,
  historyParentDays: number,
  histories?: History[],
): number {
  let { utilization } = history;

  if (utilization) {
    return historyParentDays * (utilization / 100);
  }

  // Else no utilization
  const children = historyParent ? historyParent.children : histories;

  if (!children) {
    throw new Error(
      `historyParent or histories not provided for history with id: ${history.id}`,
    );
  }

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

function isHistoryWithChildren(
  history: History,
): history is HistoryWithChildren {
  return Boolean(history.children);
}

function computeSkillsFromHistory(
  history: History,
  historyParent: HistoryWithChildren | undefined,
  historyParentDays: number,
  experience: Experience,
  onlyLanguages: boolean = false,
): SkillRequiredProperties[] {
  const skills: SkillRequiredProperties[] = [];
  const { values } = history;

  let computedUtilization = computeUtilization(
    history,
    historyParent,
    historyParentDays,
    experience.histories,
  );

  // Has parent
  if (historyParent) {
    const parentIsOnlyLanguages = !(historyParent.values as Language[]).some(
      (value) => value.__typename !== typenames.Language,
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
  if (isHistoryWithChildren(history)) {
    // Loop through children
    for (const childrenHistory of history.children) {
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
    const { histories, days } = experience;

    for (const history of histories) {
      skills.push(
        ...computeSkillsFromHistory(
          history,
          undefined,
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
    title: skill.values.map(({ title }) => title).join(" "),
    ...skill,
  };
}

function getCacheKey(displayedNode: Displayed): string {
  // @ts-ignore
  const { __typename, id } = displayedNode;
  return `${__typename}:${id}`;
}

function aggregateSkillUtilization(
  skills: SkillRequiredProperties[],
): SkillRequiredProperties[] {
  const skillsMap = skills.reduce<SkillRequiredPropertiesMap>(
    (skillsMap, skill) => {
      const { utilization, values } = skill;

      values.forEach((value) => {
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
    (values as Tool[]).find((tool) => tool.id !== tools.timeOff.id),
  );
}

const skills = aggregateSkillUtilization(computeSkillsFromExperiences());

const skillsLanguages = computeSkillsFromExperiences(
  true,
).reduce<SkillRequiredPropertiesMap>((skillMap, skill) => {
  const { languages, utilization, experience } = skill;

  if (!languages) {
    return skillMap;
  }

  languages.forEach((language) => {
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
    (values as Tool[]).find((tool) => tool.__typename === typenames.Tool),
  )
  .sort((a, b) => b.utilization - a.utilization);

export default Object.values(skillsLanguages)
  .sort((a, b) => b.utilization - a.utilization)
  .concat(skillsTools);
