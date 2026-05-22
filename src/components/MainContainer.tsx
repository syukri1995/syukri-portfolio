import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import CallToAction from "./CallToAction";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [showCharacter, setShowCharacter] = useState<boolean>(
    window.innerWidth > 768
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setShowCharacter(window.innerWidth > 768);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [showCharacter]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <Landing>{showCharacter ? children : null}</Landing>
      <About />
      <WhatIDo />
      <Career />
      <Work />
      <TechStackNew />
      <CallToAction />
      <Contact />
    </div>
  );
};

export default MainContainer;
