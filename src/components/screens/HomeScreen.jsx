import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Radio, Crown, ArrowRight } from "lucide-react";
import { T } from "../../theme.js";
import { CATEGORIES, STATUS_META, STATUS_FLOW } from "../../data.js";
import { itemVariants, EASE, SPRING_SNAPPY } from "../../motion.js";
import Pressable from "../shared/Pressable.jsx";
import Pill from "../shared/Pill.jsx";
import SectionTitle from "../shared/SectionTitle.jsx";
import { ScreenSkeleton } from "../shared/Skeleton.jsx";

function LiveReservationCard({ reservation, onViewRes }) {
  const meta = STATUS_META[reservation.status];
  const Icon = meta.icon;
  const idx = STATUS_FLOW.indexOf(reservation.status);
  const progress = Math.round(((idx + 1) / STATUS_FLOW.length) * 100);
  const svc = reservation.service;

  return (
    <motion.div variants={itemVariants}>
      <Pressable
        onPress={onViewRes}
        lift={3}
        style={{
          width: "100%",
          textAlign: "left",
          borderRadius: 20,
          padding: 16,
          background: "linear-gradient(150deg, #11584E 0%, #0A332D 70%, #071F1A 100%)",
          color: "white",
          border: "none",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 18px 40px -18px rgba(10,51,45,0.65)",
        }}
      >
        <div style={{ position: "absolute", top: -40, right: -30, width: 140, height: 140, borderRadius: 999, background: "radial-gradient(circle, rgba(232,169,59,0.25), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -50, left: -30, width: 130, height: 130, borderRadius: 999, background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 11px",
              borderRadius: 999,
              background: meta.bg,
              color: meta.color,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: 0.3,
            }}
          >
            <Radio size={10} /> {reservation.status.toUpperCase()}
          </span>
          <motion.span
            whileHover={{ x: 3 }}
            transition={SPRING_SNAPPY}
            style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.85)", fontSize: 12, fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            Ver seguimiento <ChevronRight size={16} />
          </motion.span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, position: "relative" }}>
          <span
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={19} color={meta.color} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: -0.2 }}>{svc}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: "rgba(255,255,255,0.66)", marginTop: 1 }}>
              {reservation.time} · {reservation.vehicle}
            </div>
          </div>
          <motion.div
            key={progress}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING_SNAPPY}
            style={{ textAlign: "right" }}
          >
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 16, color: T.accent }}>{progress}%</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 9.5, color: "rgba(255,255,255,0.55)", letterSpacing: 0.5 }}>COMPLETADO</div>
          </motion.div>
        </div>

        <div style={{ marginTop: 14, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.14)", overflow: "hidden", position: "relative" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            style={{
              height: "100%",
              borderRadius: 999,
              background: "linear-gradient(90deg, #E8A93B, #F5CE72)",
              boxShadow: "0 0 12px rgba(232,169,59,0.6)",
            }}
          />
        </div>
      </Pressable>
    </motion.div>
  );
}

export default function HomeScreen({ onPickCarwash, myReservation, onViewRes, bootLoading }) {
  if (bootLoading) {
    return (
      <>
        <ScreenSkeleton lines={3} />
      </>
    );
  }

  return (
    <>
      {myReservation && <LiveReservationCard reservation={myReservation} onViewRes={onViewRes} />}

      <SectionTitle sub="Todo lo de MGA en un solo lugar" style={myReservation ? { marginTop: 20 } : undefined}>
        ¿Qué querés hacer hoy?
      </SectionTitle>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
      >
        {CATEGORIES.map((c) => {
          const live = c.live;
          return (
            <motion.div key={c.id} variants={itemVariants}>
              <Pressable
                onPress={live ? onPickCarwash : undefined}
                lift={live ? 4 : 0}
                tapScale={live ? 0.97 : 1}
                style={{
                  ...(!live && { pointerEvents: "none" }),
                  width: "100%",
                  textAlign: "left",
                  background: T.surface,
                  border: `1px solid ${T.line}`,
                  borderRadius: 18,
                  padding: 14,
                  cursor: live ? "pointer" : "default",
                  opacity: live ? 1 : 0.55,
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                  alignItems: "flex-start",
                  boxShadow: live ? "0 2px 6px -2px rgba(14,75,67,0.08)" : "none",
                }}
              >
                <motion.div
                  whileHover={live ? { scale: 1.08, rotate: -4 } : undefined}
                  whileTap={live ? { scale: 0.92 } : undefined}
                  transition={SPRING_SNAPPY}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: live ? T.primarySoft : "#E7E4DB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <c.icon size={20} color={live ? T.primary : T.inkSoft} />
                </motion.div>
                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13.5, color: T.ink }}>{c.name}</div>
                </div>
                {live ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: T.primary, fontWeight: 600 }}>
                    Reservar <ArrowRight size={11} style={{ transition: `transform ${T.tBase} ${T.easeOut}` }} />
                  </span>
                ) : (
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: T.inkSoft }}>Próximamente</span>
                )}
              </Pressable>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Pressable
          lift={2}
          style={{
            marginTop: 16,
            width: "100%",
            textAlign: "left",
            borderRadius: 20,
            padding: 16,
            background: "linear-gradient(150deg, #0F1713 0%, #16221F 60%, #0B2A25 100%)",
            border: "1px solid rgba(232,169,59,0.25)",
            color: "white",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="sheen" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 9, position: "relative" }}>
            <motion.span
              animate={{ rotate: [0, -8, 0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
              style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(232,169,59,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Crown size={17} color={T.accent} />
            </motion.span>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: -0.2 }}>Nivel Oro</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: "rgba(255,255,255,0.7)", marginTop: 1, lineHeight: 1.45 }}>
                15% off en todos tus lavados + un premium de regalo este mes.
              </div>
            </div>
          </div>
        </Pressable>
      </motion.div>
    </>
  );
}
