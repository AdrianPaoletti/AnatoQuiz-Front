"use client";

import { useState } from "react";

import { classNames } from "../shared/classNames";

import { Icon } from "./Icon";

import colors from "../docs/colors.module.scss";
import styles from "./Alert.module.scss";

export interface AlertProps {
  text: string;
  type: "error" | "success";
  onClose: () => void;
}

export function Alert({ text, type, onClose }: AlertProps) {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  function handleClick(): void {
    close();
    setFirstLoad(false);
  }

  return (
    <div
      className={classNames(styles["alert"], styles[`alert--${type}`], {
        [styles[`alert--open`]]: !!text.length,
        [styles[`alert--close`]]: !!!text.length && !firstLoad,
      })}
    >
      <p className={styles.alert__text}>{text}</p>
      <Icon
        icon={"cross"}
        style={{ color: colors.error, cursor: "pointer", minWidth: "1.25rem" }}
        onClick={() => handleClick()}
      />
    </div>
  );
}
