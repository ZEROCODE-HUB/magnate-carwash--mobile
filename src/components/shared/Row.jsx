import React from "react";
import { T } from "../../theme.js";

export function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: T.inkSoft }}>{label}</span>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 600, color: T.ink }}>{value}</span>
    </div>
  );
}

export function BackRow({ onBack, title, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <button onClick={onBack} style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>←</button>
      <div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: T.ink }}>{title}</div>
        {sub && <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: T.inkSoft }}>{sub}</div>}
      </div>
    </div>
  );
}
