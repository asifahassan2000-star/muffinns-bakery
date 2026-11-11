import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

interface RestaurantHeroProps {
  title?: string
  image?: string
  logo?: string
  badge?: string
  buttonText?: string
  buttonLink?: string
  style?: React.CSSProperties
}

export default function RestaurantHero({
  title = "Elegance plated perfectly",
  image = "https://framerusercontent.com/images/BR8yCN9DGYK5v5AZrU502Cdrk.jpg",
  logo = "https://framerusercontent.com/images/z3m44mfAz9qRUuLQx3Sp20PB8.svg",
  badge = "https://framerusercontent.com/images/YvsutxO6W0bP0T3NMigCo5tinCA.svg",
  buttonText = "Book a table",
  buttonLink = "",
  style,
}: RestaurantHeroProps) {
  const reduced = useReducedMotion()

  return (
    <section
      style={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        background: "#ede9e3",
        padding: "clamp(160px,22vw,300px) 30px 60px",
        minHeight: 676,
        ...style,
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: -2, overflow: "hidden" }}>
        <motion.img
          src={image}
          alt="Elegant restaurant dining room"
          initial={{ scale: reduced ? 1 : 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg,rgba(0,0,0,.08),rgba(0,0,0,.35))",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 30,
          top: 30,
          padding: "20px 26px",
          background: "#fff",
          borderRadius: 10,
        }}
      >
        <img
          src={logo}
          alt="Shehran"
          style={{ display: "block", width: 147, maxWidth: "25vw" }}
        />
      </div>

      <div style={{ maxWidth: 1300, margin: "0 auto", textAlign: "right", color: "#fff" }}>
        <p
          style={{
            fontFamily: '"DM Sans",sans-serif',
            fontSize: 16,
            textTransform: "uppercase",
            opacity: 0.8,
            margin: "0 0 20px",
          }}
        >
          Serving since 1982
        </p>

        <motion.h1
          aria-label={title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            fontFamily: '"DM Serif Text",serif',
            fontWeight: 400,
            fontSize: "clamp(36px,4.71vw,64px)",
            lineHeight: 1,
            margin: "0 0 0 auto",
            maxWidth: 654,
            textTransform: "uppercase",
          }}
        >
          {title.split(/\s+/).map((word, i) => (
            <React.Fragment key={i}>
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "top",
                  paddingBottom: ".13em",
                  marginBottom: "-.13em",
                }}
              >
                <motion.span
                  style={{ display: "inline-block" }}
                  variants={{
                    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : "105%" },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: reduced ? 0 : 1.1,
                    delay: reduced ? 0 : i * 0.085,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>{" "}
            </React.Fragment>
          ))}
        </motion.h1>

        <motion.a
          href={buttonLink || undefined}
          whileHover={reduced ? {} : { y: -3 }}
          whileTap={reduced ? {} : { scale: 0.98 }}
          style={{
            display: "inline-block",
            marginTop: 50,
            padding: "20px 40px",
            background: "#a32834",
            color: "#fff",
            fontFamily: '"DM Sans",sans-serif',
            fontWeight: 600,
            textTransform: "uppercase",
            textDecoration: "none",
            clipPath: "polygon(0 0,100% 0,97% 50%,100% 100%,0 100%,3% 50%)",
          }}
        >
          {buttonText}
        </motion.a>

        <motion.img
          src={badge}
          alt=""
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            display: "block",
            width: 140,
            height: 140,
            margin: "clamp(60px,12vw,173px) 0 0 auto",
          }}
        />
      </div>
    </section>
  )
}
