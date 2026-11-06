import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Putera MY — Web developer portfolio";
export default function OpenGraph() {
  return new ImageResponse(
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 76px", backgroundColor: "#0B0B1A", color: "#F5F4FF", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, fontWeight: 700 }}>
        <span>〈/〉 Putera MY</span><span style={{ fontSize: 20, color: "#C0B7D9" }}>WEB • CLOUD • IT</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, fontSize: 105, lineHeight: 1.04, fontWeight: 800 }}>Hi, I&apos;m <span style={{ color: "#C084FC" }}>Putera MY.</span></div>
        <div style={{ fontSize: 36, fontWeight: 600 }}>I build things for the web.</div>
      </div>
      <div style={{ display: "flex", borderTop: "2px solid #39334C", paddingTop: 22, justifyContent: "space-between", fontSize: 23, color: "#D4CBE8" }}><span>SELECTED WORK / CINEX · VANTA FUN · NIMBUSCLOUD</span><span style={{ color: "#FACC15" }}>●</span></div>
    </div>, size,
  );
}
