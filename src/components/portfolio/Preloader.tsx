import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          {/* Ambient gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-radial opacity-70" />

          {/* Liquid morph blob */}
          <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full opacity-40 blur-3xl"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div
              className="absolute inset-6 animate-morph"
              style={{
                background: "var(--gradient-primary)",
                filter: "blur(2px)",
                boxShadow: "0 0 80px hsl(var(--primary) / 0.6), inset 0 0 60px hsl(var(--accent) / 0.5)",
              }}
            />
            <div
              className="absolute inset-12 animate-morph"
              style={{
                animationDirection: "reverse",
                animationDuration: "6s",
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--primary) / 0.4)",
              }}
            />
            <span className="relative z-10 font-display text-2xl font-semibold text-gradient">
              {progress}%
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-col items-center gap-3"
          >
            <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">Sofiya S</p>
            <div className="h-px w-40 overflow-hidden bg-border">
              <div
                className="h-full bg-gradient-primary transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;