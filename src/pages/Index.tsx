import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import Work from "@/components/portfolio/Work";
import Experience from "@/components/portfolio/Experience";
import Certifications from "@/components/portfolio/Certifications";
import Contact from "@/components/portfolio/Contact";
import Scene3D from "@/components/portfolio/Scene3D";
import CustomCursor from "@/components/portfolio/CustomCursor";
import Preloader from "@/components/portfolio/Preloader";
import { useLenis } from "@/hooks/useLenis";

const Index = () => {
  const [ready, setReady] = useState(false);
  useLenis();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Preloader onComplete={() => setReady(true)} />
      <CustomCursor />

      {/* Background layers */}
      <Scene3D />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-hero" />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-pattern opacity-[0.07]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[60vh] bg-gradient-radial" />

      {ready && (
        <motion.main
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Navbar />
          <Hero />
          <Work />
          <Experience />
          <Certifications />
          <Contact />
        </motion.main>
      )}
    </div>
  );
};

export default Index;
