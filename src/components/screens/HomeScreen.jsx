import React from "react";
import { ChevronRight, Radio, Crown } from "lucide-react";
import { T } from "../../theme.js";
import { CATEGORIES, STATUS_META } from "../../data.js";
import Pill from "../shared/Pill.jsx";
import SectionTitle from "../shared/SectionTitle.jsx";
import { card } from "../shared/ui.js";

export default function HomeScreen({ onPickCarwash, myReservation, onViewRes }) {
  return (
    <>
      {myReservation && (
        <button onClick={onViewRes} style={{ ...card, width: "100%", textAlign: "left", marginBottom: 16, border: `1.5px solid ${T.primary}`, cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Pill bg={STATUS_META[myReservation.status].bg} color={STATUS_META[myReservation.status].color}>
              <Radio size={11} /> {myReservation.status.toUpperCase()}
            </Pill>
            <ChevronRight size={16} color={T.inkSoft} />
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: T.ink, marginTop: 8, fontWeight: 600 }}>
            Tu lavado está en curso — tocá para ver el seguimiento en vivo
          </div>
        </button>
      )}

      <SectionTitle sub="Todo lo de MGA en un solo lugar">¿Qué querés hacer hoy?</SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={c.live ? onPickCarwash : undefined} style={{ ...card, cursor: c.live ? "pointer" : "default", opacity: c.live ? 1 : 0.55, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: T.primarySoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <c.icon size={19} color={T.primary} />
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13.5, color: T.ink }}>{c.name}</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: c.live ? T.primary : T.inkSoft }}>{c.live ? "Reservar →" : "Próximamente"}</div>
          </button>
        ))}
      </div>

      <div style={{ ...card, marginTop: 16, background: T.primary, border: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Crown size={16} color={T.accent} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: 13.5 }}>Nivel Oro</span>
        </div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#CFE3DE", marginTop: 6, lineHeight: 1.5 }}>
          15% off en todos tus lavados + un premium de regalo este mes.
        </div>
      </div>
    </>
  );
}
