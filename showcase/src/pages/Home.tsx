import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";

function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Hero scrollY={scrollY} />
      <Features />
      <About />
    </>
  );
}

export default Home;
