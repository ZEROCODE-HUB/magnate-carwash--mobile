import React from "react";
import { motion } from "framer-motion";
import { T } from "../../theme.js";
import { itemVariants } from "../../motion.js";

export default function SectionTitle({ children, sub, style }) {
  return (
    <motion.div variants={itemVariants} style={{ marginBottom: 14, ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 20,
            height: 3,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${T.accent}, ${T.accentDark})`,
            flexShrink: 0,
          }}
        />
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18.5, color: T.ink, letterSpacing: -0.3 }}>
          {children}
        </div>
      </div>
      {sub && (
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: T.inkSoft, marginTop: 4, paddingLeft: 28 }}>
          {sub}
        </div>
      )}
    </motion.div>
  );
}
