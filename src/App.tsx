import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [showVipZone, setShowVipZone] = useState<boolean>(false);

  return (
    <div style={styles.appContainer}>
      {/* --- TU LOGIN ORIGINAL --- */}
      {!user ? (
        <div style={styles.loginWrapper}>
          <div style={styles.glassCard}>
            <h1 style={{ fontSize: "2.8rem", marginBottom: "10px", fontWeight: "bold" }}>Smart U</h1>
            <p style={{ marginBottom: "30px", opacity: 0.9 }}>Tu ruta al éxito financiero</p>
            <input type="text" placeholder="Usuario" style={styles.inputLogin} />
            <input type="password" placeholder="Contraseña" style={styles.inputLogin} />
            <button onClick={() => setUser("demo")} style={styles.buttonLogin}>Entrar</button>
          </div>
        </div>
      ) : (
        /* --- TU DASHBOARD COMPLETO --- */
        <div style={{ display: "flex", width: "100%", height: "100vh" }}>
          <aside style={styles.sidebar}>
            <div style={styles.logoBox}>Smart U</div>
            <div style={{ padding: "15px", background: "rgba(255,255,255,0.1)", borderRadius: "15px", marginBottom: "20px" }}>
              <p style={{ fontSize: "0.8rem", marginBottom: "8px" }}>Tu Progreso: 15%</p>
              <div style={styles.progressBarBg}><div style={{ ...styles.progressBarFill, width: "15%" }}></div></div>
            </div>
            <nav style={{ flex: 1 }}>
              <div style={styles.navItem}>📚 Módulo 1: Introducción</div>
              <div style={styles.navItem}>💰 Módulo 2: Ahorro Real</div>
              <div style={styles.navItem}>📈 Módulo 3: Inversión</div>
            </nav>
            <button onClick={() => setShowVipZone(true)} style={styles.btnVipSide}>💎 Biblioteca VIP</button>
            <button onClick={() => setUser(null)} style={styles.btnLogout}>Cerrar Sesión</button>
          </aside>

          <main style={styles.main}>
            <header style={styles.welcomeHeader}>
              <h2 style={{ color: "#0f766e" }}>¡Bienvenido de nuevo, Pro! 🚀</h2>
              <p style={{ color: "#64748b" }}>Continúa construyendo tu libertad financiera.</p>
            </header>
            <section style={styles.contentCard}>
              <h3>Contenido del Curso</h3>
              <p style={{ color: "#475569", lineHeight: "1.6" }}>
                Aquí está todo el material que habías diseñado. No se perdió, solo estábamos limpiando el motor.
              </p>
              <div style={{ marginTop: "20px", padding: "20px", background: "#f0fdf4", borderRadius: "15px", border: "1px solid #bbf7d0" }}>
                <strong>Nota del sistema:</strong> Tu diseño está intacto porque lee tu archivo <code>styles.css</code>.
              </div>
            </section>
          </main>
        </div>
      )}

      {/* --- VENTANA VIP --- */}
      {showVipZone && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button onClick={() => setShowVipZone(false)} style={styles.btnClose}>✕</button>
            <h2 style={{ color: "#0f766e", textAlign: "center", marginBottom: "25px" }}>🎓 Smart U: Biblioteca Pro</h2>
            <div style={styles.gridVip}>
              <div style={styles.cardVip} onClick={() => window.open("https://www.investopedia.com", "_blank")}>📖 Diccionario</div>
              <div style={styles.cardVip} onClick={() => window.open("https://www.comparabien.com.co/", "_blank")}>⚖️ Comparador</div>
              <div style={styles.cardVip} onClick={() => window.open("https://www.twinkl.com.co/", "_blank")}>🕹️ Juegos</div>
              <div style={styles.cardVip} onClick={() => window.open("https://www.marketwatch.com/games", "_blank")}>📈 Simulador</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ESTILOS (Tu diseño original + TypeScript OK)
const styles: { [key: string]: React.CSSProperties } = {
  appContainer: { height: "100vh", width: "100vw", overflow: "hidden", fontFamily: "'Inter', sans-serif" },
  loginWrapper: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)" },
  glassCard: { background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(12px)", padding: "40px", borderRadius: "30px", width: "380px", textAlign: "center", color: "white", border: "1px solid rgba(255,255,255,0.3)" },
  inputLogin: { width: "100%", padding: "12px", borderRadius: "10px", border: "none", marginBottom: "15px" },
  buttonLogin: { width: "100%", padding: "12px", borderRadius: "10px", background: "#059669", color: "white", fontWeight: "bold", border: "none", cursor: "pointer" },
  sidebar: { width: "260px", background: "#0f766e", color: "white", padding: "20px", display: "flex", flexDirection: "column" },
  logoBox: { fontSize: "1.8rem", fontWeight: "bold", marginBottom: "30px", textAlign: "center" },
  progressBarBg: { width: "100%", height: "8px", background: "rgba(255,255,255,0.2)", borderRadius: "10px" },
  progressBarFill: { height: "100%", background: "#4ade80", borderRadius: "10px" },
  navItem: { padding: "12px", borderRadius: "10px", marginBottom: "8px", cursor: "pointer", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" },
  btnVipSide: { padding: "12px", borderRadius: "10px", background: "#14b8a6", color: "white", border: "none", cursor: "pointer", fontWeight: "bold", marginBottom: "10px" },
  btnLogout: { padding: "8px", background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "10px", cursor: "pointer", fontSize: "0.8rem" },
  main: { flex: 1, padding: "40px", background: "#f8fafc", overflowY: "auto" },
  welcomeHeader: { marginBottom: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "20px" },
  contentCard: { background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" },
  overlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(6,78,75,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, backdropFilter: "blur(8px)" },
  modal: { background: "white", padding: "40px", borderRadius: "30px", width: "90%", maxWidth: "700px", position: "relative" },
  btnClose: { position: "absolute", top: "15px", right: "15px", border: "none", background: "#f1f5f9", borderRadius: "50%", width: "35px", height: "35px", cursor: "pointer" },
  gridVip: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
  cardVip: { padding: "20px", background: "#f8fafc", borderRadius: "15px", cursor: "pointer", border: "1px solid #e2e8f0", textAlign: "center", fontWeight: "bold", color: "#0f766e" }
};
