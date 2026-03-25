import React, { useState } from "react";
import "./styles.css";

export default function App() {
  // ESTADOS CON TIPADO PARA TYPESCRIPT
  const [showVipZone, setShowVipZone] = useState<boolean>(false);

  return (
    <div style={styles.appContainer}>
      {/* BOTÓN PARA ACTIVAR LA VISTA (Ajusta según tu lógica de login) */}
      <button 
        onClick={() => setShowVipZone(true)} 
        style={styles.buttonMain}
      >
        Ver Biblioteca Pro
      </button>

      {/* --- INICIO VENTANA VIP --- */}
      {showVipZone && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(6, 78, 75, 0.95)",
            backdropFilter: "blur(12px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "35px",
              borderRadius: "35px",
              width: "90%",
              maxWidth: "850px",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
              position: "relative",
            }}
          >
            {/* BOTÓN CERRAR */}
            <button
              onClick={() => setShowVipZone(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                border: "none",
                background: "#f1f5f9",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#0f766e",
              }}
            >
              ✕
            </button>

            <h2 style={{ color: "#0f766e", textAlign: "center", fontSize: "2.2rem", marginBottom: "8px" }}>
              🎓 Smart U: Biblioteca Pro
            </h2>
            <p style={{ textAlign: "center", color: "#64748b", marginBottom: "35px" }}>
              Tus fuentes de consulta y herramientas de práctica real.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              
              {/* TARJETA 1: CENTRAL DE INTELIGENCIA */}
              <div style={styles.materialBox}>
                <h3 style={{ color: "#0f766e", borderBottom: "2px solid #4ade80", paddingBottom: "8px", marginTop: 0 }}>
                  🔍 Terminal de Consulta
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
                  <div onClick={() => window.open("https://www.investopedia.com/financial-term-dictionary-4769738", "_blank")} style={styles.linkCard}>
                    <span style={{ fontSize: "1.2rem" }}>📖</span>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#0f766e" }}>Diccionario Financiero Pro</div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b" }}>¿No entiendes un término? Búscalo aquí.</div>
                    </div>
                  </div>
                  <div onClick={() => window.open("https://www.comparabien.com.co/", "_blank")} style={styles.linkCard}>
                    <span style={{ fontSize: "1.2rem" }}>⚖️</span>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#0f766e" }}>Comparador de Bancos</div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Tarjetas y Cuentas en tiempo real.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TARJETA 2: JUEGOS */}
              <div style={styles.materialBox}>
                <h3 style={{ color: "#0f766e", borderBottom: "2px solid #4ade80", paddingBottom: "8px", marginTop: 0 }}>
                  🎮 Juegos
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
                  <button onClick={() => window.open("https://www.twinkl.com.co/resource/juego-interactivo-cuentas-los-pesos-colombianos-sa-m-1666197320")} style={styles.btnAction}>🕹️ Twinkl Online</button>
                  <button onClick={() => window.open("https://www.marketwatch.com/games/stock-market-game")} style={styles.btnActionOutline}>📈 Simulador de Bolsa</button>
                </div>
              </div>

              {/* TARJETA BIBLIOGRAFÍA */}
              <div style={{ ...styles.materialBox, gridColumn: "1 / -1", background: "#f0fdfa" }}>
                <h3 style={{ textAlign: "center", color: "#0f766e" }}>📖 Soporte Académico (Módulos 1-6)</h3>
                <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "15px" }}>
                   <div style={{ fontSize: "0.8rem" }}><strong>Mentalidad:</strong> T. Harv Eker, Carol Dweck</div>
                   <div style={{ fontSize: "0.8rem" }}><strong>Gestión:</strong> R. Kiyosaki, G. Clason</div>
                   <div style={{ fontSize: "0.8rem" }}><strong>Inversión:</strong> B. Graham, Tony Robbins</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
      {/* --- FIN VENTANA VIP --- */}
    </div>
  );
}

// ESTILOS CON TIPADO ESTRICTO PARA QUE VERCEL NO DE ERROR
const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    display: "flex",
    height: "100vh",
    background: "#f8fafc",
    fontFamily: "'Inter', sans-serif",
    justifyContent: "center",
    alignItems: "center"
  },
  materialBox: {
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "22px",
    border: "1px solid #e2e8f0",
  },
  linkCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px",
    background: "white",
    borderRadius: "12px",
    cursor: "pointer",
    border: "1px solid #e2e8f0",
  },
  btnAction: {
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "#0f766e",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  btnActionOutline: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #0f766e",
    background: "transparent",
    color: "#0f766e",
    cursor: "pointer",
    fontWeight: "bold",
  },
  buttonMain: {
    padding: "18px",
    borderRadius: "15px",
    background: "#0f766e",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none"
  }
};
