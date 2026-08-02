import { T } from "./theme.js";

// Curvas de easing modernas
export const EASE = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];
export const SPRING_SOFT = { type: "spring", stiffness: 380, damping: 30, mass: 0.9 };
export const SPRING_SNAPPY = { type: "spring", stiffness: 620, damping: 30, mass: 0.7 };

// Transición de pantalla (entrada/salida)
export const screenVariants = {
  initial: { opacity: 0, y: 18, scale: 0.99 },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.34, ease: EASE, when: "beforeChildren", staggerChildren: 0.045 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.18, ease: EASE },
  },
};

// Entrada escalonada de elementos
export const itemVariants = {
  initial: { opacity: 0, y: 14 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.36, ease: EASE } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.16, ease: EASE } },
};

export const popVariants = {
  initial: { opacity: 0, scale: 0.86 },
  enter: { opacity: 1, scale: 1, transition: SPRING_SOFT },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.15, ease: EASE } },
};

export const fadeVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: EASE } },
};

export const listStagger = (stagger = 0.05, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const listItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE } },
};
