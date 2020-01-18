import { Tool } from "src/graphql/__generated__";

import typenames from "src/graphql/typenames";

import languages from "./languages";
import uses from "./uses";

const tools = {
  angularJS: {
    __typename: typenames.Skill,
    title: "AngularJS",
    url: "https://angularjs.org/",
    use: uses.Frontend,
    languages: [languages.javaScript],
  } as Tool,
  apollo: {
    __typename: typenames.Skill,
    title: "Apollo",
    url: "https://www.apollographql.com/",
    use: uses.Frontend,
    languages: [languages.javaScript, languages.typescript],
  } as Tool,
  cesium: {
    __typename: typenames.Skill,
    title: "Cesium",
    url: "https://cesium.com/cesiumjs/",
    use: uses.Frontend,
    languages: [languages.javaScript],
  },
  docker: {
    __typename: typenames.Skill,
    title: "Docker",
    url: "https://www.docker.com/",
    use: uses.Build,
    languages: [languages.golang],
  } as Tool,

  gradle: {
    __typename: typenames.Skill,
    title: "Gradle",
    url: "https://gradle.org/",
    use: uses.Build,
    languages: [languages.groovy],
  } as Tool,
  graphql: {
    __typename: typenames.Skill,
    title: "GraphQl",
    url: "http://www.gwtproject.org/",
    use: uses.Frontend,
    languages: [languages.javaScript, languages.typescript],
  },
  graphqlJava: {
    __typename: typenames.Skill,
    title: "GraphQl Java",
    url: "https://www.graphql-java.com/",
    use: uses.Backend,
    languages: [languages.javaScript, languages.typescript, languages.java],
  },
  gwt: {
    __typename: typenames.Skill,
    title: "GWT",
    url: "http://www.gwtproject.org/",
    use: uses.Frontend,
    languages: [languages.java],
  } as Tool,
  javaServlet: {
    __typename: typenames.Skill,
    title: "Java Servlet",
    url: "https://en.wikipedia.org/wiki/Java_servlet",
    use: uses.Backend,
    languages: [languages.java],
  },
  leaflet: {
    __typename: typenames.Skill,
    title: "Leaflet",
    url: "https://leafletjs.com/",
    use: uses.Frontend,
    languages: [languages.groovy],
  } as Tool,
  liquid: {
    __typename: typenames.Skill,
    title: "Liquid",
    url: "https://help.shopify.com/en/themes/liquid/",
    use: uses.Frontend,
    languages: [languages.ruby],
  } as Tool,
  react: {
    __typename: typenames.Skill,
    title: "React",
    url: "https://reactjs.org/",
    use: uses.Frontend,
    languages: [languages.javaScript, languages.typescript],
  } as Tool,
  redux: {
    __typename: typenames.Skill,
    title: "Redux",
    url: "https://redux.js.org/",
    use: uses.Frontend,
    languages: [languages.javaScript, languages.typescript],
  },
};

export default tools as { [key in keyof typeof tools]: Tool };
