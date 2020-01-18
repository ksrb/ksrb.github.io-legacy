import typenames from "src/graphql/typenames";
import { Company } from "src/graphql/__generated__";

const companies = {
  pmat: {
    __typename: typenames.Company,
    address: {
      __typename: typenames.Address,
      state: "CA",
      county: "San Diego",
    },
    name: "PMAT Inc.",
    purpose:
      "company focused on developing solutions for the defense sector specializing in web applications providing situational awareness for command and control.",
    logo: null,
  } as Company,
  lanternCredit: {
    __typename: typenames.Company,
    address: {
      __typename: typenames.Address,
      state: "CA",
      county: "Newport Beach",
    },
    name: "Lantern Credit",
    purpose:
      "Startup focused on modernizing the credit scoring industry by creating an application that allows users to modify their credit score in real time.",
    logo: null,
  } as Company,
  tableDesignArt: {
    __typename: typenames.Company,
    address: {
      __typename: typenames.Address,
      state: "CA",
      county: "IRvine",
    },
    name: "Table Design Art",
    purpose:
      "Startup company specializing in creating decorative table banners for special occasion.",
    logo: null,
  } as Company,
  niksun: {
    __typename: typenames.Company,
    address: {
      __typename: typenames.Address,
      state: "NJ",
      county: "Princeton",
    },
    name: "Niksun",
    purpose: "Company focused on providing network analysis software.",
    logo: null,
  } as Company,
};

export default companies as { [key in keyof typeof companies]: Company };
