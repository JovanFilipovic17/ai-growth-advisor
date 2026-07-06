export function formatCurrency(value: number): string {
  return `€${Math.round(value).toLocaleString("en-US")}`;
}

export function formatCompactCurrency(value: number): string {
  if (Math.abs(value) >= 1000) {
    const compact = (value / 1000).toFixed(1).replace(/\.0$/, "");
    return `€${compact}k`;
  }
  return formatCurrency(value);
}
