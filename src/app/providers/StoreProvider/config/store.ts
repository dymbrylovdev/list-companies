import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { companyReducer, companySlice } from 'entities/company';
import { employeeReducer, employeeSlice } from "entities/employee";
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    [companySlice.name]: companyReducer,
    [employeeSlice.name]: employeeReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
}
