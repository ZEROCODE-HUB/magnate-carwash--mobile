import { Car, Coffee, UtensilsCrossed, ShoppingBag, Droplets, Wind, Sparkles,
  CircleDot, TimerReset, CheckCircle2, Crown, Award, Medal, Shield, Zap,
  Sun, Gauge, Feather, Brush, Leaf, Flower2, Cog, Trophy, Clock, PackageCheck, HandPlatter, Store } from "lucide-react";
import { T } from "./theme.js";

export const STATUS_FLOW = ["Reservado", "Recibido", "Lavando", "Aspirado", "Detailing", "Secado", "Listo"];

export const STATUS_META = {
  "Reservado": { color: "#8A7B66", bg: "#F1EADF", icon: TimerReset },
  "Recibido": { color: T.primary, bg: T.primarySoft, icon: CircleDot },
  "Lavando": { color: T.info, bg: T.infoSoft, icon: Droplets },
  "Aspirado": { color: T.violet, bg: T.violetSoft, icon: Sparkles },
  "Detailing": { color: T.accentDark, bg: T.accentSoft, icon: Sparkles },
  "Secado": { color: T.teal, bg: T.tealSoft, icon: Wind },
  "Listo": { color: T.success, bg: T.successSoft, icon: CheckCircle2 },
};

export const SERVICES = [
  {
    id: "basico",
    name: "Lavado Básico",
    desc: "Exterior + secado",
    tagline: "Lo esencial para que salgas impecable.",
    price: 8000,
    mins: 20,
    icon: Droplets,
    gradient: ["#7C3057", "#57223E", "#3E152B"],
    glow: "rgba(240,169,59,0.32)",
    features: [
      { label: "Lavado exterior con espuma activa", icon: Droplets },
      { label: "Secado con toalla suave", icon: Wind },
      { label: "Limpieza de llantas", icon: CircleDot },
    ],
    addons: [
      { id: "brillo", name: "Llanta brillante", desc: "Líquido protector que hace lucir tus llantas como nuevas", price: 2000, icon: Sun },
      { id: "vidrios", name: "Vidrios cristal", desc: "Limpieza exterior e interior de cristales sin manchas", price: 1500, icon: Zap },
    ],
  },
  {
    id: "premium",
    name: "Lavado Premium",
    desc: "Exterior, interior y aspirado",
    tagline: "El favorito: tu auto brilla por dentro y por fuera.",
    price: 14000,
    mins: 35,
    icon: Sparkles,
    gradient: ["#8A5BA8", "#6A2A4E", "#3E152B"],
    glow: "rgba(122,91,184,0.4)",
    features: [
      { label: "Todo lo del Básico", icon: CheckCircle2 },
      { label: "Aspirado completo interior", icon: Gauge },
      { label: "Tablero y plásticos limpios", icon: Cog },
      { label: "Detalle de puertas y umbrales", icon: Brush },
    ],
    addons: [
      { id: "cera", name: "Cera protectora", desc: "Capa de cera que protege la pintura y le da brillo espejo", price: 4000, icon: Shield },
      { id: "aroma", name: "Aroma a elección", desc: "Perfume suave de larga duración para el interior", price: 1500, icon: Flower2 },
      { id: "motor", name: "Motor a vapor", desc: "Limpieza profunda del motor, sin riesgo con electrónica", price: 3000, icon: Leaf },
    ],
  },
  {
    id: "encerado",
    name: "Encerado Premium",
    desc: "Premium + cera protectora",
    tagline: "El mimo total. Tratamiento completo que se nota.",
    price: 20000,
    mins: 50,
    icon: Wind,
    gradient: ["#C67E16", "#8A5B2E", "#3E152B"],
    glow: "rgba(240,169,59,0.4)",
    features: [
      { label: "Todo lo del Premium", icon: CheckCircle2 },
      { label: "Encerado a mano con cera de carnauba", icon: Shield },
      { label: "Protección y brillo profundo", icon: Trophy },
      { label: "Repaso final a detalle", icon: Feather },
    ],
    addons: [
      { id: "hidro", name: "Tratamiento hidrofugante", desc: "El agua escurre sola y la pintura queda más fácil de cuidar", price: 5000, icon: Droplets },
      { id: "opticas", name: "Pulido de ópticas", desc: "Lentes y faros con menos amarillento y mejor visibilidad", price: 3500, icon: Sun },
    ],
  },
];

// Total de una configuración: base con descuento de nivel + sumatoria de agregados
export function computeTotal(service, addonIds = [], { discount = 0.15 } = {}) {
  const base = Math.round(service.price * (1 - discount));
  const addons = (service.addons || [])
    .filter((a) => addonIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  return { base, addons, total: base + addons };
}

export const TIME_SLOTS = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];

export const TIER_META = {
  "Bronce": { color: "#A0632E", bg: "#F5E4D2", icon: Medal },
  "Plata": { color: "#6B7A80", bg: "#E8EEF0", icon: Award },
  "Oro": { color: T.accentDark, bg: T.accentSoft, icon: Crown },
};

export const CATEGORIES = [
  { id: "carwash", name: "Lavadero", icon: Car, live: true, tagline: "Tu auto como nuevo" },
  { id: "hamburgueseria", name: "Hamburguesería", icon: UtensilsCrossed, live: true, rubro: "restaurant", tagline: "Lo mejor de la parrilla" },
  { id: "cafeteria", name: "Cafetería", icon: Coffee, live: true, rubro: "cafeteria", tagline: "Tu break café ideal" },
  { id: "kiosco", name: "Kiosco", icon: ShoppingBag, live: true, rubro: "kiosco", tagline: "Snacks rápidos & más" },
];

// ─────────────────────────────────────────────────────────────
// Flujo de estados para pedidos de COMIDA
// (distinto al del lavado — proceso de cocina/servicio)
// ─────────────────────────────────────────────────────────────
export const ORDER_STATUS_FLOW = ["Recibido", "En preparación", "Listo para retirar", "Entregado"];

export const ORDER_STATUS_META = {
  "Recibido": { color: "#6B7B76", bg: "#EDF0EF", icon: TimerReset },
  "En preparación": { color: T.primary, bg: T.primarySoft, icon: Sparkles },
  "Listo para retirar": { color: T.accentDark, bg: T.accentSoft, icon: PackageCheck },
  "Entregado": { color: T.success, bg: T.successSoft, icon: CheckCircle2 },
};

// Metadatos visuales por categoría de menú (colores) — imágenes importadas en HomeScreen
export const MENU_CATEGORY_META = {
  restaurant: { name: "Restaurante", icon: UtensilsCrossed, color: T.violet, bg: T.violetSoft },
  cafeteria: { name: "Cafetería", icon: Coffee, color: T.info, bg: T.infoSoft },
  kiosco: { name: "Kiosco", icon: ShoppingBag, color: T.warning, bg: T.warningSoft },
};
