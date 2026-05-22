import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts.slice(0, 2).join(" ") || config.developer.name;
  const lastName = nameParts.slice(2).join(" ") || "";
  const taglines = config.developer.taglines ?? [config.developer.title];

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              {lastName && (
                <>
                  <br />
                  <span>{lastName.toUpperCase()}</span>
                </>
              )}
            </h1>
          </div>
          <div className="landing-info">
            <h3>An</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{taglines[0]}</div>
            </h2>
            {taglines[1] && (
              <h2>
                <div className="landing-h2-info">{taglines[1]}</div>
              </h2>
            )}
          </div>
          <div className="mobile-photo">
            <img
              src="/images/mypic.jpeg"
              alt={config.developer.displayName}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/placeholder.webp";
              }}
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
