import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Car, Camera, ArrowRight, Sparkles, CheckCircle2, PartyPopper } from "lucide-react";
import { T } from "../../theme.js";
import { STATUS_META, STATUS_FLOW, SERVICES } from "../../data.js";
import { itemVariants, SPRING_SNAPPY, EASE } from "../../motion.js";
import { card, primaryBtn } from "../shared/ui.js";
import { Row, BackRow } from "../shared/Row.jsx";
import StatusStepper from "../shared/StatusStepper.jsx";
import Pressable from "../shared/Pressable.jsx";
import RippleButton from "../shared/Ripple.jsx";

function ProgressRing({ pct, size = 116, stroke = 10 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={T.accentBright} />
            <stop offset="55%" stopColor={T.accent} />
            <stop offset="100%" stopColor={T.primary} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={T.bgSunken} strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * pct) / 100 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <motion.span
          key={pct}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={SPRING_SNAPPY}
          style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 27, color: T.ink, letterSpacing: -1 }}
        >
          {pct}%
        </motion.span>
        <span style={{ fontFamily: T.fontMono, fontSize: 8, color: T.inkFaint, letterSpacing: 1.4, marginTop: 2 }}>LISTO</span>
      </div>
    </div>
  );
}

export default function MyReservation({ reservation, onBack, celebrated, ready, onBook }) {
  if (!reservation) {
    return (
      <>
        <BackRow onBack={onBack} title="Mi lavado" />
        <motion.div
          variants={itemVariants}
          style={{
            ...card,
            textAlign: "center",
            padding: "38px 22px",
            marginTop: 6,
            background: "linear-gradient(165deg, #FFFDF7 0%, #F6ECE0 100%)",
            border: "1px solid #E9DCC8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: -40, right: -30, width: 150, height: 150, borderRadius: 999, background: "radial-gradient(circle, rgba(240,169,59,0.2), transparent 68%)", pointerEvents: "none" }} />
          <motion.div
            animate={{ y: [0, -7, 0], rotate: [0, -3, 0, 3, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 82, height: 82, borderRadius: 28, background: "linear-gradient(150deg, #F3E2EC, #D9B8CB)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
          >
            <Car size={34} color={T.primary} />
            <span className="anim-ring" style={{ position: "absolute", inset: -6, borderRadius: 28, background: "transparent" }} />
          </motion.div>
          <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 23, color: T.ink, marginTop: 20, letterSpacing: -0.4, fontStyle: "italic" }}>
            Tu auto te está esperando
          </div>
          <div style={{ fontFamily: T.fontBody, fontSize: 13, color: T.inkSoft, marginTop: 6, lineHeight: 1.6, maxWidth: 250 }}>
            Todavía no tenés una reserva activa. Elegí un servicio y mirá el lavado en vivo, paso a paso.
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.42, ease: EASE }}
            style={{ width: "100%" }}
          >
            <RippleButton onPress={onBook} className="press-cta" style={{ ...primaryBtn, marginTop: 22, gap: 9 }}>
              Reservar mi primer lavado <ArrowRight size={16} />
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
        {celebrated && !ready && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={SPRING_SNAPPY}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: `linear-gradient(120deg, ${T.primary} 0%, ${T.primaryDark} 100%)`,
              color: "white",
              borderRadius: T.rMd,
              padding: "12px 15px",
              marginBottom: 13,
              boxShadow: T.shadowBtn,
            }}
          >
            <motion.span
              animate={{ rotate: [0, -20, 16, 0] }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              style={{ display: "flex" }}
            >
              <Sparkles size={17} color={T.accentBright} />
            </motion.span>
            <span style={{ fontFamily: T.fontBody, fontSize: 12.5, fontWeight: 600 }}>Reserva confirmada. Tu turno queda guardado.</span>
          </motion.div>
        )}
        {ready && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={SPRING_SNAPPY}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: `linear-gradient(120deg, ${T.success} 0%, #23704A 100%)`,
              color: "white",
              borderRadius: T.rMd,
              padding: "12px 15px",
              marginBottom: 13,
              boxShadow: "0 14px 26px -12px rgba(46,143,91,0.6)",
            }}
          >
            <motion.span
              animate={{ rotate: [0, -18, 14, 0] }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              style={{ display: "flex" }}
            >
              <PartyPopper size={17} color={T.accentBright} />
            </motion.span>
            <span style={{ fontFamily: T.fontBody, fontSize: 12.5, fontWeight: 600 }}>
              ¡Tu auto está listo! Podes pasar a retirarlo.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <BackRow onBack={onBack} title="Seguimiento en vivo" sub={reservation.id?.toUpperCase?.() || "Reserva activa"} />

      <motion.div variants={itemVariants} style={{ ...card, textAlign: "center", paddingTop: 24 }}>
        <ProgressRing pct={pct} />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ ...SPRING_SNAPPY, delay: 0.15 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 14,
            padding: "6px 14px 6px 8px",
            borderRadius: 999,
            background: meta.bg,
            color: meta.color,
            position: "relative",
          }}
        >
          <span style={{ width: 30, height: 30, borderRadius: 999, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: T.shadowXs }}>
            <Icon size={15} color={meta.color} />
          </span>
          <span style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 14.5 }}>{reservation.status}</span>
          {inProgress && <span className="anim-ring-warm" style={{ position: "absolute", inset: -3, borderRadius: 999, background: "transparent" }} />}
        </motion.div>

        <div style={{ fontFamily: T.fontBody, fontSize: 12.5, color: T.inkSoft, marginTop: 8 }}>{svc?.name} · {reservation.time}</div>

        <div style={{ margin: "22px 0 8px" }}>
          <StatusStepper status={reservation.status} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: T.fontMono, fontSize: 9, color: T.inkFaint, letterSpacing: 0.5 }}>
          <span>RESERVADO</span>
          <span>LISTO</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Pressable
          lift={3}
          style={{
            width: "100%",
            marginTop: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            cursor: "pointer",
            background: T.gradCard,
            border: `1px solid ${T.line}`,
            borderRadius: T.rLg,
            padding: "14px 0",
            boxShadow: T.shadowCard,
          }}
        >
          <span style={{ width: 30, height: 30, borderRadius: 999, background: T.primarySoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Camera size={14} color={T.primary} />
          </span>
          <span style={{ fontFamily: T.fontBody, fontSize: 13, fontWeight: 700, color: T.primary }}>Ver cámara en vivo</span>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: 999, background: T.error }}
          />
        </Pressable>
      </motion.div>

      <motion.div variants={itemVariants} style={{ ...card, marginTop: 13 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <CheckCircle2 size={15} color={T.success} />
          <span style={{ fontFamily: T.fontBody, fontSize: 12, fontWeight: 700, color: T.ink, letterSpacing: 0.2 }}>DATOS DE LA RESERVA</span>
        </div>
        <Row label="Vehículo" value={reservation.vehicle} divider />
        <Row label="Cliente" value={reservation.name} divider />
        <Row label="Nivel" value={reservation.tier} divider />
        <Row label="Estado" value={reservation.status} />
      </motion.div>
    </>
  );
}
