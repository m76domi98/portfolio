import '../../styles/About.css';
import michelleCover from '../../assets/michelle_cover.png';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-content">
          <div className="about-image">
            <div className="image-container">
              <div className="image-bg"></div>
              <img src={michelleCover} alt="Michelle Cover" />
            </div>

            
          </div>

          <div className="about-text">
          <h3>a full-stack dev / ai + hardware enthusiast</h3>


            <div className="about-description">
              <p>Hi! I'm Michelle, an engineering student who blends software engineering with creativity and innovation. I love building intelligent tools that make life easier, smarter, and a little more fun.</p>
              <p>From hackathons to production systems, I work across the stack—integrating backends, crafting responsive UIs, and exploring the power of machine learning and AI agents.</p>
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
                  <span className="detail-value available">Available for Freelance</span>
                </div>
              </div>
            </div>

            <div className="about-cta-wrapper">
              <div className="about-cta">
                <a href="#contact" className="btn btn-primary">Let's Work Together</a>
                <a href="/resume.pdf" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Download Resume</a>
              </div>
            </div>
          </div>
        </div>

        <div className="achievements">
          <div className="achievement-item">
            <div className="achievement-icon"><i className="fas fa-palette"></i></div>
            <div className="achievement-content">
              <h4 className="achievement-number">10+</h4>
              <p className="achievement-text">Projects Built</p>
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon"><i className="fas fa-medal"></i></div>
            <div className="achievement-content">
              <h4 className="achievement-number">15+</h4>
              <p className="achievement-text">Hackathon Awards</p>
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon"><i className="fas fa-smile-beam"></i></div>
            <div className="achievement-content">
              <h4 className="achievement-number">100+</h4>
              <p className="achievement-text">Team Collabs</p>
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon"><i className="fas fa-mug-hot"></i></div>
            <div className="achievement-content">
              <h4 className="achievement-number">∞</h4>
              <p className="achievement-text">Late Night Debugs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
