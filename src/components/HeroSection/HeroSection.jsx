import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./HeroSection.css";
import appleImage from "../../assets/Apple.png";
import playStoreImage from "../../assets/PlayStore.png";
import CarImage from "../../assets/HeroCar.png";

export const HeroSection = () => {
  // Refs for the text section and the image container
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      textRef.current,
      { scale: 0.8},
      { scale:1, duration: 1.5, ease: "power2.out" }
    );

    gsap.fromTo(
      imageRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.5 }
    );
  }, []);

  return (
    <main>
      <section className="text-section" ref={textRef}>
        <h1>
          Drive your <span>Dream Car</span> Today
        </h1>
        <p>
          Rent the perfect car for any trip with RentXpress. Enjoy flexible
          options, great prices, and a hassle-free experience. Get started in a
          few clicks!
        </p>

        <div className="app-links">
          <button className="app-btn">
            <div className="app-logo">
              <img src={appleImage} alt="Apple" />
            </div>
            <div className="app-text">
              <p>Download on the</p>
              <h4>Apple Store</h4>
            </div>
          </button>

          <button className="app-btn">
            <div className="app-logo">
              <img src={playStoreImage} alt="Play Store" />
            </div>
            <div className="app-text">
              <p>Get it from</p>
              <h4>Google Play</h4>
            </div>
          </button>
        </div>
      </section>

      <section className="hero-image-container" >
        <div className="orange-box"></div>
        <img ref={imageRef} src={CarImage} alt="Car" className="car-image" />
      </section>
    </main>
  );
};
