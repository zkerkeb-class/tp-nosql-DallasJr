const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(path, { method = "GET", token, body, headers } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // 204 => no content
  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = data?.error || `Erreur HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}
