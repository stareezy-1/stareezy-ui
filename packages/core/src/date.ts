/**
 * Uses native Date API only — no external date libraries.
 * Requirements: 12.8
 */

/** ISO string representing an invalid/zero date used as a sentinel value. */
export const INVALID_DATE_ISO_STRING = "0001-01-01T00:00:00Z";

/** Short month names in Indonesian / common locale order. */
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
] as const;

/** Zero-pad a number to at least 2 digits. */
function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Coerce a Date | string to a Date object. */
function toDate(date: Date | string): Date {
  if (date instanceof Date) return date;
  return new Date(date);
}

/**
 * Formats a date as "DD MMM YYYY, HH:mm"
 * e.g. "05 Jan 2024, 09:30"
 *
 * Matches: moment(dateString).format('DD MMM YYYY, HH:mm')
 */
export const formatDateWithYearHours = (date: Date | string): string => {
  const d = toDate(date);
  const day = pad2(d.getDate());
  const month = MONTH_NAMES[d.getMonth()] ?? "???";
  const year = d.getFullYear();
  const hours = pad2(d.getHours());
  const minutes = pad2(d.getMinutes());
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
};

/**
 * Formats a date as "DD MMM YYYY"
 * e.g. "05 Jan 2024"
 *
 * Matches: moment(dateString).format('DD MMM YYYY')
 */
export const formatDateWithYear = (date: Date | string): string => {
  const d = toDate(date);
  const day = pad2(d.getDate());
  const month = MONTH_NAMES[d.getMonth()] ?? "???";
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

/**
 * Formats a date as "DD MMM"
 * e.g. "05 Jan"
 *
 * Matches: moment(dateString).format('DD MMM')
 */
export const formatDateWithMonth = (date: Date | string): string => {
  const d = toDate(date);
  const day = pad2(d.getDate());
  const month = MONTH_NAMES[d.getMonth()] ?? "???";
  return `${day} ${month}`;
};

/**
 * Formats a date as "MMM DD, YYYY" (default) or a custom format.
 * Returns "-" for undefined, empty, or the sentinel INVALID_DATE_ISO_STRING.
 *
 * Supported format tokens: MMM, MM, DD, YYYY
 * e.g. formatDate("2024-01-05") → "Jan 05, 2024"
 *
 * Matches: format(date, dateFormat ?? 'MMM dd, yyyy', { locale })
 */
export const formatDate = (date?: string, dateFormat?: string): string => {
  if (date === undefined) return "-";
  if (!date) return "-";
  if (date === INVALID_DATE_ISO_STRING) return "-";

  const d = toDate(date);
  const fmt = dateFormat ?? "MMM DD, YYYY";

  const monthName = MONTH_NAMES[d.getMonth()] ?? "???";
  return fmt
    .replace("MMM", monthName)
    .replace("MM", pad2(d.getMonth() + 1))
    .replace("DD", pad2(d.getDate()))
    .replace("YYYY", String(d.getFullYear()));
};

/**
 * Returns today's date formatted as "yyyy-MM-dd" (default) or a custom format.
 * Supported format tokens: yyyy, MM, dd
 *
 * Matches: format(today, formatDate ?? 'yyyy-MM-dd')
 */
export const getTodayDate = (dateFormat?: string): string => {
  const today = new Date();
  const fmt = dateFormat ?? "yyyy-MM-dd";

  return fmt
    .replace("yyyy", String(today.getFullYear()))
    .replace("MM", pad2(today.getMonth() + 1))
    .replace("dd", pad2(today.getDate()));
};

/**
 * Generates an array of Date objects for every day from the Unix epoch
 * (1970-01-01) up to (but not including) the given date.
 *
 * Matches: eachDayOfInterval({ start: new Date(1970,0,1), end: subDays(parseISO(date), 1) })
 *
 * Note: the original returned formatted strings; this returns Date objects
 * so callers can format as needed.
 */
export const generateDaysBeforeDate = (date: Date | string): Date[] => {
  const end = toDate(date);
  // Subtract one day
  end.setDate(end.getDate() - 1);

  const start = new Date(1970, 0, 1);
  const days: Date[] = [];

  const current = new Date(start);
  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
};
