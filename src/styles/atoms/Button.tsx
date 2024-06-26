import Link from "next/link";
import React from "react";

import { classNames } from "../shared/classNames";

import { Icon, Icons } from "./Icon";
import { Loading } from "./Loading";

import spacing from "../docs/spacing.module.scss";
import styles from "./Button.module.scss";

type HtmlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export interface ButtonProps {
  mode?: "primary" | "secondary" | "tertiary" | "inverted";
  size?: "large" | "small";
  fullWidth?: boolean;
  icon?: Icons;
  children: string;
  bottom?: boolean;
  isLoading?: boolean;
}

interface Overload {
  (props: HtmlButtonProps & ButtonProps): JSX.Element;
  (props: AnchorProps & ButtonProps): JSX.Element;
}

const hasHref = (props: HtmlButtonProps | AnchorProps): props is AnchorProps =>
  "href" in props;

export const Button: Overload = ({
  mode = "primary",
  size = "large",
  fullWidth = false,
  icon,
  bottom = false,
  isLoading = false,
  ...props
}) => {
  const componentProps = {
    className: classNames(
      styles["btn"],
      styles[`btn--${mode}`],
      styles[`btn--${size}`],
      { [styles[`btn--full-width`]]: fullWidth },
      { [styles[`btn--bottom`]]: bottom },
      { [styles[`btn--loading`]]: true },
    ),
    ...props,
  };

  if (hasHref(componentProps)) {
    return (
      <Link {...componentProps}>
        <div className={styles.btn__container}>
          {icon && <Icon icon={icon} style={{ paddingRight: spacing.tiny }} />}
          {props.children}
          {isLoading && <Loading className={styles["btn--loading-element"]} />}
        </div>
      </Link>
    );
  }

  return (
    <button {...componentProps}>
      {icon && <Icon icon={icon} style={{ paddingRight: spacing.tiny }} />}
      <div className={styles.btn__container}>
        {props.children}
        {isLoading && <Loading className={styles["btn--loading-element"]} />}
      </div>
    </button>
  );
};
