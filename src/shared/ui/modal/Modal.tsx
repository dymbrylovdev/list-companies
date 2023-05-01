import React, { useEffect } from 'react';
import { ClassNames } from "shared/lib";
import cls from './Modal.module.scss';

interface IProps {
  children: React.ReactNode;
  isVisible: boolean;
  handleVisible: () => void;
}

export const Modal: React.FC<IProps> = ({
  children,
  isVisible,
  handleVisible,
}) => (
  <div
    className={ClassNames(cls.container, { [cls.visible]: isVisible })}
    onClick={handleVisible}
  >
    <div className={cls.content} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);
