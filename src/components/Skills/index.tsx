import React, { createContext, FC, useContext } from "react";
import useStylesMeterRoot from "./MeterRoot/styles";
import useStylesSkill from "./Skill/styles";
import Skills from "./Skills";
import useStylesSkills from "./styles";

type StylesContextProperties = {
  classesMeterRoot: ReturnType<typeof useStylesMeterRoot>;
  classesSkill: ReturnType<typeof useStylesSkill>;
  classesSkills: ReturnType<typeof useStylesSkills>;
};

const context = createContext<StylesContextProperties>({
  classesMeterRoot: {},
  classesSkill: {},
  classesSkills: {},
});
const { Provider } = context;

export function useStylesShared() {
  return useContext(context);
}

const Index: FC = () => {
  const classesMeterRoot = useStylesMeterRoot();
  const classesSkill = useStylesSkill();
  const classesSkills = useStylesSkills();

  return (
    <Provider
      value={{
        classesMeterRoot,
        classesSkill,
        classesSkills,
      }}
    >
      <Skills />
    </Provider>
  );
};

export default Index;
