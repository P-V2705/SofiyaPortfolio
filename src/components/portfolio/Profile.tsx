import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import MagneticButton from "./MagneticButton";

// Replace this URL with your actual resume link
const RESUME_URL = "/resume.pdf";

const Profile = () => {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="profile" className="relative px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-primary">// About Me</span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Crafting <span className="text-gradient">intelligent</span> &amp; expressive interfaces.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground sm:text-lg">
            <span className="font-bold text-white">Hi I'm SOFIYA</span>
            {" — "}
            IT student skilled in Python, Java, and web development with hands-on project
            experience. Demonstrates strong problem-solving, leadership, and teamwork abilities
            through technical and organizational roles. Eager to apply skills in real-world
            development environments.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              onClick={() => window.open(RESUME_URL, "_blank", "noopener,noreferrer")}
            >
              Download Resume
              <Download className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={scrollToContact}>
              Contact Me
              <Mail className="h-4 w-4" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
