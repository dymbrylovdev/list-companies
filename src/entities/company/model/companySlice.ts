import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompany, ICompanySchema } from "../types/company";

const initialState: ICompanySchema = {
  companies: [],
  selectCompanies: [],
  editCompany: null,
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addAllCompanies: (state, action: PayloadAction<ICompany[]>) => {
      state.companies = action.payload;
    },
    addCompany: (state, action: PayloadAction<ICompany>) => {
      state.companies = [action.payload, ...state.companies];
    },
    editCompany: (state, action: PayloadAction<ICompany>) => {
      state.companies = state.companies.map((company) => {
        if (company.id === action.payload.id) {
          return action.payload;
        }
        return company;
      });
    },
    removeCompany: (state, action: PayloadAction<ICompany>) => {
      state.companies = state.companies.filter((company) => company.id !== action.payload.id);
    },
    addSelectCompany: (state, action: PayloadAction<ICompany>) => {
      state.selectCompanies = [...state.selectCompanies, action.payload];
    },
    removeSelectCompany: (state, action: PayloadAction<ICompany>) => {
      state.selectCompanies = state.selectCompanies.filter((company) => company.id !== action.payload.id);
    },
    removeCountEmployee: (state, action: PayloadAction<number>) => {
      state.companies = state.companies
        .map((company) => ({ ...company, idEmployees: company.idEmployees.filter((id) => id !== action.payload) }));
      state.selectCompanies = state.selectCompanies
        .map((company) => ({ ...company, idEmployees: company.idEmployees.filter((id) => id !== action.payload) }));
    },
    addCountEmployee: (state, action: PayloadAction<{ companyId:number, idEmployee: number }>) => {
      state.companies = state.companies
        .map((company) => {
          if (action.payload.companyId === company.id) {
            return { ...company, idEmployees: [...company.idEmployees, action.payload.idEmployee] };
          }
          return company;
        });
      state.selectCompanies = state.selectCompanies
        .map((company) => {
          if (action.payload.companyId === company.id) {
            return { ...company, idEmployees: [...company.idEmployees, action.payload.idEmployee] };
          }
          return company;
        });
    },
    setEditCompany: (state, action: PayloadAction<ICompany>) => {
      state.editCompany = action.payload;
    },
    cleanEditCompany: (state) => {
      state.editCompany = null;
    },
  },
});

export const { actions: companyActions } = companySlice;
export const { reducer: companyReducer } = companySlice;
