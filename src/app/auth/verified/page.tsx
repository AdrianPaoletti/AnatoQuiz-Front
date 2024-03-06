import { Button } from "@anatoquiz/src/styles/atoms/Button";
import { Icon } from "@anatoquiz/src/styles/atoms/Icon";

import styles from "./page.module.scss";

export default function UserVerified() {
  return (
    <article className={styles["user-verified"]}>
      <div>
        <h2 className={styles["user-verified__title"]}>
          {"Welcome to Anatoquiz 🥳"}
        </h2>
        <h3 className={styles["user-verified__subtitle"]}>
          {"You're email has been verified successfully"}
        </h3>
      </div>
      <Icon icon="userVerified" className={styles["user-verified__icon"]} />
      <Button type={"button"} fullWidth>
        {"Let's go"}
      </Button>
    </article>
  );
}
