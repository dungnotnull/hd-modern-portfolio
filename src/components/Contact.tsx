import { MdArrowOutward } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  const year = new Date().getFullYear();

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a
                href="mailto:truonghoangdung57@gmail.com"
                data-cursor="disable"
              >
                truonghoangdung57@gmail.com
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/dungnotnull"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/truonghoangdung57/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Hoang Dung</span><br/>
              Inspired by <span><a href="https://github.com/davidhckh/portfolio-2025" target="_blank" rel="noopener noreferrer">
    davidhckh/portfolio-2025
  </a></span>
            </h2>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-divider" />
        <div className="footer-content">
          <span className="footer-brand">dungnotnull</span>
          <span className="footer-copy">&copy; {year} Hoang Dung. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
