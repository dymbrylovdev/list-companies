import React from 'react';
import { useDispatch } from "react-redux";
import { companyActions } from "entities/company/model/companySlice";
import { Button } from "shared/ui";
import { useTranslation } from "react-i18next";
import { getEditCompanies } from "entities/company/selectors/getEditCompany";
import { ICompany } from "../types/company";
import cls from './CompanyItem.module.scss';

interface IProps {
  company: ICompany;
  select: boolean;
}

const CompanyItem: React.FC<IProps> = ({
  company,
  select,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectCompany = () => {
    if (select) {
      dispatch(companyActions.removeSelectCompany(company));
    } else {
      dispatch(companyActions.addSelectCompany(company));
    }
  };

  const addEditCompany = () => {
    dispatch(companyActions.setEditCompany(company));
  };

  return (
    <tr>
      <td>{company.name}</td>
      <td className={cls.text_address}>{company.address}</td>
      <td className={cls.text_name}>{company.idEmployees?.length || 0}</td>
      <td className={cls.text_name}>
        <Button onClick={addEditCompany}>{t("EDIT")}</Button>
      </td>
      <td><input type="checkbox" checked={select} onChange={selectCompany} /></td>
    </tr>
  );
};
export default React.memo(CompanyItem);
