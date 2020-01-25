import typenames from "src/graphql/typenames";
import { Language } from "src/graphql/__generated__";
import { RequiredBy } from "src/types";

let id = 0;
function createLanguage(language: RequiredBy<Language, "title">) {
  return {
    __typename: typenames.Language,
    id: (id++).toString(),
    ...language,
  };
}
const languages = {
  css: createLanguage({
    title: "CSS",
  }),
  javascript: createLanguage({
    title: "JavaScript",
  }),
  java: createLanguage({
    title: "Java",
  }),
  golang: createLanguage({
    title: "Golang",
  }),
  groovy: createLanguage({
    title: "Groovy",
  }),
  ruby: createLanguage({
    title: "Ruby",
  }),
  typescript: createLanguage({
    title: "TypeScript",
  }),
  bash: createLanguage({
    title: "Bash",
  }),
};

export default languages as { [key in keyof typeof languages]: Language };
