import typenames from "src/graphql/typenames";
import { Company } from "src/graphql/__generated__";
import { RequiredBy } from "../../types";

let id = 0;
function createCompany(
  company: RequiredBy<Company, "address" | "name" | "purpose">,
): Company {
  return {
    __typename: typenames.Company,
    id: (id++).toString(),
    logo: "",
    ...company,
  };
}

const companies = {
  personal: createCompany({
    address: {
      __typename: typenames.Address,
      state: "CA",
      county: "Irvine",
    },
    name: "Personal",
    purpose: "",
  }),
  pmat: createCompany({
    address: {
      __typename: typenames.Address,
      state: "CA",
      county: "San Diego",
    },
    name: "PMAT Inc.",
    purpose:
      "Company focused on developing solutions for the defense sector specializing in web applications providing situational awareness for command and control.",
  }),
  lanternCredit: createCompany({
    __typename: typenames.Company,
    address: {
      __typename: typenames.Address,
      state: "CA",
      county: "Newport Beach",
    },
    name: "Lantern Credit",
    purpose:
      "Startup focused on modernizing the credit scoring industry by creating an application that allows users to modify their credit score in real time.",
  }),
  tableDesignArt: createCompany({
    __typename: typenames.Company,
    address: {
      __typename: typenames.Address,
      state: "CA",
      county: "Irvine",
    },
    name: "Table Design Art",
    purpose:
      "Startup company specializing in creating decorative table banners for special occasion.",
  }),
  niksun: createCompany({
    __typename: typenames.Company,
    address: {
      __typename: typenames.Address,
      state: "NJ",
      county: "Princeton",
    },
    name: "Niksun",
    purpose: "Company focused on providing network analysis software.",
  }),
  scholarsForCharity: createCompany({
    __typename: typenames.Company,
    address: {
      __typename: typenames.Address,
      state: "NJ",
      county: "Princeton",
    },
    name: "Scholars for Charity",
    purpose: "Nonprofit organization that designs websites for charity.",
  }),
};

export default companies as { [key in keyof typeof companies]: Company };
