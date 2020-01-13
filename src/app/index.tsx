import React, { FC } from "react";
import { useExperienceGetQuery } from "../graphql/__generated__";

const App: FC = () => {
  const { data } = useExperienceGetQuery();
  const experiences = data?.experiences ?? [];

  return (
    <>
      {experiences
        .filter(({ hidden }) => !hidden)
        .map(({ companyName }) => {
          return <div key={companyName}>{companyName}</div>;
        })}
    </>
  );
};

export default App;
