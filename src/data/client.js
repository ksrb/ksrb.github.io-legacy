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
      startDate: new Date(2015, 5).toString(),
      endDate: new Date(2018, 1).toString(),
      skills: [
        {
          __typename: 'Skill',
          name: 'JavaScript (React)',
          type: 'programming',
          utilization: 60,
        },
        {
          __typename: 'Skill',
          name: 'Golang',
          type: 'programming',
          utilization: 25,
        },
        {
          __typename: 'Skill',
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
      endDate: new Date(2015, 5).toString(),
      skills: [
        {
          __typename: 'Skill',
          name: 'Liquid',
          type: 'visual',
          utilization: 40,
        },
        {
          __typename: 'Skill',
          name: 'css',
          type: 'visual',
          utilization: 30,
        },
        {
          __typename: 'Skill',
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
      startDate: new Date(2013, 8).toString(),
      endDate: new Date(2015, 2).toString(),
      skills: [
        {
          __typename: 'Skill',
          name: 'GWT',
          type: 'programming',
          utilization: 70,
        },
        {
          __typename: 'Skill',
          name: 'JavaScript',
          type: 'programming',
          utilization: 20,
        },
        {
          __typename: 'Skill',
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
};

const Mutation = {
  // https://www.apollographql.com/docs/graphql-tools/resolvers
  changeSelectedNavbarItem: (obj, args, context) => {
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
  }
};

const Query = {
  uiState: (obj, args, { cache }) => {
    return cache.uiState;
  },
  experiences: (obj, args, { cache }) => {
    return cache.experiences;
  },
};

const typeDefs = `
  type UIState {
    id: Int!
    selectedItem: Int
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
    skills: [Skill]
    accomplishments: [String]
  }

  type Address {
    state: String
    county: String
  }

  type Skill {
    name: String
    utilization: Int
  }

  type Query {
    uiState: UIState
    experiences: [Experience]
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
