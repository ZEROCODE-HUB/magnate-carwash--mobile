import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Car, Crown, X } from "lucide-react";
import { T } from "./theme.js";
import { TIER_META } from "./data.js";
import { screenVariants, EASE, SPRING_SNAPPY } from "./motion.js";
import EagleMark from "./components/shared/EagleMark.jsx";
import HomeScreen from "./components/screens/HomeScreen.jsx";
import { BookStepService, BookStepTime, BookStepConfirm } from "./components/screens/BookSteps.jsx";
import MyReservation from "./components/screens/MyReservation.jsx";
import Celebration from "./components/shared/Celebration.jsx";
import { ToastProvider, useToast } from "./components/shared/Toast.jsx";
import { fetchReservations, createReservation, subscribeToReservations } from "./api/reservations.js";

const screenProps = { variants: screenVariants, initial: "initial", animate: "enter", exit: "exit", className: "screen-stage" };

function LiveBadge({ connected }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.25 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "5px 12px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.16)",
        backdropFilter: "blur(4px)",
      }}
    >
      <span
        className="live-dot"
        style={{
          width: 7,
          height: 7,
          borderRadius: 999,
          background: connected ? T.accentBright : T.error,
        }}
      />
      <span style={{ fontFamily: T.fontMono, fontSize: 10, color: "rgba(255,255,255,0.92)", letterSpacing: 0.8 }}>
        {connected ? "EN VIVO" : "CONECTANDO…"}
      </span>
    </motion.div>
  );
}

function Header({ connected, name, screen }) {
  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      style={{
        position: "relative",
        zIndex: 3,
        padding: "calc(16px + env(safe-area-inset-top, 0px)) 18px 18px",
        background: T.gradHeader,
        color: T.surface,
        boxShadow: "0 18px 40px -24px rgba(62,21,43,0.9)",
        overflow: "hidden",
      }}
    >
      <div className="noise" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div
        style={{
          position: "absolute",
          top: -90,
          right: -60,
          width: 220,
          height: 220,
          borderRadius: 999,
          background: "radial-gradient(circle, rgba(246,190,92,0.28), transparent 68%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -90,
          left: -50,
          width: 190,
          height: 190,
          borderRadius: 999,
          background: "radial-gradient(circle, rgba(255,255,255,0.09), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <EagleMark size={24} />
          <span style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 22, letterSpacing: -0.5, color: T.surface }}>
            Magnate
          </span>
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, ...SPRING_SNAPPY }}
            style={{
              fontFamily: T.fontMono,
              fontSize: 9,
              background: "rgba(246,190,92,0.22)",
              color: T.accentBright,
              padding: "2px 8px",
              borderRadius: 999,
              letterSpacing: 0.8,
            }}
          >
            CLIENTE
          </motion.span>
        </div>
        <LiveBadge connected={connected} />
      </div>

      <div style={{ marginTop: 15, position: "relative" }}>
        <div style={{ fontFamily: T.fontBody, fontSize: 16, color: "rgba(255,255,255,0.96)" }}>
          Hola, {name}{" "}
          <motion.span
            style={{ display: "inline-block" }}
            animate={{ rotate: [0, -16, 12, -8, 0] }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.75 }}
          >
            👋
          </motion.span>
        </div>
        <AnimatePresence>
          {screen === "home" && (
            <motion.div
              key="greet-sub"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ fontFamily: T.fontBody, fontSize: 12, color: "rgba(255,255,255,0.66)", marginTop: 3 }}
            >
              ¿Qué hacés hoy? Tu auto te lo va a agradecer.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function ErrorBanner({ error, onClose }) {
  return (
    <motion.div
      layout
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.32, ease: EASE }}
      style={{
        background: T.errorSoft,
        color: T.error,
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "11px 18px",
        fontFamily: T.fontBody,
        fontSize: 12.5,
        fontWeight: 500,
      }}
    >
      <span style={{ flex: 1 }}>{error}</span>
      <button onClick={onClose} aria-label="Cerrar aviso" style={{ color: T.error, cursor: "pointer", display: "flex", flexShrink: 0 }}>
        <X size={16} />
      </button>
    </motion.div>
  );
}

