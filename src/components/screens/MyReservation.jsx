import React from "react";
import { Car, Camera } from "lucide-react";
import { T } from "../../theme.js";
import { STATUS_META, SERVICES } from "../../data.js";
import { card } from "../shared/ui.js";
import { Row, BackRow } from "../shared/Row.jsx";
import StatusStepper from "../shared/StatusStepper.jsx";

export default function MyReservation({ reservation, onBack }) {
  if (!reservation) {
    return (
      <>
        <BackRow onBack={onBack} title="Mi lavado" />
        <div style={{ ...card, textAlign: "center", padding: 30 }}>
          <Car size={26} color={T.inkSoft} style={{ marginBottom: 8 }} />
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: T.inkSoft }}>Todavía no tenés una reserva activa.</div>
        </div>
      </>
    );
  }
  const meta = STATUS_META[reservation.status];
  const Icon = meta.icon;
  const svc = SERVICES.find((s) => s.id === reservation.service);

  return (
    <>
      <BackRow onBack={onBack} title="Seguimiento en vivo" />
      <div style={{ ...card, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: meta.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
          <Icon size={26} color={meta.color} />
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: T.ink }}>{reservation.status}</div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: T.inkSoft, marginTop: 3 }}>{svc?.name} · {reservation.time}</div>
        <div style={{ margin: "18px 0 6px" }}><StatusStepper status={reservation.status} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, color: T.inkSoft }}>
          <span>Reservado</span><span>Listo</span>
        </div>
      </div>

      <button style={{ ...card, width: "100%", marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
        <Camera size={16} color={T.primary} />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: T.primary }}>Ver cámara en vivo</span>
      </button>

      <div style={{ ...card, marginTop: 12 }}>
        <Row label="Vehículo" value={reservation.vehicle} />
        <Row label="Cliente" value={reservation.name} />
        <Row label="Nivel" value={reservation.tier} />
      </div>
    </>
  );
}
