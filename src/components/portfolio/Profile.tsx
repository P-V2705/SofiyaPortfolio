import { motion } from "framer-motion";
import { Download, Mail, Target, Heart, Lightbulb } from "lucide-react";
import MagneticButton from "./MagneticButton";

const RESUME_URL = "/resume.pdf";

const Profile = () => {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-primary">// My Journey</span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Crafting <span className="text-gradient">intelligent</span> &amp; expressive interfaces.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground sm:text-lg">
            <span className="font-bold text-white">Hi I'm SOFIYA</span>
            {" — "}
            IT student skilled in Python, Java, and web development with hands-on project experience. Demonstrates strong problem-solving, leadership, and teamwork abilities through technical and organizational roles. Eager to apply skills in real-world development environments.
          </p>

          {/* Journey Cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl glass border border-border/60 p-6 text-left"
            >
              <Target className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display text-lg font-semibold">My Goal</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                To build AI-driven solutions that solve real-world problems and make technology more accessible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl glass border border-border/60 p-6 text-left"
            >
              <Heart className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display text-lg font-semibold">What I Enjoy</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                I love the process of turning complex ideas into clean, functional code and intuitive user interfaces.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl glass border border-border/60 p-6 text-left"
            >
              <Lightbulb className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display text-lg font-semibold">Why Tech Matters</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Technology is the most powerful tool we have to create positive impact and drive global innovation.
              </p>
            </motion.div>
          </div>

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