function BottomNav({ screen, tier, onNavigate, hasReservation }) {
  const tierMeta = TIER_META[tier];
  const items = [
    { id: "home", label: "Inicio", icon: LayoutGrid, interactive: true },
    { id: "myres", label: "Mi lavado", icon: Car, interactive: true, badge: hasReservation },
    { id: "tier", label: tier, icon: Crown, interactive: false, color: tierMeta.color },
  ];

  return (
    <motion.nav
      initial={{ y: 26, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE, delay: 0.14 }}
      style={{
        position: "absolute",
        left: 14,
        right: 14,
        bottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        zIndex: 4,
        display: "flex",
        padding: 6,
        borderRadius: T.rPill,
        background: "rgba(255,253,247,0.88)",
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        border: `1px solid rgba(106,42,78,0.12)`,
        boxShadow: T.shadowFloat,
      }}
    >
      {items.map((item) => {
        const active = screen === item.id;
        const Icon = item.icon;
        const color = item.color || (active ? T.primary : T.inkSoft);
        return (
          <motion.button
            key={item.id}
            onClick={() => item.interactive && onNavigate(item.id)}
            whileTap={{ scale: 0.85 }}
            transition={SPRING_SNAPPY}
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              padding: "9px 0 7px",
              cursor: item.interactive ? "pointer" : "default",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {active && (
              <motion.span
                layoutId="nav-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                style={{
                  position: "absolute",
                  top: 3,
                  bottom: 3,
                  width: 58,
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${T.primarySoft}, ${T.primarySofter})`,
                  boxShadow: "inset 0 0 0 1px rgba(106,42,78,0.06)",
                }}
              />
            )}
            <span style={{ position: "relative", display: "flex" }}>
              <Icon size={21} color={color} strokeWidth={active ? 2.4 : 2} style={{ transition: `color ${T.tBase}` }} />
              {item.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={SPRING_SNAPPY}
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -4,
                    width: 9,
                    height: 9,
                    borderRadius: 999,
                    background: T.error,
                    border: "2px solid #fff",
                  }}
                />
              )}
            </span>
            <span
              style={{
                fontFamily: T.fontBody,
                fontSize: 10,
                fontWeight: 600,
                color,
                letterSpacing: 0.1,
                transition: `color ${T.tBase}`,
              }}
            >
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}

function BootSplash() {
  return (
    <motion.div className="splash" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5, ease: EASE }}>
      <motion.div
        initial={{ scale: 0, rotate: -28 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ ...SPRING_SNAPPY, delay: 0.05 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <EagleMark size={64} color={T.accentBright} animate={false} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.45, ease: EASE }}
        style={{ textAlign: "center", position: "relative", zIndex: 1 }}
      >
        <div style={{ fontFamily: T.fontDisplay, fontWeight: 700, fontSize: 32, letterSpacing: -0.6, color: T.surface }}>
          Magnate
        </div>
        <div style={{ fontFamily: T.fontMono, fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 6, letterSpacing: 2.2 }}>
          TU LUGAR, SIN FILAS
        </div>
      </motion.div>
      <motion.div
        initial="initial"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.16 } } }}
        style={{ display: "flex", gap: 8, position: "relative", zIndex: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            variants={{
              initial: { scale: 0, opacity: 0 },
              show: { scale: 1, opacity: 1, transition: { repeat: Infinity, repeatType: "reverse", duration: 0.7 } },
            }}
            style={{ width: 8, height: 8, borderRadius: 999, background: T.accentBright }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

function AppInner() {
  const [screen, setScreen] = useState("home");
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [time, setTime] = useState(null);
  const [vehicle, setVehicle] = useState("Mi VW Vento gris · AB123CD");
  const [name] = useState("Vos");
  const [tier] = useState("Oro");

  const [reservations, setReservations] = useState([]);
  const [myId, setMyId] = useState(null);
  const [connected, setConnected] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [bootLoading, setBootLoading] = useState(true);
  const [minTimeUp, setMinTimeUp] = useState(false);
  const [error, setError] = useState(null);
  const [celebrated, setCelebrated] = useState(false);
  const [readyCelebrated, setReadyCelebrated] = useState(false);

  const scrollRef = useRef(null);
  const prevStatus = useRef(null);
  const toast = useToast();

  useEffect(() => {
    const t = setTimeout(() => setMinTimeUp(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let alive = true;
    const safety = setTimeout(() => {
      if (alive) setBootLoading(false);
    }, 5000);
    fetchReservations()
      .then((data) => {
        if (alive) {
          setReservations(data);
          setBootLoading(false);
        }
      })
      .catch(() => {
        if (alive) {
          setError("No se pudo conectar con el servidor. ¿Está corriendo `npm run dev` en /server?");
          setBootLoading(false);
        }
      });
    const unsubscribe = subscribeToReservations((data) => {
      if (alive) setReservations(data);
      setConnected(true);
    });
    return () => {
      alive = false;
      clearTimeout(safety);
      unsubscribe();
    };
  }, []);

  const myReservation = reservations.find((r) => r.id === myId);

  useEffect(() => {
    const s = myReservation?.status;
    if (s && prevStatus.current && prevStatus.current !== "Listo" && s === "Listo") {
      setReadyCelebrated(true);
      toast("¡Tu auto está listo!", "success");
      setTimeout(() => setReadyCelebrated(false), 3200);
    }
    if (s) prevStatus.current = s;
  }, [myReservation, toast]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [screen, step]);

  const navigate = useCallback((next) => {
    if (next === screen) return;
    setScreen(next);
  }, [screen]);

  const startBooking = useCallback(() => {
    setService(null);
    setTime(null);
    setStep(0);
    setScreen("book");
  }, []);

  const confirmBooking = useCallback(async () => {
    setConfirming(true);
    try {
      const created = await createReservation({ name, vehicle, tier, service: service.id, time });
      setMyId(created.id);
      setScreen("myres");
      setStep(0);
      setCelebrated(true);
      toast("Reserva confirmada", "success");
      setTimeout(() => setCelebrated(false), 3200);
    } catch (e) {
      toast("No se pudo confirmar la reserva. Intentá de nuevo.", "error", { duration: 3400 });
    } finally {
      setConfirming(false);
    }
  }, [name, vehicle, tier, service, time, toast]);

  const showSplash = !minTimeUp || bootLoading;

  return (
    <div className="app-frame">
      <AnimatePresence>{showSplash && <BootSplash key="splash" />}</AnimatePresence>

      <Header connected={connected} name={name} screen={screen} />

      <AnimatePresence>
        {error && <ErrorBanner key="err" error={error} onClose={() => setError(null)} />}
      </AnimatePresence>

      <main ref={scrollRef} className="scroll-area no-scrollbar">
        <AnimatePresence mode="popLayout" initial={false}>
          {screen === "home" && (
            <motion.div key="home" {...screenProps}>
              <HomeScreen
                onPickCarwash={startBooking}
                myReservation={myReservation}
                onViewRes={() => navigate("myres")}
                bootLoading={bootLoading}
              />
            </motion.div>
          )}

          {screen === "book" && step === 0 && (
            <motion.div key="book-0" {...screenProps}>
              <BookStepService onBack={() => navigate("home")} onSelect={(s) => { setService(s); setStep(1); }} />
            </motion.div>
          )}

          {screen === "book" && step === 1 && (
            <motion.div key="book-1" {...screenProps}>
              <BookStepTime service={service} onBack={() => setStep(0)} onSelect={(t) => { setTime(t); setStep(2); }} />
            </motion.div>
          )}

          {screen === "book" && step === 2 && (
            <motion.div key="book-2" {...screenProps}>
              <BookStepConfirm
                service={service}
                time={time}
                vehicle={vehicle}
                setVehicle={setVehicle}
                onBack={() => setStep(1)}
                onConfirm={confirmBooking}
                loading={confirming}
              />
            </motion.div>
          )}

          {screen === "myres" && (
            <motion.div key="myres" {...screenProps}>
              <MyReservation
                reservation={myReservation}
                onBack={() => navigate("home")}
                celebrated={celebrated}
                ready={myReservation?.status === "Listo"}
                onBook={startBooking}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav screen={screen} tier={tier} onNavigate={navigate} hasReservation={!!myReservation} />

      <Celebration trigger={celebrated || readyCelebrated} message={readyCelebrated ? "¡Tu auto está listo!" : "Reserva confirmada"} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
