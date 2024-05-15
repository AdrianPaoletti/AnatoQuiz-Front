import React from "react";

import { classNames } from "../shared/classNames";

import { Backdrop } from "./Backdrop";

import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export function Modal({
  children,
  isOpen,
  ...props
}: ModalProps & React.StyleHTMLAttributes<HTMLDivElement>) {
  return (
    <Backdrop isOpen={isOpen}>
      <div
        className={classNames(styles.modal, {
          [styles[`modal--open`]]: isOpen,
          [styles[`modal--close`]]: !isOpen,
        })}
        {...props}
      >
        {children}
      </div>
    </Backdrop>
  );
}
