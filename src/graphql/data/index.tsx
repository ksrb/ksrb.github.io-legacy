import typenames from "src/graphql/typenames";
import { Experience, History } from "src/graphql/__generated__";

import companies from "./companies";
import languages from "./languages";
import tools from "./tools";
import uses from "./uses";

type RequiredBy<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

function createHistory(history: RequiredBy<History, "value">): History {
  return {
    __typename: typenames.History,
    children: null,
    utilization: null,
    ...history,
  };
}

export const experiences: Experience[] = [
  {
    __typename: typenames.Experience,
    company: companies.pmat,
    role: "Senior Frontend Developer",
    hours: "Full time",
    startDate: new Date(2018, 7).toString(),
    endDate: null,
    history: [
      createHistory({
        value: [uses.Frontend],
        utilization: 70,
        children: [
          createHistory({
            value: [languages.javaScript, languages.typescript],
            children: [
              createHistory({ value: [tools.react] }),
              createHistory({ value: [tools.redux] }),
              createHistory({ value: [tools.graphql] }),
              createHistory({ value: [tools.apollo] }),
              createHistory({ value: [tools.cesium] }),
              createHistory({ value: [tools.leaflet] }),
            ],
          }),
        ],
      }),
      createHistory({
        value: [uses.Backend],
        utilization: 20,
        children: [
          createHistory({
            value: [languages.java],
            children: [
              createHistory({ value: [tools.graphqlJava] }),
              createHistory({ value: [tools.javaServlet] }),
            ],
          }),
        ],
      }),
      createHistory({
        value: [uses.Build],
        utilization: 10,
        children: [
          createHistory({ value: [languages.bash] }),
          createHistory({ value: [tools.docker] }),
          createHistory({ value: [tools.gradle] }),
        ],
      }),
    ],
    accomplishments: [
      "Lead a team of 3 frontend developers transitioning core Angular application to one utilizing ReactJS + Apollo + Typescript improving overall code quality and performance.",
      "Designed and implemented core application code, significant contributions include major rendering improvements by utilizing HTML canvas to render 50k+ entities on a map.",
      "Introduced and maintaining GraphQL service, streamlining development process between backend and frontend teams.",
    ],
    hidden: false,
  },
  {
    __typename: typenames.Experience,
    company: companies.lanternCredit,
    role: "Full Stack Developer",
    hours: "Full time",
    startDate: new Date(2015, 6).toString(),
    endDate: new Date(2018, 2).toString(),
    history: [
      createHistory({
        value: [uses.Frontend],
        utilization: 60,
        children: [
          createHistory({
            value: [languages.javaScript],
            children: [
              createHistory({ value: [tools.react] }),
              createHistory({ value: [tools.graphql] }),
            ],
          }),
        ],
      }),
      createHistory({
        value: [uses.Backend],
        utilization: 30,
        children: [createHistory({ value: [languages.golang] })],
      }),
      createHistory({
        value: [uses.Build],
        utilization: 10,
        children: [
          createHistory({ value: [languages.bash] }),
          createHistory({ value: [tools.docker] }),
        ],
      }),
    ],
    accomplishments: [
      "Used ReactJS, Babel, and Webpack to create front-end application using current and experimental versions of JavaScript.",
      "Maintained front end build and deployment pipeline and incorporated new technologies to streamline development such as SASS and CSS modules.",
      "Created several microservices using Golang to retrieve data from credit agencies such as Transunion and Equifax.",
      "Built and deployed microservices using Docker, took part in the creation of a 3-tier architecture creating a system that was both secure and scalable.",
    ],
    hidden: false,
  },
  {
    __typename: typenames.Experience,
    company: companies.tableDesignArt,
    role: "Web Developer",
    hours: "Part time",
    startDate: new Date(2015, 4).toString(),
    endDate: new Date(2015, 6).toString(),
    history: [
      createHistory({
        value: [tools.liquid],
      }),
      createHistory({
        value: [languages.css],
      }),
      createHistory({
        value: [languages.javaScript],
      }),
    ],
    accomplishments: [
      "Used Shopify to rapidly create a webstore, used the Liquid templating language to customize appearance.",
      "Simplified shipping process by integrating webstore with shipping providers such as FedEx and UPS.",
      "Helped manage social media campaigns on Facebook, Pinterest, and Twitter.",
    ],
    hidden: true,
  },
  {
    __typename: typenames.Experience,
    company: companies.niksun,
    role: "Web Developer",
    hours: "Full time",
    startDate: new Date(2013, 9).toString(),
    endDate: new Date(2015, 3).toString(),
    history: [
      createHistory({
        value: [uses.Frontend],
        utilization: 90,
        children: [
          createHistory({
            value: [tools.gwt],
            utilization: 70,
          }),
          createHistory({
            value: [tools.angularJS],
            utilization: 30,
          }),
        ],
      }),
      createHistory({
        value: [tools.gradle],
        utilization: 10,
      }),
    ],
    accomplishments: [
      "Created a real time reporting web application for Niksun's file analysis service, used by several clients including Wells Fargo.",
      "Rapidly designed and wireframed several prototypes in an effort to modernize Niksun's client facing applications.",
      "Created a workspace setup and build script using Gradle, significantly reducing onboarding time of new developers.",
    ],
    hidden: false,
  },
];
