import { motion } from "framer-motion";

const items = [
  {
    year: "11 / 2025",
    role: "Argus",
    org: "AI Security Copilot",
    desc: "AI copilot monitoring transactions, devices, accounts and merchants for financial security.",
  },
  {
    year: "11 / 2025",
    role: "Adhivan",
    org: "AI Mapping Project",
    desc: "AI-generated asset maps for rural FRA villages.",
  },
  {
    year: "04 / 2025",
    role: "Waste Optimizer",
    org: "IoT & C++",
    desc: "Developed a smart waste optimisation system using IoT sensors and C++.",
  },
  {
    year: "10 / 2024",
    role: "Block Breaker",
    org: "Java Game",
    desc: "Developed a classic block-breaker arcade game using Java.",
  },
  {
    year: "05 / 2024",
    role: "Monty Hall Simulator",
    org: "Python Simulation",
    desc: "Developed a probability simulation game based on the Monty Hall problem using Python.",
  },
  {
    year: "09 / 2023",
    role: "PyNote — Digital Diary",
    org: "Python Application",
    desc: "Developed a digital diary application for personal note-keeping using Python.",
  },
  {
    year: "05 / 2023",
    role: "Personality Check",
    org: "Python Web App",
    desc: "Developed a personality assessment website using Python.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Center spine */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:left-1/2" />

          <div className="space-y-12">
            {items.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: left ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.05 * i }}
                  className={`relative grid grid-cols-[2rem_1fr] gap-4 md:grid-cols-2 md:gap-12 ${
                    left ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-3 -translate-x-1/2 md:left-1/2">
                    <div className="relative grid h-4 w-4 place-items-center">
                      <div className="absolute inset-0 rounded-full bg-primary/30 blur-md" />
                      <div className="relative h-3 w-3 rounded-full bg-gradient-primary shadow-glow" />
                    </div>
                  </div>

                  <div className={`pl-10 md:pl-0 ${left ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                    <span className="text-xs font-mono uppercase tracking-widest text-primary">
                      {item.year}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-semibold">{item.role}</h3>
                    <p className="text-sm text-muted-foreground">{item.org}</p>
                  </div>
                  <div className={`pl-10 md:pl-0 ${left ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                    <div className="rounded-2xl glass border border-border/60 p-5 text-sm text-muted-foreground hover:border-primary/40 transition-colors">
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;