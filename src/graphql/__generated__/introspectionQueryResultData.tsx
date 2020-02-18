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
            name: "Experience",
          },
          {
            name: "Company",
          },
          {
            name: "History",
          },
          {
            name: "Language",
          },
          {
            name: "Tool",
          },
          {
            name: "Use",
          },
          {
            name: "Skill",
          },
        ],
      },
      {
        kind: "UNION",
        name: "DisplayedNode",
        possibleTypes: [
          {
            name: "Language",
          },
          {
            name: "Tool",
          },
          {
            name: "Use",
          },
        ],
      },
      {
        kind: "INTERFACE",
        name: "Displayed",
        possibleTypes: [
          {
            name: "Language",
          },
          {
            name: "Tool",
          },
          {
            name: "Use",
          },
        ],
      },
    ],
  },
};
export default result;
