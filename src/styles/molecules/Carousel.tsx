"use client";

import { useRef, useState } from "react";

import { classNames } from "../shared/classNames";

import styles from "./Carousel.module.scss";

export type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  children: JSX.Element[];
};

function isInViewport(element: HTMLDivElement, slider: HTMLDivElement) {
  const bounding = element.getBoundingClientRect();
  const sliderBounding = slider.getBoundingClientRect();

  return (
    bounding.left >= sliderBounding.left &&
    bounding.right <= sliderBounding.right
  );
}

export function Carousel({ children, ...props }: CarouselProps) {
  const slider = useRef<HTMLDivElement>(null);
  const slides = useRef<HTMLDivElement[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [step, setStep] = useState<number>(0);

  function getSliderOrThrow(): HTMLDivElement {
    if (!slider.current) {
      throw new Error("Slider not found");
    }

    return slider.current;
  }

  function assignSlidesOrThrow(
    slide: HTMLDivElement | null,
    index: number,
  ): void {
    if (!slide) {
      return;
    }

    slides.current[index] = slide;
  }

  function getVisibleSlides(): {
    firstVisibleSlide: HTMLDivElement;
    firstNotVisibleSlide: HTMLDivElement;
  } {
    let firstVisibleSlide!: HTMLDivElement;
    let firstNotVisibleSlide!: HTMLDivElement;
    const slider = getSliderOrThrow();

    for (const slide of Array.from(slides.current)) {
      if (!firstVisibleSlide && isInViewport(slide, slider)) {
        firstVisibleSlide = slide;
      }

      if (firstVisibleSlide && !isInViewport(slide, slider)) {
        firstNotVisibleSlide = slide;

        break;
      }
    }

    return {
      firstVisibleSlide,
      firstNotVisibleSlide,
    };
  }

  function scrollTo(x: number): void {
    const slider = getSliderOrThrow();
    slider.scrollTo(x, 0);

    displayedSlide(x);
  }

  function nextSlide() {
    const { firstNotVisibleSlide } = getVisibleSlides();

    if (!firstNotVisibleSlide) {
      return;
    }

    scrollTo(firstNotVisibleSlide.offsetLeft);
  }

  function previousSlide() {
    const { firstVisibleSlide, firstNotVisibleSlide } = getVisibleSlides();

    if (!firstVisibleSlide) {
      return;
    }

    if (!firstNotVisibleSlide) {
      const previousSlide =
        firstVisibleSlide.previousElementSibling as HTMLDivElement;

      scrollTo(previousSlide?.offsetLeft || 0);

      return;
    }

    scrollTo(0);
  }

  function handleClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ): void {
    const slide = slides.current[index];
    const width = slide.getBoundingClientRect().width;
    const halfWidth = width / 2;
    const mouseX = event.nativeEvent.offsetX;

    if (mouseX <= halfWidth) {
      previousSlide();

      return;
    }

    nextSlide();
  }

  function handleTouch(): void {
    if (!touchStart || !touchEnd || Math.abs(touchEnd - touchStart) < 30) {
      return;
    }

    if (touchStart <= touchEnd) {
      previousSlide();

      return;
    }

    nextSlide();
  }

  function displayedSlide(sliderScroll: number): void {
    const marginRightSlide = +window
      .getComputedStyle(slides.current[0])
      .getPropertyValue("margin-right")
      .replace("px", "");
    const widthSlide = slides.current[0].clientWidth + marginRightSlide;

    setStep(sliderScroll / widthSlide);
  }

  return (
    <div className={styles.carousel} {...props}>
      <div ref={slider} className={styles.carousel__slider}>
        {children.map((child, index) => (
          <div
            key={index}
            ref={(slide) => {
              assignSlidesOrThrow(slide, index);
            }}
            onClick={(event) => {
              handleClick(event, index);
            }}
            onTouchStart={(event) => {
              setTouchEnd(null);
              setTouchStart(event.targetTouches[0].clientX);
            }}
            onTouchMove={(event) => setTouchEnd(event.targetTouches[0].clientX)}
            onTouchEnd={() => handleTouch()}
            className={styles.carousel__slide}
          >
            {child}
          </div>
        ))}
      </div>
      <div className={styles.carousel__stepper}>
        {Array.from(Array(children.length).keys()).map((element, index) => (
          <span
            key={element}
            className={classNames(styles.carousel__step, {
              [styles[`carousel__step--active`]]: index === step,
            })}
          />
        ))}
      </div>
    </div>
  );
}
