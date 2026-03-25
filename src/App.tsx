import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [showVipZone, setShowVipZone] = useState<boolean>(false);

  return (
    <div style={styles.appContainer}>
      <button onClick={() => setShowVipZone(true)} style={styles.buttonMain}>
        Abrir Biblioteca Pro
      </button>

      {showVipZone && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button onClick={() => setShowVipZone(false)} style={styles.btnClose}>✕</button>
            <h2 style={{ color: "#0f766e", textAlign: "center" }}>🎓 Smart U: Biblioteca Pro</h2>
            <div style={styles.grid}>
              <div style={styles.card} onClick={() => window.open("https://www.investopedia.com/financial-term-dictionary-4769738", "_blank")}>📖 Diccionario Financiero</div>
              <div style={styles.card} onClick={() => window.open("https://www.comparabien.com.co/", "_blank")}>⚖️ Comparador Bancos</div>
              <div style={styles.card} onClick={() => window.open("https://www.twinkl.com.co/", "_blank")}>🕹️ Juego Twinkl</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  appContainer: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8fafc" },
  overlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(6,78,75,0.95)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 },
  modal: { background: "white", padding: "40px", borderRadius: "30px", width: "90%", maxWidth: "800px", position: "relative" },
  btnClose: { position: "absolute", top: "20px", right: "20px", border: "none", background: "#eee", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" },
  card: { padding: "20px", background: "#f0fdf4", borderRadius: "15px", cursor: "pointer", border: "1px solid #bbf7d0", textAlign: "center", fontWeight: "bold" },
  buttonMain: { padding: "20px", borderRadius: "15px", background: "#0f766e", color: "white", border: "none", cursor: "pointer", fontSize: "1.2rem" }
}; 
