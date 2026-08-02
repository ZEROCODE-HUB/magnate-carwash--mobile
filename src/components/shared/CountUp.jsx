import React from "react";
import { useCountUp } from "../../hooks.js";

// Número con animación de conteo al montar o cambiar de valor.
export default function CountUp({ value, duration = 700, formatter = (n) => n.toLocaleString("es-AR") }) {
  const display = useCountUp(value, { duration });
  return <>{formatter(display)}</>;
}
