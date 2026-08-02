// Capa de datos de la app CLIENTE — habla por HTTP con el servidor real.
// Cambiar API_URL si el backend corre en otro host (ej. producción).
const API_URL = "http://localhost:4000";

export async function fetchReservations() {
  const res = await fetch(`${API_URL}/api/reservations`);
  if (!res.ok) throw new Error("No se pudieron cargar las reservas");
  return res.json();
}

export async function createReservation(payload) {
  const res = await fetch(`${API_URL}/api/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("No se pudo crear la reserva");
  return res.json();
}

// Se conecta al stream en tiempo real (Server-Sent Events) del servidor.
// Cada vez que cualquier reserva cambia (la crea el cliente o la avanza el
// admin), el servidor empuja la lista completa actualizada acá — sin polling.
export function subscribeToReservations(onUpdate) {
  const source = new EventSource(`${API_URL}/api/stream`);
  source.onmessage = (event) => {
    try {
      onUpdate(JSON.parse(event.data));
    } catch (e) {
      console.error("Error parseando evento del servidor", e);
    }
  };
  source.onerror = () => {
    // EventSource reintenta la conexión automáticamente
  };
  return () => source.close();
}
