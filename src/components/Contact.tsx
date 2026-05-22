import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  useEffect(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    contactTimeline
      .fromTo(".contact-section h3", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .fromTo(
        ".contact-box",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        "-=0.4"
      );

    return () => {
      contactTimeline.kill();
    };
  }, []);

  const { contact, social, developer } = config;

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{developer.displayName}</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Phone</h4>
            <p>
              <a href={`tel:${contact.phoneTel}`} data-cursor="disable">
                {contact.phone}
              </a>
            </p>
            <h4>Location</h4>
            <p>
              <span>{social.location}</span>
            </p>
          </div>
          <div className="contact-box">
            <h4>Connect</h4>
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                LinkedIn <MdArrowOutward />
              </a>
            )}
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>{developer.displayName}</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
            <p className="contact-attribution">
              Template credit:{" "}
              <a
                href="https://github.com/red1-for-hek/portfolio-website"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                @red1-for-hek
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
