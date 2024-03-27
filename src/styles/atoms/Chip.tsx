import { classNames } from "@anatoquiz/src/styles/shared/classNames";

import styles from "./Chip.module.scss";

interface IChipProps {
  value: string;
  color: "orange" | "blue" | "orange-light" | "pink";
  isSelected: boolean;
  click: () => void;
}
export function Chip({ value, color, isSelected, click }: IChipProps) {
  return (
    <button
      className={classNames(styles["chip"], styles[`chip--${color}`], {
        [styles[`chip--selected`]]: isSelected,
      })}
      type="button"
      onClick={click}
    >
      {value}
    </button>
  );
}
