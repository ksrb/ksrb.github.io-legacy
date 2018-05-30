import ApolloClient from 'apollo-boost';

const defaults = {
  uiState: {
    __typename: 'UiState',
    selectedItem: 'none',
  },
  experiences: [
    {
      __typename: 'Experience',
      companyName: 'Lantern Credit',
      iconPath: require('data/img/lantern.svg'),
      purpose: 'Startup focused on modernizing the credit scoring industry by creating an application that allows users to modify their credit score in real time.',
      address: {
        __typename: 'Address',
        state: 'CA',
        county: 'Irvine',
      },
      role: 'Full Stack Developer',
      hours: 'Full time',
      startDate: new Date(2015, 6).toString(),
      endDate: new Date(2018, 2).toString(),
      skills: [
        {
          __typename: 'ExperienceSkill',
          name: 'JavaScript (React)',
          type: 'programming',
          utilization: 60,
        },
        {
          __typename: 'ExperienceSkill',
          name: 'Golang',
          type: 'programming',
          utilization: 25,
        },
        {
          __typename: 'ExperienceSkill',
          name: 'Bash',
          type: 'programming',
          utilization: 15,
        },
      ],
      accomplishments: [
        'Used ReactJS, Babel, and Webpack to create front-end application using current and experimental versions of JavaScript.',
        'Maintained front end build and deployment pipeline and incorporated new technologies to streamline development such as SASS and CSS modules.',
        'Created several microservices using Golang to retrieve data from credit agencies such as Transunion and Equifax. ',
        'Built and deployed microservices using Docker, took part in the creation of a 3-tier architecture creating a system that was both secure and scalable.',
      ],
    },
    {
      __typename: 'Experience',
      companyName: 'Table Design Art',
      iconPath: require('data/img/table design art.png'),
      purpose: 'Startup company specializing in creating decorative table banners for special occasion.',
      address: {
        __typename: 'Address',
        state: 'CA',
        county: 'Irvine',
      },
      role: 'Web Developer',
      hours: 'Part time',
      startDate: new Date(2015, 3).toString(),
      endDate: new Date(2015, 6).toString(),
      skills: [
        {
          __typename: 'ExperienceSkill',
          name: 'Liquid',
          type: 'visual',
          utilization: 40,
        },
        {
          __typename: 'ExperienceSkill',
          name: 'css',
          type: 'visual',
          utilization: 30,
        },
        {
          __typename: 'ExperienceSkill',
          name: 'JavaScript',
          type: 'programming',
          utilization: 30,
        },
      ],
      accomplishments: [
        'Used Shopify to rapidly create webstore, used the Liquid templating language to customize appearance.',
        'Simplified shipping process by integrating webstore with shipping providers such as FedEx and UPS.',
        'Helping manage social media campaign on Facebook, Pinterest, and Twitter.',
      ],
    },
    {
      __typename: 'Experience',
      companyName: 'Niksun',
      iconPath: require('data/img/niksun.png'),
      purpose: 'Company focused on providing network analysis software.',
      address: {
        __typename: 'Address',
        state: 'CA',
        county: 'Irvine',
      },
      role: 'Web Developer',
      hours: 'Full time',
      startDate: new Date(2013, 9).toString(),
      endDate: new Date(2015, 2).toString(),
      skills: [
        {
          __typename: 'ExperienceSkill',
          name: 'GWT',
          type: 'programming',
          utilization: 70,
        },
        {
          __typename: 'ExperienceSkill',
          name: 'JavaScript',
          type: 'programming',
          utilization: 20,
        },
        {
          __typename: 'ExperienceSkill',
          name: 'css',
          type: 'visual',
          utilization: 10,
        },
      ],
      accomplishments: [
        'Created a real time reporting web application for Niksun\'s file  analysis service, used by several clients including Wells Fargo.',
        'Rapidly designed and wireframed several prototypes in an effort to modernize Niksun\'s client facing applications.',
        'Created a workspace setup and build script using Gradle, significantly reducing onboarding time of new developers.',
      ],
    }
  ],
  skills: [
    // programming
    {
      __typename: 'Skills',
      name: 'JavaScript',
      iconPath: require('data/img/javascript.svg'),
      level: 4.5,
      comment: 'Almost expert',
      type: 'programming',
      link: 'https://en.wikipedia.org/wiki/JavaScript'
    },
    {
      __typename: 'Skills',
      name: 'ReactJS',
      iconPath: require('data/img/reactjs.svg'),
      level: 3.5,
      comment: 'Haven\'t taught yet',
      type: 'programming',
      link: 'https://en.wikipedia.org/wiki/React_(JavaScript_library)'
    },
    {
      __typename: 'Skills',
      name: 'Golang',
      iconPath: require('data/img/golang.svg'),
      level: 3,
      comment: 'Proficient',
      type: 'programming',
      link: 'https://en.wikipedia.org/wiki/Go_(programming_language)',
    },
    {
      __typename: 'Skills',
      name: 'Java',
      iconPath: require('data/img/java.svg'),
      level: 3,
      comment: 'Proficient',
      type: 'programming',
      link: 'https://en.wikipedia.org/wiki/Java_(programming_language)',
    },
    {
      __typename: 'Skills',
      name: 'Bash',
      iconPath: require('data/img/bash.svg'),
      level: 3,
      comment: 'Proficient',
      type: 'programming',
      link: 'https://en.wikipedia.org/wiki/Bash_(Unix_shell)'
    },
    // visual
    {
      __typename: 'Skills',
      name: 'Sass',
      iconPath: require('data/img/sass.svg'),
      level: 3.5,
      comment: 'Proficient',
      type: 'visual',
      link: 'https://en.wikipedia.org/wiki/Sass_(stylesheet_language)'
    },
    {
      __typename: 'Skills',
      name: 'Photoshop',
      iconPath: require('data/img/photoshop.svg'),
      level: 3.5,
      comment: 'Proficient',
      type: 'visual',
      link: 'https://en.wikipedia.org/wiki/Adobe_Photoshop'
    },
    {
      __typename: 'Skills',
      name: 'Illustrator',
      iconPath: require('data/img/illustrator.svg'),
      level: 2.5,
      comment: 'Proficient',
      type: 'visual',
      link: 'https://en.wikipedia.org/wiki/Adobe_Illustrator',
    },
    // tool
    {
      __typename: 'Skills',
      name: 'IntelliJ',
      iconPath: require('data/img/intellij.svg'),
      level: 3,
      comment: 'Proficient',
      type: 'tool',
      link: 'https://en.wikipedia.org/wiki/IntelliJ_IDEA',
    },
    {
      __typename: 'Skills',
      name: 'vim',
      iconPath: require('data/img/neovim.png'),
      level: 3,
      comment: 'Proficient',
      type: 'tool',
      link: 'https://en.wikipedia.org/wiki/Vim_(text_editor)#Neovim',
    },
    {
      __typename: 'Skills',
      name: 'git',
      iconPath: require('data/img/git.svg'),
      level: 4,
      comment: 'Taught at Niksun',
      type: 'tool',
      link: 'https://en.wikipedia.org/wiki/Git'
    },

  ],
};

