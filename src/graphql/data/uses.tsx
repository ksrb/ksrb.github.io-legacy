import { Use } from "src/graphql/__generated__";

import typenames from "src/graphql/typenames";

const uses = {
  Backend: {
    __typename: typenames.Use,
    title: "Backend",
  } as Use,
  Build: {
    __typename: typenames.Use,
    title: "Build",
  } as Use,
  Frontend: {
    __typename: typenames.Use,
    title: "Frontend",
  } as Use,
};

export default uses as { [key in keyof typeof uses]: Use };
