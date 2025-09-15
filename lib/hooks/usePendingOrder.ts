export function savePendingOrder(order: any) {
  localStorage.setItem("pendingOrder", JSON.stringify(order));
}

export function getPendingOrder() {
  const stored = localStorage.getItem("pendingOrder");
  return stored ? JSON.parse(stored) : null;
}

export function clearPendingOrder() {
  localStorage.removeItem("pendingOrder");
}
