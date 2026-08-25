const THEME_KEY = "theme";
const ACCENT_KEY = "accent";

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function saveAccent(accent) {
  localStorage.setItem(ACCENT_KEY, accent);
}

export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || "system";
}

export function loadAccent() {
  return localStorage.getItem(ACCENT_KEY) || "emerald";
}
