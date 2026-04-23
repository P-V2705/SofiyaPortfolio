import { motion, type HTMLMotionProps } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "ghost";
}

const MagneticButton = ({ children, className, variant = "primary", ...props }: Props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300",
        variant === "primary" &&
          "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-violet hover:brightness-110",
        variant === "ghost" &&
          "border border-border/60 text-foreground glass hover:border-primary/60 hover:text-primary",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;