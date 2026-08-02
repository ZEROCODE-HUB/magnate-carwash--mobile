import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SPRING_SNAPPY, EASE } from "../../motion.js";
import { usePrefersReducedMotion } from "../../hooks.js";
import { T } from "../../theme.js";

const COLORS = [T.accent, T.accentBright, T.primary, T.teal, T.success, T.violet];

// Celebración post-acción: check que se dibuja + lluvia de confeti.
// Elegante, autodescartable (~2.8s) y fiel a la paleta de marca.
export default function Celebration({ trigger, message = "Reserva confirmada" }) {
  const [active, setActive] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!trigger) return;
    setActive(true);
    const t = setTimeout(() => setActive(false), 2800);
    return () => clearTimeout(t);
  }, [trigger]);

  const pieces = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: 4 + Math.random() * 92,
        delay: Math.random() * 0.55,
        dur: 1.8 + Math.random() * 1,
        size: 5 + Math.random() * 6,
        color: COLORS[i % COLORS.length],
        sway: (Math.random() - 0.5) * 150,
        tilt: 360 + Math.random() * 420,
      })),
    [trigger]
  );

  return (
    <AnimatePresence>
      {active && !reduced && (
        <motion.div
          key="celebration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 50,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {pieces.map((p) => (
            <span
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size * 0.45,
                background: p.color,
                "--delay": `${p.delay}s`,
                "--dur": `${p.dur}s`,
                "--sway": `${p.sway}px`,
                "--tilt": `${p.tilt}deg`,
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING_SNAPPY}
            style={{
              width: 110,
              height: 110,
              borderRadius: 999,
              background: `linear-gradient(150deg, ${T.primary} 0%, ${T.primaryDark} 100%)`,
              boxShadow: "0 26px 60px -16px rgba(62,21,43,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid rgba(246,190,92,0.35)`,
            }}
          >
            <svg width="54" height="54" viewBox="0 0 24 24" fill="none">
              <path
                className="celeb-check"
                d="M4.5 12.5 L9.5 17.5 L19.5 6.5"
                stroke={T.accentBright}
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.34, ease: EASE }}
            style={{
              position: "absolute",
              bottom: "28%",
              fontFamily: T.fontDisplay,
              fontWeight: 600,
              fontSize: 18,
              fontStyle: "italic",
              color: T.ink,
              background: "rgba(255,253,247,0.92)",
              padding: "10px 20px",
              borderRadius: 999,
              boxShadow: T.shadowFloat,
              whiteSpace: "nowrap",
              border: `1px solid ${T.line}`,
            }}
          >
            {message}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
