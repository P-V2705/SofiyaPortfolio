import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import MagneticButton from "./MagneticButton";
import SLogo3D from "./SLogo3D";

const RESUME_URL = "https://crude-gold-0cxau2vjva.edgeone.app";

const letter = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden px-6 pt-28 sm:px-10 lg:px-16"
    >
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/70"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              boxShadow: "0 0 8px hsl(var(--primary))",
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-2xl font-bold text-muted-foreground sm:text-3xl"
          >
            Hi, I'm <span className="text-gradient">Sofiya S</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            IT Student <span className="text-gradient">|</span> AI & Web Developer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-4 text-xl font-semibold text-primary sm:text-2xl"
          >
            Building smart solutions using Python & AI
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Passionate about creating impactful real-world applications. I specialize in bridging the gap between complex AI algorithms and intuitive user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              onClick={() => window.open(RESUME_URL, "_blank", "noopener,noreferrer")}
            >
              Download Resume
              <Download className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollTo("contact")}>
              Contact Me
              <Mail className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          <SLogo3D />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
