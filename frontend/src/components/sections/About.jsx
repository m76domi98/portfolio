import '../../styles/About.css';

import michelleCover from '../../assets/michelle_cover.png';
const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
        </div>

        <div className="about-content">
          <div className="about-image">
            <div className="image-container">
              <div className="image-bg"></div>
              <img src={michelleCover} alt="Michelle Cover" />
            </div>

            <div className="experience-badge">
              <div className="badge-content">
                <span className="years">2</span>
                <span className="text">Years of<br />Experience</span>
              </div>
            </div>
          </div>

          <div className="about-text">
            <h3>a fullstack dev / ai</h3>

            <div className="about-description">
              <p>
                im passionate
              </p>
              <p>
                my approach
              </p>
            </div>

            <div className="about-details">
              <div className="detail-column">
                <div className="detail-item">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">Michelle Dominic</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">hello@michelledominic.com</span>
                </div>
              </div>
              <div className="detail-column">
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">Canada</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Availability:</span>
                  <span className="detail-label">Availability:</span>
                  <span className="detail-value available">Available for Freelance</span>
                </div>
              </div>
            </div>

            <div className="about-cta">
              <a href="#contact" className="btn btn-primary">Let's Work Together</a>
              <a href="#" className="btn btn-secondary">Download Resume</a>
            </div>
          </div>
        </div>

        <div className="achievements">
          <div className="achievement-item">
            <div className="achievement-icon">
              <i className="fas fa-palette"></i>
            </div>
            <div className="achievement-content">
              <h4 className="achievement-number">number</h4>
              <p className="achievement-text">Achivement</p>
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon">
              <i className="fas fa-medal"></i>
            </div>
            <div className="achievement-content">
              <h4 className="achievement-number">15+</h4>
              <p className="achievement-text">Achievemnt</p>
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon">
              <i className="fas fa-smile-beam"></i>
            </div>
            <div className="achievement-content">
              <h4 className="achievement-number">80+</h4>
              <p className="achievement-text">Achievments</p>
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon">
              <i className="fas fa-mug-hot"></i>
            </div>
            <div className="achievement-content">
              <h4 className="achievement-number">∞</h4>
              <p className="achievement-text">Coffee Consumed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
