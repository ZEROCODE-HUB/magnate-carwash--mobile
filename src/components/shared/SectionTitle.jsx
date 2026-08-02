import React from "react";
import { motion } from "framer-motion";
import { T } from "../../theme.js";
import { itemVariants } from "../../motion.js";

// Título de sección — serif Fraunces cálido + barra ámbar
export default function SectionTitle({ children, sub, accent, style }) {
  return (
    <motion.div variants={itemVariants} style={{ marginBottom: 16, ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 26,
            height: 4,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${T.accentBright}, ${T.accentDark})`,
            flexShrink: 0,
          }}
        />
        <h2 style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 24, color: T.ink, letterSpacing: -0.4, lineHeight: 1.15 }}>
          {children}
          {accent && (
            <>
              {" "}
              <em style={{ fontStyle: "italic", color: T.primary, fontWeight: 600 }}>{accent}</em>
            </>
          )}
        </h2>
      </div>
      {sub && (
        <div style={{ fontFamily: T.fontBody, fontSize: 12.5, color: T.inkSoft, marginTop: 5, paddingLeft: 36 }}>
          {sub}
        </div>
      )}
    </motion.div>
  );
}
