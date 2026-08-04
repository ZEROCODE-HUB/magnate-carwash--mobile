import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Package, CheckCircle2, PartyPopper, ChevronLeft } from "lucide-react";
import { T } from "../../theme.js";
import { ORDER_STATUS_META, ORDER_STATUS_FLOW, MENU_CATEGORY_META } from "../../data.js";
import { itemVariants, SPRING_SNAPPY, EASE } from "../../motion.js";
import { card, primaryBtn } from "../shared/ui.js";
import { Row } from "../shared/Row.jsx";
import StatusStepper from "../shared/StatusStepper.jsx";
import RippleButton from "../shared/Ripple.jsx";
import imgRestaurant from "../../imagenes/restaurante/restaurante-1.jpeg";
import imgCafe from "../../imagenes/cafe/cafe-1.jpeg";
import imgKiosco from "../../imagenes/restaurante/restaurante-2.jpeg";
import imgCarwash from "../../imagenes/carwash/carwash-1.jpeg";

const CATEGORY_IMAGES = {
  restaurant: imgRestaurant,
  cafeteria: imgCafe,
  kiosco: imgKiosco,
  carwash: imgCarwash,
};

function ProgressRing({ pct, size = 120, stroke = 10, color = T.primary }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="ringGradOrder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={T.accentBright} />
            <stop offset="55%" stopColor={T.accent} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={T.bgSunken} strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGradOrder)"
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
          style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 26, color: T.ink, letterSpacing: -1 }}
        >
          {pct}%
        </motion.span>
        <span style={{ fontFamily: T.fontMono, fontSize: 8, color: T.inkFaint, letterSpacing: 1.4, marginTop: 2 }}>LISTO</span>
      </div>
    </div>
  );
}

