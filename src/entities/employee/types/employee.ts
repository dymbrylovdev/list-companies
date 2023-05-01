export interface IEmployee {
  id :number;
  firstName: string;
  lastName: string;
  position: string;
}

export interface IEmployeeSchema {
  employees?: IEmployee[];
  selectEmployees?: IEmployee[];
  editEmployee: IEmployee | null;
}
