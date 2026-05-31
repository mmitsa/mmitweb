import { ImageResponse } from "next/og";

export const alt = "مسارات المستكشف — للاتصالات وتقنية المعلومات";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030611",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(50,76,214,0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(76,214,255,0.18), transparent 40%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand mark */}
        <svg width="140" height="140" viewBox="0 0 48 48">
          <rect width="48" height="48" rx="10" fill="#0b1020" />
          <path
            d="M11 36V14L24 29L37 14V36"
            fill="none"
            stroke="#324cd6"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M24 28L24 40L30 34Z" fill="#4cd6ff" />
        </svg>
        <div style={{ marginTop: 36, fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
          MMIT
        </div>
        <div style={{ marginTop: 8, fontSize: 34, color: "#bbc3ff" }}>
          Communications &amp; IT · Saudi Arabia
        </div>
        <div
          style={{
            marginTop: 24,
            height: 6,
            width: 120,
            borderRadius: 999,
            backgroundColor: "#324cd6",
          }}
        />
      </div>
    ),
    size
  );
}
