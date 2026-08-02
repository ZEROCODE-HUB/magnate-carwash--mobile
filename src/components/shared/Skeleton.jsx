import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "../../motion.js";
import { T } from "../../theme.js";

// Placeholder de carga con shimmer cálido.
export function Skeleton({ width = "100%", height = 14, radius = 12, style }) {
  return <div className="skeleton" style={{ width, height, borderRadius: radius, ...style }} />;
}

export function ScreenSkeleton({ lines = 6 }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.07 } } }}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div key={i} variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <Skeleton height={110} radius={24} />
          <Skeleton height={13} width="58%" />
          <Skeleton height={13} width="38%" />
        </motion.div>
      ))}
    </motion.div>
  );
}
