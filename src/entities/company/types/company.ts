export interface ICompany {
  id :number;
  name: string;
  address: string;
  idEmployees: number[];
}

export interface ICompanySchema {
  companies?: ICompany[];
  selectCompanies?: ICompany[];
  editCompany: ICompany | null;
}
