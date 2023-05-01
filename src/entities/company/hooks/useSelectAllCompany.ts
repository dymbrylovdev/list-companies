import { useState } from "react";
import { useDispatch } from "react-redux";
import { companyActions, ICompany } from "entities/company";

export const useSelectAllCompany = () : [
  ((companies: ICompany[], selectCompanies: ICompany[]) => void), boolean,
] => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetch = (companies: ICompany[], selectCompanies: ICompany[]) => {
    if (companies.length) {
      setLoading(true);
      if (selectCompanies.length < companies.length) {
        companies.forEach((company) => {
          dispatch(companyActions.addSelectCompany(company));
        });
      } else {
        companies.forEach((company) => {
          dispatch(companyActions.removeSelectCompany(company));
        });
      }
      setLoading(false);
    }
  };

  return [fetch, loading];
};
