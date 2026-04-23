import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed left-4 top-4 z-50 w-[min(96%,860px)] rounded-full transition-all duration-500 sm:left-8 ${
        scrolled ? "glass-strong shadow-elegant" : "glass"
      }`}
    >
      <nav className="flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3">
        <button
          onClick={() => scrollTo("home")}
          className="group flex items-center gap-2 font-display text-sm font-semibold tracking-wide"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground shadow-glow">
            S
          </span>
          <span className="hidden sm:inline text-foreground">Sofiya<span className="text-primary">.</span></span>
        </button>

        <ul className="flex items-center gap-1 sm:gap-1">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  className={`relative rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-primary opacity-90 shadow-glow"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={isActive ? "text-primary-foreground" : ""}>{l.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Navbar;
