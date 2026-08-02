import React from "react";
import { motion } from "framer-motion";
import { SPRING_SNAPPY } from "../../motion.js";

export default function EagleMark({ size = 22, color = "#F0A93B", animate = true }) {
  const inner = (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 6 L28 18 L44 14 L30 24 L44 34 L28 30 L24 42 L20 30 L4 34 L18 24 L4 14 L20 18 Z"
        fill={color}
      />
    </svg>
  );
  if (!animate) return inner;
  return (
    <motion.span
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={SPRING_SNAPPY}
      style={{ display: "inline-flex" }}
    >
      {inner}
    </motion.span>
  );
}
