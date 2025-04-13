import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2 className="logo-text">Michelle <span className="highlight">Dominic</span></h2>
              <p className="footer-desc">Creating beautiful digital experiences through design and code.</p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h3 className="footer-heading">Navigation</h3>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#skills">Skills</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h3 className="footer-heading">Contact</h3>
                <ul>
                  <li>
                    <span className="contact-icon"><i className="fas fa-map-marker-alt"></i></span>
                    <span>canada</span>
                  </li>
                  <li>
                    <span className="contact-icon"><i className="fas fa-envelope"></i></span>
                    <span>email</span>
                  </li>
                  <li>
                    <span className="contact-icon"><i className="fas fa-phone"></i></span>
                    <span>(111) - 111- 1111</span>
                  </li>
                </ul>
              </div>

              <div className="footer-column">
                <h3 className="footer-heading">Follow Me</h3>
                <div className="social-links">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Dribbble">
                    <i className="fab fa-dribbble"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
                <div className="newsletter">
                  <p>Subscribe to my newsletter</p>
                  <form className="newsletter-form">
                    <input type="email" placeholder="Your email" required />
                    <button type="submit" aria-label="Subscribe">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">&copy; {currentYear} Michelle Dominic. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
