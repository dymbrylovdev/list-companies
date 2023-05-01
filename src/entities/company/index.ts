import CompanyItem from "./ui/CompanyItem";

export { ICompany } from "./types/company";

export { useRemoveCompany } from "./api/useRemoveCompany";
export { useGetCompanies } from "./api/useGetCompanies";

export { useSelectAllCompany } from "./hooks/useSelectAllCompany";

export { getCompanies } from "./selectors/getCompanies";
export { getSelectCompanies } from "./selectors/getSelectCompanies";

export { companyReducer, companyActions, companySlice } from "./model/companySlice";
export { CompanyItem };
