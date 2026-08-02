import React from "react";
import { ArrowRight } from "lucide-react";
import { T } from "../../theme.js";
import { SERVICES, TIME_SLOTS } from "../../data.js";
import { card, primaryBtn } from "../shared/ui.js";
import { Row, BackRow } from "../shared/Row.jsx";

export function BookStepService({ onBack, onSelect }) {
  return (
    <>
      <BackRow onBack={onBack} title="Elegí tu servicio" />
      {SERVICES.map((s) => (
        <button key={s.id} onClick={() => onSelect(s)} style={{ ...card, width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 12, marginBottom: 10, cursor: "pointer" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: T.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <s.icon size={19} color={T.accentDark} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13.5, color: T.ink }}>{s.name}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: T.inkSoft }}>{s.desc} · {s.mins} min</div>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600, color: T.primary }}>${s.price.toLocaleString("es-AR")}</div>
        </button>
      ))}
    </>
  );
}

export function BookStepTime({ service, onBack, onSelect }) {
  return (
    <>
      <BackRow onBack={onBack} title="Elegí un horario" sub={service?.name} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {TIME_SLOTS.map((t) => (
          <button key={t} onClick={() => onSelect(t)} style={{ ...card, padding: "12px 6px", textAlign: "center", cursor: "pointer" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 13, color: T.ink }}>{t}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export function BookStepConfirm({ service, time, vehicle, setVehicle, onBack, onConfirm, loading }) {
  return (
    <>
      <BackRow onBack={onBack} title="Confirmá tu reserva" />
      <div style={card}>
        <Row label="Servicio" value={service?.name} />
        <Row label="Horario" value={time} />
        <Row label="Duración" value={`${service?.mins} min`} />
        <div style={{ height: 1, background: T.line, margin: "10px 0" }} />
        <label style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: T.inkSoft, fontWeight: 600 }}>VEHÍCULO</label>
        <input value={vehicle} onChange={(e) => setVehicle(e.target.value)} style={{ width: "100%", marginTop: 6, padding: "9px 10px", borderRadius: 8, border: `1px solid ${T.line}`, fontFamily: "Inter, sans-serif", fontSize: 13, color: T.ink, outline: "none", boxSizing: "border-box" }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.line}` }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: T.ink }}>Total (con desc. Oro)</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, fontWeight: 700, color: T.primary }}>${Math.round(service.price * 0.85).toLocaleString("es-AR")}</span>
        </div>
      </div>
      <button onClick={onConfirm} disabled={loading} style={{ ...primaryBtn, opacity: loading ? 0.6 : 1 }}>
        {loading ? "Confirmando..." : <>Confirmar reserva <ArrowRight size={15} style={{ marginLeft: 6 }} /></>}
      </button>
    </>
  );
}
