import { Company } from "src/graphql/__generated__";
import typenames from "src/graphql/typenames";
import { RequiredByElsePartial } from "src/types";

let id = 0;
function createCompany(
  company: RequiredByElsePartial<Company, "address" | "name">,
): Company {
  return {
    __typename: typenames.Company,
    id: (id++).toString(),
    logo: "",
    purpose: "",
    url: "",
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
    url: "https://pmatinc.com",
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
    url: "https://lanterncredit.com",
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
    url: "https://www.niksun.com",
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
