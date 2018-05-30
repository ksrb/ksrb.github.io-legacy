import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

const uiState = {
  selectedItem: 0,
};

const typeDefs = `
  scalar Date

  type UIState {
    id: Int!
    selectedItem: Int
  }

  type Experience {
    companyName: String
    location: String
    role: String
    startDate: Date
    endDate: Date
    skills: [Skill]
    Accomplishments: [String]
  }

  type Skill {
    name: String
    utilization: Int
  }

  type Query {
    uiState: UIState
    experience: [Experience]
  }
`;

const resolvers = {
  Query: {
    uiState: () => uiState,
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

graphql(schema, `
  query person { 
    uiState { 
      selectedItem 
    }
  }
`).then(result => {
  console.log(result.data.uiState.selectedItem);
});
