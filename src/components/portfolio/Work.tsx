import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Programming",
    items: [
      { name: "C", level: 85 },
      { name: "C++", level: 80 },
      { name: "Python", level: 92 },
      { name: "Java", level: 82 },
    ],
  },
  {
    title: "Web",
    items: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
    ],
  },
  {
    title: "Database",
    items: [{ name: "MySQL", level: 80 }],
  },
  {
    title: "Tools",
    items: [
      { name: "Word", level: 95 },
      { name: "Excel", level: 90 },
      { name: "PowerPoint", level: 92 },
    ],
  },
  {
    title: "Soft Skills",
    items: [
      { name: "Communication", level: 90 },
      { name: "Adaptability", level: 88 },
      { name: "Teamwork", level: 92 },
      { name: "Problem-Solving", level: 90 },
      { name: "Leadership", level: 85 },
    ],
  },
];

const Work = () => {
  return (
    <section id="work" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: gi * 0.08 }}
              className="group relative overflow-hidden rounded-3xl glass border border-border/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-primary opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25" />

              <h3 className="text-center font-display text-2xl font-semibold text-gradient">
                {group.title}
              </h3>

              <div className="mt-6 space-y-4">
                {group.items.map((s, i) => (
                  <div key={s.name}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-foreground/85">{s.name}</span>
                      <span className="text-primary font-mono">{s.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.1,
                          delay: 0.15 + i * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full bg-gradient-primary shadow-glow"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