const Mutation = {
  // https://www.apollographql.com/docs/graphql-tools/resolvers
  changeSelectedNavbarItem(obj, args, context) {
    const { cache } = context;
    cache.writeData({
      data: {
        uiState: {
          __typename: 'UiState',
          selectedItem: args.item
        }
      }
    });
    return null;
  },
};

const Query = {
  uiState: (obj, args, { cache }) => {
    return cache.uiState;
  },
  experiences: (obj, args, { cache }) => {
    return cache.experiences;
  },
  skills: (obj, args, { cache }) => {
    return cache.skills;
  },
};

const typeDefs = `
  type UIState {
    selectedItem: Int
    searchedSkill: String
  }

  type Experience {
    companyName: String
    iconPath: String
    purpose: String
    address: Address
    role: String
    hours: String
    startDate: String
    endDate: String
    skills: [ExperienceSkill]
    accomplishments: [String]
  }

  type Address {
    state: String
    county: String
  }

  type ExperienceSkill {
    name: String
    utilization: Int
  }
  
  type Skill {
    name: String
    iconPath: String
    level: Float
    comment: string
    type: String
  }

  type Query {
    uiState: UIState
    experiences: [Experience]
    skills: [Skill]
  }

  type Mutation {
    changeSelectedNavbarItem(item: String!): String
  }
`;

const client = new ApolloClient({
  clientState: {
    defaults,
    resolvers: {
      Mutation,
      Query,
    },
    typeDefs,
  },
});

export default client;
