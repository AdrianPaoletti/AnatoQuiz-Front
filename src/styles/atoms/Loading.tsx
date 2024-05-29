import { classNames } from "../shared/classNames";

import styles from "./Loading.module.scss";

export type ILoadingProps = React.HTMLAttributes<HTMLSpanElement>;

export function Loading({ ...props }: ILoadingProps) {
  return (
    <span {...props} className={classNames(styles.loader, props.className)} />
  );
}
