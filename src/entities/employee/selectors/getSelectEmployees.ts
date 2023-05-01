import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { IEmployeeSchema } from "../types/employee";

export const getSelectEmployees = createSelector(
  (state: StateSchema) => state.employee,
  (employee: IEmployeeSchema) => employee.selectEmployees,
);
