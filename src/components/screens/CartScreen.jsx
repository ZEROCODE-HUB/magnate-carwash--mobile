import React from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Trash2, ShoppingCart, ArrowRight, ChevronLeft, Receipt } from "lucide-react";
import { T } from "../../theme.js";
import { MENU_CATEGORY_META } from "../../data.js";
import { itemVariants, SPRING_SNAPPY, EASE } from "../../motion.js";
import { card, primaryBtn } from "../shared/ui.js";
import Pressable from "../shared/Pressable.jsx";
import RippleButton from "../shared/Ripple.jsx";
import CountUp from "../shared/CountUp.jsx";
import { useToast } from "../shared/Toast.jsx";
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

function Counter({ qty, onAdd, onRemove, stock = 99 }) {
  const atMax = qty >= stock;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: T.bgSunken, borderRadius: T.rPill, padding: "4px 8px" }}>
      <motion.button
        whileTap={{ scale: 0.82 }}
        transition={SPRING_SNAPPY}
        onClick={onRemove}
        disabled={qty <= 1}
        style={{ width: 26, height: 26, borderRadius: 999, border: "none", background: qty <= 1 ? "rgba(0,0,0,0.05)" : T.primarySoft, color: T.primary, cursor: qty <= 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
      >
        <Minus size={14} strokeWidth={2.6} />
      </motion.button>
      <motion.span
        key={qty}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={SPRING_SNAPPY}
        style={{ fontFamily: T.fontMono, fontSize: 14, fontWeight: 700, color: T.ink, minWidth: 20, textAlign: "center" }}
      >
        {qty}
      </motion.span>
      <motion.button
        whileTap={{ scale: 0.82 }}
        transition={SPRING_SNAPPY}
        onClick={onAdd}
        disabled={atMax}
        style={{ width: 26, height: 26, borderRadius: 999, border: "none", background: atMax ? "rgba(0,0,0,0.05)" : T.primarySoft, color: T.primary, cursor: atMax ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
      >
        <Plus size={14} strokeWidth={2.6} />
      </motion.button>
    </div>
  );
}

export default function CartScreen({ categoria, cart, setCart, onBack, onConfirm, loading }) {
  const meta = MENU_CATEGORY_META[categoria] || {};
  const toast = useToast();

  const updateQty = (itemId, delta) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === itemId);
      if (delta > 0) {
        if (existing) {
          return prev.map((c) => (c.id === itemId ? { ...c, qty: c.qty + delta } : c));
        }
        return [...prev, { ...prev.find((x) => x.id === itemId), qty: delta }];
      } else {
        if (!existing) return prev;
        if (existing.qty <= 1) {
          return prev.filter((c) => c.id !== itemId);
        }
        return prev.map((c) => (c.id === itemId ? { ...c, qty: c.qty - 1 } : c));
      }
    });
  };

  const removeItem = (itemId) => {
    setCart((prev) => prev.filter((c) => c.id !== itemId));
    toast("Item eliminado del carrito", "info");
  };

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  const handleConfirm = () => {
    if (cart.length === 0) {
      toast("El carrito está vacío", "info");
      return;
    }
    onConfirm(cart);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      {/* Hero compacto con imagen del rubro */}
      <div
        style={{
          height: 100,
          borderRadius: T.rXl,
          overflow: "hidden",
          position: "relative",
          marginBottom: 18,
          boxShadow: T.shadowCard,
        }}
      >
        <img src={CATEGORY_IMAGES[categoria] || imgRestaurant} alt={meta.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.45)" }} />
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
        >
          <ChevronLeft size={18} color={T.ink} />
        </motion.button>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }}>
          <Receipt size={24} color="#fff" />
          <div>
            <div style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 19, color: "#fff", letterSpacing: -0.4 }}>Tu carrito</div>
            <div style={{ fontFamily: T.fontBody, fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{cart.length} {cart.length === 1 ? "producto" : "productos"} · {meta.name}</div>
          </div>
        </div>
      </div>

      {/* Lista de items */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, marginBottom: 14 }}
      >
        {cart.length === 0 ? (
          <motion.div variants={itemVariants} style={{ ...card, textAlign: "center", padding: "42px 18px" }}>
            <ShoppingCart size={34} color={T.inkFaint} style={{ marginBottom: 8 }} />
            <div style={{ fontFamily: T.fontBody, fontWeight: 600, fontSize: 15, color: T.ink, marginBottom: 4 }}>Tu carrito está vacío</div>
            <div style={{ fontFamily: T.fontBody, fontSize: 12.5, color: T.inkSoft }}>Agregá productos desde el menú</div>
          </motion.div>
        ) : (
          cart.map((c) => (
            <motion.div key={c.id} variants={itemVariants}>
              <div
                style={{
                  ...card,
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  padding: 14,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 15.5, color: T.ink, letterSpacing: -0.2 }}>{c.name}</span>
                    <span style={{ fontFamily: T.fontMono, fontSize: 12.5, fontWeight: 600, color: T.inkSoft, fontVariantNumeric: "tabular-nums" }}>
                      ${c.price.toLocaleString("es-AR")} c/u
                    </span>
                  </div>
                  <div style={{ fontFamily: T.fontBody, fontSize: 11.5, color: T.inkSoft, marginTop: 2, lineHeight: 1.4 }}>{c.description}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7, flexShrink: 0 }}>
                  <Counter qty={c.qty} onAdd={() => updateQty(c.id, 1)} onRemove={() => updateQty(c.id, -1)} />
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    transition={SPRING_SNAPPY}
                    onClick={() => removeItem(c.id)}
                    style={{ width: 24, height: 24, borderRadius: 999, border: "none", background: "transparent", color: T.error, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
                    aria-label="Eliminar"
                  >
                    <Trash2 size={13} strokeWidth={2.4} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Total destacado */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: EASE, delay: 0.1 }}
        style={{
          ...card,
          padding: "20px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          marginBottom: 22,
          background: "linear-gradient(150deg, #2A1C13 0%, #1B110B 62%, #231024 100%)",
          border: "1px solid rgba(246,190,92,0.26)",
        }}
      >
        <div>
          <div style={{ fontFamily: T.fontBody, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>Total del pedido</div>
          <motion.div
            key={total}
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING_SNAPPY}
            style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 26, color: T.accentBright, fontVariantNumeric: "tabular-nums", marginTop: 2 }}
          >
            ${total > 0 ? <CountUp value={total} /> : "0"}
          </motion.div>
        </div>
        <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.03 }} transition={SPRING_SNAPPY}>
          <ShoppingBag size={20} color="#fff" />
        </motion.div>
      </motion.div>

      {/* CTA grande */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: EASE, delay: 0.2 }}
        style={{ paddingBottom: "calc(14px + env(safe-area-inset-bottom, 0px))" }}
      >
        <RippleButton
          onPress={handleConfirm}
          disabled={loading || cart.length === 0}
          className="press-cta"
          style={{ ...primaryBtn, opacity: loading || cart.length === 0 ? 0.6 : 1, height: 56, gap: 10 }}
        >
          {loading ? (
            <>
              <span className="anim-spin" style={{ width: 17, height: 17, borderRadius: 999, border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", flexShrink: 0 }} />
              Confirmando…
            </>
          ) : (
            <>
              Confirmar pedido · ${total.toLocaleString("es-AR")} <ArrowRight size={17} />
            </>
          )}
        </RippleButton>
      </motion.div>
    </div>
  );
}
