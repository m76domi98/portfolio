import '../../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-image">
            <div className="image-container">
              {/* Replace with your actual image */}
              <img src="https://via.placeholder.com/300" alt="Michelle Dominic" />
            </div>
          </div>
          <div className="about-text">
            <h3>Who am I?</h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">Michelle Dominic</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">fake email</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">San Francisco, CA</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Available:</span>
                <span className="detail-value">Freelance & Full-time</span>
              </div>
            </div>
            <a href="#contact" className="btn btn-primary">Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
