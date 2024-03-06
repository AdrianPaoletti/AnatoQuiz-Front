import styles from "./CheckBox.module.scss";

export type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

export function CheckBox({ id, label, ...props }: CheckBoxProps) {
  return (
    <div className={styles.checkbox}>
      <input
        className={styles.checkbox__input}
        type="checkbox"
        id={id}
        {...props}
      />
      <label className={styles.checkbox__label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
