"use client";
import { useState, useEffect, useRef } from "react";

const Slider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slidesRef = useRef<HTMLCollectionOf<Element> | null>(null);

  useEffect(() => {
    slidesRef.current = document.getElementsByClassName("slide");
  }, []);

  const goToSlide = (slideIndex: number) => {
    if (!slidesRef.current) return;
    const slidesArray = Array.from(slidesRef.current);
    slidesArray.forEach((s, i) => {
      (s as HTMLElement).style.transform = `translateX(${100 * (i - slideIndex)}%)`;
    });
    setCurrentSlideIndex(slideIndex);
  };

  useEffect(() => {
    if (slidesRef.current) goToSlide(currentSlideIndex);
  }, [currentSlideIndex]);

  const readyNextSlide = () => {
    if (!slidesRef.current) return;
    const slidesArray = Array.from(slidesRef.current);
    const lastSlideIndex = slidesArray.length - 1;

    if (currentSlideIndex === lastSlideIndex) {
      slidesArray[lastSlideIndex].insertAdjacentElement("afterend", slidesArray[0]);
      (slidesArray[lastSlideIndex] as HTMLElement).style.transform = `translateX(100%)`;
      setCurrentSlideIndex((prev) => prev - 1);
    }
    if (currentSlideIndex === 0) {
      slidesArray[0].insertAdjacentElement("beforebegin", slidesArray[lastSlideIndex]);
      (slidesArray[0] as HTMLElement).style.transform = `translateX(-100%)`;
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (
      currentSlideIndex === 0 ||
      (slidesRef.current && currentSlideIndex === slidesRef.current.length - 1)
    ) {
      readyNextSlide();
    }
  }, [currentSlideIndex]);

  const shiftSlides = (direction: boolean) => {
    setCurrentSlideIndex((prev) => (direction ? prev + 1 : prev - 1));
  };

  return (
    <div className="slider-container">
      <button className="btn-left" onClick={() => shiftSlides(false)}>
        ←
      </button>
      <div className="slides">
        <div className="slide">
          <img
            src="https://media.istockphoto.com/id/1444291518/photo/black-woman-working-from-home-office.jpg?s=612x612&w=0&k=20&c=ruHb87Ryd6uOr7sRnqfOussQihY89gnGDLeisJnVi-M="
            alt=""
          />
        </div>
        <div className="slide">
          <img
            src="https://media.istockphoto.com/id/1346563167/photo/two-diverse-multiethnic-female-have-a-discussion-in-meeting-room-behind-glass-walls-in-an.jpg?s=612x612&w=0&k=20&c=9GrhT_rgakZ3Cn5z9-y5Sz-68lgr7AfI5JZuJ7aPdLc="
            alt=""
          />
        </div>
        <div className="slide">
          <img
            src="https://media.istockphoto.com/id/1313463369/photo/financial-advisor-shaking-hands-with-customer.jpg?s=612x612&w=0&k=20&c=Y7UqvQ-uKklHrbxJNAvTlJmGFeiTg0HpDIboFD2kPxI="
            alt=""
          />
        </div>
        <div className="slide">
          <img src="https://media.istockphoto.com/id/2148327938/photo/woman-uses-laptop-successful-curly-haired-hispanic-or-brazilian-woman-in-stylish-elegant.jpg?s=612x612&w=0&k=20&c=HkpeVdjSo1_aR__FVcwalFkHWy_rRbi74iYezNS0VAo=" />
        </div>
      </div>
      <button className="btn-right" onClick={() => shiftSlides(true)}>
        →
      </button>
    </div>
  );
};

export default Slider;
