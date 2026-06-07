import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motion Tokens",
  description:
    "Motion token group — duration and easing tokens for consistent animations.",
};

const DURATION_TOKENS = [
  {
    id: "motion-duration-instant",
    value: "100ms",
    usage: "Micro-interactions that should feel instant",
  },
  {
    id: "motion-duration-fast",
    value: "150ms",
    usage: "Quick state changes (hover, focus)",
  },
  {
    id: "motion-duration-normal",
    value: "200ms",
    usage: "Standard UI transition duration",
  },
  {
    id: "motion-duration-slow",
    value: "250ms",
    usage: "Slightly heavier transitions",
  },
  {
    id: "motion-duration-enter",
    value: "300ms",
    usage: "Enter/exit animations",
  },
];

const EASING_TOKENS = [
  {
    id: "motion-easing-spring",
    value: "cubic-bezier(0.34,1.56,0.64,1)",
    usage: "Springy overshoot — playful enter animations",
  },
  {
    id: "motion-easing-easeOut",
    value: "cubic-bezier(0,0,0.2,1)",
    usage: "Natural deceleration — elements entering the screen",
  },
  {
    id: "motion-easing-easeIn",
    value: "cubic-bezier(0.4,0,1,1)",
    usage: "Acceleration — elements leaving the screen",
  },
  {
    id: "motion-easing-easeInOut",
    value: "cubic-bezier(0.4,0,0.2,1)",
    usage: "Symmetric — elements moving across the screen",
  },
];

export default function MotionTokensPage() {
  return (
    <div className="prose" style={{ paddingBottom: "4rem" }}>
      <h1>Motion Tokens</h1>
      <p>
        The <code>motion</code> token group provides duration and easing tokens
        for consistent animations across web and React Native.
      </p>

      <h2>Usage</h2>
      <pre>
        <code>{`import { motion } from '@quasify-ui/tokens'

// Duration tokens (number in ms)
motion.duration.instant.value // 100
motion.duration.fast.value    // 150
motion.duration.normal.value  // 200

// Easing tokens (CSS cubic-bezier string)
motion.easing.spring.value   // "cubic-bezier(0.34,1.56,0.64,1)"
motion.easing.easeOut.value  // "cubic-bezier(0,0,0.2,1)"

// Use in CSS transitions
const style = {
  transition: \`all \${motion.duration.normal.value}ms \${motion.easing.easeOut.value}\`
}

// Register in createUi animations
const ui = createUi({
  animations: {
    fadeIn: { duration: motion.duration.enter, easing: motion.easing.easeOut }
  }
})`}</code>
      </pre>

      <h2>Duration Tokens</h2>
      <table>
        <thead>
          <tr>
            <th>Token ID</th>
            <th>Value</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {DURATION_TOKENS.map((tok) => (
            <tr key={tok.id}>
              <td>
                <code>{tok.id}</code>
              </td>
              <td>
                <code>{tok.value}</code>
              </td>
              <td>{tok.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Easing Tokens</h2>
      <table>
        <thead>
          <tr>
            <th>Token ID</th>
            <th>Value</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {EASING_TOKENS.map((tok) => (
            <tr key={tok.id}>
              <td>
                <code>{tok.id}</code>
              </td>
              <td>
                <code style={{ fontSize: "0.75em" }}>{tok.value}</code>
              </td>
              <td>{tok.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
