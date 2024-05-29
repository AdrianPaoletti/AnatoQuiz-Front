import React from "react";

import { classNames } from "../shared/classNames";

import { Backdrop } from "./Backdrop";
import { Icon } from "./Icon";

import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({
  children,
  isOpen,
  onClose,
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
        <Icon
          icon={"cross"}
          className={styles["modal__icon-close"]}
          onClick={onClose}
        />
        {children}
      </div>
    </Backdrop>
  );
}
