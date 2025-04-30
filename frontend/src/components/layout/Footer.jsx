import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id='footer' className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2 className="logo-text">Michelle <span className="highlight">Dominic</span></h2>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h3 className="footer-heading">Navigation</h3>
                <ul>
                  <li>
                    <span className="contact-icon"><i className="fas fa-home"></i></span>
                    <a href="#home"> Home</a>
                  </li>
                  <li>
                    <span className="contact-icon"><i className="fas fa-user"></i></span>
                    <a href="#about"> About</a>
                  </li>
                  <li>
                    <span className="contact-icon"><i className="fas fa-tools"></i></span>
                    <a href="#skills"> Skills</a>
                  </li>
                  <li>
                    <span className="contact-icon"><i className="fas fa-project-diagram"></i></span>
                    <a href="#projects"> Projects</a>
                  </li>
                </ul>
              </div>

              <div className="footer-column">
                <h3 className="footer-heading">Contact</h3>
                <ul>
                  <li>
                    <span className="contact-icon"><i className="fas fa-envelope"></i></span>
                    <a href="mailto:mmdomini@uwaterloo.ca">Email</a>
                  </li>
                </ul>
              </div>

              <div className="footer-column">
                <h3 className="footer-heading">Follow Me</h3>
                <div className="social-links">
                  <a href="https://github.com/m76domi98" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/michelle-dominic-155238260/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://www.appropedia.org/User:Mdominic06" className='social-icon' aria-label="Appropedia" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-wikipedia-w"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
