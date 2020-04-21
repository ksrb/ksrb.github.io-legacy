export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}
const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: "INTERFACE",
        name: "Node",
        possibleTypes: [
          {
            name: "Company",
          },
          {
            name: "Use",
          },
          {
            name: "Language",
          },
          {
            name: "Tool",
          },
          {
            name: "History",
          },
          {
            name: "Experience",
          },
          {
            name: "Skill",
          },
        ],
      },
      {
        kind: "INTERFACE",
        name: "Displayed",
        possibleTypes: [
          {
            name: "Use",
          },
          {
            name: "Language",
          },
          {
            name: "Tool",
          },
        ],
      },
    ],
  },
};
export default result;
