import React, { useState, useMemo, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [currentModule, setCurrentModule] = useState<number>(1);
  const [completed, setCompleted] = useState<number[]>([]);

  // --- ESTADO PARA LA ZONA DE BIENVENIDA ---
  const [isWelcomeActive, setIsWelcomeActive] = useState<boolean>(true); // Empieza en true para que sea lo primero que vean

  // --- ESTADO PARA LA ZONA VIP ---
  const [showVipZone, setShowVipZone] = useState<boolean>(false);
  // 📱 MENÚ MÓVIL (SIDEBAR)
  const [menuOpen, setMenuOpen] = useState(false);
  // --- ESTADOS MÓDULO 1 ---
  const [inputCorto, setInputCorto] = useState<string>("");
  const [inputLargo, setInputLargo] = useState<string>("");
  const [metasCorto, setMetasCorto] = useState<string[]>([]);
  const [metasLargo, setMetasLargo] = useState<string[]>([]);

  // --- ESTADOS MÓDULO 2 ---
  const [ingresosInput, setIngresosInput] = useState<string>("");
  const [gastosHormiga, setGastosHormiga] = useState<string[]>([]);
  const [inputHormiga, setInputHormiga] = useState<string>("");

  // --- ESTADOS MÓDULO 3 ---
  const [gastoFijoM3, setGastoFijoM3] = useState<string>("");

  // --- ESTADOS MÓDULO 4 ---
  const [deudas, setDeudas] = useState<{ nombre: string; monto: number }[]>([]);
  const [inputDeudaNombre, setInputDeudaNombre] = useState("");
  const [inputDeudaMonto, setInputDeudaMonto] = useState("");
// Ordenar de menor a mayor (BOLA DE NIEVE REAL)
  const deudasOrdenadas = [...deudas].sort((a, b) => a.monto - b.monto);
  // --- ESTADOS MÓDULO 5 (AVANZADO) ---
  const [habilidadInput, setHabilidadInput] = useState("");
  const [mercadoInput, setMercadoInput] = useState("");
  const [precioInput, setPrecioInput] = useState("");
  const [horasInput, setHorasInput] = useState("");
  useEffect(() => {
    const savedCompleted = localStorage.getItem("completedModules");
    if (savedCompleted) {
      setCompleted(JSON.parse(savedCompleted));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("completedModules", JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    const saved = localStorage.getItem("decretoUsuario");
    if (saved) {
      const textarea = document.getElementById(
        "decretoTexto"
      ) as HTMLTextAreaElement;
      if (textarea) textarea.value = saved;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Lógica de Calculadoras
  const numIngreso = parseFloat(ingresosInput) || 0;
  const vivir = numIngreso * 0.5;
  const deseos = numIngreso * 0.3;
  const futuro = numIngreso * 0.2;
  const numGastoM3 = parseFloat(gastoFijoM3) || 0;
  const [inversionInicial, setInversionInicial] = useState<string>("");
  const [aporteMensual, setAporteMensual] = useState<string>("");
  const [años, setAños] = useState<string>("1");
  const totalDeudas = deudas.reduce((acc, curr) => acc + curr.monto, 0);
  const numInicial = parseFloat(inversionInicial) || 0;
  const numMensual = parseFloat(aporteMensual) || 0;
  const numAnios = parseFloat(años) || 0;
// 🔥 Tasa anual → convertir a mensual
  const tasaAnual = 0.10;
  const tasaMensual = tasaAnual / 12;
// 🔥 Años → meses
  const meses = numAnios * 12;
// 🔥 Cálculo correcto
  const total =
    numInicial * Math.pow(1 + tasaMensual, meses) +
    numMensual *
      ((Math.pow(1 + tasaMensual, meses) - 1) / tasaMensual);
  const invertido = numInicial + numMensual * (numAnios * 12);
  const ganancia = total - invertido;

  // Lógica Viabilidad Módulo 5
  const numPrecio = parseFloat(precioInput) || 0;
  const numVentas = parseFloat(horasInput) || 0;

  const ingresoMensualExtra = numPrecio * numVentas;
  (parseFloat(precioInput) || 0) * (parseFloat(horasInput) || 0);
  const porcentajeCobertura =
  numGastoM3 > 0
    ? (ingresoMensualExtra / numGastoM3) * 100
    : 0;

  const progress = useMemo(() => {
    return completed.length > 0 ? Math.round((completed.length / 6) * 100) : 0;
  }, [completed]);

  const toggleComplete = (id: number) => {
    setCompleted((prev) =>
      prev.indexOf(id) !== -1
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const agregarMetaCorto = () => {
    if (inputCorto.trim() !== "") {
      setMetasCorto([...metasCorto, inputCorto]);
      setInputCorto("");
    }
  };
  const agregarMetaLargo = () => {
    if (inputLargo.trim() !== "") {
      setMetasLargo([...metasLargo, inputLargo]);
      setInputLargo("");
    }
  };
  const agregarHormiga = () => {
    if (inputHormiga.trim() !== "") {
      setGastosHormiga([...gastosHormiga, inputHormiga]);
      setInputHormiga("");
    }
  };
  const agregarDeuda = () => {
    const montoNumerico = parseFloat(inputDeudaMonto);
    if (inputDeudaNombre.trim() !== "" && !isNaN(montoNumerico)) {
      setDeudas([
        ...deudas,
        { nombre: inputDeudaNombre, monto: montoNumerico },
      ]);
      setInputDeudaNombre("");
      setInputDeudaMonto("");
    }
  };

  if (!user) {
    return (
      <div style={styles.loginWrapper}>
        <style>
          {`
            @keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
            .animated-bg { 
              background: linear-gradient(-45deg, #064e4b, #0f766e, #134e4a, #115e59); 
              background-size: 400% 400%; 
              animation: gradientBG 15s ease infinite; 
              height: 100vh; width: 100vw; 
              display: flex; align-items: center; justify-content: center; 
            }
            /* ESTO HACE EL EFECTO DE LA IMAGEN */
            .glass-card { 
              background: rgba(255, 255, 255, 0.1); 
              backdrop-filter: blur(15px); 
              -webkit-backdrop-filter: blur(15px);
              border-radius: 40px; 
              padding: 50px; 
              width: 400px; 
              text-align: center; 
              box-shadow: 0 25px 50px rgba(0,0,0,0.3); 
              border: 1px solid rgba(255,255,255,0.2); 
            }
            .login-input::placeholder { color: rgba(255,255,255,0.6); }
          `}
        </style>
        <div className="animated-bg">
          <div className="glass-card">
            <div style={{ fontSize: "4rem", marginBottom: "15px" }}>🎓</div>
            <h1
              style={{
                color: "#ffffff", // Letras blancas como en la foto
                fontSize: "2.5rem",
                fontWeight: "800",
                margin: "0",
                letterSpacing: "-1px",
              }}
            >
              Smart U Finanzas
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "1rem",
                marginTop: "5px",
              }}
            >
              Potencia tu coeficiente financiero
            </p>

            <div
              style={{
                marginTop: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <input
                className="login-input"
                placeholder="Ingresa tu nombre"
                style={{
                  ...styles.inputLogin,
                  background: "rgba(255,255,255,0.15)", // Input semitransparente
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  outline: "none",
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && name && setUser(name)}
              />
              <button
                style={{
                  ...styles.buttonLogin,
                  background: "#4ade80", // Botón verde brillante que resalta
                  color: "#064e4b",
                  fontSize: "1.1rem",
                  boxShadow: "0 10px 20px rgba(74, 222, 128, 0.2)",
                }}
                onClick={() => name && setUser(name)}
              >
                Acceder al Campus 🚀
              </button>
            </div>

            <p
              style={{
                marginTop: "25px",
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.8rem",
              }}
            >
              Únete a los arquitectos de riqueza
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
  style={{
    ...styles.appContainer,
    flexDirection: isMobile ? "column" : "row",
  }}
>
      {/* 📱 BOTÓN MENÚ MÓVIL */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            position: "fixed",
            top: "15px",
            left: "15px",
            zIndex: 1000,
            background: "#0f766e",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "1.2rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      )}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulseGraduado {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
          70% { transform: scale(1.02); box-shadow: 0 0 0 15px rgba(74, 222, 128, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }
        .emoji-animado {
          display: inline-block;
          animation: bounce 3s ease-in-out infinite;
        }
        .certificado-animado {
          animation: pulseGraduado 2s infinite;
        }
      `}</style>

      <nav
        style={{
          ...styles.sidebar,
          position: isMobile ? "fixed" : "relative",
          top: 0,
          left: isMobile ? (menuOpen ? "0" : "-100%") : "0",
          height: "100vh",
          zIndex: 999,
          transition: "left 0.3s ease-in-out",
          overflowY: "auto", // 🔥 PERMITE SCROLL
          paddingBottom: "100px", // 🔥 ESPACIO EXTRA ABAJO
          scrollBehavior: "smooth",
        }}
      >
        {/* ❌ BOTÓN CERRAR */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              marginBottom: "20px",
              background: "white",
              color: "#0f766e",
              border: "none",
              borderRadius: "8px",
              padding: "6px 10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ✕ Cerrar
          </button>
        )}

        <div style={styles.logoBox}>🎓 Smart U Finanzas</div>

        <div style={{ marginBottom: "25px", textAlign: "center" }}>
          <div style={styles.progressBarBg}>
            <div
              style={{ ...styles.progressBarFill, width: `${progress}%` }}
            ></div>
          </div>
          {/* Agregamos el texto del % para que sepa cuánto lleva */}
          <div
            style={{
              fontSize: "0.7rem",
              color: "#64748b",
              marginTop: "5px",
              fontWeight: "bold",
            }}
          ></div>
        </div>

        {/* 👇 BOTÓN DE INICIO 👇 */}
        <button
          onClick={() => {
            setIsWelcomeActive(true);
            setCurrentModule(0);
          }}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px",
            borderRadius: "12px",
            border: isWelcomeActive ? "none" : "1px solid #e2e8f0",
            background: isWelcomeActive ? "#0f766e" : "white",
            color: isWelcomeActive ? "white" : "#64748b",
            cursor: "pointer",
            marginBottom: "10px", // Bajamos un poco el margen
            fontWeight: "bold",
          }}
        >
          <span>🏠</span>
          <span style={{ fontSize: "0.85rem" }}>Inicio Smart U</span>
        </button>

        {/* 👇 NUEVA UBICACIÓN DE ZONA VIP (Justo aquí) 👇 */}
        <div
          style={{
            ...styles.moduleLink,
            background: "rgba(74, 222, 128, 0.15)", // Un verde suave para resaltar
            border: "1px dashed #4ade80",
            cursor: "pointer",
            marginBottom: "10px",
          }}
          onClick={() => setShowVipZone(true)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.2rem" }}>💎</span>
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: "bold",
                color: "#4ade80",
              }}
            >
              ZONA VIP EXCLUSIVA
            </span>
          </div>
        </div>

        <div
          style={{ borderBottom: "1px solid #e2e8f0", marginBottom: "20px" }}
        ></div>

        {/* COMIENZO DE LOS MÓDULOS */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => {
            // Definimos el nombre según el número
            const moduleName =
              num === 1
                ? "Módulo 1:🧠 Mentalidad"
                : num === 2
                ? "Módulo 2:📊 Mi Situación"
                : num === 3
                ? "Módulo 3:💸 Flujo Caja"
                : num === 4
                ? "Módulo 4:🛡️ Blindaje"
                : num === 5
                ? "Módulo 5:📈 Inversión"
                : "Módulo 6:📜 Mi Decreto";

            return (
              <div
                key={`nav-${num}`}
                onClick={() => setCurrentModule(num)}
                style={{
                  ...styles.moduleLink,
                  background:
                    currentModule === num
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                  borderLeft:
                    currentModule === num
                      ? "4px solid #4ade80"
                      : "4px solid transparent",
                }}
              >
                <span>{moduleName}</span>
                <span>{completed.indexOf(num) !== -1 ? "✅" : ""}</span>
              </div>
            );
          })}
        </div>
      </nav>

    <main
  style={{
    ...styles.main,
    padding: isMobile ? "15px" : "40px",
  }}
>
        <header style={styles.welcomeHeader}>
          <h2 style={{  textAlign: "center", color: "#0f766e", marginBottom: "10px" }}>{`¡Hola, ${user}!`}</h2>
          <p style={{ textAlign: "center", color: "#64749b", marginBottom: "20px" }}>
            Curso: Finanzas Inteligentes
          </p>
        </header>
        {/* --- 1. INICIO DE LA LÓGICA DE BIENVENIDA --- */}
        {isWelcomeActive ? (
  <div
    style={{
      padding: isMobile ? "30px 15px" : "60px 40px",
      textAlign: "center",
      background: "white",
      borderRadius: isMobile ? "20px" : "30px",
      margin: isMobile ? "10px" : "20px",
      maxWidth: isMobile ? "100%" : "700px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative",
    }}
  >
    {/* BOTÓN CERRAR */}
    <button
      onClick={() => {
        if (confirm("¿Estás seguro que deseas cerrar sesión en Smart U?")) {
          window.location.reload();
        }
      }}
      style={{
        position: "absolute",
        top: isMobile ? "10px" : "25px",
        right: isMobile ? "10px" : "30px",
        padding: isMobile ? "6px 10px" : "10px 20px",
        background: "#fef2f2",
        border: "1px solid #fee2e2",
        borderRadius: "12px",
        color: "#dc2626",
        fontSize: isMobile ? "0.7rem" : "0.85rem",
        fontWeight: "bold",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      🚪 Cerrar
    </button>

    {/* ICONO */}
    <span style={{ fontSize: isMobile ? "2.5rem" : "4rem" }}>🚀</span>

    {/* TÍTULO */}
    <h1
      style={{
        color: "#0f766e",
        fontSize: isMobile ? "1.8rem" : "2.8rem",
        marginBottom: "15px",
        lineHeight: "1.2",
      }}
    >
      Bienvenido a Smart U Finanzas
    </h1>

    {/* TEXTO */}
    <p
      style={{
        fontSize: isMobile ? "0.95rem" : "1.2rem",
        color: "#64748b",
        maxWidth: "600px",
        margin: "0 auto 30px",
        lineHeight: "1.6",
      }}
    >
      La plataforma donde los universitarios dominan su dinero. Estás a
      un clic de empezar tu transformación financiera.
    </p>

    {/* BLOQUES */}
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        gap: "15px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          background: "#f0fdfa",
          padding: "15px 25px",
          borderRadius: "15px",
          border: "1px solid #ccfbf1",
          width: isMobile ? "100%" : "auto",
        }}
      >
        <div style={{ fontWeight: "bold", color: "#0f766e" }}>
          6 Módulos
        </div>
        <div style={{ fontSize: "0.8rem" }}>
          De Novato a Inversionista
        </div>
      </div>

      <div
        style={{
          background: "#f0fdfa",
          padding: "15px 25px",
          borderRadius: "15px",
          border: "1px solid #ccfbf1",
          width: isMobile ? "100%" : "auto",
        }}
      >
        <div style={{ fontWeight: "bold", color: "#0f766e" }}>
          Zona VIP
        </div>
        <div style={{ fontSize: "0.8rem" }}>
          Recursos Exclusivos
        </div>
      </div>
    </div>

    {/* BOTÓN EMPEZAR */}
    <button
      onClick={() => {
        setIsWelcomeActive(false);
        setCurrentModule(1);
      }}
      style={{
        padding: isMobile ? "14px 20px" : "18px 50px",
        background: "#0f766e",
        color: "white",
        border: "none",
        borderRadius: "35px",
        fontSize: isMobile ? "1rem" : "1.2rem",
        fontWeight: "bold",
        cursor: "pointer",
        width: isMobile ? "100%" : "auto",
      }}
    >
      ¡EMPEZAR EL VIAJE! 🏁
    </button>
  </div>
) : (
          /* --- 2. SI LA BIENVENIDA NO ESTÁ ACTIVA, SE MUESTRAN LOS MÓDULOS --- */
          <>
            {currentModule === 1 && (
              <div style={styles.grid}>
                <section style={styles.contentCard}>
                  <div style={styles.badge}>MÓDULO 1</div>
                  <h2 style={{ color: "#0f766e", marginTop: "10px", marginBottom: "15px" }}>
                  🧠 Módulo 1: Rompiendo Creencias Financieras</h2>
                  <div
  style={{
    background: "#f0fdfa",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "1px solid #ccfbf1",
  }}
>
  <p style={{ margin: 0, color: "#065f46", fontSize: "1rem" }}>
    💡 En este módulo vas a entender cómo tu forma de pensar afecta tu dinero.
    Antes de ganar más… necesitas pensar mejor.
  </p>
</div>
                  <div style={styles.materialBox}>
                    <h3
                      style={{
                        marginTop: 0,
                        color: "#166534",
                        marginBottom: "15px",
                      }}
                    >
                      📖 Lección Maestra
                    </h3>
                    <iframe
                      src="https://docs.google.com/presentation/d/14PKp_3dO0j6NCtKk6xqkHchELUM9kAEKIb8enqd9jBs/embed"
                      frameBorder="0"
                      width="100%"
                      height="400"
                      allowFullScreen
                      style={{ borderRadius: "10px" }}
                    ></iframe>
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <h4 style={{ color: "#0f766e", marginBottom: "10px" }}>
                      🎬 Clase: Finanzas desde Cero
                    </h4>
                    <iframe
                      width="100%"
                      height="315"
                      src="https://www.youtube.com/embed/3__mS7160ZY"
                      frameBorder="0"
                      allowFullScreen
                      style={{ borderRadius: "15px", background: "#000" }}
                    ></iframe>
                  </div>
                  <div style={styles.toolArea}>
                    <h3 style={{ marginTop: 0 }}>
                      <p style={{ fontWeight: "normal", color: "#0f766e",  marginBottom: "15px" }}>
  ⚠️ Si no defines tus metas, tu dinero no tiene dirección.
</p>
                       <p style={{ fontWeight: "normal", color: "#010203",  marginBottom: "15px" }}>
  
                      🛠️  <b>Actividad: Muro de Sueños</b>
</p>
                    </h3>
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "0.85rem",
                        color: "#64748b",
                        marginBottom: "15px",
                      }}
                    >
                      <b>Objetivo:</b> Identificar y clasificar tus metas para
                      darles prioridad y un valor económico real.
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                      }}
                    >
                      <div>
                        <h4 style={styles.metaTitle}>⏳ Corto Plazo</h4>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <input
                            style={styles.inputSmall}
                            placeholder="Ej: Laptop"
                            value={inputCorto}
                            onChange={(e) => setInputCorto(e.target.value)}
                          />
                          <button
                            style={styles.btnAdd}
                            onClick={agregarMetaCorto}
                          >
                            +
                          </button>
                        </div>
                        {metasCorto.map((m, i) => (
                          <div key={i} style={styles.metaTag}>
                            ⚡ {m}
                          </div>
                        ))}
                      </div>
                      <div>
                        <h4 style={styles.metaTitle}>🚀 Largo Plazo</h4>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <input
                            style={styles.inputSmall}
                            placeholder="Ej: Libertad"
                            value={inputLargo}
                            onChange={(e) => setInputLargo(e.target.value)}
                          />
                          <button
                            style={styles.btnAdd}
                            onClick={agregarMetaLargo}
                          >
                            +
                          </button>
                        </div>
                        {metasLargo.map((m, i) => (
                          <div key={i} style={styles.metaTag}>
                            💎 {m}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
                <aside style={styles.sideCol}>
                  <div style={styles.musicCard}>
                    <h4 style={{ marginTop: 0, color: "#be185d", marginBottom: "15px" }}>
                      🎵 Algo de motivación 
                    </h4>
                    <iframe
                      width="100%"
                      height="160"
                      src="https://www.youtube.com/embed/8aRor905cCw"
                      frameBorder="0"
                      style={{ borderRadius: "12px" }}
                    ></iframe>
                  </div>
                  <div style={styles.sideCardInspiration}>
                    <h3 style={{ marginTop: 0, color: "#92400e", marginBottom: "15px" }}>
                      💡 Sabiduría Módulo 1
                    </h3>
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#451a03", 
                      }}
                    >
                      "No ahorres lo que queda después de gastar, gasta lo que
                      queda después de ahorrar."
                    </p>
                    <hr
                      style={{
                        border: "0.5px solid #fde68a",
                        margin: "15px 0",
                      }}
                    />
                    <p style={{ fontSize: "0.85rem", color: "#78350f" }}>
                      <b>Consejo Práctico:</b> Tu mente es tu activo más
                      valioso. Cambia el "No puedo" por "¿Cómo puedo?".
                    </p>
                  </div>
                  <button
                    style={{
                      ...styles.buttonMain,
                      background:
                        completed.indexOf(1) !== -1 ? "#4ade80" : "#0f766e",
                    }}
                    onClick={() => toggleComplete(1)}
                  >
                    {completed.indexOf(1) !== -1
                      ? "¡Módulo 1 Completado! ✅"
                      : "Marcar como terminado"}
                  </button>
                  {completed.indexOf(1) !== -1 && (
                    <div style={styles.congratsLabel}>
                      Llevas el {progress}% del curso
                    </div>
                  )}
                </aside>
              </div>
            )}

            {currentModule === 2 && (
              <div style={styles.grid}>
                <section style={styles.contentCard}>
                  <div style={styles.badge}>MÓDULO 2</div>
                  <h2 style={{ color: "#0f766e", marginTop: "10px", marginBottom: "15px" }}>
                    📊 Módulo 2: El Presupuesto Maestro 50/30/20
                  </h2>
                  <div
  style={{
    background: "#fef3c7",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "1px solid #fde68a",
  }}
>
  <p style={{ margin: 0, color: "#92400e", fontSize: "0.95rem" }}>
    ⚠️ Si no controlas tu dinero… tu dinero te controla a ti.
    Este módulo te enseña a darle dirección a cada peso que ganas.
  </p>
</div>
                  <div style={styles.materialBox}>
                    <h3
                      style={{
                        marginTop: 0,
                        color: "#166534",
                        marginBottom: "15px",
                      }}
                    >
                      📖 Guía de Distribución
                    </h3>
                    <div style={styles.slideReplacement}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          width: "100%",
                        }}
                      >
                        <div style={styles.infoCircle}>
                          <b>50%</b>
                          <br />
                          <small>Vivir</small>
                        </div>
                        <div style={styles.infoCircle}>
                          <b>30%</b>
                          <br />
                          <small>Deseos</small>
                        </div>
                        <div style={styles.infoCircle}>
                          <b>20%</b>
                          <br />
                          <small>Futuro</small>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: "20px",
                        background: "white",
                        padding: "15px",
                        borderRadius: "10px",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <h4
                        style={{
                          marginTop: 0,
                          color: "#0f766e",
                          fontSize: "0.9rem",
                        }}
                      >
                        💡 ¿Cómo usar esta guía?
                      </h4>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#475569",
                          margin: "5px 0",
                        }}
                      >
                        <b>50% (Vivir):</b> Gastos fijos esenciales (Arriendo,
                        comida, servicios).
                        <br />
                        <b>30% (Deseos):</b> Gastos flexibles y gustos (Cine,
                        salidas, suscripciones).
                        <br />
                        <b>20% (Futuro):</b> Ahorro, pago de deudas e
                        inversiones a largo plazo.
                      </p>
                    </div>
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <h4 style={{ color: "#0f766e", marginBottom: "10px" }}>
                      🎬 Clase: Controlando cada Moneda
                    </h4>
                    <iframe
                      width="100%"
                      height="315"
                      src="https://www.youtube.com/embed/1jswNvjoL2E"
                      frameBorder="0"
                      allowFullScreen
                      style={{ borderRadius: "15px", background: "#000" }}
                    ></iframe>
                  </div>
                  <div style={styles.toolArea}>
                    <h3 style={{ marginTop: 0, marginBottom: "10px" }}>
                      🛠️ Actividad: Tu Presupuesto Real
                    </h3>
                    <p style={{ fontWeight: "bold", color: "#0f766e", marginBottom: "10px"  }}>
  💡 Aquí es donde pasas de teoría a control real de tu dinero.
</p>
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "0.85rem",
                        color: "#64748b",
                        marginBottom: "15px",
                      }}
                    >
                      <b>Objetivo:</b> Visualizar la distribución ideal de tus
                      ingresos para evitar el sobreendeudamiento.
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                      }}
                    >
                      <div>
                        <h4 style={styles.metaTitle}>🧮 Calculadora</h4>
                        <input
                          type="number"
                          placeholder="Ingreso Mensual $"
                          style={{
                            ...styles.inputSmall,
                            marginBottom: "15px",
                            border: "2px solid #14b8a6",
                          }}
                          value={ingresosInput}
                          onChange={(e) => setIngresosInput(e.target.value)}
                        />
                        <div
                          style={{
                            ...styles.calcResult,
                            borderLeft: "4px solid #0f766e",
                          }}
                        >
                          🏠 Vivir (50%): <b>${vivir.toLocaleString()}</b>
                        </div>
                        <div
                          style={{
                            ...styles.calcResult,
                            borderLeft: "4px solid #facc15",
                          }}
                        >
                          🎉 Deseos (30%): <b>${deseos.toLocaleString()}</b>
                        </div>
                        <div
  style={{
    ...styles.calcResult,
    borderLeft: "4px solid #4ade80",
  }}
>
  💰 Futuro (20%): <b>${futuro.toLocaleString()}</b>
</div>

{/* 📊 BARRA VISUAL */}
<div style={{ marginTop: "20px" }}>
  <h4 style={{ color: "#0f766e", marginBottom: "10px" }}>
    📊 Visualización de tu dinero
  </h4>

  <div
    style={{
      height: "20px",
      width: "100%",
      background: "#e5e7eb",
      borderRadius: "20px",
      overflow: "hidden",
      display: "flex",
    }}
  >
    <div
      style={{
        width: `${numIngreso ? 50 : 0}%`,
        background: "#0f766e",
        transition: "0.5s",
      }}
    />
    <div
      style={{
        width: `${numIngreso ? 30 : 0}%`,
        background: "#facc15",
        transition: "0.5s",
      }}
    />
    <div
      style={{
        width: `${numIngreso ? 20 : 0}%`,
        background: "#4ade80",
        transition: "0.5s",
      }}
    />
  </div>

  <div style={{ fontSize: "0.8rem", marginTop: "8px" }}>
    🟢 Vivir | 🟡 Deseos | 💚 Futuro
  </div>
</div>

{/* 🧠 FEEDBACK */}
<div style={{ marginTop: "15px" }}>
  {numIngreso === 0 && (
    <p style={{ color: "#64748b" }}>
      👉 Ingresa tus ingresos para ver tu estrategia financiera.
    </p>
  )}

  {numIngreso > 0 && numIngreso < 1000000 && (
    <p style={{ color: "#b45309", fontWeight: "bold" }}>
      ⚠️ Tus ingresos son bajos. Enfócate en aumentarlos.
    </p>
  )}

  {numIngreso >= 1000000 && numIngreso < 3000000 && (
    <p style={{ color: "#0f766e", fontWeight: "bold" }}>
      👍 Buen nivel. Ya puedes organizarte bien.
    </p>
  )}

  {numIngreso >= 3000000 && (
    <p style={{ color: "#065f46", fontWeight: "bold" }}>
      🚀 Excelente. Ya estás listo para invertir fuerte.
    </p>
  )}
</div>
                      </div>
                      <div>
                        <h4 style={styles.metaTitle}>🚨 Gastos Hormiga</h4>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <input
                            style={styles.inputSmall}
                            placeholder="Ej: Café"
                            value={inputHormiga}
                            onChange={(e) => setInputHormiga(e.target.value)}
                          />
                          <button
                            style={styles.btnAdd}
                            onClick={agregarHormiga}
                          >
                            +
                          </button>
                        </div>
                        {gastosHormiga.map((h, i) => (
                          <div
                            key={i}
                            style={{ ...styles.metaTag, color: "#b91c1c" }}
                          >
                            💸 {h}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
                <aside style={styles.sideCol}>
                  <div style={styles.musicCard}>
                    <h4 style={{ marginTop: 0, color: "#be185d", marginBottom: "15px" }}>
                      🎵 Algo de motivación
                    </h4>
                    <iframe
                      width="100%"
                      height="160"
                      src="https://www.youtube.com/embed/OPf0YbXqDm0"
                      frameBorder="0"
                      style={{ borderRadius: "12px" }}
                    ></iframe>
                  </div>
                  <div style={styles.sideCardInspiration}>
                    <h3 style={{ marginTop: 0, color: "#92400e", marginBottom: "10px" }}>
                      💡 Sabiduría Módulo 2
                    </h3>
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#451a03",
                      }}
                    >
                      "Un presupuesto es decirle a tu dinero a dónde ir, en
                      lugar de preguntar a dónde se fue."
                    </p>
                    <hr
                      style={{
                        border: "0.5px solid #fde68a",
                        margin: "15px 0",
                      }}
                    />
                    <p style={{ fontSize: "0.85rem", color: "#78350f" }}>
                      <b>Consejo Práctico:</b> Identifica tus 3 mayores gastos
                      hormiga y redúcelos a la mitad este mes.
                    </p>
                  </div>
                  <button
                    style={{
                      ...styles.buttonMain,
                      background:
                        completed.indexOf(2) !== -1 ? "#4ade80" : "#0f766e",
                    }}
                    onClick={() => toggleComplete(2)}
                  >
                    {completed.indexOf(2) !== -1
                      ? "¡Módulo 2 Completado! ✅"
                      : "Marcar como terminado"}
                  </button>
                  {completed.indexOf(2) !== -1 && (
                    <div style={styles.congratsLabel}>
                      Llevas el {progress}% del curso
                    </div>
                  )}
                </aside>
              </div>
            )}

            {currentModule === 3 && (
              <div style={styles.grid}>
                <section style={styles.contentCard}>
                  <div style={styles.badge}>MÓDULO 3</div>
                  <h2 style={{ color: "#0f766e", marginTop: "10px",  marginBottom: "15px" }}>
                    💰 Módulo 3: Ahorro e Inversión Inteligente
                  </h2>
                  <div
  style={{
    background: "#ecfeff",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "1px solid #67e8f9",
  }}
>
  <p style={{ margin: 0, color: "#0e7490", fontSize: "0.95rem" }}>
    ⚠️ Si solo ahorras, te estancas. Si inviertes sin saber, pierdes.
    Aquí aprenderás el equilibrio para hacer crecer tu dinero con inteligencia.
  </p>
</div>
                  <div style={styles.materialBox}>
                    <h3
                      style={{
                        marginTop: 0,
                        color: "#166534",
                        marginBottom: "10px",
                      }}
                    >
                      📖 Material: El ABC de la Inversión
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "10px" }}>
  💡 Entiende primero las reglas del juego antes de poner tu dinero en riesgo.
</p>
                    <div
                      style={{
                        background: "white",
                        padding: "15px",
                        borderRadius: "10px",
                        marginBottom: "15px",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#475569",
                          margin: "0",
                        }}
                      >
                        <b>Ahorro:</b> Guardar para seguridad.
                        <br />
                        <b>Inversión:</b> Poner tu dinero a trabajar.
                        <br />
                        <b>Inflación:</b> El costo de la vida que sube cada año.
                      </p>
                    </div>
                    <iframe
                      src="https://docs.google.com/presentation/d/1ygv0uPLM2hdBpaf2aNKTBMHqlnGnaW4rhNN3y5kUfv4/embed"
                      frameBorder="0"
                      width="100%"
                      height="350"
                      allowFullScreen
                      style={{ borderRadius: "10px" }}
                    ></iframe>
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <h4 style={{ color: "#0f766e", marginBottom: "10px" }}>
                      🎬 Clase: Guía para empezar a Invertir
                    </h4>
                    <iframe
                      width="100%"
                      height="315"
                      src="https://drive.google.com/file/d/1JgDBtCMNJyGLUHzBWYpaxmPJ-U2SSGWa/preview"
                      frameBorder="0"
                      allowFullScreen
                      style={{ borderRadius: "15px", background: "#000" }}
                    ></iframe>
                  </div>
                  <div style={styles.toolArea}>
                    <h3 style={{ marginTop: 0, marginBottom: "10px" }}>
                      🛠️ Calculadora: Fondo de Emergencia
                    </h3>
                    <p style={{ fontWeight: "bold", color: "#be185d", marginBottom: "15px" }}>
  🚨 Sin fondo de emergencia, cualquier problema puede destruir tus finanzas.
</p>
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "0.85rem",
                        color: "#64748b",
                        marginBottom: "15px",
                      }}
                    >
                      <b>Objetivo:</b> Saber cuánto dinero debes tener ahorrado
                      antes de empezar a invertir para no arriesgar tu
                      estabilidad.
                    </p>
                    <input
                      type="number"
                      placeholder="Gastos Fijos Mensuales $"
                      style={{
                        ...styles.inputSmall,
                        border: "2px solid #be185d",
                        marginBottom: "10px",
                      }}
                      value={gastoFijoM3}
                      onChange={(e) => setGastoFijoM3(e.target.value)}
                    />
                    <div
                      style={{
                        ...styles.calcResult,
                        borderLeft: "4px solid #f472b6",
                      }}
                    >
                      🆘 Mínimo (3 meses):{" "}
                      <b>${(numGastoM3 * 3).toLocaleString()}</b>
                    </div>
                    <div
                      style={{
                        ...styles.calcResult,
                        borderLeft: "4px solid #be185d",
                        marginTop: "5px",
                      }}
                    >
                      🏰 Ideal (6 meses):{" "}
                      <b>${(numGastoM3 * 6).toLocaleString()}</b>
                    </div>
                    {/* 🚀 SIMULADOR DE INVERSIÓN */}
<div style={{ marginTop: "25px" }}>
  <h3 style={{ color: "#0f766e", marginBottom: "15px" }}>
    📈 Simulador de Inversión
  </h3>

  <p style={{
  fontSize: "0.85rem",
  color: "#64748b",
  marginBottom: "15px"
}}>
  💡 Este simulador te muestra cómo crecería tu dinero en el tiempo usando interés compuesto.
  Ajusta los valores para ver cómo pequeñas decisiones hoy impactan tu futuro financiero.
</p>
  
  <input
  type="number"
  placeholder="💰 ¿Cuánto dinero tienes para empezar?"
  value={inversionInicial}
  onChange={(e) => setInversionInicial(e.target.value)}
  style={{ ...styles.inputSmall, marginBottom: "10px" }}
/>

<input
  type="number"
  placeholder="📅 ¿Cuánto puedes invertir cada mes?"
  value={aporteMensual}
  onChange={(e) => setAporteMensual(e.target.value)}
  style={{ ...styles.inputSmall, marginBottom: "10px" }}
/>

<input
  type="number"
  placeholder="⏳ ¿Durante cuántos años invertirás?"
  value={años}
  onChange={(e) => setAños(e.target.value)}
  style={{ ...styles.inputSmall, marginBottom: "15px" }}
/>

  <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "10px" }}>
  Ejemplo: empiezas con $1,000,000, aportas $200,000 mensuales durante 5 años.
</div>

  <div style={{ ...styles.calcResult, borderLeft: "4px solid #0f766e" }}>
    💰 Resultado: <b>${total.toLocaleString()}</b>
  </div>

  {total > 0 && (
  <p style={{ color: "#065f46", fontWeight: "bold", marginTop: "10px" }}>
    🔥 Tu dinero puede multiplicarse en el tiempo si eres constante.
  </p>
)}

  {/* 📊 BARRA */}
 <div
  style={{
    height: "15px",
    width: "100%",
    background: "#e5e7eb",
    borderRadius: "10px",
    marginTop: "10px",
    overflow: "hidden",
    display: "flex",
  }}
>
  <div
    style={{
      width: `${total > 0 ? (invertido / total) * 100 : 0}%`,
      background: "#64748b",
      height: "100%",
      transition: "0.5s",
    }}
  />
  <div
    style={{
      width: `${total > 0 ? (ganancia / total) * 100 : 0}%`,
      background: "#22c55e",
      height: "100%",
      transition: "0.5s",
    }}
  />
</div>

  {/* 🧠 FEEDBACK */}
  <div style={{ marginTop: "10px" }}>
  {ganancia <= 0 && (
    <p style={{ color: "#b91c1c" }}>
      ⚠️ Tu dinero no está creciendo.
    </p>
  )}

  {ganancia > 0 && ganancia < invertido && (
    <p style={{ color: "#b45309" }}>
      👍 Vas bien, pero puedes mejorar.
    </p>
  )}

  {ganancia >= invertido && (
    <p style={{ color: "#065f46" }}>
      🚀 Excelente, estás generando riqueza.
    </p>
  )}
</div>
   </div>
                  </div>
                </section>
                <aside style={styles.sideCol}>
                  <div style={styles.musicCard}>
                    <h4 style={{ marginTop: 0, color: "#be185d",  marginBottom: "15px" }}>
                      🎵 Algo de motivación
                    </h4>
                    <iframe
                      width="100%"
                      height="160"
                      src="https://www.youtube.com/embed/iR6oYX1D-0w"
                      frameBorder="0"
                      style={{ borderRadius: "12px" }}
                    ></iframe>
                  </div>
                  <div style={styles.sideCardInspiration}>
                    <h3 style={{ marginTop: 0, color: "#92400e",  marginBottom: "10px"  }}>
                      💡 Sabiduría Módulo 3
                    </h3>
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#451a03",
                      }}
                    >
                      "El interés compuesto es la octava maravilla del mundo.
                      Quien lo entiende, lo gana; quien no, lo paga."
                    </p>
                    <hr
                      style={{
                        border: "0.5px solid #fde68a",
                        margin: "15px 0",
                      }}
                    />
                    <p style={{ fontSize: "0.85rem", color: "#78350f" }}>
                      <b>Consejo Práctico:</b> Empieza hoy mismo. La constancia
                      vence a la cantidad en el largo plazo.
                    </p>
                  </div>
                  <button
                    style={{
                      ...styles.buttonMain,
                      background:
                        completed.indexOf(3) !== -1 ? "#4ade80" : "#0f766e",
                    }}
                    onClick={() => toggleComplete(3)}
                  >
                    {completed.indexOf(3) !== -1
                      ? "¡Módulo 3 Completado! ✅"
                      : "Marcar como terminado"}
                  </button>
                  {completed.indexOf(3) !== -1 && (
                    <div style={styles.congratsLabel}>
                      Llevas el {progress}% del curso
                    </div>
                  )}
                </aside>
              </div>
            )}

            {currentModule === 4 && (
              <div style={styles.grid}>
                <section style={styles.contentCard}>
                  <div style={styles.badge}>MÓDULO 4</div>
                  <h2 style={{ color: "#0f766e", marginTop: "10px", marginBottom: "15px" }}>
                    🛡️ El Escudo Financiero: Deudas
                  </h2>
                  <p style={{ fontWeight: "bold", color: "#be185d", marginBottom: "10px" }}>
  💡 Vas a eliminar tus deudas empezando por la más pequeña (efecto bola de nieve).
</p>
                  <div style={styles.materialBox}>
                    <h3
                      style={{
                        marginTop: 0,
                        color: "#166534",
                        marginBottom: "15px",
                      }}
                    >
                      📖 Presentación: Estrategias de Libertad
                    </h3>
                    <iframe
                      src="https://docs.google.com/presentation/d/1_Yp-C17fN9N8nErd-x8BciKSyPLJcVJR/embed"
                      frameBorder="0"
                      width="100%"
                      height="400"
                      allowFullScreen
                      style={{ borderRadius: "10px" }}
                    ></iframe>
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <h4 style={{ color: "#0f766e", marginBottom: "10px" }}>
                      🎬 Clase: El Camino hacia la Deuda Cero
                    </h4>
                    <iframe
                      width="100%"
                      height="315"
                      src="https://drive.google.com/file/d/1TBVvl75fTyQiGbO1Jrs_FMe_-j18eLUO/preview"
                      frameBorder="0"
                      allowFullScreen
                      style={{ borderRadius: "15px", background: "#000" }}
                    ></iframe>
                  </div>
                  <div style={styles.toolArea}>
                    <h3 style={{ marginTop: 0, marginBottom: "15px" }}>
                      🛠️ Actividad: Plan Bola de Nieve
                    </h3>
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "0.85rem",
                        color: "#64748b",
                        marginBottom: "15px",
                      }}
                    >
                      <b>Objetivo:</b> Listar tus deudas para visualizar el
                      total y priorizar el pago de la más pequeña.
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "15px",
                      }}
                    >
                      <input
                        style={styles.inputSmall}
                        placeholder="Nombre (Ej: Visa)"
                        value={inputDeudaNombre}
                        onChange={(e) => setInputDeudaNombre(e.target.value)}
                      />
                      <input
                        type="number"
                        style={styles.inputSmall}
                        placeholder="Monto $"
                        value={inputDeudaMonto}
                        onChange={(e) => setInputDeudaMonto(e.target.value)}
                      />
                      <button style={styles.btnAdd} onClick={agregarDeuda}>
                        Añadir
                      </button>
                    </div>
                    <div
                      style={{
                        background: "white",
                        borderRadius: "12px",
                        padding: "15px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      {deudas.length === 0 ? (
                        <p
                          style={{
                            textAlign: "center",
                            color: "#94a3b8",
                            fontSize: "0.85rem",
                          }}
                        >
                          No hay deudas registradas.
                        </p>
                      ) : (
                        deudasOrdenadas.map((d, index) => (
  <div
    key={index}
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: "1px solid #f1f5f9",
      flexDirection: "column", // 👈 IMPORTANTE
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ fontSize: "0.9rem" }}>{d.nombre}</span>
      <span style={{ fontWeight: "bold", color: "#be185d" }}>
        ${d.monto.toLocaleString()}
      </span>
    </div>
    {/* 🔥 EFECTO BOLA DE NIEVE */}
    {index === 0 && (
      <span style={{ color: "#16a34a", fontSize: "0.75rem" }}>
        🔥 Prioridad de pago
      </span>
    )}
  </div>
))
  )}
                      <div
                        style={{
                          marginTop: "15px",
                          paddingTop: "10px",
                          borderTop: "2px solid #f1f5f9",
                          textAlign: "right",
                        }}
                      >
                        <span style={{ fontSize: "0.9rem", color: "#64748b" }}>
                          Total Deuda:{" "}
                        </span>
                        <strong
                          style={{ fontSize: "1.2rem", color: "#be185d" }}
                        >
                          ${totalDeudas.toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  </div>
                </section>
                <aside style={styles.sideCol}>
                  <div style={styles.musicCard}>
                    <h4 style={{ marginTop: 0, color: "#be185d" }}>
                      🎵 Concentración
                    </h4>
                    <iframe
                      width="100%"
                      height="160"
                      src="https://www.youtube.com/embed/btPJPFnesV4"
                      frameBorder="0"
                      style={{ borderRadius: "12px" }}
                    ></iframe>
                  </div>
                  <div style={styles.sideCardInspiration}>
                    <h3 style={{ marginTop: 0, color: "#92400e" }}>
                      💡 Sabiduría Módulo 4
                    </h3>
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#451a03",
                      }}
                    >
                      "Las deudas son como una bola de nieve; si las ignoras,
                      crecen. Si las enfrentas, se derriten."
                    </p>
                    <hr
                      style={{
                        border: "0.5px solid #fde68a",
                        margin: "15px 0",
                      }}
                    />
                    <p style={{ fontSize: "0.85rem", color: "#78350f" }}>
                      <b>Consejo Práctico:</b> Empieza pagando la deuda más
                      pequeña. La victoria psicológica te dará impulso para las
                      grandes.
                    </p>
                  </div>
                  <button
                    style={{
                      ...styles.buttonMain,
                      background:
                        completed.indexOf(4) !== -1 ? "#4ade80" : "#0f766e",
                    }}
                    onClick={() => toggleComplete(4)}
                  >
                    {completed.indexOf(4) !== -1
                      ? "¡Módulo 4 Completado! ✅"
                      : "Marcar como terminado"}
                  </button>
                  {completed.indexOf(4) !== -1 && (
                    <div style={styles.congratsLabel}>
                      Llevas el {progress}% del curso
                    </div>
                  )}
                </aside>
              </div>
            )}

            {currentModule === 5 && (
              <div style={styles.grid}>
                <section style={styles.contentCard}>
                  <div style={styles.badge}>MÓDULO 5</div>
                  <h2 style={{ color: "#0f766e", marginTop: "10px" }}>
                    🚀 Multiplicando Ingresos: Side Hustle
                  </h2>

                  <div style={styles.materialBox}>
                    <h3
                      style={{
                        marginTop: 0,
                        color: "#166534",
                        marginBottom: "15px",
                      }}
                    >
                      📊 Presentación: Las 3 Llaves de la Libertad
                    </h3>
                    <iframe
                      src="https://docs.google.com/presentation/d/1X3QVEghqEVMt5C5TPQEGgVSnLx02n86Q/embed"
                      frameBorder="0"
                      width="100%"
                      height="400"
                      allowFullScreen
                      style={{ borderRadius: "10px", marginBottom: "15px" }}
                    ></iframe>
                    <div
                      style={{
                        background: "white",
                        padding: "15px",
                        borderRadius: "12px",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <div style={{ marginBottom: "15px" }}>
                        <h4 style={{ color: "#0f766e", margin: "0 0 5px 0" }}>
                          1. La Llave del Tiempo (Ingresos Activos)
                        </h4>
                        <p style={{ fontSize: "0.8rem", color: "#475569" }}>
                          Es tu base. Tu empleo o servicios profesionales. El
                          objetivo aquí es aumentar tu <b>valor por hora</b>{" "}
                          mediante la educación.
                        </p>
                      </div>
                      <div style={{ marginBottom: "15px" }}>
                        <h4 style={{ color: "#d97706", margin: "0 0 5px 0" }}>
                          2. La Llave del Talento (Side Hustles)
                        </h4>
                        <p style={{ fontSize: "0.8rem", color: "#475569" }}>
                          Ingresos extra. Monetizar una habilidad (diseño,
                          ventas, cocina, reparaciones) fuera de tu horario
                          normal.
                        </p>
                      </div>
                      <div>
                        <h4 style={{ color: "#16a34a", margin: "0 0 5px 0" }}>
                          3. La Llave del Capital (Ingresos Pasivos)
                        </h4>
                        <p style={{ fontSize: "0.8rem", color: "#475569" }}>
                          Cuando el dinero trabaja solo. Dividendos, rentas,
                          regalías o negocios sistematizados que no requieren tu
                          presencia.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: "30px" }}>
                    <h4 style={{ color: "#0f766e", marginBottom: "10px" }}>
                      🎬 Clases: Estrategias de Ingresos Extra
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/7xkowuKHAX0"
                        frameBorder="0"
                        allowFullScreen
                        style={{ borderRadius: "15px", background: "#000" }}
                      ></iframe>
                      <iframe
                        src="https://drive.google.com/file/d/1xefc33Lpo-wQlvV_HirOgLkHJrBScIMP/preview"
                        frameBorder="0"
                        width="100%"
                        height="400"
                        allowFullScreen
                        style={{ borderRadius: "15px" }}
                      ></iframe>
                    </div>
                  </div>

                  <div style={styles.toolArea}>
                    <h3 style={{ marginTop: 0 }}>
                      🛠️ Actividad: Business Case de Bolsillo
                    </h3>
                    <p style={{
  fontSize: "0.85rem",
  color: "#64748b",
  marginBottom: "15px"
}}>
  💡 Convierte una idea en dinero. Define qué vendes, cuánto cobras y cuántas veces al mes. Aquí verás cuánto puedes generar.
</p>
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "0.85rem",
                        color: "#64748b",
                        marginBottom: "15px",
                      }}
                    >
                      <b>Objetivo:</b> Validar numéricamente tu idea de Side
                      Hustle y proyectar su impacto mensual.
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                        marginBottom: "15px",
                      }}
                    >
                      <div style={styles.avanzadoCard}>
                        <label style={styles.labelAvanzado}>¿Qué vendes?</label>
                        <input
                          style={styles.inputSmall}
                          placeholder="Ej: Pastel de Chocolate"
                          value={habilidadInput}
                          onChange={(e) => setHabilidadInput(e.target.value)}
                        />
                      </div>
                      <div style={styles.avanzadoCard}>
                        <label style={styles.labelAvanzado}>
                          Precio unitario ($)
                        </label>
                        <input
                          style={styles.inputSmall}
                          type="number"
                          placeholder="20"
                          value={precioInput}
                          onChange={(e) => setPrecioInput(e.target.value)}
                        />
                      </div>
                      <div style={styles.avanzadoCard}>
                        <label style={styles.labelAvanzado}>¿A quién?</label>
                        <input
                          style={styles.inputSmall}
                          placeholder="Ej: Oficinas locales"
                          value={mercadoInput}
                          onChange={(e) => setMercadoInput(e.target.value)}
                        />
                      </div>
                      <div style={styles.avanzadoCard}>
                        <label style={styles.labelAvanzado}>
                          Ventas/Mes (estimado)
                        </label>
                        <input
                          style={styles.inputSmall}
                          type="number"
                          placeholder="10"
                          value={horasInput}
                          onChange={(e) => setHorasInput(e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        background: "#0f766e",
                        color: "white",
                        padding: "20px",
                        borderRadius: "15px",
                        textAlign: "center",
                      }}
                    >
                      <h4
                        style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}
                      >
                        Proyección de Ingreso Extra
                      </h4>
                      <p
                        style={{
                          fontSize: "2rem",
                          fontWeight: "bold",
                          margin: "5px 0",
                        }}
                      >
                        ${ingresoMensualExtra.toLocaleString()}
                      </p>
                      <p style={{ fontSize: "0.75rem", margin: 0 }}>
  {ingresoMensualExtra > 0
    ? `🔥 Este ingreso podría cubrir el ${porcentajeCobertura.toFixed(1)}% de tus gastos.`
    : "Ingresa valores para ver cuánto dinero puedes generar."}
</p>
                    </div>
                    <div style={{ marginTop: "10px" }}>
  {ingresoMensualExtra > 0 && ingresoMensualExtra < 500000 && (
    <p style={{ color: "#b45309" }}>
      ⚠️ Buen inicio, pero necesitas escalar.
    </p>
  )}

  {ingresoMensualExtra >= 500000 && ingresoMensualExtra < 2000000 && (
    <p style={{ color: "#0f766e" }}>
      👍 Ya tienes un ingreso extra real.
    </p>
  )}

  {ingresoMensualExtra >= 2000000 && (
    <p style={{ color: "#065f46" }}>
      🚀 Esto puede cambiar tu vida financiera.
    </p>
  )}
</div>
                    <div style={{ marginTop: "10px" }}>
                      <div
  style={{
    height: "15px",
    width: "100%",
    background: "#e5e7eb",
    borderRadius: "10px",
    marginTop: "10px",
    overflow: "hidden",
  }}
>
  <div
    style={{
      width: `${Math.min((ingresoMensualExtra / 3000000) * 100, 100)}%`,
      background: "#0f766e",
      height: "100%",
      transition: "0.5s",
    }}
  />
</div>
                  {habilidadInput && (
  <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: "8px" }}>
    💡 Estás monetizando: <b>{habilidadInput}</b>
  </p>
)}
                    </div> {/* 👈 Cierra div interno */}
                  </div>   {/* 👈 Cierra toolArea */}
                </section>    
                <aside style={styles.sideCol}>
                  <div style={styles.musicCard}>
                    <h4 style={{ marginTop: 0, color: "#be185d" }}>
                      🎵 Ritmo Emprendedor
                    </h4>
                    <iframe
                      width="100%"
                      height="160"
                      src="https://www.youtube.com/embed/fLexgOxsZu0"
                      frameBorder="0"
                      style={{ borderRadius: "12px" }}
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div style={styles.sideCardInspiration}>
                    <h3 style={{ marginTop: 0, color: "#92400e" }}>
                      💡 Sabiduría Módulo 5
                    </h3>
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#451a03",
                      }}
                    >
                      "Nunca dependas de un solo ingreso. Invierte para crear
                      una segunda fuente."
                    </p>
                    <hr
                      style={{
                        border: "0.5px solid #fde68a",
                        margin: "15px 0",
                      }}
                    />
                    <p style={{ fontSize: "0.85rem", color: "#78350f" }}>
                      <b>Consejo Práctico:</b> Empieza pequeño. Un negocio de
                      $100 que funciona es mejor que una idea de un millón que
                      no arranca.
                    </p>
                  </div>
                  <button
                    style={{
                      ...styles.buttonMain,
                      background:
                        completed.indexOf(5) !== -1 ? "#4ade80" : "#0f766e",
                    }}
                    onClick={() => toggleComplete(5)}
                  >
                    {completed.indexOf(5) !== -1
                      ? "¡Módulo 5 Completado! ✅"
                      : "Marcar como terminado"}
                  </button>
                  {completed.indexOf(5) !== -1 && (
                    <div style={styles.congratsLabel}>
                      Llevas el {progress}% del curso
                    </div>
                   )}
                </aside>
                  </div>
                )}

            {currentModule === 6 && (
              <div style={styles.grid}>
                <section style={styles.contentCard}>
                  <div style={styles.badge}>MÓDULO 6</div>
                  <h2 style={{ color: "#0f766e", marginTop: "10px" }}>
                    📈 El Siguiente Nivel: Tu Plan de Vida
                  </h2>

                  <div style={styles.materialBox}>
                    <h3
                      style={{
                        marginTop: 0,
                        color: "#166534",
                        marginBottom: "15px",
                      }}
                    >
                      🎓 Graduación y Próximos Pasos
                    </h3>
                    <p style={{ color: "#374151", lineHeight: "1.6" }}>
                      Has recorrido el camino desde entender tus creencias hasta
                      proyectar ingresos extra. La libertad financiera no es una
                      meta, es un hábito diario.
                    </p>
                    <div
                      style={{
                        marginTop: "20px",
                        padding: "15px",
                        background: "white",
                        borderRadius: "12px",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <h4 style={{ margin: "0 0 10px 0", color: "#0f766e" }}>
                        ✅ Tu Check-list de Graduado:
                      </h4>
                      <ul
                        style={{
                          fontSize: "0.9rem",
                          color: "#475569",
                          paddingLeft: "20px",
                        }}
                      >
                        <li>
                          Fondo de emergencia de al menos 3 meses (Módulo 3).
                        </li>
                        <li>Presupuesto 50/30/20 automatizado (Módulo 2).</li>
                        <li>
                          Plan de eliminación de deudas activo (Módulo 4).
                        </li>
                        <li>
                          Primera semilla de Side Hustle plantada (Módulo 5).
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div style={{ marginBottom: "30px" }}>
                    <h4 style={{ color: "#0f766e", marginBottom: "10px" }}>
                      🎬 Clase de Cierre: Mentalidad de Riqueza
                    </h4>
                    <iframe
                      width="100%"
                      height="315"
                      src="https://www.youtube.com/embed/4qViFGXkinA"
                      title="Mentalidad de Riqueza - Juan Diego Gómez"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ borderRadius: "15px", background: "#000" }}
                    ></iframe>
                    {/* SEGUNDO VIDEO: LOS 7 HÁBITOS (NUEVO) */}
                    <h4
                      style={{
                        color: "#0f766e",
                        marginBottom: "10px",
                        fontSize: "0.9rem",
                      }}
                    >
                      📖 Complemento: Proyecto de Vida
                    </h4>
                    <iframe
                      width="100%"
                      height="315"
                      src="https://www.youtube.com/embed/SqQ-3UEU-RE"
                      title="Los 7 Hábitos de la Gente Altamente Efectiva"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ borderRadius: "15px", background: "#000" }}
                    ></iframe>
                  </div>
                  {/* SECCIÓN DE SABIDURÍA Y CONSEJO */}
                  <div
                    style={{
                      margin: "30px 0",
                      padding: "25px",
                      background:
                        "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                      borderRadius: "20px",
                      borderLeft: "5px solid #166534",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <h4
                      style={{
                        color: "#166534",
                        marginTop: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      💡 Sabiduría para el Camino
                    </h4>
                    <p
                      style={{
                        color: "#1e3a1e",
                        fontSize: "1rem",
                        lineHeight: "1.6",
                        fontStyle: "italic",
                        marginBottom: "15px",
                      }}
                    >
                      "La riqueza no se mide por lo que compras, sino por el
                      tiempo que puedes vivir sin trabajar manteniendo tu estilo
                      de vida. No busques dinero, busca libertad; el dinero es
                      solo la herramienta para conseguirla."
                    </p>
                    <hr
                      style={{
                        border: "0",
                        borderTop: "1px solid #bbf7d0",
                        margin: "15px 0",
                      }}
                    />
                    <p
                      style={{
                        color: "#166534",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        margin: 0,
                      }}
                    >
                      ✨ Consejo de Oro:
                    </p>
                    <p
                      style={{
                        color: "#374151",
                        fontSize: "0.85rem",
                        marginTop: "5px",
                      }}
                    >
                      Nunca dejes de ser un estudiante. El mercado cambia, la
                      economía fluctúa, pero el conocimiento que pusiste en tu
                      mente nadie te lo puede quitar. **Invierte primero en
                      ti.**
                    </p>
                  </div>
                  <div
                    style={{
                      background: "#1e293b",
                      color: "white",
                      padding: "30px",
                      borderRadius: "25px",
                      marginTop: "40px",
                      marginBottom: "40px",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                      border: "2px solid #334155",
                    }}
                  >
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <span style={{ fontSize: "2rem" }}>📜</span>
                      <h3 style={{ margin: "10px 0", color: "#4ade80" }}>
                        ACTA DE COMPROMISO FINANCIERO
                      </h3>
                      <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                        Escribe tu decreto y descárgalo como testimonio de tu
                        nueva vida.
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                      }}
                    >
                      <textarea
                        id="decretoTexto"
                        placeholder="Yo, [Tu Nombre], me comprometo a que en 12 meses habré..."
                        style={{
                          width: "100%",
                          padding: "20px",
                          borderRadius: "15px",
                          border: "none",
                          background: "#334155",
                          color: "white",
                          fontSize: "1rem",
                          minHeight: "120px",
                          outline: "none",
                          borderLeft: "4px solid #4ade80",
                          lineHeight: "1.5",
                        }}
                      />

                      <button
                        onClick={() => {
                          const texto = (
                            document.getElementById(
                              "decretoTexto"
                            ) as HTMLTextAreaElement
                          ).value;
                          localStorage.setItem("decretoUsuario", texto);
                          if (!texto)
                            return alert(
                              "Escribe tu compromiso antes de descargarlo."
                            );

                          const contenido = `
========================================
       SMART U - DECRETO DE PODER
========================================

FECHA: ${new Date().toLocaleDateString()}
ESTUDIANTE: ${user}

MI COMPROMISO SAGRADO:
----------------------------------------
"${texto}"

JURAMENTO:
"Hoy dejo de ser un espectador de mi economía para convertirme en el arquitecto de mi riqueza. Entiendo que la disciplina es el puente entre mis metas y mis logros."

----------------------------------------
Firma Digital: Smart U Graduate
----------------------------------------
        `;

                          const blob = new Blob([contenido], {
                            type: "text/plain",
                          });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.download = `Decreto_Riqueza_${user}.txt`;
                          link.href = url;
                          link.click();
                        }}
                        style={{
                          padding: "18px",
                          background:
                            "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                          color: "white",
                          border: "none",
                          borderRadius: "15px",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          cursor: "pointer",
                          boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                        }}
                      >
                        💾 Descargar mi Decreto Oficial (.txt)
                      </button>

                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "0.75rem",
                          color: "#64748b",
                          margin: 0,
                        }}
                      >
                        *El archivo se guardará como un documento de texto
                        oficial en tu dispositivo.
                      </p>
                    </div>
                  </div>
                  <div style={styles.toolArea}>
                    <h3 style={{ marginTop: 0 }}>
                      🏆 Certificado de Finalización
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                      Al completar todos los módulos, habrás sentado las bases
                      de tu nueva realidad financiera.
                    </p>
                    {progress === 100 ? (
                      <div
                        style={{
                          padding: "30px",
                          background:
                            "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                          border: "3px solid #4ade80",
                          borderRadius: "20px",
                          textAlign: "center",
                          marginTop: "15px",
                          position: "relative",
                          overflow: "hidden",
                          boxShadow: "0 10px 15px -3px rgba(74, 222, 128, 0.3)",
                        }}
                      >
                        {/* Emojis flotantes de celebración */}
                        <div
                          style={{
                            position: "absolute",
                            top: "5px",
                            left: "10%",
                            fontSize: "1.5rem",
                          }}
                        >
                          💰
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: "15px",
                            right: "10%",
                            fontSize: "1.5rem",
                          }}
                        >
                          ✨
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            bottom: "5px",
                            left: "15%",
                            fontSize: "1.5rem",
                          }}
                        >
                          🚀
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            bottom: "5px",
                            right: "15%",
                            fontSize: "1.5rem",
                          }}
                        >
                          💸
                        </div>

                        <h2
                          style={{
                            color: "#166534",
                            margin: 0,
                            fontSize: "1.6rem",
                          }}
                        >
                          ¡MISIÓN CUMPLIDA, {user.toUpperCase()}! 🎓
                        </h2>
                        <p
                          style={{
                            color: "#15803d",
                            fontWeight: "bold",
                            marginTop: "10px",
                          }}
                        >
                          Has completado Smart U con éxito. Eres el dueño de tu
                          destino.
                        </p>
                        <div
                          style={{
                            marginTop: "15px",
                            fontSize: "0.75rem",
                            color: "#166534",
                            fontWeight: "bold",
                            opacity: 0.7,
                          }}
                        >
                          REGISTRO DE GRADUADO: SMART-U-
                          {Math.floor(Math.random() * 9000) + 1000}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          padding: "15px",
                          background: "#fff7ed",
                          border: "1px solid #fdba74",
                          borderRadius: "10px",
                          marginTop: "15px",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            color: "#9a3412",
                            fontSize: "0.85rem",
                          }}
                        >
                          ⚠️ Aún te faltan módulos por marcar como terminados
                          para obtener tu grado (Progreso: {progress}%).
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                <aside style={styles.sideCol}>
                  <div style={styles.musicCard}>
                    <h4 style={{ marginTop: 0, color: "#be185d" }}>
                      🎵 Música de Éxito
                    </h4>
                    <iframe
                      width="100%"
                      height="160"
                      src="https://www.youtube.com/embed/mk48xRzuNvA"
                      title="Hall of Fame - Graduation"
                      frameBorder="0"
                      style={{
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* BOTÓN Y FRASE ACTUALIZADOS AQUÍ */}
                  <button
                    style={{
                      ...styles.buttonMain,
                      background:
                        completed.indexOf(6) !== -1 ? "#4ade80" : "#0f766e",
                    }}
                    onClick={() => toggleComplete(6)}
                  >
                    {completed.indexOf(6) !== -1
                      ? "¡Misión Cumplida: Soy Imparable! ✅"
                      : "Sellar mi Compromiso con la Riqueza 🚀"}
                  </button>

                  {completed.indexOf(6) !== -1 && (
                    <div
                      style={{
                        textAlign: "center",
                        color: "#0f766e",
                        fontSize: "0.85rem",
                        padding: "10px",
                        background: "#f0fdf4",
                        borderRadius: "10px",
                        border: "1px solid #4ade80",
                        marginTop: "15px",
                        fontStyle: "italic",
                      }}
                    >
                      "El éxito no es el final, es el camino que acabas de
                      pavimentar." ✨
                    </div>
                  )}
                </aside>
              </div>
            )}
            {/* === ESTAS SON LAS LÍNEAS QUE ARREGLAN TODO === */}
</>
)}
      </main>
      {/* ============================================== */}
      {/* --- INICIO VENTANA VIP --- */}
      {showVipZone && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(6, 78, 75, 0.95)", // Fondo oscuro con blur
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

            <h2
              style={{
                color: "#0f766e",
                textAlign: "center",
                fontSize: "2.2rem",
                marginBottom: "8px",
              }}
            >
              🎓 Smart U: Biblioteca Pro
            </h2>
            <p
              style={{
                textAlign: "center",
                color: "#64748b",
                marginBottom: "35px",
              }}
            >
              Tus fuentes de consulta y herramientas de práctica real.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {/* TARJETA 1: CENTRAL DE INTELIGENCIA & CONSULTA */}
              <div
                style={{
                  background: "#f8fafc",
                  padding: "20px",
                  borderRadius: "22px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    color: "#0f766e",
                    borderBottom: "2px solid #4ade80",
                    paddingBottom: "8px",
                    marginTop: 0,
                  }}
                >
                  🔍 Terminal de Consulta
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  {/* BUSCADOR DE TÉRMINOS (INVESTOPEDIA) */}
                  <div
                    onClick={() =>
                      window.open(
                        "https://www.investopedia.com/financial-term-dictionary-4769738",
                        "_blank"
                      )
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px",
                      background: "white",
                      borderRadius: "12px",
                      cursor: "pointer",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>📖</span>
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "bold",
                          color: "#0f766e",
                        }}
                      >
                        Diccionario Financiero Pro
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                        ¿No entiendes un término? Búscalo aquí.
                      </div>
                    </div>
                  </div>

                  {/* COMPARADOR DE TASAS (SUPERFINANCIERA O SIMILAR) */}
                  <div
                    onClick={() =>
                      window.open("https://www.comparabien.com.co/", "_blank")
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px",
                      background: "white",
                      borderRadius: "12px",
                      cursor: "pointer",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>⚖️</span>
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "bold",
                          color: "#0f766e",
                        }}
                      >
                        Comparador de Bancos
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                        Tarjetas y Cuentas de Ahorro en tiempo real.
                      </div>
                    </div>
                  </div>

                  {/* INDICADORES ECONÓMICOS DEL DÍA */}
                  <div
                    onClick={() =>
                      window.open(
                        "https://www.larepublica.co/indicadores-economicos",
                        "_blank"
                      )
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px",
                      background: "#ecfdf5",
                      borderRadius: "12px",
                      cursor: "pointer",
                      border: "1px solid #14b8a6",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>📉</span>
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "bold",
                          color: "#0f766e",
                        }}
                      >
                        Monitor de Mercados
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                        Dólar, TRM y Petróleo hoy.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TARJETA 2: JUEGOS DIDÁCTICOS */}
              <div
                style={{
                  background: "#f8fafc",
                  padding: "20px",
                  borderRadius: "22px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    color: "#0f766e",
                    borderBottom: "2px solid #4ade80",
                    paddingBottom: "8px",
                    marginTop: 0,
                  }}
                >
                  🎮 Juegos
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.twinkl.com.co/resource/juego-interactivo-cuentas-los-pesos-colombianos-sa-m-1666197320"
                      )
                    }
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      border: "none",
                      background: "#0f766e",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    🕹️ Jugar Twinkl Online
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.marketwatch.com/games/stock-market-game"
                      )
                    }
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #0f766e",
                      background: "transparent",
                      color: "#0f766e",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    📈 Simulador de Bolsa
                  </button>
                  {/* --- COPIA DESDE AQUÍ --- */}
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.financialfootball.com/",
                        "_blank"
                      )
                    }
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      border: "none",
                      background: "#0f766e",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    ⚽ Financial Football
                  </button>

                  <button
                    onClick={() =>
                      window.open(
                        "https://tyba.com.co/interactyba/inversiones-para-principiantes/",
                        "_blank"
                      )
                    }
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #0f766e",
                      background: "transparent",
                      color: "#0f766e",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    🏚️ Tyba: Inversiones para principiantes
                  </button>
                  {/* --- HASTA AQUÍ --- */}
                </div>
              </div>

              {/* TARJETA 3: RECURSOS DESCARGABLES PRO */}
              <div
                style={{
                  background: "#f8fafc",
                  padding: "20px",
                  borderRadius: "22px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    color: "#0f766e",
                    borderBottom: "2px solid #4ade80",
                    paddingBottom: "8px",
                    marginTop: 0,
                  }}
                >
                  📥 Herramientas de Campo
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginTop: "15px",
                  }}
                >
                  {/* RECURSO 1: CALCULADORA DE SUPERVIVENCIA (EXCEL) */}
                  <div
                    onClick={() =>
                      window.open(
                        "https://excel.cloud.microsoft/es-mx/search/budget/?wdOrigin=SEO-INTENT.SEARCHENGINE-LANDING-INTENT2000.SEARCHTEMPLATES",
                        "_blank"
                      )
                    }
                    style={{
                      padding: "12px",
                      background: "white",
                      borderRadius: "12px",
                      borderLeft: "5px solid #4ade80",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "translateX(5px)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "translateX(0)")
                    }
                  >
                    <small style={{ color: "#64748b", fontWeight: "bold" }}>
                      📊 EXCEL SMART
                    </small>
                    <div
                      style={{
                        color: "#0f766e",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                      }}
                    >
                      Plantilla de Presupuesto
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                      Sobre vive a fin de mes.
                    </div>
                  </div>

                  {/* RECURSO 2: GUÍA DE AHORRO EXTREMO (PDF) */}
                  <div
                    onClick={() =>
                      window.open(
                        "https://www.bunq.com/es-es/blog/8-money-saving-tips-every-student-should-know",
                        "_blank"
                      )
                    }
                    style={{
                      padding: "12px",
                      background: "white",
                      borderRadius: "12px",
                      borderLeft: "5px solid #14b8a6",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "translateX(5px)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "translateX(0)")
                    }
                  >
                    <small style={{ color: "#64748b", fontWeight: "bold" }}>
                      📄 GUÍA MODO SUPERVIVENCIA
                    </small>
                    <div
                      style={{
                        color: "#0f766e",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                      }}
                    >
                      Hackeo de Gastos: "Modo Estudiante"
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                      Tips reales para transporte, comida y ocio.
                    </div>
                  </div>

                  {/* RECURSO 3: TRACKER DE MICRO-DEUDAS */}
                  <div
                    onClick={() =>
                      window.open("https://www.monefy.com/", "_blank")
                    }
                    style={{
                      padding: "12px",
                      background: "white",
                      borderRadius: "12px",
                      borderLeft: "5px solid #f59e0b",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "translateX(5px)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "translateX(0)")
                    }
                  >
                    <small style={{ color: "#64748b", fontWeight: "bold" }}>
                      📉 CONTROL PRO
                    </small>
                    <div
                      style={{
                        color: "#0f766e",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                      }}
                    >
                      Toma el control de tus finanzas
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                      Evita que tu dinero se escape en cafés y apps.
                    </div>
                  </div>
                </div>
              </div>
              {/* TARJETA 4: BIBLIOTECA MAESTRA SMART U (MÓDULOS 1-6) */}
              <div
                style={{
                  background: "#f0fdfa",
                  padding: "25px",
                  borderRadius: "25px",
                  border: "1px solid #ccfbf1",
                  gridColumn: "1 / -1", // Esto hace que ocupe todo el ancho
                  marginTop: "20px",
                }}
              >
                <h3
                  style={{
                    color: "#0f766e",
                    borderBottom: "2px solid #14b8a6",
                    paddingBottom: "10px",
                    marginTop: 0,
                    textAlign: "center",
                  }}
                >
                  📖 Soporte Académico & Bibliografía Integral (Módulos 1 al 6)
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginTop: "15px",
                  }}
                >
                  {/* BLOQUE A */}
                  <div>
                    <h4
                      style={{
                        color: "#0d9488",
                        fontSize: "0.9rem",
                        marginBottom: "8px",
                      }}
                    >
                      🧠 Mentalidad & Diagnóstico (1-2)
                    </h4>
                    <ul
                      style={{
                        fontSize: "0.8rem",
                        color: "#334155",
                        paddingLeft: "15px",
                        lineHeight: "1.6",
                      }}
                    >
                      <li>
                        <strong>T. Harv Eker:</strong> Mente Millonaria.
                      </li>
                      <li>
                        <strong>Dave Ramsey:</strong> La Transformación Total.
                      </li>
                      <li>
                        <strong>Carol Dweck:</strong> Mindset (Psicología).
                      </li>
                    </ul>
                  </div>

                  {/* BLOQUE B */}
                  <div>
                    <h4
                      style={{
                        color: "#0d9488",
                        fontSize: "0.9rem",
                        marginBottom: "8px",
                      }}
                    >
                      💸 Gestión & Riesgo (3-4)
                    </h4>
                    <ul
                      style={{
                        fontSize: "0.8rem",
                        color: "#334155",
                        paddingLeft: "15px",
                        lineHeight: "1.6",
                      }}
                    >
                      <li>
                        <strong>R. Kiyosaki:</strong> El Cuadrante del Flujo.
                      </li>
                      <li>
                        <strong>G. Clason:</strong> El Hombre más Rico de
                        Babilonia.
                      </li>
                      <li>
                        <strong>Investopedia:</strong> Fondos de Emergencia.
                      </li>
                    </ul>
                  </div>

                  {/* BLOQUE C */}
                  <div>
                    <h4
                      style={{
                        color: "#0d9488",
                        fontSize: "0.9rem",
                        marginBottom: "8px",
                      }}
                    >
                      📈 Inversión & Decreto (5-6)
                    </h4>
                    <ul
                      style={{
                        fontSize: "0.8rem",
                        color: "#334155",
                        paddingLeft: "15px",
                        lineHeight: "1.6",
                      }}
                    >
                      <li>
                        <strong>B. Graham:</strong> El Inversor Inteligente.
                      </li>
                      <li>
                        <strong>Tony Robbins:</strong> Inquebrantable.
                      </li>
                      <li>
                        <strong>Napoleon Hill:</strong> Piense y Hágase Rico.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* SECCIÓN DE LINKS EXTERNOS */}
                <div
                  style={{
                    marginTop: "20px",
                    padding: "10px",
                    background: "rgba(255,255,255,0.5)",
                    borderRadius: "15px",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "#0f766e",
                      fontWeight: "bold",
                    }}
                  >
                    Fuentes de apoyo:{" "}
                  </span>
                  <a
                    href="https://www.visualcapitalist.com/"
                    target="_blank"
                    style={{
                      fontSize: "0.8rem",
                      color: "#14b8a6",
                      marginLeft: "10px",
                    }}
                  >
                    Visual Capitalist
                  </a>
                  <a
                    href="https://www.ted.com/talks"
                    target="_blank"
                    style={{
                      fontSize: "0.8rem",
                      color: "#14b8a6",
                      marginLeft: "10px",
                    }}
                  >
                    TED: Finance
                  </a>
                </div>
              </div>
            </div>

            <p
              style={{
                textAlign: "center",
                marginTop: "30px",
                color: "#94a3b8",
                fontSize: "0.8rem",
                fontStyle: "italic",
              }}
            >
              "El conocimiento es el nuevo activo."
            </p>
          </div>
        </div>
      )}
      {/* --- FIN VENTANA VIP --- */}
    </div>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  // --- ESTILOS DE LOGIN ACTUALIZADOS (Efecto Vidrio) ---
  loginWrapper: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)", // Fondo degradado
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "30px",
    padding: "50px 40px",
    width: "420px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    textAlign: "center",
    color: "white",
  },
  inputLogin: {
    width: "100%",
    padding: "18px",
    borderRadius: "15px",
    border: "none",
    marginBottom: "15px",
    background: "white",
    fontSize: "1rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    outline: "none",
  },
  buttonLogin: {
    width: "100%",
    padding: "18px",
    borderRadius: "15px",
    background: "#059669", // Verde esmeralda fuerte
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1.1rem",
    border: "none",
    transition: "transform 0.2s",
  },

  // --- TUS ESTILOS ORIGINALES (SIN TOCAR) ---
 appContainer: {
  display: "flex",
  width: "100%",
  minHeight: "100vh",
},
  sidebar: {
    width: "260px",
    background: "#0f766e",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  logoBox: {
    fontSize: "1.6rem",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
  },
  progressBarBg: {
    width: "100%",
    height: "10px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    background: "#4ade80",
    transition: "width 0.6s ease-in-out",
  },
  moduleLink: {
    padding: "15px",
    marginTop: "10px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
 main: {
  flex: 1,
  padding: "10px", // 🔥 ESTE ES EL FIX REAL
  overflowY: "auto",
  width: "100%",
  maxWidth: "100%",
},
  badge: {
    background: "#ccfbf1",
    color: "#0f766e",
    padding: "5px 12px",
    borderRadius: "6px",
    display: "inline-block",
    fontWeight: "bold",
    fontSize: "0.75rem",
  },
  contentCard: {
    background: "white",
    padding: "30px",
    borderRadius: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    flex: "1 1 500px", // 👈 SE ADAPTA AL ANCHO
  },
  materialBox: {
    background: "#f0fdf4",
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "25px",
    border: "1px solid #bbf7d0",
  },
  slideReplacement: {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    border: "2px solid #ecfdf5",
  },
  infoCircle: {
    background: "#14b8a6",
    color: "white",
    padding: "10px",
    borderRadius: "50%",
    width: "85px",
    height: "85px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "0.75rem",
    textAlign: "center",
  },
  toolArea: {
    padding: "25px",
    background: "#f8fafc",
    borderRadius: "20px",
    border: "1px dashed #cbd5e1",
  },
  metaTitle: {
    color: "#0f766e",
    marginBottom: "12px",
    fontSize: "0.95rem",
    fontWeight: "600",
  },
  inputSmall: {
    padding: "10px",
    width: "100%",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
  },
  btnAdd: {
    padding: "10px 15px",
    background: "#14b8a6",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  metaTag: {
    background: "white",
    border: "1px solid #e2e8f0",
    padding: "8px 12px",
    borderRadius: "10px",
    marginTop: "10px",
    fontSize: "0.85rem",
  },
  sideCol: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "300px",
    flex: "1 1 300px", // 👈 RESPONSIVE AUTOMÁTICO
  },
  musicCard: {
    background: "white",
    padding: "15px",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  sideCardInspiration: {
    background: "#fffbeb",
    padding: "20px",
    borderRadius: "20px",
    border: "1px solid #fef3c7",
  },
  buttonMain: {
    padding: "18px",
    borderRadius: "15px",
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  },
  grid: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap", // 👈 ESTO HACE LA MAGIA
  },
  avanzadoCard: { display: "flex", flexDirection: "column", gap: "5px" },
  labelAvanzado: { fontSize: "0.8rem", color: "#64748b", fontWeight: "600" },
  congratsLabel: {
    textAlign: "center",
    color: "#0f766e",
    fontWeight: "bold",
    fontSize: "0.85rem",
  },
};
