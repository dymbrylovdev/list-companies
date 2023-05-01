import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { companies } from "shared/lib/constants/data";
import { COMPANY_LOCALSTORAGE_KEY } from "shared/lib";
import { companyActions } from "../model/companySlice";

export const useGetCompanies = () : [(() => Promise<void>), boolean] => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const fetch = useCallback(
    async () => {
      setLoading(true);
      setTimeout(() => {
        const storeCompanies = JSON.parse(localStorage.getItem(COMPANY_LOCALSTORAGE_KEY));
        if (storeCompanies) {
          dispatch(companyActions.addAllCompanies(storeCompanies));
        } else {
          localStorage.setItem(COMPANY_LOCALSTORAGE_KEY, JSON.stringify(companies));
          dispatch(companyActions.addAllCompanies(companies));
        }
        setLoading(false);
      }, 2000);
    },
    [dispatch],
  );

  return [fetch, loading];
};
