
import { useEffect, useState } from 'react';
import '../../styles/About.css';
import michelleCover from '../../assets/michelle_cover.png';

const About = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) {
          setVisible(true);
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // run on load

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="about" className={`about fade-in ${visible ? 'visible' : ''}`}>

      <div className="container">

        <div className="about-content">
          <div className="about-image">
            <div className="image-container">
              <div className="image-bg"></div>
              <img src={michelleCover} alt="Picture of Michelle" />
            </div>


          </div>

          <div className="about-text">
          <div className="section-header">
          <h2 className="section-title">About Me</h2>
        </div>
          <div className="about-description">
            <p>Hi! I'm Michelle, a <b>Computer Engineering</b> student at the <b>University of Waterloo</b> passionate about autonomous systems and AI/ML. I recently completed a co-op at <b>Stubbe’s Precast</b> integrating AI chatbots and building ML models with TensorFlow and Scikit-learn. I also contributed to open-source research at <b>Western University</b>, creating solar optimization and 3D-printing correction tools using Python.</p>
            <p>Outside of school, I build projects, explore full-stack development, and compete in hackathons.</p>
            <p>I'm looking for <b>Fall 2025</b> co-op opportunities — feel free to <b>reach out!</b></p>
          </div>


            <div className="about-cta-wrapper">
              <div className="about-cta">
                <a href="https://www.linkedin.com/in/michelle-dominic-155238260/" className="btn btn-primary">Let's Work Together</a>
                <a href="/resume.pdf" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Download Resume</a>
              </div>
            </div>
          </div>
        </div>

       

      </div>
    </section>
  );
};

export default About;
