import * as icons from "../icons/icons";

import styles from "./Icon.module.scss";

type IconProps = React.HTMLAttributes<HTMLSpanElement> & {
  icon: Icons;
};
export type Icons = keyof typeof icons;

export function Icon({ icon, ...props }: IconProps) {
  return (
    <span className={styles.icon} {...props}>
      {icons[icon]()}
    </span>
  );
}
