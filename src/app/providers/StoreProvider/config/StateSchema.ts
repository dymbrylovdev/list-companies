import { ICompanySchema } from "entities/company/types/company";
import { IEmployeeSchema } from "entities/employee/types/employee";

export interface StateSchema {
  company: ICompanySchema;
  employee: IEmployeeSchema;
}
