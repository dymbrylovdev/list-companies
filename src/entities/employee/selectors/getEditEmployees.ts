import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { IEmployeeSchema } from "../types/employee";

export const getEditEmployees = createSelector(
  (state: StateSchema) => state.employee,
  (company: IEmployeeSchema) => company.editEmployee,
);
