import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { ICompanySchema } from "../types/company";

export const getEditCompanies = createSelector(
  (state: StateSchema) => state.company,
  (company: ICompanySchema) => company.editCompany,
);
