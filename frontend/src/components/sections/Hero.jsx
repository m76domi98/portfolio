import { useEffect, useRef } from 'react';
import '../../styles/Hero.css';

const Hero = () => {
  const starsRef = useRef(null);

  // Create star effect
  useEffect(() => {
    if (starsRef.current) {
      const starsContainer = starsRef.current;
      starsContainer.innerHTML = '';

      const numStars = window.innerWidth > 768 ? 150 : 75;

      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random position
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;

        // Random animation delay
        star.style.animationDelay = `${Math.random() * 5}s`;

        starsContainer.appendChild(star);
      }
    }
  }, []);

  return (
    <section id="home" className="hero">
      <div className="stars" ref={starsRef}></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h3 className="hero-greeting">Hello, I'm</h3>
            <h1 className="hero-name">Michelle <span className="highlight">Dominic</span></h1>
            <h2 className="hero-title">Computer Engineering Student at the University of Waterloo</h2>
            <p className="hero-description">
            I’m a developer who’s into solving problems, building cool stuff, and diving into whatever tech grabs my curiosity—AI, web, embedded systems, you name it. I like turning ideas into things that actually work (and hopefully make someone’s life a little easier).
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="https://www.linkedin.com/in/michelle-dominic-155238260/" className="btn btn-secondary">Let's Connect</a>
            </div>
          </div>

        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrows">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
