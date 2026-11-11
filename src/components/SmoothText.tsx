import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

interface SmoothTextProps {
  text?: string
  color?: string
  font?: React.CSSProperties
  delay?: number
  stagger?: number
  duration?: number
  align?: "left" | "center" | "right"
  style?: React.CSSProperties
}

export default function SmoothText({
  text = "Elegance plated perfectly",
  color = "#222222",
  font,
  delay = 0,
  stagger = 0.07,
  duration = 0.9,
  align = "left",
  style,
}: SmoothTextProps) {
  const reduced = useReducedMotion()
  const words = text.trim().split(/\s+/)

  return (
    <motion.div
      role="heading"
      aria-level={2}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      style={{
        width: "100%",
        fontFamily: '"DM Serif Text", serif',
        fontSize: 48,
        lineHeight: 1.2,
        fontWeight: 400,
        ...font,
        color,
        textAlign: align,
        ...style,
      }}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              paddingBottom: ".14em",
              marginBottom: "-.14em",
            }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              variants={{
                hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : "105%" },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: reduced ? 0 : duration,
                delay: reduced ? 0 : delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </motion.div>
  )
}
