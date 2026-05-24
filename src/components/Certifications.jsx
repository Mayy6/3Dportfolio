import { motion } from "framer-motion"
import { Tilt } from "react-tilt"
import { styles } from "../style"
import { fadeIn, textVariant } from "../utils/motion"
import { SectionWrapper } from "../hoc"

const certs = [
  {
    title: "Salesforce Certified Administrator",
    issuer: "Salesforce",
    issued: "2024",
    color: "#00A1E0",
    description:
      "Validates expertise in Salesforce platform configuration, user management, security controls, automation, and data management.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <path
          d="M26.5 8.5C28.5 5.5 31.5 4 35 4c5.5 0 10 3.8 10.8 8.8C48 12.3 50 12 52 13c3.5 1.5 6 5 6 9 0 5.5-4.5 10-10 10H18c-5.5 0-10-4.5-10-10 0-4.5 3-8.3 7-9.5-.2-1-.3-2-.2-3C15.3 4.8 20 1 25.5 1c.4 0 .7 0 1 .1z"
          fill="#00A1E0"
          opacity="0.2"
        />
        <path
          d="M32 22c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm-2 17l-5-5 1.4-1.4L30 36.2l8.6-8.6L40 29l-10 10z"
          fill="#00A1E0"
        />
      </svg>
    ),
  },
  {
    title: "Azure Fundamentals",
    issuer: "Microsoft",
    issued: "2024",
    color: "#0078D4",
    description:
      "Demonstrates foundational knowledge of cloud services and how Microsoft Azure provides those services, covering cloud concepts, core services, and pricing.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <path
          d="M17.5 44h29l-14.5-32L17.5 44z"
          fill="#0078D4"
          opacity="0.25"
        />
        <path
          d="M36 12L22 38h10l4-8 4 8h4L36 12z"
          fill="#0078D4"
        />
        <path
          d="M14 44h36"
          stroke="#0078D4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

const CertCard = ({ cert, index }) => (
  <Tilt className="sm:w-[340px] w-full">
    <motion.div
      variants={fadeIn("up", "spring", 0.4 * index, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="bg-tertiary rounded-[20px] p-6 min-h-[300px] flex flex-col gap-4">
        {/* Header: icon + issuer badge */}
        <div className="flex items-start justify-between">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center p-3 flex-shrink-0"
            style={{ background: `${cert.color}18`, border: `1.5px solid ${cert.color}40` }}
          >
            {cert.icon}
          </div>

          {/* Verified badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}40` }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1L7.5 4.5H11L8.2 6.8L9.3 10.5L6 8.5L2.7 10.5L3.8 6.8L1 4.5H4.5L6 1Z"
                fill={cert.color}
              />
            </svg>
            <span style={{ fontSize: 11, color: cert.color, fontWeight: 600 }}>
              Verified
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <p
            className="font-semibold text-[13px] uppercase tracking-widest mb-1"
            style={{ color: cert.color }}
          >
            {cert.issuer}
          </p>
          <h3 className="text-white font-bold text-[18px] leading-snug">
            {cert.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-secondary text-[13px] leading-relaxed flex-1">
          {cert.description}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <rect
                x="1" y="2" width="14" height="13"
                rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4"
              />
              <path
                d="M1 6h14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4"
              />
              <path
                d="M5 1v2M11 1v2" stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.4" strokeLinecap="round"
              />
            </svg>
            <span className="text-secondary text-[12px]">Issued {cert.issued}</span>
          </div>

          {/* AZ-900 tag for Azure */}
          {cert.issuer === "Microsoft" && (
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: `${cert.color}20`, color: cert.color }}
            >
              AZ-900
            </span>
          )}
        </div>
      </div>
    </motion.div>
  </Tilt>
)

const Certifications = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>What I&apos;ve earned</p>
      <h2 className={styles.sectionHeadText}>Certifications</h2>
    </motion.div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
    >
      Industry-recognised certifications that validate my expertise across
      cloud platforms and enterprise software.
    </motion.p>

    <div className="mt-16 flex flex-wrap gap-8 justify-center">
      {certs.map((cert, i) => (
        <CertCard key={cert.title} cert={cert} index={i} />
      ))}
    </div>
  </>
)

export default SectionWrapper(Certifications, "certifications")
