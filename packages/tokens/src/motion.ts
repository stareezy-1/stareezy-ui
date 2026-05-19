/**
 * Motion tokens for Stareezy UI.
 *
 * Provides duration and easing tokens for consistent animations
 * across web and React Native.
 *
 * Requirements: 3.2
 */

import { token } from "./token";

export const motion = {
  duration: {
    /** 100ms — for micro-interactions that should feel instant */
    instant: token(100, "motion-duration-instant"),
    /** 150ms — for quick state changes (hover, focus) */
    fast: token(150, "motion-duration-fast"),
    /** 200ms — standard UI transition duration */
    normal: token(200, "motion-duration-normal"),
    /** 250ms — for slightly heavier transitions */
    slow: token(250, "motion-duration-slow"),
    /** 300ms — for enter/exit animations */
    enter: token(300, "motion-duration-enter"),
  },
  easing: {
    /** Springy overshoot — great for playful enter animations */
    spring: token("cubic-bezier(0.34,1.56,0.64,1)", "motion-easing-spring"),
    /** Ease out — natural deceleration for elements entering the screen */
    easeOut: token("cubic-bezier(0,0,0.2,1)", "motion-easing-easeOut"),
    /** Ease in — acceleration for elements leaving the screen */
    easeIn: token("cubic-bezier(0.4,0,1,1)", "motion-easing-easeIn"),
    /** Ease in-out — symmetric for elements moving across the screen */
    easeInOut: token("cubic-bezier(0.4,0,0.2,1)", "motion-easing-easeInOut"),
  },
} as const;
