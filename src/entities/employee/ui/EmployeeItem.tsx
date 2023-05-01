import React from 'react';
import { useDispatch } from "react-redux";
import { Button } from "shared/ui";
import { companyActions } from "entities/company";
import { useTranslation } from "react-i18next";
import { employeeActions } from "../model/employeesSlice";
import { IEmployee } from "../types/employee";
import cls from './EmployeeItem.module.scss';

interface IProps {
  employee: IEmployee;
  select: boolean;
}

const EmployeeItem: React.FC<IProps> = ({
  employee,
  select,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const checkCompany = () => {
    if (select) {
      dispatch(employeeActions.removeSelectEmployee(employee));
    } else {
      dispatch(employeeActions.addSelectEmployee(employee));
    }
  };

  const addEditEmployee = () => {
    dispatch(employeeActions.setEditEmployee(employee));
  };

  return (
    <tr>
      <td>{employee.firstName}</td>
      <td className={cls.text_address}>{employee.lastName}</td>
      <td className={cls.text_name}>{employee.position}</td>
      <td className={cls.text_name}>
        <Button onClick={addEditEmployee}>{t("EDIT")}</Button>
      </td>
      <td><input type="checkbox" checked={select} onChange={checkCompany} /></td>
    </tr>
  );
};
export default React.memo(EmployeeItem);
