import { useState, useRef } from "react";

const LOGO_IMG = "data:image/jpeg;base64,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";
const SIDE_IMG = "data:image/jpeg;base64,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";

const DEFAULT_PRODUCTS = [
  { nombre: "Llavero de filamento 2 colores con chip NFC", cantidad: 100, precioUnitario: 5 },
  { nombre: "Llavero de filamento 2 colores", cantidad: 100, precioUnitario: 3.5 },
];

const DEFAULT_STATE = {
  fecha: "12 de Febrero del 2026",
  cliente: "Showtech solutions SAC",
  numeroCotizacion: "0085",
  vendedor: "LEONARDO CASAS",
  tituloServicio: "DISEÑO E\nIMPRESIÓN 3D",
  tituloProducto: "Llaveros personalizados",
  descripcionProducto:
    "Llavero impreso en filamento PLA de color blanco y azul con argolla para colgar. Diseño referencial con un de tamaño 4 x 4 x 0.2 cm el llavero cuenta con un chip NFC para almacenar un link.",
  observaciones: "",
  imagenProducto: null,
  imagenColor1: null,
  imagenColor2: null,
  productos: DEFAULT_PRODUCTS,
};

const colors = {
  black: "#111",
  red: "#E53935",
};

const fontImport = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');`;

export default function CotizacionGenerator() {
  const [form, setForm] = useState(DEFAULT_STATE);
  const [activeTab, setActiveTab] = useState("datos");
  const [previewPage, setPreviewPage] = useState(1);
  const printRef = useRef();

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const setProduct = (idx, key, val) => {
    const prods = [...form.productos];
    prods[idx] = { ...prods[idx], [key]: val };
    setForm((p) => ({ ...p, productos: prods }));
  };
  const addProduct = () => setForm((p) => ({ ...p, productos: [...p.productos, { nombre: "", cantidad: 0, precioUnitario: 0 }] }));
  const removeProduct = (idx) => setForm((p) => ({ ...p, productos: p.productos.filter((_, i) => i !== idx) }));

  const subtotal = form.productos.reduce((s, p) => s + p.cantidad * p.precioUnitario, 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  const handleImageUpload = (key, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set(key, ev.target.result);
    reader.readAsDataURL(file);
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head><title>Cotización Krea Lab</title>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; }
        .page { width: 210mm; min-height: 297mm; padding: 0; position: relative; overflow: hidden; page-break-after: always; background: white; }
        @media print { body { margin: 0; } .page { page-break-after: always; } }
      </style>
    </head><body>${printContent.innerHTML}</body></html>`);
    win.document.close();
    setTimeout(() => { win.print(); win.close(); }, 600);
  };

  const tabs = [
    { id: "datos", label: "Datos" },
    { id: "producto", label: "Producto" },
    { id: "items", label: "Items" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', sans-serif", background: "#0f0f0f", color: "#eee", overflow: "hidden" }}>
      <style>{fontImport}{`
        input, textarea { font-family: 'DM Sans', sans-serif; }
        input:focus, textarea:focus { outline: none; border-color: ${colors.red} !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        .tab-btn { padding: 8px 16px; border: none; cursor: pointer; font-size: 13px; font-weight: 600; border-radius: 6px; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .tab-btn.active { background: ${colors.red}; color: white; }
        .tab-btn:not(.active) { background: transparent; color: #888; }
        .tab-btn:not(.active):hover { color: #ccc; background: #222; }
        .fi { width: 100%; padding: 10px 12px; border: 1px solid #333; border-radius: 8px; background: #1a1a1a; color: #eee; font-size: 14px; transition: border-color 0.2s; }
        .fl { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-bottom: 6px; display: block; }
        .pnb { width: 36px; height: 36px; border-radius: 50%; border: 1px solid #333; background: #1a1a1a; color: #aaa; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; transition: all 0.2s; }
        .pnb:hover { border-color: ${colors.red}; color: ${colors.red}; }
        .pb { padding: 14px 28px; background: ${colors.red}; color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; letter-spacing: 0.5px; transition: all 0.2s; font-family: 'DM Sans', sans-serif; width: 100%; }
        .pb:hover { background: #c62828; transform: translateY(-1px); }
        .ab { padding: 8px 16px; background: transparent; border: 1px dashed #444; color: #888; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; width: 100%; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .ab:hover { border-color: ${colors.red}; color: ${colors.red}; }
        .rb { background: none; border: none; color: #555; cursor: pointer; font-size: 18px; padding: 4px; line-height: 1; transition: color 0.2s; }
        .rb:hover { color: ${colors.red}; }
        .uz { border: 2px dashed #333; border-radius: 10px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden; }
        .uz:hover { border-color: #555; }
      `}</style>

      {/* LEFT PANEL */}
      <div style={{ width: 380, minWidth: 380, background: "#141414", borderRight: "1px solid #222", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #222" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, background: colors.red, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "white" }}>K</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Krea Lab</div>
              <div style={{ fontSize: 11, color: "#666" }}>Generador de Cotizaciones</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, background: "#0f0f0f", padding: 4, borderRadius: 8 }}>
            {tabs.map((t) => (<button key={t.id} className={`tab-btn ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
          {activeTab === "datos" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div><label className="fl">N° Cotización</label><input className="fi" value={form.numeroCotizacion} onChange={(e) => set("numeroCotizacion", e.target.value)} /></div>
              <div><label className="fl">Fecha</label><input className="fi" value={form.fecha} onChange={(e) => set("fecha", e.target.value)} /></div>
              <div><label className="fl">Cliente</label><input className="fi" value={form.cliente} onChange={(e) => set("cliente", e.target.value)} /></div>
              <div><label className="fl">Vendedor</label><input className="fi" value={form.vendedor} onChange={(e) => set("vendedor", e.target.value)} /></div>
              <div><label className="fl">Título del Servicio (Portada)</label><textarea className="fi" rows={3} value={form.tituloServicio} onChange={(e) => set("tituloServicio", e.target.value)} /></div>
              <div><label className="fl">Observaciones</label><textarea className="fi" rows={3} value={form.observaciones} onChange={(e) => set("observaciones", e.target.value)} placeholder="Escribir observaciones..." /></div>
            </div>
          )}
          {activeTab === "producto" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div><label className="fl">Título del Producto</label><input className="fi" value={form.tituloProducto} onChange={(e) => set("tituloProducto", e.target.value)} /></div>
              <div><label className="fl">Descripción</label><textarea className="fi" rows={5} value={form.descripcionProducto} onChange={(e) => set("descripcionProducto", e.target.value)} /></div>
              <div>
                <label className="fl">Imagen del Producto</label>
                <div className="uz">
                  {form.imagenProducto ? (
                    <div style={{ position: "relative" }}>
                      <img src={form.imagenProducto} alt="" style={{ maxWidth: "100%", maxHeight: 160, borderRadius: 8 }} />
                      <button onClick={() => set("imagenProducto", null)} style={{ position: "absolute", top: -8, right: -8, background: colors.red, color: "white", border: "none", borderRadius: "50%", width: 24, height: 24, cursor: "pointer", fontSize: 14, lineHeight: "24px" }}>×</button>
                    </div>
                  ) : (
                    <label style={{ cursor: "pointer", display: "block" }}>
                      <div style={{ fontSize: 28, marginBottom: 4 }}>📷</div>
                      <div style={{ color: "#666", fontSize: 13 }}>Click para subir imagen</div>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload("imagenProducto", e)} style={{ display: "none" }} />
                    </label>
                  )}
                </div>
              </div>
              <div>
                <label className="fl">Imágenes de Color de Acabado</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {["imagenColor1", "imagenColor2"].map((key, i) => (
                    <div key={key} className="uz" style={{ flex: 1 }}>
                      {form[key] ? (
                        <div style={{ position: "relative" }}>
                          <img src={form[key]} alt="" style={{ maxWidth: "100%", maxHeight: 80, borderRadius: 6 }} />
                          <button onClick={() => set(key, null)} style={{ position: "absolute", top: -8, right: -8, background: colors.red, color: "white", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", fontSize: 12, lineHeight: "20px" }}>×</button>
                        </div>
                      ) : (
                        <label style={{ cursor: "pointer", display: "block" }}>
                          <div style={{ fontSize: 20 }}>🎨</div>
                          <div style={{ color: "#666", fontSize: 11 }}>Color {i + 1}</div>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(key, e)} style={{ display: "none" }} />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === "items" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {form.productos.map((p, i) => (
                <div key={i} style={{ background: "#1a1a1a", borderRadius: 10, padding: 14, border: "1px solid #252525" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#666" }}>ITEM {i + 1}</span>
                    {form.productos.length > 1 && <button className="rb" onClick={() => removeProduct(i)}>×</button>}
                  </div>
                  <div style={{ marginBottom: 8 }}><input className="fi" placeholder="Nombre del producto" value={p.nombre} onChange={(e) => setProduct(i, "nombre", e.target.value)} style={{ fontSize: 13 }} /></div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ flex: 1 }}><label style={{ fontSize: 10, color: "#555", fontWeight: 600 }}>Cantidad</label><input className="fi" type="number" value={p.cantidad} onChange={(e) => setProduct(i, "cantidad", Number(e.target.value))} style={{ fontSize: 13 }} /></div>
                    <div style={{ flex: 1 }}><label style={{ fontSize: 10, color: "#555", fontWeight: 600 }}>Precio Unit.</label><input className="fi" type="number" step="0.01" value={p.precioUnitario} onChange={(e) => setProduct(i, "precioUnitario", Number(e.target.value))} style={{ fontSize: 13 }} /></div>
                    <div style={{ flex: 1 }}><label style={{ fontSize: 10, color: "#555", fontWeight: 600 }}>Total</label><div className="fi" style={{ background: "#111", color: colors.red, fontWeight: 700 }}>S/ {(p.cantidad * p.precioUnitario).toFixed(2)}</div></div>
                  </div>
                </div>
              ))}
              <button className="ab" onClick={addProduct}>+ Agregar producto</button>
              <div style={{ background: "#1a1a1a", borderRadius: 10, padding: 16, border: "1px solid #252525", marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}><span style={{ color: "#888" }}>Subtotal</span><span>S/ {subtotal.toFixed(2)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}><span style={{ color: "#888" }}>IGV (18%)</span><span>S/ {igv.toFixed(2)}</span></div>
                <div style={{ height: 1, background: "#333", margin: "8px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700 }}><span>Total</span><span style={{ color: colors.red }}>S/ {total.toFixed(2)}</span></div>
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: 16, borderTop: "1px solid #222" }}><button className="pb" onClick={handlePrint}>📄 Generar PDF</button></div>
      </div>

      {/* RIGHT PREVIEW */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto", padding: "20px 20px", background: "#0a0a0a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexShrink: 0 }}>
          <button className="pnb" onClick={() => setPreviewPage(Math.max(1, previewPage - 1))}>‹</button>
          <span style={{ fontSize: 13, color: "#666", fontWeight: 600, letterSpacing: 1 }}>PÁGINA {previewPage} / 4</span>
          <button className="pnb" onClick={() => setPreviewPage(Math.min(4, previewPage + 1))}>›</button>
        </div>
        <div style={{ transform: "scale(0.72)", transformOrigin: "top center", flexShrink: 0 }}>
          {previewPage === 1 && <Page1 form={form} isPrint={false} />}
          {previewPage === 2 && <Page2 form={form} isPrint={false} />}
          {previewPage === 3 && <Page3 form={form} isPrint={false} />}
          {previewPage === 4 && <Page4 form={form} subtotal={subtotal} igv={igv} total={total} isPrint={false} />}
        </div>
        <div ref={printRef} style={{ position: "absolute", left: "-9999px", top: 0 }}>
          <Page1 form={form} isPrint={true} />
          <Page2 form={form} isPrint={true} />
          <Page3 form={form} isPrint={true} />
          <Page4 form={form} subtotal={subtotal} igv={igv} total={total} isPrint={true} />
        </div>
      </div>
    </div>
  );
}

/* ═══ SHARED ═══ */
const pageBase = { width: "794px", minHeight: "1123px", background: "white", color: "#111", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", boxShadow: "0 4px 40px rgba(0,0,0,0.5)" };

function SideStrip() {
  return (
    <div style={{ position: "absolute", right: 0, top: 0, width: "160px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#d0d0d0" }}>
      <img src={SIDE_IMG} alt="" style={{ height: "100%", objectFit: "cover", opacity: 1 }} />
    </div>
  );
}

function KreaHeader({ rightText }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "36px 50px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img src={LOGO_IMG} alt="Krea Lab" style={{ width: 40, height: 40, objectFit: "contain" }} />
        <span style={{ fontWeight: 900, fontSize: 28, letterSpacing: "-0.5px" }}>Krea Lab</span>
      </div>
      <div style={{ width: 2, height: 30, background: "#ccc", margin: "0 6px" }} />
      <span style={{ fontSize: 21, color: "#555" }}>{rightText || "Cotización"}</span>
    </div>
  );
}

function KreaFooter() {
  return (
    <div style={{ position: "absolute", bottom: 30, left: 50 }}>
      <div style={{ fontWeight: 700, fontSize: 13 }}>Celular: +51 962 375 279</div>
      <div style={{ fontWeight: 700, fontSize: 13 }}>contacto@krealab.com.pe</div>
    </div>
  );
}

function c(isPrint, printColor = "#111") { return isPrint ? printColor : colors.red; }

/* PAGE 1 */
function Page1({ form, isPrint }) {
  const lines = form.tituloServicio.split("\n");
  return (
    <div className="page" style={pageBase}>
      <KreaHeader rightText="Cotización" />
      <div style={{ position: "absolute", bottom: 100, left: 50, maxWidth: 560 }}>
        {lines.map((line, i) => (<div key={i} style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2px", color: "#111" }}>{line}</div>))}
      </div>
      <SideStrip />
    </div>
  );
}

/* PAGE 2 */
function Page2({ form, isPrint }) {
  const h = c(isPrint);
  return (
    <div className="page" style={pageBase}>
      <KreaHeader rightText="Cotización" />
      <div style={{ width: "calc(100% - 160px)", borderTop: "2px solid #111", margin: "0 50px" }} />
      <div style={{ padding: "30px 50px", maxWidth: 580 }}>
        <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Presentación:</p>
        <p style={{ fontSize: 14, marginBottom: 24 }}><strong>Fecha: </strong><span style={{ color: h, fontWeight: 700 }}>{form.fecha}</span></p>
        <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Presente.-</p>
        <p style={{ fontSize: 14, marginBottom: 28 }}><strong>Atención: </strong><span style={{ color: h, fontWeight: 700 }}>{form.cliente}</span></p>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, textAlign: "justify", marginBottom: 20 }}>En Krealab, somos una empresa especializada en diseño e impresión 3D, enfocada en ofrecer soluciones creativas, precisas y totalmente personalizadas para nuestros clientes. Contamos con un equipo de profesionales apasionados por la innovación, que trabajan con tecnología de última generación para garantizar resultados de alta calidad.</p>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, textAlign: "justify", marginBottom: 20 }}>Nos dedicamos a crear piezas, prototipos y productos que se adaptan a las necesidades específicas de cada proyecto, optimizando procesos, reduciendo tiempos de producción y agregando valor a cada idea. Nuestro compromiso es transformar conceptos en realidades tangibles, cuidando cada detalle desde el diseño hasta la entrega final.</p>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, textAlign: "justify", marginBottom: 30 }}>Agradecemos la oportunidad de presentar nuestra propuesta. En Krealab, estamos listos para colaborar con usted y llevar sus ideas al siguiente nivel.</p>
        <p style={{ fontSize: 14, marginBottom: 60 }}>Atentamente.</p>
        <div style={{ textAlign: "center", maxWidth: 300, margin: "0 auto" }}>
          <div style={{ borderTop: "2px solid #111", paddingTop: 10 }}>
            <p style={{ fontWeight: 700, fontSize: 14 }}>Gerente General</p>
            <p style={{ fontWeight: 700, fontSize: 14 }}>Jose Anglas Santiago</p>
          </div>
        </div>
      </div>
      <KreaFooter />
      <SideStrip />
    </div>
  );
}

/* PAGE 3 */
function Page3({ form, isPrint }) {
  const h = c(isPrint);
  return (
    <div className="page" style={pageBase}>
      <KreaHeader rightText="Cotización 1" />
      <div style={{ padding: "10px 50px", maxWidth: 580 }}>
        <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{form.tituloProducto}</h3>
        <p style={{ fontSize: 14, fontWeight: 700, fontStyle: "italic", textDecoration: "underline", color: "#111", marginBottom: 8 }}>Descripción:</p>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#555", marginBottom: 30 }}>{form.descripcionProducto}</p>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          {form.imagenProducto ? (
            <img src={form.imagenProducto} alt="Producto" style={{ maxWidth: 320, maxHeight: 260, borderRadius: 8, objectFit: "contain" }} />
          ) : (
            <div style={{ width: 320, height: 220, background: "#f0f0f0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", color: "#bbb", fontSize: 14 }}>Imagen del producto</div>
          )}
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#888", marginBottom: 40, textTransform: "uppercase", letterSpacing: 1 }}>DISEÑO PENDIENTE DE VALIDAR Y DESARROLLAR</p>
        <p style={{ fontWeight: 700, fontStyle: "italic", textDecoration: "underline", color: h, fontSize: 15, marginBottom: 12 }}>Color de acabado:</p>
        <div style={{ display: "flex", gap: 16 }}>
          {[form.imagenColor1, form.imagenColor2].map((img, i) => (
            <div key={i}>
              {img ? <img src={img} alt={`Color ${i + 1}`} style={{ width: 120, height: 100, objectFit: "cover", borderRadius: 6 }} /> : <div style={{ width: 120, height: 100, background: "#f0f0f0", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: 12 }}>Color {i + 1}</div>}
            </div>
          ))}
        </div>
      </div>
      <KreaFooter />
      <SideStrip />
    </div>
  );
}

/* PAGE 4 */
function Page4({ form, subtotal, igv, total, isPrint }) {
  const cL = c(isPrint, "#fff");
  const dotPattern = (right, top) => (
    <div style={{ position: "absolute", right, top, opacity: 0.15 }}>
      {Array.from({ length: 8 }).map((_, r) => (<div key={r} style={{ display: "flex", gap: 8, marginBottom: 6 }}>{Array.from({ length: 10 }).map((_, c2) => (<div key={c2} style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />))}</div>))}
    </div>
  );
  return (
    <div className="page" style={{ ...pageBase, padding: 0 }}>
      <div style={{ background: "#111", padding: "40px 50px 30px", position: "relative" }}>
        {dotPattern("30px", "20px")}
        <h2 style={{ color: "white", fontSize: 32, fontWeight: 900, marginBottom: 16 }}>COTIZACIÓN N° <span style={{ color: cL }}>{form.numeroCotizacion}</span></h2>
        <div style={{ color: "#ccc", fontSize: 13, lineHeight: 1.8 }}>
          <p><span style={{ textDecoration: "underline" }}>FECHA</span>: <span style={{ color: cL }}>{form.fecha}</span></p>
          <p><span style={{ textDecoration: "underline" }}>VENDEDOR</span>: {form.vendedor}</p>
          <p><span style={{ textDecoration: "underline" }}>CLIENTE</span>: <span style={{ color: cL }}>{form.cliente}</span></p>
        </div>
      </div>
      <div style={{ padding: "30px 50px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ background: "#111", color: "white" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, fontSize: 12 }}>PRODUCTO</th>
            <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, fontSize: 12, width: 100 }}>CANTIDAD</th>
            <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, fontSize: 12, width: 100 }}>PRECIO UNITARIO</th>
            <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, fontSize: 12, width: 90 }}>TOTAL</th>
          </tr></thead>
          <tbody>{form.productos.map((p, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #e0e0e0" }}>
              <td style={{ padding: "14px 16px" }}>{p.nombre}</td>
              <td style={{ padding: "14px 16px", textAlign: "center" }}>{p.cantidad}</td>
              <td style={{ padding: "14px 16px", textAlign: "center" }}>{p.precioUnitario}</td>
              <td style={{ padding: "14px 16px", textAlign: "center" }}>{(p.cantidad * p.precioUnitario).toFixed(0)}</td>
            </tr>
          ))}</tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
          <div style={{ width: 220 }}>
            {[{ label: "SUB TOTAL", value: subtotal.toFixed(0) }, { label: "IGV", value: igv.toFixed(0) }, { label: "IMPORTE TOTAL", value: total.toFixed(0), bold: true }].map((row, i) => (
              <div key={i} style={{ display: "flex", borderBottom: "1px solid #e0e0e0", padding: "10px 0" }}>
                <div style={{ flex: 1, textAlign: "center", fontSize: 12, fontWeight: row.bold ? 700 : 500, color: "#555" }}>{row.label}</div>
                <div style={{ width: 90, textAlign: "center", fontSize: 13, fontWeight: row.bold ? 700 : 500 }}>{row.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 40 }}>
          <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>OBSERVACIONES:</h4>
          {form.observaciones && <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{form.observaciones}</p>}
        </div>
        <div style={{ marginTop: 30, position: "relative" }}>
          <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", fontSize: 120, fontWeight: 900, color: "rgba(0,0,0,0.04)", letterSpacing: "-4px", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none" }}>KREALAB</div>
          <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>==============</p>
          <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>Banco de crédito</p>
          <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>==============</p>
          <table style={{ fontSize: 13, lineHeight: 2 }}><tbody>
            {[["Entidad Bancaria", "BCP"], ["Titular de Cuenta", "Krea Lab S.A.C"], ["Tipo de Cuenta", "Corriente Soles"], ["Nro. de Cuenta", "1917289070068"], ["Nro. de Cuenta Interbancaria", "00219100728907006854"]].map(([label, val], i) => (
              <tr key={i}><td style={{ fontWeight: 600, paddingRight: 20 }}>{label}</td><td>: {val}</td></tr>
            ))}
          </tbody></table>
        </div>
        <div style={{ position: "absolute", bottom: 30, left: 30 }}>
          {Array.from({ length: 7 }).map((_, r) => (<div key={r} style={{ display: "flex", gap: 6, marginBottom: 4 }}>{Array.from({ length: Math.min(r + 3, 18) }).map((_, c2) => (<div key={c2} style={{ width: 4, height: 4, borderRadius: "50%", background: "#111", opacity: 0.2 + r * 0.1 }} />))}</div>))}
        </div>
        <div style={{ position: "absolute", bottom: 35, right: 50, fontSize: 12, color: "#555" }}>Cotización válida por 15 días*</div>
      </div>
    </div>
  );
}
