import { Language } from "src/graphql/__generated__";
import typenames from "../typenames";

const languages = {
  css: {
    __typename: typenames.Language,
    title: "CSS",
  } as Language,
  javaScript: {
    __typename: typenames.Language,
    title: "JavaScript",
  } as Language,
  java: {
    __typename: typenames.Language,
    title: "Java",
  } as Language,
  golang: {
    __typename: typenames.Language,
    title: "Golang",
  } as Language,
  groovy: {
    __typename: typenames.Language,
    title: "Groovy",
  } as Language,
  ruby: {
    __typename: typenames.Language,
    title: "Ruby",
  } as Language,
  typescript: {
    __typename: typenames.Language,
    title: "TypeScript",
  } as Language,
  bash: {
    __typename: typenames.Language,
    title: "Bash",
  } as Language,
};

export default languages as { [key in keyof typeof languages]: Language };
