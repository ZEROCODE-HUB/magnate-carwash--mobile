// ─────────────────────────────────────────────────────────────
// Lenguaje de movimiento — "cálido y con vida"
// Curva base: cubic-bezier(0.22, 1, 0.36, 1) (anticipa suave, aterriza natural)
// Sprín: muelles suaves con rebote controlado (jamás elástico burlón)
// ─────────────────────────────────────────────────────────────
import { T } from "./theme.js";

export const EASE = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];
export const SPRING_SOFT = { type: "spring", stiffness: 340, damping: 28, mass: 0.9 };
export const SPRING_SNAPPY = { type: "spring", stiffness: 560, damping: 26, mass: 0.7 };

// Transición de pantalla (entrada/salida)
export const screenVariants = {
  initial: { opacity: 0, y: 20, scale: 0.985 },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: EASE, when: "beforeChildren", staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.2, ease: EASE },
  },
};

// Entrada escalonada de elementos
export const itemVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.16, ease: EASE } },
};

export const popVariants = {
  initial: { opacity: 0, scale: 0.84 },
  enter: { opacity: 1, scale: 1, transition: SPRING_SOFT },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.15, ease: EASE } },
};

export const fadeVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.32, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.16, ease: EASE } },
};

export const listItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
};
