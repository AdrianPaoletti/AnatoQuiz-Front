import { Icon } from "../atoms/Icon";
import { classNames } from "../shared/classNames";

import colors from "../docs/colors.module.scss";
import styles from "./Layout.module.scss";

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const brackets = [
    {
      id: "blue",
      color: colors.secondaryBlue,
      position: "left",
      top: "11rem",
      rotate: 90,
    },
    {
      id: "pink",
      color: colors.secondaryPink,
      position: "left",
      top: "27.5rem",
      rotate: 290,
    },
    {
      id: "orange",
      color: colors.secondaryOrange,
      position: "right",
      top: "8rem",
      rotate: 290,
    },
    {
      id: "darkBlue",
      color: colors.secondaryBlueDark,
      position: "right",
      top: "29rem",
      rotate: 130,
    },
  ];

  return (
    <main className={styles.layout}>
      <section className={styles.layout__card}>{children}</section>
      {brackets.map(({ id, color, position, top, rotate }) => (
        <div
          key={id}
          className={classNames(
            styles.layout__bracket,
            styles[`layout__bracket--${position}`],
          )}
          style={{
            transform: `rotate(${rotate}deg)`,
            top,
          }}
        >
          <Icon icon={"bracket"} style={{ color }} />
        </div>
      ))}
    </main>
  );
}
