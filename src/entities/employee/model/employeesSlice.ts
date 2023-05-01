import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployee, IEmployeeSchema } from "../types/employee";

const initialState: IEmployeeSchema = {
  employees: [],
  selectEmployees: [],
  editEmployee: null,
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addAllEmployees: (state, action: PayloadAction<IEmployee[]>) => {
      state.employees = action.payload;
    },
    addEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.employees = [...state.employees, action.payload];
    },
    setEditEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.editEmployee = action.payload;
    },
    cleanEditEmployee: (state) => {
      state.editEmployee = null;
    },
    removeEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.employees = state.employees.filter((employee) => employee.id !== action.payload.id);
    },
    addSelectEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.selectEmployees = [...state.selectEmployees, action.payload];
    },
    removeSelectEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.selectEmployees = state.selectEmployees.filter((employee) => employee.id !== action.payload.id);
    },
    removeSelectsEmployeeById: (state, action: PayloadAction<number[]>) => {
      state.selectEmployees = state.selectEmployees
        .filter((employee) => action.payload.some((id) => id !== employee.id));
    },

  },
});

export const { actions: employeeActions } = employeeSlice;
export const { reducer: employeeReducer } = employeeSlice;