export default function MyOrder({ order, categoria, onBack, ready, onOrderMore }) {
  const meta = ORDER_STATUS_META[order?.status];
  const Icon = meta?.icon;
  const idx = order ? ORDER_STATUS_FLOW.indexOf(order.status) : -1;
  const pct = order ? Math.round(((idx + 1) / ORDER_STATUS_FLOW.length) * 100) : 0;
  const catMeta = order ? (MENU_CATEGORY_META[order.categoria] || {}) : {};
  const orderTotal = order ? order.items.reduce((sum, i) => sum + i.price * i.qty, 0) : 0;
  const totalItems = order ? order.items.reduce((sum, i) => sum + i.qty, 0) : 0;

  if (!order) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingBottom: 100 }}>
        <div
          style={{
            height: 200,
            borderRadius: T.rXl,
            overflow: "hidden",
            position: "relative",
            backgroundImage: `url(${CATEGORY_IMAGES[categoria] || CATEGORY_IMAGES.carwash})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: T.shadowCard,
          }}
        />

        <motion.div
          variants={itemVariants}
          style={{
            ...card,
            textAlign: "center",
            padding: "42px 22px",
            borderRadius: T.rXl,
            background: "linear-gradient(165deg, #FFFDF7 0%, #F6ECE0 100%)",
            border: "1px solid #E9DCC8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 84, height: 84, borderRadius: 28, background: "linear-gradient(150deg, #F3E2EC, #E8D1F0)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}
          >
            <ShoppingBag size={36} color={T.primary} />
          </motion.div>
          <div style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 22, color: T.ink, marginBottom: 8, letterSpacing: -0.4, fontStyle: "italic" }}>
            Tu pedido te está esperando
          </div>
          <div style={{ fontFamily: T.fontBody, fontSize: 13, color: T.inkSoft, lineHeight: 1.6, maxWidth: 250, marginBottom: 24 }}>
            Todavía no tenés un pedido activo. Elegí un rubro y armá tu pedido, seguí el progreso en vivo.
          </div>
          <RippleButton onPress={onOrderMore} className="press-cta" style={{ ...primaryBtn, width: "auto", padding: "15px 28px", gap: 9 }}>
            Hacer mi primer pedido <ArrowRight size={16} />
          </RippleButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingBottom: 30 }}>
      {/* Hero con imagen del rubro */}
      <div
        style={{
          height: 200,
          borderRadius: T.rXl,
          overflow: "hidden",
          position: "relative",
          boxShadow: T.shadowCard,
        }}
      >
        <img src={CATEGORY_IMAGES[order.categoria] || imgRestaurant} alt={catMeta.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5)" }} />
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.88 }}
          transition={SPRING_SNAPPY}
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            width: 36,
            height: 36,
            borderRadius: 999,
            background: "rgba(255,255,255,0.92)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: T.shadowXs,
            cursor: "pointer",
            zIndex: 2,
          }}
          aria-label="Volver"
        >
          <ChevronLeft size={18} color={T.ink} />
        </motion.button>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)" }} />
        <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, color: "#fff", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 11px", borderRadius: 999, background: "rgba(255,255,255,0.18)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: catMeta.color || T.primary }} />
            <span style={{ fontFamily: T.fontBody, fontSize: 11.5, fontWeight: 600, color: "#fff" }}>{catMeta.name}</span>
          </div>
          <div style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: -0.4, marginTop: 4 }}>
            Seguimiento en vivo
          </div>
          <div style={{ fontFamily: T.fontBody, fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
            {order.id?.slice(0, 8)} · {totalItems} producto{totalItems === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      {/* Celebración cuando está listo */}
      <AnimatePresence>
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
              padding: "13px 16px",
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
            <span style={{ fontFamily: T.fontBody, fontSize: 13, fontWeight: 600 }}>¡Tu pedido está listo! Puedes retirarlo.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ProgressRing + estado */}
      <motion.div variants={itemVariants} style={{ ...card, textAlign: "center", paddingTop: 28, paddingBottom: 20 }}>
        <ProgressRing pct={pct} color={catMeta.color} />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ ...SPRING_SNAPPY, delay: 0.15 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 16,
            padding: "7px 16px",
            borderRadius: 999,
            background: meta?.bg,
            color: meta?.color,
            position: "relative",
          }}
        >
          <span style={{ width: 32, height: 32, borderRadius: 999, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: T.shadowXs }}>
            <Icon size={15} color={meta?.color} />
          </span>
          <span style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 15 }}>{order.status}</span>
        </motion.div>

        <div style={{ fontFamily: T.fontBody, fontSize: 12.5, color: T.inkSoft, marginTop: 8 }}>
          {catMeta.name} · {totalItems} {totalItems === 1 ? "producto" : "productos"}
        </div>

        <div style={{ margin: "22px 0 6px" }}>
          <StatusStepper status={order.status} flow={ORDER_STATUS_FLOW} meta={ORDER_STATUS_META} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: T.fontMono, fontSize: 9, color: T.inkFaint, letterSpacing: 0.5, padding: "0 4px" }}>
          <span>RECIBIDO</span>
          <span>ENTREGADO</span>
        </div>
      </motion.div>

      {/* Items del pedido */}
      <motion.div variants={itemVariants} style={{ ...card, marginTop: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Package size={15} color={T.success} />
          <span style={{ fontFamily: T.fontBody, fontSize: 11.5, fontWeight: 700, color: T.ink, letterSpacing: 0.2 }}>PRODUCTOS</span>
        </div>
        {order.items.map((it, i) => (
          <div key={it.id} style={{ padding: "6px 0", borderBottom: i < order.items.length - 1 ? `1px solid ${T.line}` : "none", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: T.fontBody, fontSize: 13, color: T.ink }}>{it.name} x{it.qty}</span>
            <span style={{ fontFamily: T.fontMono, fontSize: 12.5, fontWeight: 600, color: T.inkSoft, fontVariantNumeric: "tabular-nums" }}>
              ${(it.price * it.qty).toLocaleString("es-AR")}
            </span>
          </div>
        ))}
        <div style={{ height: 1, background: T.line, margin: "12px 0" }} />
        <Row label="Cliente" value={order.name} divider />
        <Row label="Rubro" value={catMeta.name || order.categoria} divider />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${T.line}` }}>
          <span style={{ fontFamily: T.fontBody, fontSize: 13, fontWeight: 700, color: T.ink }}>Total</span>
          <motion.span
            key={orderTotal}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING_SNAPPY}
            style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 22, color: T.primary, fontVariantNumeric: "tabular-nums" }}
          >
            ${orderTotal.toLocaleString("es-AR")}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
