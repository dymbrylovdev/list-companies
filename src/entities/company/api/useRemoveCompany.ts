import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_LOCALSTORAGE_KEY } from "shared/lib";
import { employeeActions } from "entities/employee";
import { companyActions } from "../model/companySlice";
import { ICompany } from "../types/company";

export const useRemoveCompany = (companies: ICompany[]) : [(() => Promise<void>), boolean] => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetch = useCallback(
    async () => {
      if (companies.length) {
        setLoading(true);
        setTimeout(() => {
          const storeCompanies: ICompany[] = JSON.parse(localStorage.getItem(COMPANY_LOCALSTORAGE_KEY));

          const filterCompanies: ICompany[] = storeCompanies
            .filter((company) => !companies.some((selectCompany) => selectCompany.id === company.id));

          localStorage.setItem(COMPANY_LOCALSTORAGE_KEY, JSON.stringify(filterCompanies));

          companies.forEach((companySelect) => {
            dispatch(companyActions.removeSelectCompany(companySelect));
            dispatch(companyActions.removeCompany(companySelect));
          });

          setLoading(false);
        }, 1000);
      }
    },
    [dispatch, companies],
  );

  return [fetch, loading];
};
