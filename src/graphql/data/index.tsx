import { Experience } from "../__generated__";
import typenames from "../typenames";

export const experiences: Experience[] = [
  {
    __typename: typenames.Experience,
    companyName: "PMAT Inc.",
    // iconPath: require("data/img/pmat.svg"),
    iconPath: null,
    purpose:
      "Company focused on developing solutions for the defense sector specializing in web applications providing situational awareness for command and control.",
    address: {
      __typename: typenames.Address,
      state: "CA",
      county: "San Diego",
    },
    role: "Senior Frontend Developer",
    hours: "Full time",
    startDate: new Date(2018, 7).toString(),
    endDate: "Current",
    skills: [
      {
        __typename: typenames.Skill,
        name: "React",
        type: "programming",
        utilization: 70,
      },
      {
        __typename: typenames.Skill,
        name: "Java",
        type: "programming",
        utilization: 20,
      },
      {
        __typename: typenames.Skill,
        name: "Bash",
        type: "programming",
        utilization: 10,
      },
    ],
    accomplishments: [
      "Lead a team of 3 frontend developers transitioning core AngularJS application to one utilizing ReactJS + Apollo + Typescript improving overall code quality and performance.",
      "Designed and implemented core application code, significant contributions include major rendering improvements by utilizing HTML canvas to render 50k+ entities on a map.",
      "Introduced and maintaining GraphQL service, streamlining development process between backend and frontend teams.",
    ],
    hidden: false,
  },
  {
    __typename: typenames.Experience,
    companyName: "Lantern Credit",
    // iconPath: require("data/img/lantern.svg"),
    iconPath: null,
    purpose:
      "Startup focused on modernizing the credit scoring industry by creating an application that allows users to modify their credit score in real time.",
    address: {
      __typename: typenames.Address,
      state: "CA",
      county: "Irvine",
    },
    role: "Full Stack Developer",
    hours: "Full time",
    startDate: new Date(2015, 6).toString(),
    endDate: new Date(2018, 2).toString(),
    skills: [
      {
        __typename: typenames.Skill,
        name: "JavaScript (React)",
        type: "programming",
        utilization: 60,
      },
      {
        __typename: typenames.Skill,
        name: "Golang",
        type: "programming",
        utilization: 25,
      },
      {
        __typename: typenames.Skill,
        name: "Bash",
        type: "programming",
        utilization: 15,
      },
    ],
    accomplishments: [
      "Used ReactJS, Babel, and Webpack to create front-end application using current and experimental versions of JavaScript.",
      "Maintained front end build and deployment pipeline and incorporated new technologies to streamline development such as SASS and CSS modules.",
      "Created several microservices using Golang to retrieve data from credit agencies such as Transunion and Equifax. ",
      "Built and deployed microservices using Docker, took part in the creation of a 3-tier architecture creating a system that was both secure and scalable.",
    ],
    hidden: false,
  },
  {
    __typename: typenames.Experience,
    companyName: "Table Design Art",
    // iconPath: require("data/img/table design art.png"),
    iconPath: null,
    purpose:
      "Startup company specializing in creating decorative table banners for special occasion.",
    address: {
      __typename: typenames.Address,
      state: "CA",
      county: "Irvine",
    },
    role: "Web Developer",
    hours: "Part time",
    startDate: new Date(2015, 4).toString(),
    endDate: new Date(2015, 6).toString(),
    skills: [
      {
        __typename: typenames.Skill,
        name: "Liquid",
        type: "visual",
        utilization: 40,
      },
      {
        __typename: typenames.Skill,
        name: "css",
        type: "visual",
        utilization: 30,
      },
      {
        __typename: typenames.Skill,
        name: "JavaScript",
        type: "programming",
        utilization: 30,
      },
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
    companyName: "Niksun",
    // iconPath: require("data/img/niksun.png"),
    iconPath: null,
    purpose: "Company focused on providing network analysis software.",
    address: {
      __typename: typenames.Address,
      state: "CA",
      county: "Irvine",
    },
    role: "Web Developer",
    hours: "Full time",
    startDate: new Date(2013, 9).toString(),
    endDate: new Date(2015, 3).toString(),
    skills: [
      {
        __typename: typenames.Skill,
        name: "GWT",
        type: "programming",
        utilization: 70,
      },
      {
        __typename: typenames.Skill,
        name: "JavaScript",
        type: "programming",
        utilization: 20,
      },
      {
        __typename: typenames.Skill,
        name: "css",
        type: "visual",
        utilization: 10,
      },
    ],
    accomplishments: [
      "Created a real time reporting web application for Niksun's file analysis service, used by several clients including Wells Fargo.",
      "Rapidly designed and wireframed several prototypes in an effort to modernize Niksun's client facing applications.",
      "Created a workspace setup and build script using Gradle, significantly reducing onboarding time of new developers.",
    ],
    hidden: false,
  },
];
