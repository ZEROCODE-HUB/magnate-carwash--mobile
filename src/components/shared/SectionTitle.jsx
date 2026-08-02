import React from "react";
import { T } from "../../theme.js";

export default function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 19, color: T.ink }}>{children}</div>
      {sub && <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: T.inkSoft, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
