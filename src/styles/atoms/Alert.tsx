"use client";

import { useCallback, useEffect, useState } from "react";

import { classNames } from "../shared/classNames";

import { Icon } from "./Icon";

import colors from "../docs/colors.module.scss";
import styles from "./Alert.module.scss";

export interface AlertProps {
  text: string;
  type: "error" | "success";
  hideDuration?: number;
  onClose: () => void;
}

export function Alert({
  text,
  type,
  onClose,
  hideDuration = 5000,
}: AlertProps) {
  const isOpen = !!text.length;
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [timeOutInstance, setTimeOutInstance] = useState<NodeJS.Timeout | null>(
    null,
  );
  const handleClick = useCallback(
    (timeOutInstance: NodeJS.Timeout | null) => {
      onClose();
      setFirstLoad(false);
      timeOutInstance && clearTimeout(timeOutInstance);
    },
    [onClose],
  );

  useEffect(() => {
    if (!timeOutInstance && isOpen) {
      const timeOut = setTimeout(() => {
        handleClick(timeOutInstance);
        setTimeOutInstance(null);
      }, hideDuration);

      setTimeOutInstance(timeOut);
    }
  }, [handleClick, hideDuration, isOpen, timeOutInstance]);

  return (
    <div
      className={classNames(styles["alert"], styles[`alert--${type}`], {
        [styles[`alert--open`]]: isOpen,
        [styles[`alert--close`]]: !isOpen && !firstLoad,
      })}
    >
      <p className={styles.alert__text}>{text}</p>
      <Icon
        icon={"cross"}
        style={{ color: colors.error, cursor: "pointer", minWidth: "1.25rem" }}
        onClick={() => handleClick(timeOutInstance)}
      />
    </div>
  );
}
