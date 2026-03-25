import React, { useState } from "react";
import "./styles.css";

export default function App() {
  // ESTADOS (Login + VIP)
  const [user, setUser] = useState<string | null>(null);
  const [showVipZone, setShowVipZone] = useState<boolean>(false);

  return (
    <div style={styles.appContainer}>
      {/* 1. SECCIÓN DE LOGIN (Tu diseño original) */}
      {!user ? (
        <div style={styles.loginWrapper}>
          <div style={styles.glassCard}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Smart U</h1>
            <p style={{ marginBottom: "30px", opacity: 0.9 }}>Tu ruta al éxito financiero</p>
            <input type="text" placeholder="Usuario" style={styles.inputLogin} />
            <input type="password" placeholder="Contraseña" style={styles.inputLogin} />
            <button onClick={() => setUser("demo")} style={styles.buttonLogin}>Entrar</button>
          </div>
        </div>
      ) : (
        /* 2. DASHBOARD PRINCIPAL */
        <div style={{ display: "flex", width: "100%", height: "100vh" }}>
          <div style={styles.sidebar}>
            <div style={styles.logoBox}>Smart U</div>
            <div style={{ padding: "10px", background: "rgba(255,255,255,0.1)", borderRadius: "10px" }}>
              <p style={{ fontSize: "0.8rem" }}>Progreso: 15%</p>
              <div style={styles.progressBarBg}><div style={{ ...styles.progressBarFill, width: "15%" }}></div></div>
            </div>
            {/* BOTÓN VIP QUE AGREGAMOS */}
            <button 
              onClick={() => setShowVipZone(true)} 
              style={{ ...styles.buttonLogin, marginTop: "20px", background: "#14b8a6" }}
            >
              💎 Biblioteca VIP
            </button>
          </div>

          <main style={styles.main}>
            <div style={styles.welcomeHeader}>
              <h2>¡Bienvenido a Smart U! 🚀</h2>
              <p>Selecciona un módulo para comenzar tu aprendizaje.</p>
            </div>
            <div style={styles.contentCard}>
              <h3>Módulo 1: Introducción a las Finanzas</h3>
              <p>Aquí verás todo tu contenido original...</p>
            </div>
          </main>
        </div>
      )}

      {/* 3. VENTANA VIP (Lo nuevo que no querías perder) */}
      {showVipZone && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button onClick={() => setShowVipZone(false)} style={styles.btnClose}>✕</button>
            <h2 style={{ color: "#0f766e", textAlign: "center", fontSize: "2rem" }}>🎓 Smart U: Biblioteca Pro</h2>
            <div style={styles.gridVip}>
              <div style={styles.cardVip} onClick={() => window.open("https://www.investopedia.com/financial-term-dictionary-4769738", "_blank")}>📖 Diccionario Financiero</div>
              <div style={styles.cardVip} onClick={() => window.open("https://www.comparabien.com.co/", "_blank")}>⚖️ Comparador Bancos</div>
              <div style={styles.cardVip} onClick={() => window.open("https://www.twinkl.com.co/", "_blank")}>🕹️ Juego Pesos Colombianos</div>
              <div style={styles.cardVip} onClick={() => window.open("https://www.marketwatch.com/games/stock-market-game", "_blank")}>📈 Simulador de Bolsa</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ESTILOS (Tu diseño original + Correciones de TypeScript)
const styles: { [key: string]: React.CSSProperties } = {
  appContainer: { height: "100vh", width: "100vw", overflow: "hidden", fontFamily: "'Inter', sans-serif" },
  loginWrapper: { height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)" },
  glassCard: { background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(12px)", borderRadius: "30px", padding: "50px", width: "400px", textAlign: "center", color: "white", border: "1px solid rgba(255,255,255,0.3)" },
  inputLogin: { width: "100%", padding: "15px", borderRadius: "12px", border: "none", marginBottom: "15px", outline: "none" },
  buttonLogin: { width: "100%", padding: "15px", borderRadius: "12px", background: "#059669", color: "white", fontWeight: "bold", border: "none", cursor: "pointer" },
  sidebar: { width: "260px", background: "#0f766e", color: "white", padding: "20px" },
  logoBox: { fontSize: "1.8rem", fontWeight: "bold", marginBottom: "30px", textAlign: "center" },
  progressBarBg: { width: "100%", height: "8px", background: "rgba(255,255,255,0.2)", borderRadius: "10px" },
  progressBarFill: { height: "100%", background: "#4ade80", borderRadius: "10px" },
  main: { flex: 1, padding: "40px", background: "#f8fafc", overflowY: "auto" },
  welcomeHeader: { marginBottom: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "20px" },
  contentCard: { background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" },
  overlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(6,78,75,0.95)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, backdropFilter: "blur(10px)" },
  modal: { background: "white", padding: "40px", borderRadius: "30px", width: "90%", maxWidth: "800px", position: "relative", maxHeight: "80vh", overflowY: "auto" },
  btnClose: { position: "absolute", top: "20px", right: "20px", border: "none", background: "#f1f5f9", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", fontWeight: "bold" },
  gridVip: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "30px" },
  cardVip: { padding: "20px", background: "#f8fafc", borderRadius: "15px", cursor: "pointer", border: "1px solid #e2e8f0", textAlign: "center", fontWeight: "bold", color: "#0f766e" }
};
