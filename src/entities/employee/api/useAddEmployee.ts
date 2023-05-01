import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_LOCALSTORAGE_KEY, EMPLOYEES_LOCALSTORAGE_KEY } from "shared/lib/constants/localstorage";
import { companyActions, ICompany } from "entities/company";
import { useRemoveEmployee } from "entities/employee";
import { IEmployee } from "../types/employee";
import { employeeActions } from "../model/employeesSlice";

export const useAddEmployee = () : [((employee: IEmployee, companyId: number) => Promise<void>), boolean] => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const fetch = useCallback(
    async (employee: IEmployee, companyId: number) => {
      setLoading(true);

      setTimeout(() => {
        const storeEmployees = JSON.parse(localStorage.getItem(EMPLOYEES_LOCALSTORAGE_KEY));
        const storeCompanies = JSON.parse(localStorage.getItem(COMPANY_LOCALSTORAGE_KEY));

        const filterCompaniesStore = storeCompanies.map((companyStore: ICompany) => {
          if (companyId === companyStore.id) {
            return { ...companyStore, idEmployees: [...companyStore.idEmployees, employee.id] };
          }
          return companyStore;
        });

        localStorage.setItem(EMPLOYEES_LOCALSTORAGE_KEY, JSON.stringify([...storeEmployees, employee]));
        localStorage.setItem(COMPANY_LOCALSTORAGE_KEY, JSON.stringify(filterCompaniesStore));

        dispatch(employeeActions.addEmployee(employee));
        dispatch(companyActions.addCountEmployee({ companyId, idEmployee: employee.id }));

        setLoading(false);
      }, 1000);
    },
    [dispatch],
  );

  return [fetch, loading];
};
