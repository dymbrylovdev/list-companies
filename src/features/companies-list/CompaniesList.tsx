import React, {
  FormEvent,
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  companyActions,
  CompanyItem,
  getCompanies,
  getSelectCompanies,
  ICompany,
  useGetCompanies,
  useSelectAllCompany,
  useRemoveCompany,
} from "entities/company";
import { LoaderPage } from "pages/loader";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "shared/ui";
import { COMPANY_LOCALSTORAGE_KEY } from "shared/lib";
import { getEditCompanies } from "entities/company/selectors/getEditCompany";
import cls from './CompaniesList.module.scss';

const CompaniesList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fetch, loading] = useGetCompanies();
  const companies = useSelector(getCompanies);
  const selectCompanies = useSelector(getSelectCompanies);
  const editCompany = useSelector(getEditCompanies);
  const [fetchRemove, loadingRemove] = useRemoveCompany(selectCompanies);
  const [isVisible, setVisible] = useState<boolean>(true);
  const formRef = useRef();
  const [errors, setErrors] = useState<Partial<ICompany>>({});
  const [formName, setFormName] = useState<string>("");
  const [formAddress, setFormAddress] = useState<string>("");

  const [selectAllCompany] = useSelectAllCompany();

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (editCompany) {
      setVisible(false);
      setFormName(editCompany.name);
      setFormAddress(editCompany.address);
    }
  }, [editCompany]);

  const validate = (values: ICompany) => {
    const errors: Partial<ICompany> = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.address) {
      errors.address = "Last name is required";
    }
    return errors;
  };

  const cleanForm = () => {
    setFormName("");
    setFormAddress("");
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    const storeCompanies:ICompany[] = JSON.parse(localStorage.getItem(COMPANY_LOCALSTORAGE_KEY));

    if (form) {
      if (editCompany) {
        const formEditCompany: ICompany = {
          id: editCompany.id,
          name: formName,
          address: formAddress,
          idEmployees: editCompany.idEmployees,
        };
        const validationErrors = validate(formEditCompany);
        if (Object.keys(validationErrors).length === 0) {
          setVisible(true);
          localStorage.setItem(COMPANY_LOCALSTORAGE_KEY, JSON.stringify(storeCompanies.map((company) => {
            if (company.id === formEditCompany.id) {
              return formEditCompany;
            }
            return company;
          })));
          dispatch(companyActions.editCompany(formEditCompany));
          dispatch(companyActions.cleanEditCompany());
          setErrors({});
        } else {
          setErrors(validationErrors);
        }
      } else {
        const formData = new FormData(form);
        const lastId = companies[companies.length - 1]?.id || 1;
        const company: ICompany = {
          id: lastId,
          name: formData.get("name") as string,
          address: formData.get("address") as string,
          idEmployees: [],
        };
        const validationErrors = validate(company);
        if (Object.keys(validationErrors).length === 0) {
          setVisible(true);
          localStorage.setItem(COMPANY_LOCALSTORAGE_KEY, JSON.stringify([company, ...storeCompanies]));
          dispatch(companyActions.addCompany(company));
          setErrors({});
        } else {
          setErrors(validationErrors);
        }
      }
      cleanForm();
    }
  };

  const handleSelectAll = useCallback(() => {
    selectAllCompany(companies, selectCompanies);
  }, [companies, selectCompanies]);

  const handleVisible = useCallback(() => {
    setVisible((prevState) => !prevState);
    dispatch(companyActions.cleanEditCompany());
    cleanForm();
  }, [isVisible]);

  if (loading || loadingRemove) {
    return <LoaderPage />;
  }

  return (
    <>
      <div className={cls.container}>
        <div className={cls.wrap_buttons}>
          <Button onClick={fetchRemove}>{t("REMOVE")}</Button>
          <Button onClick={handleVisible}>{t("ADD")}</Button>
          <Button onClick={handleSelectAll}>{t("SELECT_ALL")}</Button>
        </div>
        <table>
          <thead>
            <tr>
              <th>{t("NAME")}</th>
              <th>{t("ADDRESS")}</th>
              <th>{t("COUNT_EMPLOYEES")}</th>
              <th>{t("EDIT")}</th>
              <th>{t("CHOOSE")}</th>
            </tr>
          </thead>
          <tbody>
            { companies?.map((company) => (
              <CompanyItem
                key={company.id}
                company={company}
                select={selectCompanies.some((item) => item.id === company.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isVisible={isVisible}
        handleVisible={handleVisible}
      >
        <form ref={formRef} className={cls.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className={cls.form_input}
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder={`${t("NAME")}`}
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          <input
            type="text"
            name="address"
            className={cls.form_input}
            value={formAddress}
            onChange={(e) => setFormAddress(e.target.value)}
            placeholder={`${t("ADDRESS")}`}
          />
          {errors.address && <span style={{ color: "red" }}>{errors.address}</span>}
          {editCompany ? (
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
    </>

  );
};

export default React.memo(CompaniesList);
