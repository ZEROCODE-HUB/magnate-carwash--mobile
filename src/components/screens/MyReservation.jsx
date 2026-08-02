import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Car, Camera, ArrowRight, Sparkles } from "lucide-react";
import { T } from "../../theme.js";
import { STATUS_META, STATUS_FLOW, SERVICES } from "../../data.js";
import { itemVariants, SPRING_SNAPPY, EASE } from "../../motion.js";
import { card, primaryBtn } from "../shared/ui.js";
import { Row, BackRow } from "../shared/Row.jsx";
import StatusStepper from "../shared/StatusStepper.jsx";
import Pressable from "../shared/Pressable.jsx";
import RippleButton from "../shared/Ripple.jsx";

export default function MyReservation({ reservation, onBack, celebrated, onBook }) {
  if (!reservation) {
    return (
      <>
        <BackRow onBack={onBack} title="Mi lavado" />
        <motion.div
          variants={itemVariants}
          style={{
            ...card,
            textAlign: "center",
            padding: "34px 22px",
            marginTop: 6,
            background: "linear-gradient(165deg, #FDFDFB 0%, #EFF6F3 100%)",
            border: "1px solid #DCEAE6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 76, height: 76, borderRadius: 24, background: "linear-gradient(150deg, #DCEAE6, #BFDCD3)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Car size={32} color={T.primary} />
          </motion.div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17.5, color: T.ink, marginTop: 18, letterSpacing: -0.3 }}>
            Tu auto te está esperando
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: T.inkSoft, marginTop: 5, lineHeight: 1.55, maxWidth: 240 }}>
            Todavía no tenés una reserva activa. Elegí un servicio y quedate mirando el lavado en vivo.
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4, ease: EASE }}
            style={{ width: "100%" }}
          >
            <RippleButton
              onPress={onBook}
              className="press-cta"
              style={{ ...primaryBtn, marginTop: 20, gap: 8, boxShadow: "0 14px 28px -14px rgba(14,75,67,0.7)" }}
            >
              Reservar mi primer lavado <ArrowRight size={15} />
            </RippleButton>
          </motion.div>
        </motion.div>
      </>
    );
  }

  const meta = STATUS_META[reservation.status];
  const Icon = meta.icon;
  const svc = SERVICES.find((s) => s.id === reservation.service);
  const idx = STATUS_FLOW.indexOf(reservation.status);
  const pct = Math.round(((idx + 1) / STATUS_FLOW.length) * 100);
  const inProgress = idx > 0 && idx < STATUS_FLOW.length - 1;

  return (
    <>
      <AnimatePresence>
        {celebrated && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={SPRING_SNAPPY}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              background: "linear-gradient(120deg, #0E4B43, #11584E)",
              color: "white",
              borderRadius: 14,
              padding: "11px 14px",
              marginBottom: 12,
              boxShadow: "0 12px 26px -12px rgba(14,75,67,0.6)",
            }}
          >
            <motion.span
              animate={{ rotate: [0, -18, 14, 0] }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
              style={{ display: "flex" }}
            >
              <Sparkles size={16} color={T.accent} />
            </motion.span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 600 }}>Reserva confirmada. Tu turno queda guardado.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <BackRow onBack={onBack} title="Seguimiento en vivo" sub={reservation.id?.toUpperCase?.() || "Reserva activa"} />

      <motion.div variants={itemVariants} style={{ ...card, textAlign: "center" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={SPRING_SNAPPY}
          style={{
            position: "relative",
            width: 64,
            height: 64,
            borderRadius: 999,
            background: meta.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
          }}
        >
          <Icon size={28} color={meta.color} />
          {inProgress && <span className="anim-ring-warm" style={{ position: "absolute", inset: -4, borderRadius: 999, background: "transparent" }} />}
        </motion.div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 19, color: T.ink, letterSpacing: -0.3 }}>
          {reservation.status}
        </div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: T.inkSoft, marginTop: 3 }}>
          {svc?.name} · {reservation.time}
        </div>

        <div style={{ margin: "20px 0 8px" }}>
          <StatusStepper status={reservation.status} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, color: T.inkSoft }}>
          <span>Reservado</span>
          <span>Listo</span>
        </div>

        <motion.div
          key={pct}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#F1EFE7",
            borderRadius: 12,
            padding: "9px 14px",
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: T.inkSoft }}>Progreso del lavado</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 13.5, color: T.primary }}>{pct}%</span>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Pressable
          lift={2}
          style={{
            width: "100%",
            marginTop: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            cursor: "pointer",
            background: T.surface,
            border: `1px solid ${T.line}`,
            borderRadius: 16,
            padding: "13px 0",
            boxShadow: T.shadowCard,
          }}
        >
          <Camera size={16} color={T.primary} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: T.primary }}>Ver cámara en vivo</span>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: 999, background: T.coral }}
          />
        </Pressable>
      </motion.div>

      <motion.div variants={itemVariants} style={{ ...card, marginTop: 12 }}>
        <Row label="Vehículo" value={reservation.vehicle} divider />
        <Row label="Cliente" value={reservation.name} divider />
        <Row label="Nivel" value={reservation.tier} divider />
        <Row label="Estado" value={reservation.status} />
      </motion.div>
    </>
  );
}
