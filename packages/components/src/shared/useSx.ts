/**
 * useSx — helper for components that spread boxProps directly onto Box.
 *
 * These components (Accordion, Avatar, Checkbox, etc.) accept full BoxProps
 * spread onto their root Box. When an `sx` prop is present it must be
 * destructured out of boxProps and spread separately so Box can resolve it.
 *
 * Since Box's resolver handles all BoxProps already, and `sx` contains BoxProps
 * style keys, spreading `...sx` alongside `...boxProps` is safe and correct.
 *
 * @example
 * const { sx, boxRest } = extractSxFromBoxProps(boxProps);
 * return <Box {...boxRest} {...sx} />;
 */
import type { SxProp } from "./sx";

/**
 * Splits an `sx` prop out of a boxProps spread object.
 * Returns sx (or {}) and the remaining boxProps without `sx`.
 */
export function extractSxFromBoxProps<P extends { sx?: SxProp }>(
  boxProps: P,
): { sx: SxProp; boxRest: Omit<P, "sx"> } {
  const { sx = {}, ...boxRest } = boxProps;
  return { sx: sx as SxProp, boxRest: boxRest as Omit<P, "sx"> };
}
