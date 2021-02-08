export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    Node: [
      "Company",
      "Use",
      "Language",
      "Tool",
      "History",
      "Experience",
      "Skill",
    ],
    Displayed: ["Use", "Language", "Tool"],
  },
};
export default result;
