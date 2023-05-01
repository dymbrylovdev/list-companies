import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { IEmployeeSchema } from "../types/employee";

export const getEmployees = createSelector(
  (state: StateSchema) => state.employee,
  (company: IEmployeeSchema) => company.employees,
);
