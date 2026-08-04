// Capa de datos de pedidos de comida — misma convención que reservations.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchMenu(categoria) {
  const url = categoria ? `${API_URL}/api/menu?categoria=${categoria}` : `${API_URL}/api/menu`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("No se pudo cargar el menú");
  return res.json();
}

export async function fetchOrders() {
  const res = await fetch(`${API_URL}/api/orders`);
  if (!res.ok) throw new Error("No se pudieron cargar los pedidos");
  return res.json();
}

export async function createOrder(payload) {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("No se pudo crear el pedido");
  return res.json();
}

export async function advanceOrder(id, status) {
  const res = await fetch(`${API_URL}/api/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("No se pudo actualizar el estado");
  return res.json();
}

// Stream en tiempo real de pedidos (Server-Sent Events)
export function subscribeToOrders(onUpdate) {
  const source = new EventSource(`${API_URL}/api/orders/stream`);
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
