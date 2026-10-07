import re

with open("js/modules.js", "r", encoding="utf-8") as f:
    content = f.read()

matrix_func = """// --- Función para renderizar la Matriz (Cuadro Comparativo) ---
function renderItemsMatrix() {
  const isProv = S.role === 'Proveedor';
  
  // Data simulada estructurada
  const ccData = {
    reqId: "LM-006211",
    proveedores: [
      { id: "p1", nombre: "Grupo Fremat SAC" },
      { id: "p2", nombre: "Sum. del Sur SAC" },
      { id: "p3", nombre: "Multiservicios..." }
    ],
    items: [
      { ite: 1, req: "LM-006211", producto: "[1250011238] CINTA AISLANTE TEMFLEX 1600-155...", unidad: "Unidad", cantidad: 20,
        cot: { p1: { pu: 3.92 }, p2: { pu: 4.64 }, p3: { pu: 3.91 } }, mejorPu: 3.91 },
      { ite: 2, req: "LM-006201", producto: "[1240032861] PROTECTOR SILICONA U.V.3. CITRUS 300 ML", unidad: "Unidad", cantidad: 2,
        cot: { p1: { pu: 20.57 }, p2: { pu: null }, p3: { pu: 20.50 } }, mejorPu: 20.50 },
      { ite: 3, req: "LM-006201", producto: "[1160011555] EMBUDO DE PLASTICO 19 CM", unidad: "Unidad", cantidad: 20,
        cot: { p1: { pu: 18.18 }, p2: { pu: 23.31 }, p3: { pu: null } }, mejorPu: 18.18 }
    ]
  };

  if (isProv) {
    // Si es proveedor, solo ve su data (simulamos que es Grupo Fremat p1)
    ccData.proveedores = [ { id: "p1", nombre: "Mi Oferta" } ];
  }

  // Dimensiones para sticky
  const w1=40, w2=90, w3=300, w4=80, w5=60;
  const pos = [0, w1, w1+w2, w1+w2+w3, w1+w2+w3+w4];
  
  const thStyle = (left, width) => `position:sticky; left:${left}px; z-index:11; width:${width}px; min-width:${width}px; background:var(--card);`;
  const tdStyle = (left) => `position:sticky; left:${left}px; z-index:10; background:var(--card);`;

  let thead = `
    <tr>
      <th rowspan="2" class="stk" style="${thStyle(pos[0], w1)}">Ite</th>
      <th rowspan="2" class="stk" style="${thStyle(pos[1], w2)}">Req</th>
      <th rowspan="2" class="stk" style="${thStyle(pos[2], w3)}">PRODUCTO</th>
      <th rowspan="2" class="stk" style="${thStyle(pos[3], w4)}">Unidad</th>
      <th rowspan="2" class="stk" style="${thStyle(pos[4], w5)} border-right:2px solid var(--line);">Cant</th>
      ${ccData.proveedores.map(p => `<th colspan="2" style="text-align:center; border-bottom:1px solid var(--line);">${p.nombre}</th>`).join('')}
    </tr>
    <tr>
      ${ccData.proveedores.map(p => `<th style="text-align:right">PU</th><th style="text-align:right">Total</th>`).join('')}
    </tr>
  `;

  let tbody = ccData.items.map(item => `
    <tr>
      <td class="stk" style="${tdStyle(pos[0])}">${item.ite}</td>
      <td class="stk" style="${tdStyle(pos[1])}">${item.req}</td>
      <td class="stk" style="${tdStyle(pos[2])} font-size:12px;">${item.producto}</td>
      <td class="stk" style="${tdStyle(pos[3])}">${item.unidad}</td>
      <td class="stk" style="${tdStyle(pos[4])} border-right:2px solid var(--line); font-weight:600;">${item.cantidad}</td>
      
      ${ccData.proveedores.map(p => {
         const c = item.cot[p.id] || { pu: null };
         const isLowest = (c.pu !== null && c.pu === item.mejorPu);
         const bgClass = isLowest && !isProv ? 'style="background:#fef08a; font-weight:bold; text-align:right; color:#854d0e;"' : 'style="text-align:right;"';
         const total = c.pu !== null ? (c.pu * item.cantidad).toFixed(2) : '-';
         const puText = c.pu !== null ? c.pu.toFixed(2) : '-';
         
         if (isProv) {
             const val = c.pu !== null ? c.pu : '';
             return `<td><input type="number" class="inp-pu mi" data-ite="${item.ite}" data-cant="${item.cantidad}" style="width:100%; text-align:right; height:32px; padding:0 8px; border:1px solid #ccc; border-radius:4px;" value="${val}" step="0.01"></td>
                     <td class="td-total" data-ite="${item.ite}" style="text-align:right; font-weight:600; vertical-align:middle;">${val ? (val * item.cantidad).toFixed(2) : '-'}</td>`;
         } else {
             return `<td ${bgClass}>${puText}</td>
                     <td ${bgClass}>${total}</td>`;
         }
      }).join('')}
    </tr>
  `).join('');

  return `<div class="card pc" style="padding:0; overflow:hidden;">
            <div class="hd" style="padding:16px 16px 0;"><h3>${ic('tag')}Matriz de Cotización</h3></div>
            <div style="overflow-x:auto; max-width:100%; margin-top:10px; padding-bottom:10px;">
              <table class="tbl" style="margin-bottom:0; border-top:1px solid var(--line); white-space:nowrap;">
                <thead style="background:var(--card)">${thead}</thead>
                <tbody>${tbody}</tbody>
              </table>
            </div>
          </div>`;
}

"""

