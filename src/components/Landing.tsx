import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const displayParts = config.developer.displayName.split(" ");
  const line1 = displayParts[0]?.toUpperCase() ?? config.developer.name.toUpperCase();
  const line2 = displayParts.slice(1).join(" ").toUpperCase();
  const taglines = config.developer.taglines ?? [config.developer.title];

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I&apos;m</h2>
          <h1 className="landing-name">
            <span className="landing-name-line">{line1}</span>
            {line2 && <span className="landing-name-line landing-name-accent">{line2}</span>}
          </h1>
        </div>
        <div className="landing-info">
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">{taglines[0]}</div>
          </h2>
          {taglines[1] && (
            <h2 className="landing-info-sub">
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
  );
};

export default Landing;
