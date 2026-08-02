import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "../../motion.js";

// Placeholder de carga con shimmer, para estados iniciales.
export function Skeleton({ width = "100%", height = 14, radius = 10, style }) {
  return <div className="skeleton" style={{ width, height, borderRadius: radius, ...style }} />;
}

export function ScreenSkeleton({ lines = 6 }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.07 } } }}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div key={i} variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Skeleton height={92} radius={16} />
          <Skeleton height={12} width="60%" />
          <Skeleton height={12} width="40%" />
        </motion.div>
      ))}
    </motion.div>
  );
}
