import { useState } from "react";
import { useDispatch } from "react-redux";
import { IEmployee } from "entities/employee/types/employee";
import { employeeActions } from "entities/employee";

export const useSelectAllEmployee = () : [
  ((filterEmployees: IEmployee[], selectEmployees: IEmployee[]) => void), boolean,
] => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetch = (filterEmployees: IEmployee[], selectEmployees: IEmployee[]) => {
    if (filterEmployees.length) {
      setLoading(true);
      if (selectEmployees.length < filterEmployees.length) {
        filterEmployees.forEach((employee) => {
          dispatch(employeeActions.addSelectEmployee(employee));
        });
      } else {
        filterEmployees.forEach((employee) => {
          dispatch(employeeActions.removeSelectEmployee(employee));
        });
      }
      setLoading(false);
    }
  };

  return [fetch, loading];
};
