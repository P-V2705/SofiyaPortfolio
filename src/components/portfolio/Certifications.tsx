import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certs = [
  { title: "AI Course", issuer: "GUVI", verifyUrl: "#" },
  { title: "Full Stack Web Development", issuer: "Internshpstudio", verifyUrl: "#" },
  { title: "Java", issuer: "Internshpstudio", verifyUrl: "#" },
  { title: "C++", issuer: "GeeksforGeeks", verifyUrl: "#" },
  { title: "CSC Honors Diploma in Computer Application", issuer: "CSC", verifyUrl: "#" },
];

const Certifications = () => {
  return (
    <section id="certifications" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            <span className="text-gradient">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              data-cursor="hover"
              className="group relative flex flex-col overflow-hidden rounded-2xl glass border border-border/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60"
            >
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-primary opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
              <div className="relative flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Award className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold leading-tight">{c.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.issuer}</p>
                </div>
              </div>

              <a
                href={c.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="relative mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-all hover:border-primary hover:bg-primary/20 hover:shadow-glow"
              >
                Verify
                <ExternalLink className="h-3 w-3" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
