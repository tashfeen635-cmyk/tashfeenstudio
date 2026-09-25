import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} - ${SITE.role} in ${SITE.locality}, ${SITE.country === "PK" ? "Pakistan" : SITE.country}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#e8a33d";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 60,
              backgroundColor: GOLD,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#aaaaaa",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {SITE.studio}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: -3,
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 40,
              fontWeight: 700,
              color: GOLD,
              lineHeight: 1.25,
            }}
          >
            Senior Full Stack Web Developer
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 32,
              color: "#cccccc",
            }}
          >
            Web Design - UI/UX - SaaS &amp; Custom Web Apps
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2a2a2a",
            paddingTop: 28,
            fontSize: 28,
            color: "#888888",
          }}
        >
          <div style={{ display: "flex" }}>{SITE.location}</div>
          <div style={{ display: "flex", color: "#ffffff" }}>tashfeenriaz.site</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
