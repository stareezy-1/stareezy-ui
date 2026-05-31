/**
 * Requirements: 12.8
 */

/**
 * Formats a numeric amount as Indonesian Rupiah.
 *
 * @param amount - The numeric amount to format.
 * @param numberOnly - When true, strips the "Rp" prefix and decimal part,
 *   returning only the integer portion (e.g. "1.000.000").
 *   When false (default), returns the full formatted string (e.g. "Rp 1.000.000").
 *
 * Examples:
 *   formatToRupiah(1000000)            → "Rp 1.000.000"
 *   formatToRupiah(1500000.50)         → "Rp 1.500.001" (rounded by Intl)
 *   formatToRupiah(1000000, true)      → "1.000.000"
 */
export function formatToRupiah(amount: number, numberOnly?: boolean): string {
  let formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);

  if (!numberOnly) return formatted;

  // Remove the "Rp" prefix and any non-breaking spaces
  formatted = formatted.replace(/\u00A0/g, "");
  formatted = formatted.replace("Rp", "");

  // Remove the decimal part (including the comma separator)
  formatted = formatted.split(",")[0] ?? formatted;

  return formatted.trim();
}
