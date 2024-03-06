import { Button } from "@anatoquiz/src/styles/atoms/Button";
import { Carousel } from "@anatoquiz/src/styles/molecules/Carousel";
import Image from "next/image";
import React from "react";

import { onBoardingData } from "./data";

import styles from "./page.module.scss";

export default function OnBoarding() {
  return (
    <article className={styles.onboarding}>
      <Carousel style={{ flex: 2 }}>
        {onBoardingData.map(({ id, title, subtitle, name }) => (
          <React.Fragment key={id}>
            <h2 className={styles.onboarding__title}>{title}</h2>
            <h3 className={styles.onboarding__subtitle}>{subtitle}</h3>
            <Image
              src={`/img/onboarding/${name}.png`}
              alt={`image-${id}`}
              width={300}
              height={300}
            />
          </React.Fragment>
        ))}
      </Carousel>
      <div className={styles.onboarding__buttons}>
        <Button mode={"secondary"} href={"/auth/register"}>
          Get started
        </Button>
        <Button href={"/auth/login"}>I have an account</Button>
      </div>
    </article>
  );
}
