// utils/formatCurrency.js

export function formatSalary(
  value,
  { currency = "USD", locale = navigator.language } = {},
) {
  if (value == null) return "—";

  const useCompact = value >= 10000 && value < 1000000;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: useCompact ? "compact" : "standard",
    maximumFractionDigits: useCompact ? 1 : 0,
  }).format(value);
}

export function formatSalaryRange({
  min,
  max,
  currency = "USD",
  locale = navigator.language,
}) {
  if (!min && !max) return "—";

  const formattedMin =
    min != null ? formatSalary(min, { currency, locale }) : null;

  const formattedMax =
    max != null ? formatSalary(max, { currency, locale }) : null;

  if (formattedMin && formattedMax) {
    return `${formattedMin} – ${formattedMax}`;
  }

  return formattedMin || formattedMax;
}
