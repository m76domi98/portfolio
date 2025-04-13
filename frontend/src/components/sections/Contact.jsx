import { useState } from 'react';
import '../../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    message: '',
    isSuccess: false,
    isSubmitting: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({
      message: '',
      isSuccess: false,
      isSubmitting: true,
    });

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        message: 'Thank you! Your message has been sent successfully.',
        isSuccess: true,
        isSubmitting: false,
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's create something amazing together</p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h3>Have a project in mind?</h3>
            <p className="contact-intro">
              I'm currently available for freelance work and collaborations. Feel free to reach out
              if you're looking for a designer and developer who can bring your ideas to life.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-text">
                  <h4>Location</h4>
                  <p>New York, NY, USA</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>hello@michelledominic.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="contact-text">
                  <h4>Phone</h4>
                  <p>(123) 456-7890</p>
                </div>
              </div>
            </div>

            <div className="social-connect">
              <h4>Connect with me</h4>
              <div className="social-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-dribbble"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <div className="form-header">
              <h3>Send me a message</h3>
              <p>I'll get back to you as soon as possible</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  rows="5"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={formStatus.isSubmitting}
              >
                {formStatus.isSubmitting ? (
                  <span className="loading-text">
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </span>
                ) : (
                  <span>Send Message <i className="fas fa-paper-plane"></i></span>
                )}
              </button>

              {formStatus.message && (
                <div className={`form-message ${formStatus.isSuccess ? 'success' : 'error'}`}>
                  <i className={`fas ${formStatus.isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
