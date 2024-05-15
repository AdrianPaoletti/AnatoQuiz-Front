"use client";

import { useEffect, useState } from "react";

import { classNames } from "../shared/classNames";

import styles from "./Backdrop.module.scss";

interface BackdropProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export function Backdrop({ children, isOpen = false }: BackdropProps) {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setFirstLoad(false);
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={classNames(styles.backdrop, {
          [styles[`backdrop--open`]]: isOpen,
          [styles[`backdrop--close`]]: !isOpen && !firstLoad,
        })}
      />
      {children}
    </>
  );
}
