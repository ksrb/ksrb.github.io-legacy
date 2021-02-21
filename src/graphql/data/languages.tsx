import typenames from "src/graphql/typenames";
import { Language } from "src/graphql/__generated__";
import { RequiredByElsePartial } from "src/types";
import { publicUrl } from "src/constants/config";

let id = 0;
function createLanguage(language: RequiredByElsePartial<Language, "title">) {
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
    logo: `${publicUrl}/assets/skills/Bash.svg`,
  }),
  javascript: createLanguage({
    title: "JavaScript",
    url: "https://en.wikipedia.org/wiki/JavaScript",
    logo: `${publicUrl}/assets/skills/JavaScript.svg`,
  }),
  java: createLanguage({
    title: "Java",
    url: "https://en.wikipedia.org/wiki/Java_(programming_language)",
    logo: `${publicUrl}/assets/skills/Java.svg`,
  }),
  golang: createLanguage({
    title: "Golang",
    url: "https://golang.org/",
    logo: `${publicUrl}/assets/skills/Groovy.svg`,
  }),
  groovy: createLanguage({
    title: "Groovy",
    url: "https://groovy-lang.org/",
    logo: `${publicUrl}/assets/skills/Groovy.svg`,
  }),
  mysql: createLanguage({
    title: "MySQL",
    url: "https://www.mysql.com/",
    logo: `${publicUrl}/assets/skills/MySQL.svg`,
  }),
  php: createLanguage({
    title: "PHP",
    url: "https://www.php.net/",
    logo: `${publicUrl}/assets/skills/PHP.svg`,
  }),
  ruby: createLanguage({
    title: "Ruby",
    url: "https://www.ruby-lang.org/en/",
    logo: `${publicUrl}/assets/skills/Ruby.svg`,
  }),
  sass: createLanguage({
    title: "Sass",
    url: "https://sass-lang.com/",
    logo: `${publicUrl}/assets/skills/Sass.svg`,
  }),
  typescript: createLanguage({
    title: "TypeScript",
    url: "https://www.typescriptlang.org/",
    logo: `${publicUrl}/assets/skills/TypeScript.svg`,
  }),
};

export default languages as { [key in keyof typeof languages]: Language };
