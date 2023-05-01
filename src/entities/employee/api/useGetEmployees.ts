import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { employees } from "shared/lib/constants/data";
import { EMPLOYEES_LOCALSTORAGE_KEY } from "shared/lib/constants/localstorage";
import { employeeActions } from "../model/employeesSlice";

export const useGetEmployees = () : [(() => Promise<void>), boolean] => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const fetch = useCallback(
    async () => {
      setLoading(true);
      setTimeout(() => {
        const storeEmployees = JSON.parse(localStorage.getItem(EMPLOYEES_LOCALSTORAGE_KEY));
        if (storeEmployees) {
          dispatch(employeeActions.addAllEmployees(storeEmployees));
        } else {
          localStorage.setItem(EMPLOYEES_LOCALSTORAGE_KEY, JSON.stringify(employees));
          dispatch(employeeActions.addAllEmployees(employees));
        }
        setLoading(false);
      }, 2000);
    },
    [dispatch],
  );

  return [fetch, loading];
};
