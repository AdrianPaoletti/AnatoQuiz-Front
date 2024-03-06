import { classNames } from "../shared/classNames";

import { Icon } from "./Icon";

import colors from "../docs/colors.module.scss";
import styles from "./Alert.module.scss";

export interface AlertProps {
  text: string;
  type: "error" | "success";
  close: () => void;
}

export function Alert({ text, type, close }: AlertProps) {
  return (
    <div className={classNames(styles["alert"], styles[`alert--${type}`])}>
      <p className={styles.alert__text}>{text}</p>
      <Icon
        icon={"cross"}
        style={{ color: colors.error, cursor: "pointer", minWidth: "1.25rem" }}
        onClick={() => close()}
      />
    </div>
  );
}
