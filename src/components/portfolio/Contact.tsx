import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Briefcase } from "lucide-react";
import { useState } from "react";
import MagneticButton from "./MagneticButton";
import { toast } from "sonner";

const CONTACT_EMAIL = "sofiya@example.com";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Opening your email app…");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
            <span className="text-gradient">Let's build</span> something together.
          </h2>
          
          {/* Open to opportunities badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2"
          >
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Open to internships & opportunities</span>
          </motion.div>

          <p className="mt-6 max-w-md text-muted-foreground sm:text-lg">
            Have an idea, project, or collaboration in mind? Send a note — I reply within 24 hours.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-cursor="hover"
            className="mt-8 inline-flex items-center gap-3 font-display text-2xl font-semibold text-foreground transition-colors hover:text-primary sm:text-3xl"
          >
            <Mail className="h-6 w-6 text-primary" />
            {CONTACT_EMAIL}
          </a>

          <div className="mt-10 flex gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ y: -4, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="grid h-12 w-12 place-items-center rounded-full glass border border-border/60 text-foreground transition-all hover:border-primary/60 hover:text-primary hover:shadow-glow"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-3xl glass-strong border border-border/60 p-8 shadow-elegant"
        >
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />

          <div className="space-y-5">
            {[
              { name: "name", label: "Your name", type: "text" },
              { name: "email", label: "Email address", type: "email" },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  value={form[f.name as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="mt-2 w-full border-0 border-b border-border bg-transparent py-2.5 text-foreground outline-none transition-colors focus:border-primary"
                />
              </div>
            ))}

            <div>
              <label className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Message
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full resize-none border-0 border-b border-border bg-transparent py-2.5 text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="pt-3">
              <MagneticButton type="submit" className="w-full sm:w-auto">
                Send Message
                <Send className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </motion.form>
      </div>

      <footer className="mx-auto mt-32 max-w-6xl border-t border-border/60 pt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sofiya S — Designed & built with care.
      </footer>
    </section>
  );
};

export default Contact;
