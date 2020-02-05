import typenames from "src/graphql/typenames";
import { Language } from "src/graphql/__generated__";
import { RequiredBy } from "src/types";

let id = 0;
function createLanguage(language: RequiredBy<Language, "title">) {
  return {
    __typename: typenames.Language,
    id: (id++).toString(),
    logo: "",
    ...language,
  };
}
const languages = {
  css: createLanguage({
    title: "CSS",
    url: "https://en.wikipedia.org/wiki/Cascading_Style_Sheets",
  }),
  bash: createLanguage({
    title: "Bash",
    url: "https://en.wikipedia.org/wiki/Bash_(Unix_shell)",
  }),
  javascript: createLanguage({
    title: "JavaScript",
    url: "https://en.wikipedia.org/wiki/JavaScript",
  }),
  java: createLanguage({
    title: "Java",
    url: "https://en.wikipedia.org/wiki/Java_(programming_language)",
  }),
  golang: createLanguage({
    title: "Golang",
    url: "https://golang.org/",
  }),
  groovy: createLanguage({
    title: "Groovy",
    url: "https://groovy-lang.org/",
  }),
  php: createLanguage({
    title: "PHP",
    url: "https://www.php.net/",
  }),
  ruby: createLanguage({
    title: "Ruby",
    url: "https://www.ruby-lang.org/en/",
  }),
  scss: createLanguage({
    title: "SCSS",
    url: "https://sass-lang.com/",
  }),
  typescript: createLanguage({
    title: "TypeScript",
    url: "https://www.typescriptlang.org/",
  }),
};

export default languages as { [key in keyof typeof languages]: Language };