if "function renderItemsMatrix" not in content:
    content = content.replace("// Vista Cotizaciones (COTI)", matrix_func + "\n// Vista Cotizaciones (COTI)")

# Replace in vCotiDet
coti_old = """      <div class="card pc"><div class="hd"><h3>${ic('bld')}Ítems Solicitados</h3></div>
        <ul class="notes">
          <li>EPPs Básicos Lote A <small>Cantidad: 500 und</small></li>
          <li>EPPs Especializados <small>Cantidad: 50 und</small></li>
        </ul>
      </div>"""
coti_new = """      ${renderItemsMatrix()}"""
content = content.replace(coti_old, coti_new)

# Replace in vCCDet
cc_old = """      <div class="card pc"><div class="hd"><h3>${ic('tag')}Análisis Lado a Lado</h3></div>
        <div style="display:flex;gap:16px;margin-top:16px">
          <div style="flex:1;border:2px solid #0f9d6a;border-radius:8px;padding:16px;background:#f0fdf4">
            <h4 style="margin:0 0 10px;color:#065f46">Ganador: ${c.provGana}</h4>
            <div style="font-size:24px;font-weight:700;color:#047857">${c.monto}</div>
            <p style="font-size:13px;color:#065f46;margin:10px 0">Tiempo de entrega: 5 días<br>Garantía: 1 año<br>Historial: ${c.hist.rating}</p>
          </div>
          <div style="flex:1;border:1px solid var(--line);border-radius:8px;padding:16px;">
            <h4 style="margin:0 0 10px;color:var(--ink)">Alternativa 2</h4>
            <div style="font-size:20px;font-weight:600">$4,800.00</div>
            <p style="font-size:13px;color:var(--mut);margin:10px 0">Tiempo de entrega: 7 días<br>Garantía: 6 meses</p>
          </div>
          <div style="flex:1;border:1px solid var(--line);border-radius:8px;padding:16px;">
            <h4 style="margin:0 0 10px;color:var(--ink)">Alternativa 3</h4>
            <div style="font-size:20px;font-weight:600">$4,300.00</div>
            <p style="font-size:13px;color:var(--mut);margin:10px 0">Tiempo de entrega: 15 días (Demasiado alto)<br>Garantía: 1 año</p>
          </div>
        </div>
      </div>"""
cc_new = """      ${renderItemsMatrix()}"""
content = content.replace(cc_old, cc_new)

# Modify bindCotiDet to add input event listeners
bind_coti_det_old = """function bindCotiDet(){
  $('#bk').onclick=()=>go('coti');
}"""
bind_coti_det_new = """function bindCotiDet(){
  $('#bk').onclick=()=>go('coti');
  
  // Auto-calcular totales en matriz
  document.querySelectorAll('.inp-pu').forEach(inp => {
    inp.addEventListener('input', e => {
      const cant = parseFloat(e.target.dataset.cant);
      const val = parseFloat(e.target.value);
      const tdTotal = document.querySelector(`.td-total[data-ite="${e.target.dataset.ite}"]`);
      if(tdTotal) {
        if(!isNaN(val)) tdTotal.textContent = (val * cant).toFixed(2);
        else tdTotal.textContent = '-';
      }
    });
  });
}"""
content = content.replace(bind_coti_det_old, bind_coti_det_new)

with open("js/modules.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Patched modules.js")
