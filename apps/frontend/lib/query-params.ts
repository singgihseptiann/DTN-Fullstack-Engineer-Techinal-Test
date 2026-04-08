export const buildQueryString = (params?: Record<string, any>) => {
  if (!params) return ""; // ← add this

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.append(key, String(value));
    }
  });
  const qs = query.toString();
  return qs ? `?${qs}` : ""; // ← also prepend "?" here
};
