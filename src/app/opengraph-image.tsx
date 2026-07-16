import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0a0a0b 0%, #141626 55%, #1e3a8a 100%)",
      }}
    >
      <div
        style={{
          fontSize: 220,
          fontWeight: 700,
          letterSpacing: -4,
          color: "#f5f5f7",
          textTransform: "uppercase",
        }}
      >
        ART
      </div>
    </div>,
    size,
  );
}
