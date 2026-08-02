import React, { useState, useEffect, useCallback } from "react";
import { LayoutGrid, Car, Crown } from "lucide-react";
import { T } from "./theme.js";
import { TIER_META } from "./data.js";
import EagleMark from "./components/shared/EagleMark.jsx";
import HomeScreen from "./components/screens/HomeScreen.jsx";
import { BookStepService, BookStepTime, BookStepConfirm } from "./components/screens/BookSteps.jsx";
import MyReservation from "./components/screens/MyReservation.jsx";
import { fetchReservations, createReservation, subscribeToReservations } from "./api/reservations.js";

const navBtn = { flex: 1, background: "transparent", border: "none", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", padding: "4px 0" };

function NavItem({ icon: Icon, label, active, onClick, badge, tierColor }) {
  return (
    <button onClick={onClick} style={navBtn}>
      <div style={{ position: "relative" }}>
        <Icon size={20} color={active ? T.primary : tierColor || T.inkSoft} />
        {badge && <span style={{ position: "absolute", top: -2, right: -4, width: 7, height: 7, borderRadius: 999, background: T.coral }} />}
      </div>
      <span style={{ fontSize: 10, fontFamily: "Inter, sans-serif", fontWeight: 600, color: active ? T.primary : T.inkSoft, marginTop: 3 }}>{label}</span>
    </button>
  );
}

export default function App() {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations().then(setReservations).catch(() => setError("No se pudo conectar con el servidor. ¿Está corriendo `npm run dev` en /server?"));
    const unsubscribe = subscribeToReservations((data) => {
      setReservations(data);
      setConnected(true);
    });
    return unsubscribe;
  }, []);

  const myReservation = reservations.find((r) => r.id === myId);

  const confirmBooking = useCallback(async () => {
    setLoading(true);
    try {
      const created = await createReservation({ name, vehicle, tier, service: service.id, time });
      setMyId(created.id);
      setScreen("myres");
      setStep(0);
    } catch (e) {
      setError("No se pudo confirmar la reserva. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }, [name, vehicle, tier, service, time]);

  const liveBadge = (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 7, height: 7, borderRadius: 999, background: connected ? "#3D8F72" : T.coral }} />
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "white", opacity: 0.85 }}>
        {connected ? "EN VIVO" : "CONECTANDO..."}
      </span>
    </div>
  );

  return (
    <div style={{ minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 12px" }}>
      <div style={{ width: 360, background: T.bg, borderRadius: 26, overflow: "hidden", display: "flex", flexDirection: "column", border: `1px solid ${T.line}`, position: "relative", maxHeight: 660, boxShadow: "0 20px 50px -20px rgba(14,75,67,0.35)" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 110, height: 18, background: T.primary, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, zIndex: 2 }} />

        <div style={{ padding: "20px 18px 14px", background: T.primary, color: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <EagleMark size={20} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17 }}>Magnate</span>
            </div>
            {liveBadge}
          </div>
          <div style={{ marginTop: 12, fontFamily: "Inter, sans-serif", fontSize: 13, opacity: 0.85 }}>Hola, {name} 👋</div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 16, background: T.bg }}>
          {error && (
            <div style={{ background: T.coralSoft, color: T.coral, padding: 10, borderRadius: 10, fontFamily: "Inter, sans-serif", fontSize: 12, marginBottom: 12 }}>
              {error}
            </div>
          )}

          {screen === "home" && (
            <HomeScreen onPickCarwash={() => { setScreen("book"); setStep(0); }} myReservation={myReservation} onViewRes={() => setScreen("myres")} />
          )}
          {screen === "book" && step === 0 && (
            <BookStepService onBack={() => setScreen("home")} onSelect={(s) => { setService(s); setStep(1); }} />
          )}
          {screen === "book" && step === 1 && (
            <BookStepTime service={service} onBack={() => setStep(0)} onSelect={(t) => { setTime(t); setStep(2); }} />
          )}
          {screen === "book" && step === 2 && (
            <BookStepConfirm service={service} time={time} vehicle={vehicle} setVehicle={setVehicle} onBack={() => setStep(1)} onConfirm={confirmBooking} loading={loading} />
          )}
          {screen === "myres" && <MyReservation reservation={myReservation} onBack={() => setScreen("home")} />}
        </div>

        <div style={{ display: "flex", borderTop: `1px solid ${T.line}`, background: T.surface, padding: "8px 0 10px" }}>
          <NavItem icon={LayoutGrid} label="Inicio" active={screen === "home"} onClick={() => setScreen("home")} />
          <NavItem icon={Car} label="Mi lavado" active={screen === "myres"} onClick={() => setScreen("myres")} badge={!!myReservation} />
          <NavItem icon={Crown} label={tier} active={false} tierColor={TIER_META[tier].color} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
