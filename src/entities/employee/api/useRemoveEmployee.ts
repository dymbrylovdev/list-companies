import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_LOCALSTORAGE_KEY, EMPLOYEES_LOCALSTORAGE_KEY } from "shared/lib/constants/localstorage";
import { companyActions, ICompany } from "entities/company";
import { IEmployee } from "../types/employee";
import { employeeActions } from "../model/employeesSlice";

export const useRemoveEmployee = () : [((employees: IEmployee[]) => Promise<void>), boolean] => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetch = useCallback(
    async (employees: IEmployee[]) => {
      if (employees.length) {
        setLoading(true);
        setTimeout(() => {
          const storeEmployees: IEmployee[] = JSON.parse(localStorage.getItem(EMPLOYEES_LOCALSTORAGE_KEY));
          const storeCompanies: ICompany[] = JSON.parse(localStorage.getItem(COMPANY_LOCALSTORAGE_KEY));

          const filterEmployees = storeEmployees
            .filter((storeEmployee) => employees
              .some((item) => item.id !== storeEmployee.id));

          const filterCompanies = storeCompanies
            .map((company) => ({
              ...company,
              idEmployees: company.idEmployees
                .filter((id) => employees.some((item) => item.id !== id)),
            }));

          employees.forEach((employeeSelect) => {
            dispatch(employeeActions.removeEmployee(employeeSelect));
            dispatch(companyActions.removeCountEmployee(employeeSelect.id));
          });

          localStorage.setItem(COMPANY_LOCALSTORAGE_KEY, JSON.stringify(filterCompanies));
          localStorage.setItem(EMPLOYEES_LOCALSTORAGE_KEY, JSON.stringify(filterEmployees));
          setLoading(false);
        }, 500);
      }
    },
    [dispatch],
  );

  return [fetch, loading];
};
