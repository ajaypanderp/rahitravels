import "remixicon/fonts/remixicon.css";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./NavBar.css";

export const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const linksRef = useRef([]);
  const animationRef = useRef(null);

  const toggleNavbar = () => {
    if (mobileDrawerOpen) {
      // Animate closing
      const timeline = gsap.timeline({
        onComplete: () => setMobileDrawerOpen(false), 
      });
      timeline.to(drawerRef.current, {
        y: "-100%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.in",
      });
    } else {
      setMobileDrawerOpen(true); 
    }
  };

  useEffect(() => {
    if (mobileDrawerOpen) {
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline();

        // Animating nav bar background
        timeline.fromTo(
          drawerRef.current,
          { y: "-100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        // Animating each nav links <li> 
        timeline.fromTo(
          linksRef.current,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.1, 
            ease: "power2.out",
          },
          "-=0.2" // animation slight delay for nav links
        );
      });

      animationRef.current = ctx;
    } else if (animationRef.current) {
      animationRef.current.revert();
    }

    return () => animationRef.current?.revert(); 
  }, [mobileDrawerOpen]);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="text-container">
            <h1 className="logo-text">
              Rent<i className="ri-star-half-fill"></i>press
            </h1>
          </div>
          <ul className="nav-items">
            <li>
              <a href="#rent">Rent</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="https://bento.me/ksr" target="_blank">
                Contact
              </a>
            </li>
          </ul>
          <div className="auth-buttons">
            <a href="#" className="btn btn-border">
              Sign In
            </a>
            <a href="#" className="btn btn-gradient">
              Create Account
            </a>
          </div>
          <div className="mobile-menu">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? (
                <i className="ri-close-large-fill"></i>
              ) : (
                <i className="ri-menu-3-fill"></i>
              )}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="mobile-drawer" ref={drawerRef}>
            <ul>
              {[
                { text: "Rent", icon: "ri-roadster-line", href: "#rent" },
                { text: "Services", icon: "ri-shield-flash-line", href: "#services" },
                { text: "About", icon: "ri-user-star-line", href: "#" },
                { text: "Contact", icon: "ri-mail-ai-line", href: "https://bento.me/ksr" },
              ].map((item, index) => (
                <li key={item.text} ref={(el) => (linksRef.current[index] = el)}>
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : "_self"}>
                    <i className={item.icon}></i> {item.text}
                  </a>
                </li>
              ))}
            </ul>
            <div className="drawer-buttons">
              <a href="#" className="btn btn-border">
                Sign In
              </a>
              <a href="#" className="btn btn-gradient">
                Create Account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
