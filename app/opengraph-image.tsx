import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "PUTERA MY — Front-End Development, Cloud Computing & IT Support";
export default function Image() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#1F132B", color: "#FFFFFF", padding: 80, fontFamily: "Arial" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24, fontWeight: 800 }}><span>PUTERA MY.</span><span style={{ color: "#D1FF76", fontSize: 19 }}>SELECTED WORK / 2026</span></div>
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <span style={{ display: "flex", fontSize: 110, letterSpacing: -6, fontWeight: 800 }}>Putera MY.</span>
      <span style={{ display: "flex", fontSize: 39, fontWeight: 600 }}>Front-End Developer</span>
      <span style={{ display: "flex", fontSize: 30, color: "#D1FF76" }}>Cloud Computing · IT Support</span>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #594763", paddingTop: 24, fontSize: 22 }}><span>Explore my work</span><span>NimbusCloud / CINEX</span></div>
  </div>, size);
}
