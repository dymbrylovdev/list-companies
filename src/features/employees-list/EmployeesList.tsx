import React, {
  FormEvent,
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { LoaderPage } from "pages/loader";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import EmployeeItem from "entities/employee/ui/EmployeeItem";
import {
  getEmployees,
  getSelectEmployees,
  useGetEmployees,
  useRemoveEmployee,
  useSelectAllEmployee,
} from "entities/employee";
import {
  getCompanies, getSelectCompanies, ICompany,
} from "entities/company";
import { Button, Modal } from "shared/ui";
import { useAddEmployee } from "entities/employee/api/useAddEmployee";
import { IEmployee } from "entities/employee/types/employee";
import { getEditEmployees } from "entities/employee/selectors/getEditEmployees";
import cls from './EmployeesList.module.scss';

interface FormValues extends IEmployee {
  companyId: string | number;
}

type FormDataType = {
  firstName: string;
  lastName: string;
  position: string;
};

const initialFormData: FormDataType = {
  firstName: "",
  lastName: "",
  position: "",
};
const EmployeesList = () => {
  const { t } = useTranslation();
  const employees = useSelector(getEmployees);
  const companies = useSelector(getCompanies);
  const selectCompanies = useSelector(getSelectCompanies);
  const selectEmployees = useSelector(getSelectEmployees);
  const editEmployees = useSelector(getEditEmployees);
  const [isVisible, setVisible] = useState<boolean>(true);
  const formRef = useRef();
  const [formData, setFormData] = useState<Partial<FormDataType>>(initialFormData);
  const [companyId, setCompanyId] = useState<number>();
  const [errors, setErrors] = useState<Partial<FormValues>>({});

  const [fetchEmployees, loadingEmployees] = useGetEmployees();
  const [fetchRemove, loadingRemove] = useRemoveEmployee();
  const [selectAllEmployee] = useSelectAllEmployee();
  const [fetchAddEmployee, loadingAddEmployee] = useAddEmployee();

  const filterEmployees = useMemo(
    () => employees
      .filter((employee) => selectCompanies
        .some((company) => company.idEmployees.includes(employee.id))),
    [selectCompanies, employees, companies],
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (editEmployees) {
      const companyEmployee = companies.find((company) => {
        if (company.idEmployees.some((id) => editEmployees.id === id)) {
          return true;
        }
        return false;
      });
      setVisible(false);
      setCompanyId(companyEmployee.id);
      setFormData({
        firstName: editEmployees.firstName,
        lastName: editEmployees.lastName,
        position: editEmployees.position,
      });
    }
  }, [editEmployees]);

  const handleVisible = useCallback(() => {
    setVisible((prevState) => !prevState);
  }, [isVisible]);

  const handleRemoveEmployee = useCallback(() => {
    fetchRemove(selectEmployees);
  }, [selectEmployees]);

  const handleSelectAll = useCallback(() => {
    selectAllEmployee(filterEmployees, selectEmployees);
  }, [filterEmployees, selectEmployees]);

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.firstName) {
      errors.firstName = "Name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!values.position) {
      errors.position = "Position is required";
    }
    if (!values.companyId) {
      errors.companyId = "Company is required";
    }
    return errors;
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (form) {
      const employee: IEmployee = {
        id: editEmployees ? editEmployees.id
          : employees[employees.length - 1].id + 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        position: formData.position,
      };
      const validationErrors = validate({ ...employee, companyId });
      if (Object.keys(validationErrors).length === 0) {
        setVisible(true);
        if (editEmployees) {
          fetchRemove([editEmployees]);
        }
        fetchAddEmployee(employee, companyId);
        setErrors({});
      } else {
        setErrors(validationErrors);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  // const handleSelectCompany = useCallback((event: any) => {
  //   const company = companies.find((companyElem) => companyElem.id === +event.target.value);
  //   setSelectCompany(company);
  // }, [companies]);
  const handleSelectCompany = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCompanyId(Number(event.target.value));
    setErrors({ ...errors, companyId: undefined });
  };
  if (loadingEmployees || loadingRemove || loadingAddEmployee) {
    return <LoaderPage />;
  }

  return (
    <div className={cls.container}>
      <div className={cls.wrap_buttons}>
        <Button onClick={handleRemoveEmployee}>{t("REMOVE")}</Button>
        <Button onClick={handleVisible}>{t("ADD")}</Button>
        <Button onClick={handleSelectAll}>{t("SELECT_ALL")}</Button>
      </div>
      <table className={cls.table}>
        <thead>
          <tr>
            <th>{t("NAME")}</th>
            <th>{t("LAST_NAME")}</th>
            <th>{t("POSITION")}</th>
            <th>{t("EDIT")}</th>
            <th>{t("CHOOSE")}</th>
          </tr>
        </thead>
        <tbody>
          { filterEmployees?.map((employee) => (
            <EmployeeItem
              key={employee.id}
              employee={employee}
              select={selectEmployees.some((item) => item.id === employee.id)}
            />
          ))}
        </tbody>
      </table>
      <Modal
        isVisible={isVisible}
        handleVisible={handleVisible}
      >
        <form ref={formRef} className={cls.form} onSubmit={handleSubmit}>
          <label>
            {t("COMPANY")}
            <select className={cls.form_input} onChange={handleSelectCompany} value={companyId || ""}>
              <option value="" disabled>
                {t("SELECT_COMPANY")}
              </option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            {errors.companyId && <span className={cls.form_error}>{errors.companyId}</span>}
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            className={cls.form_input}
            placeholder={`${t("NAME")}`}
            onChange={handleInputChange}
          />
          {errors.firstName && <span className={cls.form_error}>{errors.firstName}</span>}
          <input
            className={cls.form_input}
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder={`${t("LAST_NAME")}`}
            onChange={handleInputChange}
          />
          {errors.lastName && <span className={cls.form_error}>{errors.lastName}</span>}
          <input
            type="text"
            name="position"
            value={formData.position}
            className={cls.form_input}
            placeholder={`${t("POSITION")}`}
            onChange={handleInputChange}
          />
          {errors.position && <span className={cls.form_error}>{errors.position}</span>}
          {editEmployees ? (
            <button type="submit">
              {t("EDIT")}
            </button>
          ) : (
            <button type="submit">
              {t("ADD")}
            </button>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default EmployeesList;
