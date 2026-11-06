import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "PUTERA MY — Front-End Development, Cloud Computing and IT Support";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", padding: "76px 85px", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#142638", color: "#F7F7F4", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:25, fontWeight:800 }}>
        <span>PUTERA MY.</span><span style={{ color:"#D5A16C", fontSize:18 }}>SELECTED WORK / 2026</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
        <span style={{ display:"flex", fontSize:104, fontWeight:800, letterSpacing:-6 }}>Clear ideas.</span>
        <span style={{ display:"flex", fontSize:78, fontWeight:800, color:"#A6C9D9", letterSpacing:-4 }}>Well built.</span>
        <span style={{ display:"flex", fontSize:26 }}>Front-End Development · Cloud & IT Support</span>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", borderTop:"1px solid #577083", paddingTop:21, fontSize:19 }}>
        <span>NimbusCloud / CINEX</span><span>PUTERA MY / PORTFOLIO</span>
      </div>
    </div>, size
  );
}
