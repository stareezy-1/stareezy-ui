/**
 * ISO week utilities ported from rekosistem-components/src/utils/isoWeeks.ts
 * Uses native Date API only — no external date libraries.
 * Requirements: 12.8
 */

/**
 * Returns the ISO week number (1–53) for a given date.
 * ISO weeks start on Monday; week 1 is the week containing the first Thursday of the year.
 */
export function getISOWeek(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  // Set to nearest Thursday: current date + 4 - current day number (Mon=1, Sun=7)
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
}

/**
 * Returns the number of ISO weeks in the given year (52 or 53).
 *
 * A year has 53 ISO weeks if January 1st is a Thursday,
 * or if it is a leap year and January 1st is a Wednesday.
 *
 * Equivalent to date-fns `getISOWeeksInYear`.
 *
 * Examples:
 *   isoWeeks(2015) → 53
 *   isoWeeks(2020) → 53
 *   isoWeeks(2023) → 52
 *   isoWeeks(2024) → 52
 */
export function isoWeeks(year: number): number {
  // The last ISO week of the year is the week containing Dec 28
  // (Dec 28 is always in the last ISO week of the year)
  const dec28 = new Date(year, 11, 28);
  return getISOWeek(dec28);
}

/**
 * Returns the start of the ISO week (Monday) for a given date.
 */
export function startOfISOWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  // Monday = 1, so offset = (day === 0 ? -6 : 1 - day)
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Returns the end of the ISO week (Sunday) for a given date.
 */
export function endOfISOWeek(date: Date): Date {
  const start = startOfISOWeek(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

/**
 * Returns an array of Date objects representing each day of the ISO week
 * (Monday through Sunday) that contains the given date.
 */
export function getISOWeekDays(date: Date): Date[] {
  const start = startOfISOWeek(date);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}

/**
 * Returns the ISO week number and year for a given date.
 * The ISO year may differ from the calendar year near year boundaries.
 */
export function getISOWeekYear(date: Date): { week: number; year: number } {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const year = d.getUTCFullYear();
  const yearStart = new Date(Date.UTC(year, 0, 1));
  const week = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7,
  );
  return { week, year };
}
