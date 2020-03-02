import { Tool } from "src/graphql/__generated__";

import typenames from "src/graphql/typenames";
import { RequiredBy } from "src/types";

import languages from "./languages";
import uses from "./uses";

let id = 0;
function createTool(tool: RequiredBy<Tool, "title">): Tool {
  return {
    __typename: typenames.Tool,
    id: (id++).toString(),
    url: "",
    use: uses.None,
    languages: null,
    ...tool,
  };
}

const tools = {
  angularJS: createTool({
    title: "AngularJS",
    url: "https://angularjs.org/",
    use: uses.Frontend,
    languages: [languages.javascript],
  }),
  apollo: createTool({
    title: "Apollo",
    url: "https://www.apollographql.com/",
    use: uses.Frontend,
    languages: [languages.typescript],
  }),
  bootstrap: createTool({
    title: "Bootstrap",
    url: "https://github.com/twbs/bootstrap-sass",
    use: uses.Frontend,
    languages: [languages.scss],
  }),
  cesium: createTool({
    title: "Cesium",
    url: "https://cesium.com/cesiumjs/",
    use: uses.Frontend,
    languages: [languages.javascript],
  }),
  docker: createTool({
    title: "Docker",
    url: "https://www.docker.com/",
    use: uses.Build,
    languages: [languages.bash],
  }),
  foundation: createTool({
    title: "Foundation",
    url: "https://foundation.zurb.com/",
    use: uses.Frontend,
    languages: [languages.scss],
  }),
  gradle: createTool({
    title: "Gradle",
    url: "https://gradle.org/",
    use: uses.Build,
    languages: [languages.groovy],
  }),
  graphql: createTool({
    title: "GraphQl",
    url: "https://graphql.org/",
    use: uses.Frontend,
    languages: [languages.javascript],
  }),
  graphqlJava: createTool({
    title: "GraphQl Java",
    url: "https://www.graphql-java.com/",
    use: uses.Backend,
    languages: [languages.java],
  }),
  smartGwt: createTool({
    title: "SmartGWT",
    url: "https://www.smartclient.com/product/smartgwt.jsp",
    use: uses.Frontend,
    languages: [languages.java],
  }),
  git: createTool({
    title: "Git",
    url: "https://git-scm.com/",
    use: uses.Build,
    languages: [languages.bash],
  }),
  javaServlet: createTool({
    title: "Java Servlet",
    url: "https://en.wikipedia.org/wiki/Java_servlet",
    use: uses.Backend,
    languages: [languages.java],
  }),
  jspm: createTool({
    title: "jspm",
    url: "https://jspm.io/",
    use: uses.Build,
    languages: [languages.javascript],
  }),
  leaflet: createTool({
    title: "Leaflet",
    url: "https://leafletjs.com/",
    use: uses.Frontend,
    languages: [languages.javascript],
  }),
  liquid: createTool({
    title: "Liquid",
    url: "https://help.shopify.com/en/themes/liquid/",
    use: uses.Frontend,
    languages: [languages.ruby],
  }),
  photoshop: createTool({
    title: "Photoshop",
    url: "https://www.adobe.com/products/photoshop.html",
    use: uses.Frontend,
  }),
  react: createTool({
    title: "React",
    url: "https://reactjs.org/",
    use: uses.Frontend,
    languages: [languages.javascript],
  }),
  redux: createTool({
    title: "Redux",
    url: "https://redux.js.org/",
    use: uses.Frontend,
    languages: [languages.javascript],
  }),
  webpack: createTool({
    title: "Webpack",
    url: "https://webpack.js.org/",
    use: uses.Build,
    languages: [languages.javascript],
  }),
  timeOff: createTool({
    title: "Time off",
  }),
};

export default tools as { [key in keyof typeof tools]: Tool };
