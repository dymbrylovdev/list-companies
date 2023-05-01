import { FC, useState } from 'react';
import { ClassNames } from 'shared/lib/halpers/classNames';
import { ThemeButton } from 'features/theme';
import { Button } from 'shared/ui';
import { LangSwitcher } from 'features/lang-switcher';
import { useTranslation } from 'react-i18next';
import { CompaniesList } from "features/companies-list";
import cls from './Sidebar.module.scss';

interface IProps {
  className?: any;
}

export const Sidebar: FC<IProps> = ({ className }) => {
  const { t } = useTranslation();
  const [state, setState] = useState(false);

  const toggleSidebar = () => {
    setState((prevState) => !prevState);
  };

  return (
    <div className={ClassNames(cls.sidebar, { [cls.visible]: state }, [className])}>
      <CompaniesList />

      <div className={cls.container}>
        <Button onClick={toggleSidebar} className={cls.toggle_sidebar}>
          {state ? "== >" : "< =="}
        </Button>
        <div className={cls.theme}>
          <ThemeButton />
          <LangSwitcher />
        </div>
      </div>
    </div>
  );
};
