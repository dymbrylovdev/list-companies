import React, { FC } from 'react';
import { ClassNames } from 'shared/lib/halpers/classNames';
import { EmployeesList } from "features/employees-list";
import { Sidebar } from "widgetes/sidebar";
import cls from "./MainPage.module.scss";

interface IProps {
  className?: any;
}

const MainPage: FC<IProps> = ({ className }) => (
  <>
    <Sidebar />
    <div className="page-wrapper">
      <div className={ClassNames(cls.container, {}, [className])}>
        <EmployeesList />
      </div>
    </div>
  </>
);

export default MainPage;
