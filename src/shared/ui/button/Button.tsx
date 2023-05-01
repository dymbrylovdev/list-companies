import { type FC } from 'react';
import { ClassNames } from 'shared/lib/halpers/classNames';
import cls from "./Button.module.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: any
}

export const Button: FC<IProps> = ({
  className,
  children,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={ClassNames(cls.container, {}, [className])}
  >
    {children}
  </button>
);
