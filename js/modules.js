/* ============ Módulos Nuevos: Coti, CC, OC, Fac ============ */
window.previewCotiFile = function(name) {
  const isPdf = name.toLowerCase().endsWith('.pdf');
  const icon = isPdf ? ic('doc', 48) : ic('mail', 48);
  const html = `
    <div class="card" style="width:400px; padding:0; overflow:hidden;">
      <div class="hd" style="display:flex; justify-content:space-between; align-items:center; padding:15px 20px; border-bottom:1px solid var(--line);">
         <h3 style="margin:0;">Previsualización</h3>
         <button class="ibtn" onclick="closeModal()" style="font-size:20px; color:var(--mut); line-height:1; height:auto; padding:0 5px;">×</button>
      </div>
      <div style="padding:40px 20px; text-align:center; background:#f8fafc;">
         <div style="color:var(--ink);">${icon}</div>
         <h4 style="margin:15px 0 5px; color:var(--ink); word-break:break-all;">${name}</h4>
         <p style="color:var(--mut); font-size:13px; margin:0;">Archivo listo para enviarse.</p>
      </div>
    </div>
  `;
  window.openModal(html);
};

window.handleCotiFile = function(input, listId) {
  const lst = document.getElementById(listId);
  Array.from(input.files).forEach(f => {
    const ext = f.name.split('.').pop().toUpperCase();
    const div = document.createElement('div');
    div.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; font-size:13px; color:#334155;";
    div.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px; overflow:hidden;">
        <div style="padding:4px 6px; background:#e0f2fe; color:#0284c7; border-radius:4px; font-weight:600; font-size:10px;">${ext}</div>
        <span style="white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${f.name}</span>
      </div>
      <div style="display:flex; gap:6px;">
        <button class="ibtn" style="color:#0ea5e9; padding:4px;" title="Previsualizar" onclick="previewCotiFile('${f.name}')">${ic('eye', 16)}</button>
        <button class="ibtn" style="color:#ef4444; padding:4px;" title="Quitar" onclick="this.parentElement.parentElement.remove()">${ic('x', 16)}</button>
      </div>
    `;
    lst.appendChild(div);
  });
  input.value = '';
};

window.responderOC = function(id, resp) {
   if (resp === 'Aceptada') {
      const o = OC.find(x => x.id === id);
      if(o) {
         o.estado = 'Aceptada';
         
         // Generate mock recepciones based on the OC items
         o.items.forEach((item, idx) => {
            const isServicio = item.prod.toLowerCase().includes('servicio') || item.prod.toLowerCase().includes('mantenimiento');
            RECEPCIONES_PENDIENTES.unshift({
               material: isServicio ? 'SERV-' + (idx+1) : 'SKU ' + (idx+1),
               desc: item.prod,
               oc: id,
               ingreso: Math.floor(Math.random() * 9000 + 1000).toString(),
               cantidad: parseFloat(item.cant),
               pu: parseFloat(item.precio),
               subtotal: parseFloat(item.sub.replace(/,/g, '')),
               tipo: isServicio ? 'servicio' : 'bien'
            });
         });
         toast(`Orden ${id} aceptada. Entregables generados para Facturación.`);
      }
      render();
   } else {
      const html = `
        <div class="card" style="width:380px; padding:20px;">
           <h3 style="margin-top:0; margin-bottom:10px; font-size:16px;">Rechazar Orden de Compra</h3>
           <p style="font-size:13px; color:var(--mut); margin-bottom:15px; line-height:1.4;">Por favor, indica el motivo por el cual rechazas esta orden. Esta notificación será enviada a Logística.</p>
           <textarea id="ocRechazoMotivo" class="inp" style="width:100%; height:100px; resize:none; margin-bottom:20px; font-family:inherit; font-size:13px;" placeholder="Escribe el motivo aquí..."></textarea>
           <div style="display:flex; gap:10px; justify-content:flex-end;">
              <button class="btn" onclick="closeModal()">Cancelar</button>
              <button class="btn p" style="background:#ef4444; border:none; box-shadow:0 4px 6px -1px rgba(239,68,68,0.2);" onclick="confirmarRechazoOC('${id}')">Confirmar Rechazo</button>
           </div>
        </div>
      `;
      window.openModal(html);
   }
};

window.confirmarRechazoOC = function(id) {
   const m = document.getElementById('ocRechazoMotivo').value;
   if(!m.trim()) { toast('Debes ingresar un motivo'); return; }
   toast(`Orden ${id} rechazada y notificada.`);
   const o = OC.find(x => x.id === id);
   if(o) o.estado = 'Rechazada';
   closeModal();
   render();
};

window.GLOBAL_MATRIX_DATA = {
  reqId: "RFQ-2026-045",
  proveedores: [
    { id: "p1", nombre: "Grupo Fremat SAC" },
    { id: "p2", nombre: "Seguridad Industrial SAC" },
    { id: "p3", nombre: "Multiservicios Lumar" }
  ],
  items: [
    { ite: 10, req: "RFQ-2026-045", producto: "Casco de seguridad tipo Jockey (Blanco) ANSI Z89.1", unidad: "UND", cantidad: 50,
      cot: { p1: { pu: 30.00 }, p2: { pu: 35.00 }, p3: { pu: 32.50 } }, mejorPu: 30.00 },
    { ite: 20, req: "RFQ-2026-045", producto: "Lentes de Seguridad Anti-empañantes 3M", unidad: "UND", cantidad: 100,
      cot: { p1: { pu: 20.00 }, p2: { pu: null }, p3: { pu: 22.00 } }, mejorPu: 20.00 },
    { ite: 30, req: "RFQ-2026-045", producto: "Servicio de Mantenimiento Preventivo de Equipos", unidad: "SRV", cantidad: 1,
      cot: { p1: { pu: 1500.00 }, p2: { pu: 1650.00 }, p3: { pu: 1450.00 } }, mejorPu: 1450.00 }
  ]
};

window.verPerfil = function(nombre) {
  const modalHTML = `
    <div id="perfil-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(15,23,42,0.6); z-index:9999; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(4px); opacity:0; transition:opacity 0.2s;">
      <div style="background:var(--card); width:400px; border-radius:12px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.5); overflow:hidden; transform:scale(0.95); transition:transform 0.2s; border:1px solid var(--border);">
        <div style="background:var(--card); padding:16px 20px; border-bottom:1px solid var(--line); display:flex; justify-content:space-between; align-items:center;">
           <h3 style="margin:0; font-size:16px; color:var(--ink); display:flex; align-items:center; gap:8px;">${ic('users', 18)} Perfil de Proveedor</h3>
           <button class="ibtn" onclick="this.closest('#perfil-modal').remove()" style="color:var(--mut); font-size:18px; line-height:1;">&#10005;</button>
        </div>
        <div style="padding:24px;">
           <h4 style="margin:0 0 16px 0; color:var(--ink); font-size:18px;">${nombre}</h4>
           <div style="display:flex; flex-direction:column; gap:12px; font-size:14px;">
             <div style="display:flex; justify-content:space-between;"><span style="color:var(--mut)">RUC Validado</span><span style="font-weight:600; color:#10b981;">Sí</span></div>
             <div style="display:flex; justify-content:space-between;"><span style="color:var(--mut)">Homologación</span><span style="font-weight:600; color:#0ea5e9;">Nivel A (Vigente)</span></div>
             <div style="display:flex; justify-content:space-between;"><span style="color:var(--mut)">Rating Cumplimiento</span><span style="font-weight:600; color:#f59e0b;">4.8 / 5.0 ★</span></div>
             <div style="display:flex; justify-content:space-between;"><span style="color:var(--mut)">Compras Anteriores</span><span style="font-weight:600; color:var(--ink);">12 órdenes</span></div>
           </div>
           <div style="margin-top:20px; padding:12px; background:rgba(16, 185, 129, 0.1); border:1px solid rgba(16, 185, 129, 0.3); border-radius:8px; color:#10b981; font-size:13px; line-height:1.4;">
             El proveedor cumple con todos los requisitos de compliance y seguridad de La Joya Mining.
           </div>
        </div>
        <div style="padding:16px 24px; background:var(--card); border-top:1px solid var(--line); text-align:right;">
           <button class="btn o" style="color:var(--ink); border-color:var(--border);" onclick="this.closest('#perfil-modal').remove()">Cerrar</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  setTimeout(() => {
    const m = document.getElementById('perfil-modal');
    if(m) { m.style.opacity = '1'; m.children[0].style.transform = 'scale(1)'; }
  }, 10);
};

window.filtrarMatriz = function(val) {
   const tbody = document.getElementById('matriz-tbody');
   if(!tbody) return;
   const search = (val || '').toLowerCase().trim();
   Array.from(tbody.querySelectorAll('tr')).forEach(row => {
      const prodTd = row.children[2];
      if(!prodTd) return;
      const text = prodTd.textContent.toLowerCase();
      row.style.display = text.includes(search) ? '' : 'none';
   });
};

window.mostrarSugerencias = function(val) {
   window.filtrarMatriz(val); // Filtrar en tiempo real mientras escribe
   const box = document.getElementById('mat-sug-box');
   if(!val || val.length === 0) {
      box.style.display = 'none';
      return;
   }
   const items = [...new Set(window.GLOBAL_MATRIX_DATA.items.map(i => i.producto))];
   const filtrados = items.filter(i => i.toLowerCase().includes(val.toLowerCase()));
   if(filtrados.length === 0) {
      box.style.display = 'none';
      return;
   }
   // Usamos onmousedown para evitar que el blur del input o el click global oculten la caja antes
   box.innerHTML = filtrados.map(f => `<div style="padding:8px 12px; cursor:pointer; font-size:13px; color:#334155; border-bottom:1px solid #f1f5f9;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fff'" onmousedown="event.preventDefault(); document.getElementById('mat-search').value='${f}'; document.getElementById('mat-sug-box').style.display='none'; window.filtrarMatriz('${f}'); toast('Filtrado por: ${f}')">${f}</div>`).join('');
   box.style.display = 'block';
};

document.addEventListener('click', e => {
   const box = document.getElementById('mat-sug-box');
   const inp = document.getElementById('mat-search');
   if(box && e.target !== inp && !box.contains(e.target)) box.style.display = 'none';
});

// --- Función para agregar material a la Matriz ---
window.agregarMaterialMatriz = function() {
  const tbody = document.getElementById('matriz-tbody');
  if(!tbody) return;
  const numItems = window.GLOBAL_MATRIX_DATA.items.length + tbody.querySelectorAll('.tr-nuevo').length + 1;
  const newRow = `
    <tr class="tr-nuevo" style="transition: background 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
      <td class="stk" style="position:sticky; left:0px; z-index:10; background:var(--card); padding:10px;">${numItems}</td>
      <td class="stk" style="position:sticky; left:40px; z-index:10; background:var(--card); padding:10px;">NUEVO</td>
      <td class="stk" style="position:sticky; left:130px; z-index:10; background:var(--card); padding:10px;"><input type="text" class="inp-mat-new" placeholder="Nombre del material alternativo" style="width:100%; height:30px; border:1px solid #cbd5e1; border-radius:4px; padding:0 8px; font-size:12px; font-family:inherit; outline:none;"></td>
      <td class="stk" style="position:sticky; left:430px; z-index:10; background:var(--card); padding:10px;"><input type="text" class="inp-uni-new" value="Unidad" style="width:60px; height:30px; border:1px solid #cbd5e1; border-radius:4px; padding:0 8px; font-size:12px; font-family:inherit; outline:none;"></td>
      <td class="stk" style="position:sticky; left:510px; z-index:10; background:var(--card); padding:10px; border-right:2px solid var(--line);"><input type="number" class="inp-cant-new" value="1" style="width:50px; height:30px; border:1px solid #cbd5e1; border-radius:4px; padding:0 8px; font-size:12px; font-family:inherit; outline:none;" oninput="this.closest('tr').querySelector('.inp-pu-new').dataset.cant = this.value"></td>
      <td style="padding:8px 10px;"><input type="number" class="inp-pu-new mi" data-ite="${numItems}" data-cant="1" style="width:90px; text-align:right; height:34px; padding:0 10px; border:1px solid #cbd5e1; border-radius:6px; outline:none; transition:all 0.2s; font-family:inherit; font-size:14px; float:right;" value="" step="0.01" onfocus="this.style.borderColor='#3b82f6';this.style.boxShadow='0 0 0 3px rgba(59,130,246,0.1)'" onblur="this.style.borderColor='#cbd5e1';this.style.boxShadow='none'" oninput="const td = this.closest('tr').querySelector('.td-total-new'); const val = parseFloat(this.value); const cant = parseFloat(this.dataset.cant); if(td) td.textContent = isNaN(val) ? '-' : (val * cant).toFixed(2);"></td>
      <td class="td-total-new" style="text-align:right; font-weight:600; vertical-align:middle; padding:8px 10px; color:#0f172a;">-</td>
      <td style="text-align:center; padding:8px 10px;">
         <button class="ibtn" style="color:#10b981; padding:6px; border-radius:4px;" onmouseover="this.style.background='#d1fae5'" onmouseout="this.style.background='transparent'" title="Guardar material" onclick="guardarNuevoMaterial(this)">${ic('check', 18)}</button>
      </td>
    </tr>
  `;
  tbody.insertAdjacentHTML('beforeend', newRow);
};

window.guardarNuevoMaterial = function(btn) {
  const tr = btn.closest('tr');
  const producto = tr.querySelector('.inp-mat-new').value || 'Nuevo Material Alternativo';
  const unidad = tr.querySelector('.inp-uni-new').value || 'Unidad';
  const cantidad = parseFloat(tr.querySelector('.inp-cant-new').value) || 1;
  const pu = parseFloat(tr.querySelector('.inp-pu-new').value) || 0;
  
  const newItem = {
    ite: window.GLOBAL_MATRIX_DATA.items.length + 1,
    req: "NUEVO",
    producto: producto,
    unidad: unidad,
    cantidad: cantidad,
    cot: { p1: { pu: pu }, p2: { pu: null }, p3: { pu: null } },
    mejorPu: pu
  };
  
  window.GLOBAL_MATRIX_DATA.items.push(newItem);
  toast('Material agregado a la cotización general.');
  if(S.route) go(S.route, S.sel);
};

window.actualizarPUs = function() {
  document.querySelectorAll('.inp-pu.mi').forEach(inp => {
    const ite = parseInt(inp.dataset.ite);
    const val = parseFloat(inp.value);
    const item = window.GLOBAL_MATRIX_DATA.items.find(x => x.ite === ite);
    if(item && !isNaN(val)) {
       item.cot.p1.pu = val;
       let min = Infinity;
       Object.values(item.cot).forEach(c => { if(c.pu !== null && c.pu < min) min = c.pu; });
       item.mejorPu = min;
    }
  });
  toast('Datos actualizados en los perfiles de compradores y aprobadores');
  if(S.route) go(S.route, S.sel);
};

// --- Función para renderizar la Matriz (Cuadro Comparativo) ---
function renderItemsMatrix() {
  const isProv = S.userRole === 'Proveedor';
  
  // Clonar para no mutar el global
  const ccData = JSON.parse(JSON.stringify(window.GLOBAL_MATRIX_DATA));

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
      <th rowspan="2" class="stk" style="${thStyle(pos[0], w1)} border-bottom:2px solid var(--line); color:var(--ink); padding:12px 10px; vertical-align:middle; background:var(--card);">Ite</th>
      <th rowspan="2" class="stk" style="${thStyle(pos[1], w2)} border-bottom:2px solid var(--line); color:var(--ink); padding:12px 10px; vertical-align:middle; background:var(--card);">Req</th>
      <th rowspan="2" class="stk" style="${thStyle(pos[2], w3)} border-bottom:2px solid var(--line); color:var(--ink); padding:12px 10px; vertical-align:middle; background:var(--card);">PRODUCTO</th>
      <th rowspan="2" class="stk" style="${thStyle(pos[3], w4)} border-bottom:2px solid var(--line); color:var(--ink); padding:12px 10px; vertical-align:middle; background:var(--card);">Unidad</th>
      <th rowspan="2" class="stk" style="${thStyle(pos[4], w5)} border-bottom:2px solid var(--line); border-right:2px solid var(--line); color:var(--ink); padding:12px 10px; vertical-align:middle; background:var(--card);">Cant</th>
      ${ccData.proveedores.map((p, i) => {
         let infoBtn = !isProv ? `<div style="display:flex; justify-content:center; gap:8px; margin-top:8px;">
            <button class="ibtn" style="color:#0ea5e9; padding:4px 8px; border-radius:4px; font-size:10px; border:1px solid #bae6fd; font-weight:600;" onmouseover="this.style.background='var(--bg)'" onmouseout="this.style.background='transparent'" title="Ver credenciales e historial" onclick="verPerfil('${p.nombre}')">${ic('users', 14)} Perfil</button>
         </div>` : '';
         return `<th colspan="2" style="text-align:center; border-bottom:1px solid var(--line); background:var(--card); font-size:11px; letter-spacing:0.5px; color:var(--mut); padding:8px 10px; font-weight:700;">
            ${isProv ? 'MI OFERTA' : 'PROVEEDOR ' + String.fromCharCode(65+i) + ': ' + p.nombre.toUpperCase()}
            ${infoBtn}
         </th>`;
      }).join('')}
      ${isProv ? `<th rowspan="2" style="text-align:center; border-bottom:2px solid var(--line); color:var(--ink); padding:12px 10px; vertical-align:middle; background:var(--card);">Acción</th>` : ''}
    </tr>
    <tr>
      ${ccData.proveedores.map(p => `<th style="text-align:right; border-bottom:2px solid var(--line); color:var(--ink); padding:8px 10px; font-size:12px; background:var(--card);">PU (S/)</th><th style="text-align:right; border-bottom:2px solid var(--line); color:var(--ink); padding:8px 10px; font-size:12px; background:var(--card);">Total (S/)</th>`).join('')}
    </tr>
  `;

  let tbody = ccData.items.map(item => `
    <tr style="transition: background 0.2s;" onmouseover="this.style.background='var(--bg)'" onmouseout="this.style.background='transparent'">
      <td class="stk" style="${tdStyle(pos[0])} padding:10px; color:var(--ink);">${item.ite}</td>
      <td class="stk" style="${tdStyle(pos[1])} padding:10px; color:var(--ink);">${item.req}</td>
      <td class="stk" style="${tdStyle(pos[2])} padding:10px; font-size:12px; color:var(--ink);">${item.producto}</td>
      <td class="stk" style="${tdStyle(pos[3])} padding:10px; color:var(--mut);">${item.unidad}</td>
      <td class="stk" style="${tdStyle(pos[4])} padding:10px; border-right:2px solid var(--line); font-weight:600; color:var(--ink);">${item.cantidad}</td>
      
      ${ccData.proveedores.map(p => {
         const c = item.cot[p.id] || { pu: null };
         const isLowest = (c.pu !== null && c.pu === item.mejorPu);
         const bgClass = isLowest && !isProv ? 'style="background:rgba(255,255,0,0.2); font-weight:bold; text-align:right; color:var(--ink); padding:10px;"' : 'style="text-align:right; color:var(--ink); padding:10px;"';
         const total = c.pu !== null ? (c.pu * item.cantidad).toFixed(2) : '-';
         const puText = c.pu !== null ? c.pu.toFixed(2) : '-';
         
         if (isProv) {
             const val = c.pu !== null ? c.pu : '';
             return `<td style="padding:8px 10px;"><input type="number" class="inp-pu mi" data-ite="${item.ite}" data-cant="${item.cantidad}" style="width:90px; text-align:right; height:34px; padding:0 10px; border:1px solid var(--border); background:var(--card); color:var(--ink); border-radius:6px; outline:none; transition:all 0.2s; font-family:inherit; font-size:14px; float:right;" value="${val}" step="0.01" onfocus="this.style.borderColor='#3b82f6';this.style.boxShadow='0 0 0 3px rgba(59,130,246,0.1)'" onblur="this.style.borderColor='var(--border)';this.style.boxShadow='none'"></td>
                     <td class="td-total" data-ite="${item.ite}" style="text-align:right; font-weight:600; vertical-align:middle; padding:8px 10px; color:var(--ink);">${val ? (val * item.cantidad).toFixed(2) : '-'}</td>`;
         } else {
             const radioBtn = c.pu !== null ? `<input type="checkbox" name="sel_${item.ite}" value="${p.id}" style="cursor:pointer;" title="Elegir esta oferta" onchange="if(this.checked) { Array.from(this.closest('tr').querySelectorAll('input[type=checkbox]')).forEach(cb => { if(cb !== this) cb.checked = false; }) }">` : '';
             return `<td ${bgClass}>${puText}</td>
                     <td ${bgClass}>
                        <div style="display:flex; justify-content:flex-end; align-items:center; gap:8px;">
                          ${radioBtn}
                          <span>${total}</span>
                        </div>
                     </td>`;
         }
      }).join('')}
      ${isProv ? `<td style="text-align:center; padding:8px 10px;">
                     <button class="ibtn" style="color:#10b981; padding:6px; border-radius:4px;" onmouseover="this.style.background='var(--bg)'" onmouseout="this.style.background='transparent'" title="Guardar material" onclick="toast('Material guardado localmente')">${ic('check', 18)}</button>
                  </td>` : ''}
    </tr>
  `).join('');

  return `<div class="card pc" style="padding:0; overflow:hidden; border:1px solid var(--border); border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.05); background:var(--card);">
            <div class="hd" style="padding:16px 20px 0; border-bottom:1px solid var(--line); background:var(--card);">
              <h3 style="font-size:15px; color:var(--ink);">${ic('tag')}Matriz de Cotización</h3>
            </div>
            <div style="overflow-x:auto; max-width:100%; padding-bottom:10px;">
              <table class="tbl" style="margin-bottom:0; white-space:nowrap; border-collapse:collapse; width:100%;">
                <thead style="background:var(--card)">${thead}</thead>
                <tbody id="matriz-tbody">${tbody}</tbody>
              </table>
            </div>
            ${isProv ? `<div style="padding:16px 20px; border-top:1px solid var(--line); background:var(--card); display:flex; justify-content:space-between; align-items:center;">
                <button class="btn o" style="color:#1b5fb8; border-color:#1b5fb8; font-weight:500; font-size:13px;" onclick="agregarMaterialMatriz()">${ic('plus')} Agregar más</button>
                <div style="display:flex; gap:12px;">
                   <button class="btn p" style="font-size:13px; font-weight:500; box-shadow:0 4px 6px -1px rgba(27,95,184,0.2);" onclick="actualizarPUs()">${ic('check',16)} Actualizar</button>
                </div>
            </div>` : `<div style="padding:16px 20px; border-top:1px solid var(--line); background:var(--card); display:flex; justify-content:flex-end; align-items:center;">
                <button class="btn p" style="background:#10b981; border:none; box-shadow:0 4px 6px -1px rgba(16,185,129,0.2);" onclick="generarOCSeleccionada()">${ic('check', 16)} Generar OC (Seleccionados)</button>
            </div>`}
          </div>`;
}

// Vista Cotizaciones (COTI)
function vCoti(){
  const isProv = S.userRole === 'Proveedor';
  
  if (S.route === 'cotiDet') {
     return vCotiDet();
  }

  const rows = COTI.map(c => {
     const stClass = c.estado === 'Abierto' ? 'b-ok' : 'b-grey';
     
     let actionBtn = '';
     if (isProv) {
        actionBtn = c.estado === 'Abierto' ? 
           `<button class="btn p sm" onclick="go('cotiDet', '${c.id}')">${ic('pen')} Enviar Oferta</button>` :
           `<button class="btn o sm" onclick="go('cotiDet', '${c.id}')">${ic('eye')} Ver Mi Oferta</button>`;
     } else {
        actionBtn = `<button class="btn p sm" onclick="go('cotiDet', '${c.id}')">${ic('eye')} Ver RFQ</button>`;
     }
     
     return `<tr data-id="${c.id}" class="click" onclick="go('cotiDet', '${c.id}')">
        <td class="cod">${c.id}</td>
        <td><div style="font-weight:500;color:var(--ink)">${c.titulo}</div></td>
        <td>${c.fecha}</td>
        <td><b style="color:${c.estado==='Abierto'?'#e02424':'inherit'}">${c.vence}</b></td>
        <td><span class="badge ${stClass}">${c.estado}</span></td>
        ${!isProv ? `<td>${c.provs} Invitados</td>` : ''}
        <td onclick="event.stopPropagation()">${actionBtn}</td>
     </tr>`;
  }).join('');

  return `<div class="head">
      <div><h1 class="pt">${ic('send')} Solicitudes de Cotización (RFQ)</h1>
      <p class="sub-t">${isProv ? 'Bandeja de RFQs enviadas por La Joya Mining para que ingreses tus precios.' : 'Listado de Solicitudes de Cotización emitidas desde el ERP.'}</p></div>
      ${!isProv ? `<button class="btn p" onclick="crearRFQ()">${ic('plus')} Nuevo RFQ</button>` : ''}
    </div>
    
    <div class="card tw">
       <table class="tbl">
         <thead>
           <tr>
             <th>ID RFQ</th>
             <th>Descripción</th>
             <th>Emisión</th>
             <th>Cierre</th>
             <th>Estado</th>
             ${!isProv ? `<th>Proveedores</th>` : ''}
             <th>Acción</th>
           </tr>
         </thead>
         <tbody>${rows}</tbody>
       </table>
    </div>`;
}

function vCotiDet() {
  const c = COTI.find(x => x.id === S.sel);
  if(!c) return go('coti');
  const isProv = S.userRole === 'Proveedor';

  return `<div class="pros-fixed-layout">
    <button class="back" onclick="go('coti')">${ic('back')} Volver a RFQs</button>
    <div class="card ph"><div class="r1">
      <div><h2>${c.titulo}</h2>
      <div class="meta"><span><span class="mono" style="color:#667085">ID RFQ</span> <span class="badge b-info">${c.id}</span></span><span><span class="dot" style="background:${c.estado==='Abierto'?'#16a34a':'#8795a8'}"></span>${c.estado}</span></div>
      <div class="ct"><span>Emisión: <b>${c.fecha}</b></span><span>Cierre: <b style="color:#e02424">${c.vence}</b></span></div></div>
      <div style="display:flex;gap:10px">
        ${isProv && c.estado === 'Abierto' ? `<button class="btn p sm" onclick="enviarOferta('${c.id}')">Enviar Oferta a Logística</button>` : ''}
        ${!isProv ? `<button class="btn o sm" onclick="toast('Redirigiendo a Cuadro Comparativo'); go('cc')">Ver Cuadro Comparativo</button>` : ''}
      </div>
    </div></div>
    
    <div class="det" style="grid-template-columns: 1fr;"><div class="col col-scroll" style="max-width:100%">
       <div class="card pc">
          <div class="hd"><h3>${ic('tag')} Ítems solicitados</h3></div>
          <div class="tw">
             <table class="tbl">
                <thead>
                   <tr>
                      <th>Ite</th>
                      <th>Producto / Servicio</th>
                      <th>Cant.</th>
                      <th>Und.</th>
                      ${isProv ? `<th>Descripción Adicional</th><th>Precio Unit. (S/)</th><th>Total (S/)</th>` : ''}
                   </tr>
                </thead>
                <tbody>
                   <tr>
                      <td>10</td>
                      <td><div style="font-weight:600;color:var(--ink)">Casco de seguridad tipo Jockey (Blanco)</div><small style="color:var(--mut)">Certificado ANSI Z89.1</small></td>
                      <td>50</td>
                      <td>UND</td>
                      ${isProv ? `<td><input type="text" class="inp" style="width:150px;height:30px" placeholder="Ej. Marca 3M" ${c.estado!=='Abierto'?'disabled':''}></td><td><input type="number" class="inp inp-pu" data-ite="10" data-cant="50" style="width:100px;height:30px" placeholder="0.00" ${c.estado!=='Abierto'?'disabled':''}></td><td class="td-total" data-ite="10" style="font-weight:600">0.00</td>` : ''}
                   </tr>
                   <tr>
                      <td>20</td>
                      <td><div style="font-weight:600;color:var(--ink)">Motor Trifásico 15HP 1800RPM</div><small style="color:var(--mut)">Clase F, Protección IP55</small></td>
                      <td>2</td>
                      <td>UND</td>
                      ${isProv ? `<td><input type="text" class="inp" style="width:150px;height:30px" placeholder="Ej. WEG" ${c.estado!=='Abierto'?'disabled':''}></td><td><input type="number" class="inp inp-pu" data-ite="20" data-cant="2" style="width:100px;height:30px" placeholder="0.00" ${c.estado!=='Abierto'?'disabled':''}></td><td class="td-total" data-ite="20" style="font-weight:600">0.00</td>` : ''}
                   </tr>
                </tbody>
             </table>
          </div>
       </div>

       ${isProv ? `
       <div style="margin-top:15px; padding:12px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; display:flex; flex-wrap:wrap; gap:15px; align-items:center;">
          <div style="font-weight:600; font-size:13px; color:#475569; display:flex; align-items:center; gap:6px;">${ic('tag', 16)} Condiciones Comerciales:</div>
          <input type="text" class="inp" style="flex:1; min-width:200px; height:32px; font-size:13px; background:#fff;" placeholder="Condición de Pago (Ej. Crédito 30 días)" ${c.estado!=='Abierto'?'disabled':''}>
          <input type="text" class="inp" style="flex:1; min-width:200px; height:32px; font-size:13px; background:#fff;" placeholder="Lugar de Entrega (Ej. Almacén Mina)" ${c.estado!=='Abierto'?'disabled':''}>
          <input type="text" class="inp" style="flex:1; min-width:200px; height:32px; font-size:13px; background:#fff;" placeholder="Tiempo (Ej. 15 días útiles)" ${c.estado!=='Abierto'?'disabled':''}>
       </div>
       <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px; margin-top:20px;">
         <div class="card pc">
            <div class="hd"><h3>${ic('doc')} Propuesta Técnica</h3></div>
            <div style="padding:15px;">
               <input type="file" id="fi_tec" multiple style="display:none" onchange="handleCotiFile(this, 'lst_tec')" ${c.estado!=='Abierto'?'disabled':''}>
               <div style="padding:12px 15px; border:1px dashed #cbd5e1; border-radius:6px; display:flex; align-items:center; justify-content:center; gap:10px; color:var(--mut); background:#f8fafc; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#f0f9ff';" onmouseout="this.style.borderColor='#cbd5e1'; this.style.background='#f8fafc';" onclick="${c.estado==='Abierto'?"document.getElementById('fi_tec').click()":""}">
                  ${ic('inbox', 20)}
                  <span style="font-size:13px;">Arrastre aquí o <span style="color:#0ea5e9; font-weight:500;">Examine</span> sus archivos técnicos</span>
               </div>
               <div id="lst_tec" style="margin-top:10px; display:flex; flex-direction:column; gap:5px;"></div>
            </div>
         </div>
         <div class="card pc">
            <div class="hd"><h3>${ic('tag')} Propuesta Económica</h3></div>
            <div style="padding:15px;">
               <input type="file" id="fi_eco" multiple style="display:none" onchange="handleCotiFile(this, 'lst_eco')" ${c.estado!=='Abierto'?'disabled':''}>
               <div style="padding:12px 15px; border:1px dashed #cbd5e1; border-radius:6px; display:flex; align-items:center; justify-content:center; gap:10px; color:var(--mut); background:#f8fafc; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#f0f9ff';" onmouseout="this.style.borderColor='#cbd5e1'; this.style.background='#f8fafc';" onclick="${c.estado==='Abierto'?"document.getElementById('fi_eco').click()":""}">
                  ${ic('inbox', 20)}
                  <span style="font-size:13px;">Arrastre aquí o <span style="color:#0ea5e9; font-weight:500;">Examine</span> sus archivos económicos</span>
               </div>
               <div id="lst_eco" style="margin-top:10px; display:flex; flex-direction:column; gap:5px;"></div>
            </div>
         </div>
       </div>` : `
       <div class="card pc" style="margin-top:20px;">
          <div class="hd"><h3>${ic('users')} Estado de Invitados</h3></div>
          <div class="mu">El ERP ha invitado a <b>${c.provs}</b> proveedores homologados para este proceso.</div>
          <ul class="notes" style="margin-top:10px;">
             <li>MINERA LUMAR E.I.R.L. <span class="badge b-ok" style="float:right">Oferta Recibida</span></li>
             <li>GRUPO FREMAT S.A.C. <span class="badge b-ok" style="float:right">Oferta Recibida</span></li>
             <li>PROVEEDOR INDUSTRIAL <span class="badge b-grey" style="float:right">Pendiente de lectura</span></li>
          </ul>
       </div>
       `}
    </div></div>
  </div>`;
}

function bindCoti(){
  document.querySelectorAll('.inp-pu').forEach(inp => {
    inp.addEventListener('input', e => {
      const cant = parseFloat(e.target.dataset.cant);
      const val = parseFloat(e.target.value);
      const tdTotal = document.querySelector(`.td-total[data-ite="${e.target.dataset.ite}"]`);
      if(tdTotal) {
        if(!isNaN(val) && val > 0) {
           tdTotal.textContent = (val * cant).toFixed(2);
           tdTotal.style.color = '#0f9d6a';
        } else {
           tdTotal.textContent = '0.00';
           tdTotal.style.color = 'var(--ink)';
        }
      }
    });
  });
}

// Vista Cuadros Comparativos (CC)
function vCC(){
  const rows = CC.map(c => `<tr class="click" data-id="${c.id}">
    <td class="cod">${c.id}</td>
    <td><span class="badge b-info">${c.reqId}</span></td>
    <td><div style="font-weight:500;color:var(--ink)">${c.provGana}</div>
        <small style="color:var(--mut)">Frecuente: ${c.hist.freq?'Sí':'No'} | Compras: ${c.hist.compras} | Rating: ${c.hist.rating}</small>
    </td>
    <td style="font-weight:600">${c.monto}</td>
    <td><span class="badge ${c.estado==='Aprobado'?'b-ok':'b-warn'}">${c.estado}</span></td>
    <td>
      ${c.estado==='Aprobado' 
        ? `<button class="btn sm btn-aprobar-cc" disabled style="opacity:0.5">Aprobado</button>` 
        : `<button class="btn sm btn-aprobar-cc" data-id="${c.id}">Aprobar</button>`}
    </td>
  </tr>`).join('');
  
  return `<div class="head"><div><h1 class="pt">${ic('users')}Cuadros Comparativos</h1><p class="sub-t">Análisis de cotizaciones y selección de proveedor.</p></div>
    </div>
  <div class="card tw"><table class="tbl"><thead><tr><th>ID CC</th><th>Requerimiento</th><th>Proveedor Seleccionado (Historial)</th><th>Monto Total</th><th>Estado</th><th>Acción</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function bindCC(){
  document.querySelectorAll('tr[data-id]').forEach(tr => tr.addEventListener('click', e => {
    if(e.target.closest('.btn-aprobar-cc')) return;
    go('ccDet', tr.dataset.id);
  }));
  document.querySelectorAll('.btn-aprobar-cc').forEach(b => b.addEventListener('click', e => {
    const id = e.currentTarget.dataset.id;
    if(!id) return;
    const item = CC.find(x => x.id === id);
    if(item) {
      item.estado = 'Aprobado';
      toast(`Cuadro Comparativo ${id} aprobado. Orden de Compra pre-generada.`);
      render();
    }
  }));
}

function vCCDet(){
  const c = CC.find(x => x.id === S.sel);
  if(!c) return vCC();
  return `<div class="pros-fixed-layout">
    <button class="back" id="bk">${ic('back')}Cuadros Comparativos</button>
    <div class="card ph"><div class="r1">
      <div><h2>Cuadro Comparativo: ${c.id}</h2>
      <div class="meta"><span><span class="mono" style="color:#667085">Origen</span> <span class="badge b-info">${c.reqId}</span></span><span><span class="dot" style="background:${c.estado==='Aprobado'?'#16a34a':'#f59e0b'}"></span>${c.estado}</span></div>
      <div class="ct"><span>Mejor Opción Evaluada: <b>${c.provGana}</b></span><span>Monto: <b>${c.monto}</b></span></div></div>
      <div style="display:flex;gap:10px">
        ${c.estado==='Aprobado' ? `<button class="btn p sm" disabled>Ya Aprobado</button>` : `<button class="btn p sm" id="btnAprobarDetail">Aprobar y Generar OC</button>`}
      </div>
    </div></div>
    <div class="det" style="grid-template-columns: 1fr;"><div class="col col-scroll" style="max-width:100%">
      ${renderItemsMatrix()}
    </div></div>
  </div>`;
}
function bindCCDet(){
  $('#bk').onclick=()=>go('cc');
  const b = $('#btnAprobarDetail');
  if(b) b.onclick = () => {
    const c = CC.find(x => x.id === S.sel);
    if(c){ 
      c.estado = 'Aprobado'; 
      const newOcId = 'OC-2026-0' + (OC.length + 90);
      OC.unshift({
        id: newOcId, ccId: c.id, prov: c.provGana, fecha: new Date().toLocaleString('es-PE', {hour12:true}), estado: 'Emitida',
        subtotal: 1000, impuestos: 180, monto: c.monto,
        items: window.GLOBAL_MATRIX_DATA.items.map(i => ({
           prod: i.producto, desc: '-', fecha: '15/10/2026', cant: i.cantidad, und: i.unidad, precio: i.mejorPu, imp: 'IGV 18%', sub: (i.cantidad * i.mejorPu).toFixed(2)
        }))
      });
      toast(`CC Aprobado correctamente. Se generó la ${newOcId}`); 
      render(); 
    }
  };
}

// Vista Órdenes de Compra (OC)
function vOC(){
  const rows = OC.map(c => `<tr class="click" data-id="${c.id}">
    <td class="cod">${c.id}</td>
    <td><span class="badge b-info">${c.ccId}</span></td>
    <td><div style="font-weight:500;color:var(--ink)">${c.prov}</div></td>
    <td style="font-weight:600">${c.monto}</td>
    <td>${c.fecha}</td>
    <td><span class="badge ${c.estado==='Emitida'?'b-warn':'b-ok'}">${c.estado}</span></td>
    <td><button class="ibtn btn-print-oc" title="Imprimir PDF">${ic('send')}</button></td>
  </tr>`).join('');
  
  return `<div class="head"><div><h1 class="pt">${ic('tag')}Órdenes de Compra</h1><p class="sub-t">Órdenes generadas y enviadas a proveedores.</p></div>
    </div>
  <div class="card tw"><table class="tbl"><thead><tr><th>ID OC</th><th>Origen CC</th><th>Proveedor</th><th>Monto</th><th>Fecha Emisión</th><th>Estado</th><th>Acción</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function bindOC(){
  document.querySelectorAll('tr[data-id]').forEach(tr => tr.addEventListener('click', e => {
    if(e.target.closest('button')) return;
    go('ocDet', tr.dataset.id);
  }));
  document.querySelectorAll('.btn-print-oc').forEach(b => b.addEventListener('click', e => {
    const id = e.currentTarget.closest('tr').dataset.id;
    toast(`Generando e imprimiendo PDF para la OC ${id}...`);
  }));
}

function vOCDet(){
  const c = OC.find(x => x.id === S.sel);
  if(!c) return vOC();
  
  const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const subtotal = formatter.format(c.subtotal);
  const impuestos = formatter.format(c.impuestos);

  const itemsHtml = c.items.map(i => `
    <tr style="border-bottom: 1px solid #f3f4f6;">
      <td style="padding: 12px 16px; color: #4b5563;">${i.prod}</td>
      <td style="padding: 12px 16px; color: #4b5563;">${i.desc}</td>
      <td style="padding: 12px 16px; color: #4b5563;">${i.fecha}</td>
      <td style="padding: 12px 16px; color: #4b5563; text-align: right;">${i.cant}</td>
      <td style="padding: 12px 16px; color: #4b5563;">${i.und}</td>
      <td style="padding: 12px 16px; color: #4b5563; text-align: right;">${i.precio}</td>
      <td style="padding: 12px 16px; color: #4b5563;">${i.imp}</td>
      <td style="padding: 12px 16px; color: #4b5563; text-align: right;">${i.sub}</td>
    </tr>
  `).join('');

  return `<div class="pros-fixed-layout" style="background: #f3f4f6; min-height: 100vh;">
    <div style="background: #fff; padding: 20px; border-bottom: 1px solid #e5e7eb;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <button class="ibtn" id="bk" style="margin-bottom:10px; padding:0; height:auto; color:var(--mut)">${ic('back')} Volver a Órdenes</button>
          <div style="color: #6b7280; font-size: 14px;">Orden de Compra</div>
          <div style="display:flex; align-items:center; gap:15px; margin-top:5px;">
             <h1 style="font-size: 28px; margin: 0; color: #1f2937;">${c.id}</h1>
             <span class="badge ${c.estado==='Emitida'?'b-warn':c.estado==='Aceptada'?'b-ok':c.estado==='Rechazada'?'b-err':'b-info'}" style="font-size:13px; padding:4px 10px;">${c.estado}</span>
          </div>
        </div>
        ${c.estado === 'Rechazada' && c.motivoRechazo ? `
        <div style="margin-top:15px; padding:12px 16px; background:#fef2f2; border:1px solid #fecaca; border-radius:6px; color:#991b1b; display:flex; gap:10px; align-items:flex-start;">
           <span style="font-size:18px; line-height:1;">⚠️</span>
           <div>
              <div style="font-weight:600; font-size:13px; margin-bottom:4px;">Orden Rechazada por el Proveedor</div>
              <div style="font-size:13px; line-height:1.4;"><b>Motivo:</b> ${c.motivoRechazo}</div>
           </div>
        </div>` : ''}
        <div style="display: flex; align-items:center; gap: 15px;">
          ${S.userRole === 'Proveedor' && c.estado === 'Emitida' ? `
            <div style="display:flex; gap:8px;">
               <button class="btn p sm" style="background:#10b981; border:none; box-shadow:0 4px 6px -1px rgba(16,185,129,0.2); font-size:13px; padding:6px 14px; height:auto;" onclick="responderOC('${c.id}', 'Aceptada')">${ic('check',14)} Aceptar</button>
               <button class="btn o sm" style="color:#ef4444; border-color:#ef4444; font-size:13px; padding:6px 14px; height:auto;" onclick="responderOC('${c.id}', 'Rechazada')">${ic('x',14)} Rechazar</button>
            </div>
          ` : ''}
          <div style="display: flex; border: 1px solid #e5e7eb; border-radius: 4px; overflow: hidden;">
            <div style="padding: 6px 12px; border-right: 1px solid #e5e7eb; display: flex; align-items: center; gap: 8px;">
               <span style="color: #6366f1; font-size: 18px;">🚚</span>
               <div style="line-height: 1.2;"><div style="color: #6366f1; font-weight: bold; font-size: 13px;">1</div><div style="color: #6b7280; font-size: 11px;">Envíos</div></div>
            </div>
            <div style="padding: 6px 12px; display: flex; align-items: center; gap: 8px;">
               <span style="color: #6b7280; font-size: 18px;">📝</span>
               <div style="line-height: 1.2;"><div style="color: #6366f1; font-weight: bold; font-size: 13px;">0</div><div style="color: #6b7280; font-size: 11px;">Facturas</div></div>
            </div>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; font-size: 14px;">
        <div>
          <div style="display: flex; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px; margin-bottom: 8px;">
            <div style="width: 200px; color: #374151; font-weight: 500;">Proveedor</div>
            <div style="color: #3b82f6;">${c.prov}</div>
          </div>
          <div style="display: flex; padding-bottom: 8px;">
            <div style="width: 200px; color: #374151; font-weight: 500;">Referencia del Proveedor</div>
            <div style="color: #4b5563;"></div>
          </div>
        </div>
        <div>
          <div style="display: flex; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">
            <div style="width: 150px; color: #374151; font-weight: 500;">Fecha Pedido</div>
            <div style="color: #4b5563;">${c.fecha}</div>
          </div>
        </div>
      </div>
    </div>

    <div style="padding: 20px;">
      <div style="display: flex; border-bottom: 1px solid #e5e7eb; margin-bottom: 20px;">
        <div style="padding: 12px 24px; border-bottom: 2px solid #6366f1; color: #374151; font-weight: 500; cursor: pointer;">Productos</div>
        <div style="padding: 12px 24px; color: #6b7280; font-weight: 500; cursor: pointer;">Envíos & Facturas</div>
      </div>

      <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 4px; overflow: hidden;">
        <div style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 13px; color: #6b7280;">1-${c.items.length} de ${c.items.length}</div>
        <div style="overflow-x:auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; min-width:800px;">
            <thead>
              <tr style="background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                <th style="padding: 12px 16px; font-weight: 600; color: #4b5563;">Producto</th>
                <th style="padding: 12px 16px; font-weight: 600; color: #4b5563;">Descripción</th>
                <th style="padding: 12px 16px; font-weight: 600; color: #4b5563;">Fecha Programada</th>
                <th style="padding: 12px 16px; font-weight: 600; color: #4b5563; text-align: right;">Cantidad</th>
                <th style="padding: 12px 16px; font-weight: 600; color: #4b5563;">Unidad de Medida del Producto</th>
                <th style="padding: 12px 16px; font-weight: 600; color: #4b5563; text-align: right;">Precio Unitario</th>
                <th style="padding: 12px 16px; font-weight: 600; color: #4b5563;">Impuestos</th>
                <th style="padding: 12px 16px; font-weight: 600; color: #4b5563; text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding: 24px; display: flex; justify-content: flex-end;">
          <div style="width: 350px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #4b5563;">
              <span style="font-weight: 600;">Monto Libre de Impuestos :</span>
              <span>$ ${subtotal}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 14px; color: #4b5563; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px;">
              <span style="font-weight: 600;">Impuestos :</span>
              <span>$ ${impuestos}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 18px; color: #1f2937;">
              <span>Total :</span>
              <span style="font-weight: bold;">${c.monto}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
function bindOCDet(){
  $('#bk').onclick=()=>go('oc');
}


// Vista Facturación (FAC)
function vFac() {
  const isProv = S.userRole === 'Proveedor';
  
  const parseMonto = m => parseFloat(String(m).replace(/[^0-9.-]+/g,"")) || 0;
  const metrics = {
    total: FAC.reduce((s, c) => s + parseMonto(c.monto), 0),
    pagado: FAC.filter(c => c.estado === 'PAGADO').reduce((s, c) => s + parseMonto(c.monto), 0),
    rev: FAC.filter(c => c.estado === 'EN REVISION').reduce((s, c) => s + parseMonto(c.monto), 0),
    pend: FAC.filter(c => c.estado === 'OBSERVADO' || c.estado === 'POR PAGAR' || c.estado === 'APROBADO').reduce((s, c) => s + parseMonto(c.monto), 0)
  };

  const c_total = FAC.length;
  const c_pagadas = FAC.filter(c => c.estado === 'PAGADO').length;
  const c_rev = FAC.filter(c => c.estado === 'EN REVISION').length;

  return `<div class="pros-fixed-layout">
    <div class="head" style="margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; width:100%;">
        <div><h1 class="pt" style="font-size:28px">Facturación y Pagos</h1><p class="sub-t">Facturas electrónicas recibidas y estado de pagos.</p></div>
        ${isProv ? `<button class="btn p" id="btnNuevaFac">Nueva factura</button>` : ''}
      </div>
    </div>
    
    <div class="ui-metrics">
      <div class="ui-metric"><span class="ui-metric-lbl">Total Facturado</span><span class="ui-metric-val">${formatMoney(metrics.total)}</span></div>
      <div class="ui-metric"><span class="ui-metric-lbl">Pagado</span><span class="ui-metric-val" style="color:var(--ok)">${formatMoney(metrics.pagado)}</span></div>
      <div class="ui-metric"><span class="ui-metric-lbl">En Revisión</span><span class="ui-metric-val" style="color:var(--warn)">${formatMoney(metrics.rev)}</span></div>
      <div class="ui-metric"><span class="ui-metric-lbl">Por Pagar</span><span class="ui-metric-val">${formatMoney(metrics.pend)}</span></div>
    </div>
    
    <div class="card" style="padding:0; overflow:hidden">
      <div style="padding:16px 20px; border-bottom:1px solid var(--line);">
        <div class="ui-filter-bar" style="margin:0">
          <div class="ui-tabs" id="facTabs">
            <button class="ui-tab active" data-filter="ALL">Todas (${c_total})</button>
            <button class="ui-tab" data-filter="EN REVISION">En revisión (${c_rev})</button>
            <button class="ui-tab" data-filter="PAGADO">Pagadas (${c_pagadas})</button>
          </div>
          <div class="ui-search">
            ${ic('search')}
            <input type="text" class="ui-input" id="facSearch" placeholder="Buscar por número de factura..." style="height:36px;font-size:14px">
          </div>
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="ui-table mobile-cards" style="margin:0; border-bottom:0">
          <thead>
            <tr>
              <th style="width:40px"></th>
              <th>Factura</th>
              <th>Estado</th>
              <th>Emisión &rarr; Venc.</th>
              <th class="right">Monto</th>
              <th>Documentos</th>
            </tr>
          </thead>
          <tbody id="facTbody">
            <!-- Rendered via JS -->
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function bindFac() {
  const isProv = S.userRole === 'Proveedor';
  if (isProv) {
    const btnNew = $('#btnNuevaFac');
    if(btnNew) btnNew.onclick = () => go('facPreItems');
  }

  let currFilter = 'ALL';
  let currSearch = '';

  const renderTable = () => {
    const tbody = $('#facTbody');
    if(!tbody) return;
    
    let filtered = FAC.filter(c => {
      const matchF = currFilter === 'ALL' || c.estado === currFilter;
      const matchS = c.id.toLowerCase().includes(currSearch.toLowerCase());
      return matchF && matchS;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6"><div class="empty">${ic('search')}<br>No se encontraron facturas</div></td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(c => {
      let stClass = '--neutral';
      if(c.estado === 'PAGADO') stClass = '--ok';
      if(c.estado === 'EN REVISION') stClass = '--review';
      if(c.estado === 'OBSERVADO' || c.estado === 'RECHAZADO') stClass = '--error';

      const docCount = Object.values(c.docs || {}).filter(v => v === 'ACEPTADO' || v === 'EN REVISION').length;
      const docLabel = docCount > 0 ? `Ver docs (${docCount})` : 'Ver docs';

      const getDetail = (obj, title) => {
        if(!obj) return `<div class="ui-detail-item"><strong>${title}</strong><span style="color:var(--line)">—</span></div>`;
        return `<div class="ui-detail-item"><strong>${title}</strong><span style="color:var(--ink)">Op: ${obj.n_operacion}</span><br><span class="muted">Cta: ${obj.cuenta} &middot; ${formatDate(obj.fecha)}</span></div>`;
      };

      return `
        <tr class="item-row" data-id="${c.id}" style="cursor:pointer">
          <td data-label=""><button class="ui-expand-btn" title="Ver detalles de pago">${ic('chevron-down')}</button></td>
          <td data-label="Factura"><span style="font-weight:600; font-size:15px; color:var(--ink)">${c.id}</span></td>
          <td data-label="Estado"><div class="ui-status ${stClass}"><div class="dot"></div>${c.estado}</div></td>
          <td data-label="Fechas" style="color:var(--mut); font-size:13.5px">${formatDate(c.fechaEmision)} &rarr; ${formatDate(c.fechaVencimiento)}</td>
          <td data-label="Monto" class="right font-semibold" style="color:var(--ink)">${formatMoney(c.monto, c.moneda)}</td>
          <td data-label="Documentos"><button class="btn o sm btn-doc-fac" style="font-size:13px">${docLabel}</button></td>
        </tr>
        <tr class="ui-expand-row" data-exp="${c.id}">
          <td colspan="6">
            <div class="ui-expand-content">
              <div class="ui-detail-grid">
                ${getDetail(c.pago, 'Pago')}
                ${getDetail(c.retencion, 'Retención')}
                ${getDetail(c.detraccion, 'Detracción')}
              </div>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    document.querySelectorAll('.item-row').forEach(tr => {
      tr.onclick = (e) => {
        const id = tr.dataset.id;
        if (e.target.closest('.btn-doc-fac')) {
          go('facDet', id);
          return;
        }
        const expRow = document.querySelector(`.ui-expand-row[data-exp="${id}"]`);
        const btnExp = tr.querySelector('.ui-expand-btn');
        if(expRow) {
          const isOpen = expRow.classList.contains('open');
          if(isOpen) {
            expRow.classList.remove('open');
            if(btnExp) btnExp.classList.remove('open');
          } else {
            expRow.classList.add('open');
            if(btnExp) btnExp.classList.add('open');
          }
        }
      };
    });
  };

  renderTable();

  const tabs = document.querySelectorAll('.ui-tab');
  tabs.forEach(t => t.onclick = (e) => {
    tabs.forEach(x => x.classList.remove('active'));
    e.target.classList.add('active');
    currFilter = e.target.dataset.filter;
    renderTable();
  });

  const searchInp = $('#facSearch');
  if(searchInp) {
    searchInp.oninput = (e) => {
      currSearch = e.target.value.trim();
      renderTable();
    };
  }
}

function vFacDet(){
  const c = FAC.find(x => x.id === S.sel);
  if(!c) return vFac();
  return `<div class="pros-fixed-layout">
    <button class="back" id="bk">${ic('back')}Facturación y Pagos</button>
    <div class="card ph"><div class="r1">
      <div><h2>Factura: ${c.id}</h2>
      <div class="meta"><span><span class="mono" style="color:#667085">OC:</span> <span class="badge b-info">${c.ocId}</span></span><span><span class="dot" style="background:${c.estado==='PAGADO'?'#16a34a':'#f59e0b'}"></span>${c.estado}</span></div>
      <div class="ct"><span>Proveedor: <b>${c.prov}</b></span><span>Monto: <b style="color:#047857;font-size:16px">${c.monto} ${c.moneda}</b></span><span>Emisión: <b>${c.fechaEmision}</b></span></div></div>
      ${S.userRole === 'Contable' ? `<div style="display:flex;gap:10px">
        <button class="btn o sm" onclick="observarFac('${c.id}')">Observar</button>
        <button class="btn p sm" onclick="aprobarPagoFac('${c.id}')">Aprobar Pago</button>
      </div>` : ''}
    </div></div>
    
    <div class="det" style="grid-template-columns: 1fr;"><div class="col col-scroll" style="max-width:100%">
      <div class="card pc" style="padding:0">
        <div class="docs-container">
          ${(() => {
            const hasBienes = c.docs.hasOwnProperty('grPdf') || c.docs.hasOwnProperty('facPdf');
            const hasServicios = c.docs.hasOwnProperty('informe') || c.docs.hasOwnProperty('servFacPdf');

            const docVals = [
              hasBienes && (c.docs.facPdf || c.docs.facXml) ? (c.docs.facPdf || c.docs.facXml) : null,
              hasBienes && (c.docs.grPdf || c.docs.grXml) ? (c.docs.grPdf || c.docs.grXml) : null,
              hasBienes && c.docs.constancia ? c.docs.constancia : null,
              hasServicios && (c.docs.servFacPdf || c.docs.servFacXml) ? (c.docs.servFacPdf || c.docs.servFacXml) : null,
              hasServicios && c.docs.informe ? c.docs.informe : null
            ].filter(Boolean);
            
            const totalDocs = docVals.length;
            const aprobados = docVals.filter(v => v === 'ACEPTADO').length;
            const enRevision = docVals.filter(v => v === 'EN REVISION').length;
            const observados = docVals.filter(v => v === 'OBSERVADO').length;
            
            const pjeOk = totalDocs ? (aprobados / totalDocs) * 100 : 0;
            const pjeRev = totalDocs ? (enRevision / totalDocs) * 100 : 0;
            
            const getDocRow = (title, pdfKey, xmlKey, viewPdfName, viewXmlName) => {
              if (!c.docs[pdfKey] && (!xmlKey || !c.docs[xmlKey])) return '';
              const status = c.docs[pdfKey] || (xmlKey && c.docs[xmlKey]) || 'EN REVISION';
              const stClass = status === 'ACEPTADO' ? 'status-ACEPTADO' : (status === 'OBSERVADO' ? 'status-OBSERVADO' : 'status-EN_REVISION');
              const stText = status.replace('_', ' ').toLowerCase();
              
              let chips = '';
              if (pdfKey && c.docs[pdfKey]) chips += `<button class="doc-chip pdf" onclick="window.viewDocument('${c.id}', '${viewPdfName}', '${viewPdfName}')">PDF</button>`;
              if (xmlKey && c.docs[xmlKey]) chips += `<button class="doc-chip xml" onclick="window.viewDocument('${c.id}', '${viewXmlName}', '${viewXmlName}')">XML</button>`;
              
              let evalBtn = '';
              if (S.userRole === 'Contable') {
                if (status === 'EN REVISION') {
                  evalBtn = `
                    <div style="display:flex;gap:6px;">
                      <button class="btn sm p" style="padding:4px 8px;font-size:12px;" onclick="window.aprobarDocFac('${c.id}', '${pdfKey}')">Aceptar</button>
                      <button class="btn sm o" style="padding:4px 8px;font-size:12px;color:var(--warn);border-color:var(--warn)" onclick="window.observarDocFac('${c.id}', '${pdfKey}')">Observar</button>
                      <button class="btn sm o" style="padding:4px 8px;font-size:12px;color:var(--err);border-color:var(--err)" onclick="window.rechazarDocFac('${c.id}', '${pdfKey}')">Rechazar</button>
                    </div>`;
                } else if (status === 'OBSERVADO' || status === 'RECHAZADO') {
                   const nota = window.notasDoc && window.notasDoc[`${c.id}_${pdfKey}`] ? window.notasDoc[`${c.id}_${pdfKey}`] : 'Documento inválido';
                   evalBtn = `<div style="font-size:12px;color:var(--err);margin-top:4px"><b>Nota:</b> ${nota}</div>`;
                }
              } else {
                if (status === 'OBSERVADO' || status === 'RECHAZADO') {
                   const nota = window.notasDoc && window.notasDoc[`${c.id}_${pdfKey}`] ? window.notasDoc[`${c.id}_${pdfKey}`] : 'Documento inválido';
                   evalBtn = `
                     <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
                       <div style="font-size:12px;color:var(--err);"><b>Nota Contable:</b> ${nota}</div>
                       <button class="btn p sm" style="padding:4px 8px;font-size:12px;background:#ea580c" onclick="window.subsanarDocFac('${c.id}', '${pdfKey}', '${viewPdfName}', '${viewXmlName}')">Subsanar Doc.</button>
                     </div>`;
                }
              }

              return `
                <div class="doc-row">
                  <div class="doc-info">
                    <div class="doc-name">${title} <div class="doc-chips">${chips}</div></div>
                  </div>
                  <div class="doc-actions">
                    <div class="doc-status ${stClass}"><div class="dot"></div>${stText}</div>
                    ${evalBtn}
                  </div>
                </div>
              `;
            };

            return `
              <div class="docs-header" style="margin-bottom:16px;">
                <div class="docs-header-top" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                  <h3 class="docs-title" style="margin:0;font-size:16px;font-weight:600;display:flex;align-items:center;gap:8px;">${ic('tag')} Documentos y Sustentos</h3>
                  <div class="docs-stats" style="font-size:13px;color:var(--mut);">${aprobados} de ${totalDocs} aprobados &middot; ${enRevision} en revisión</div>
                </div>
                <div class="docs-progress-bar" style="background:var(--line2);height:4px;border-radius:4px;overflow:hidden;display:flex;">
                  <div class="docs-progress-ok" style="height:100%;background:var(--ok);transition:width 0.3s;width: ${pjeOk}%"></div>
                  <div class="docs-progress-rev" style="height:100%;background:var(--warn);transition:width 0.3s;width: ${pjeRev}%"></div>
                </div>
              </div>
              
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${hasBienes ? `
                  <h4 style="margin:8px 0 4px;font-size:14px;color:var(--mut);border-bottom:1px solid var(--line);padding-bottom:6px">Documentos de Bienes</h4>
                  ${getDocRow('Factura (Bienes)', 'facPdf', 'facXml', 'Factura PDF', 'Factura XML')}
                  ${getDocRow('Guía de Remisión', 'grPdf', 'grXml', 'Guía Remisión PDF', 'Guía Remisión XML')}
                  ${getDocRow('Constancia de Recepción', 'constancia', null, 'Constancia de Recepción', null)}
                ` : ''}
                ${hasServicios ? `
                  <h4 style="margin:8px 0 4px;font-size:14px;color:var(--mut);border-bottom:1px solid var(--line);padding-bottom:6px">Documentos de Servicios</h4>
                  ${getDocRow('Factura (Servicios)', 'servFacPdf', 'servFacXml', 'Factura PDF (Servicios)', 'Factura XML (Servicios)')}
                  ${getDocRow('Informe de Servicios', 'informe', null, 'Informe de Servicios', null)}
                ` : ''}
              </div>
            `;
          })()}
        </div>
      </div>
    </div></div>
  </div>`;
}

function bindFacDet(){
  $('#bk').onclick=()=>go('fac');
}

function vFacPreRegistroItems() {
  const stepHtml = `
    <div class="step-indicator">
      <div class="step active"><div class="circle">1</div> Selección</div>
      <div style="color:var(--line)">—</div>
      <div class="step"><div class="circle">2</div> Datos y sustentos</div>
    </div>
  `;

  const rows = RECEPCIONES_PENDIENTES.map((r, i) => {
    const isServicio = (r.tipo || '').toLowerCase() === 'servicio' || (r.material || '').toLowerCase().includes('servicio') || (r.material || '').toLowerCase().includes('serv-');
    const tagHtml = isServicio ? `<div style="margin-top:6px"><span class="ui-chip">Servicio</span></div>` : '';
    
    return `<tr class="item-row" data-idx="${i}" style="cursor:pointer">
      <td data-label="Seleccionar"><input type="checkbox" class="chk-item" style="width:18px;height:18px;pointer-events:none"></td>
      <td data-label="Material/Servicio">
        <div style="font-weight:600;font-size:15px;color:var(--ink)">${r.material}</div>
        <div style="font-size:13px;color:var(--mut);margin-top:2px">${r.desc}</div>
        ${tagHtml}
      </td>
      <td data-label="OC"><span class="ui-chip">${r.oc}</span></td>
      <td data-label="Ingreso">${formatDate(r.ingreso)}</td>
      <td data-label="Cantidad" class="right">${r.cantidad}</td>
      <td data-label="P. Unitario" class="right">${formatMoney(r.pu, '')}</td>
      <td data-label="Subtotal" class="right" style="font-weight:600;color:var(--ink)">${formatMoney(r.subtotal, '')}</td>
    </tr>`;
  }).join('');

  return `<div class="pros-fixed-layout">
    <button class="back" id="bkFac">${ic('back')}Facturación y Pagos</button>
    ${stepHtml}
    <div class="head" style="margin-bottom:16px;">
      <div><h1 class="pt">Selecciona ítems a facturar</h1><p class="sub-t">Selecciona las recepciones y/o servicios pendientes a facturar.</p></div>
    </div>
    <div class="card" style="padding:0;overflow:hidden">
      <table class="ui-table mobile-cards" id="facItemsTable">
        <thead>
          <tr>
            <th style="width:48px;padding-right:0"><input type="checkbox" id="chkAll" style="width:18px;height:18px;cursor:pointer"></th>
            <th>Material/Servicio</th>
            <th>OC</th>
            <th>Fecha Ingreso</th>
            <th class="right">Cantidad</th>
            <th class="right">P. Unitario (S/)</th>
            <th class="right">Subtotal (S/)</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="sticky-footer">
      <div class="summary" id="facSummary">0 ítems seleccionados &middot; Subtotal S/ 0.00</div>
      <button class="btn p" id="btnNextFac" disabled title="Selecciona al menos un ítem">Continuar a Detalles de Factura</button>
    </div>
  </div>`;
}

function bindFacPreRegistroItems() {
  $('#bkFac').onclick = () => go('fac');
  
  const updateSummary = () => {
    const selected = Array.from(document.querySelectorAll('.chk-item:checked')).map(cb => {
      const idx = cb.closest('tr').dataset.idx;
      return RECEPCIONES_PENDIENTES[idx];
    });
    const sum = selected.reduce((s, it) => s + it.subtotal, 0);
    const count = selected.length;
    $('#facSummary').innerHTML = `${count} ítem${count!==1?'s':''} seleccionado${count!==1?'s':''} &middot; Subtotal ${formatMoney(sum)}`;
    
    const btn = $('#btnNextFac');
    if (count > 0) {
      btn.removeAttribute('disabled');
      btn.title = '';
    } else {
      btn.setAttribute('disabled', 'true');
      btn.title = 'Selecciona al menos un ítem';
    }
  };

  document.querySelectorAll('.item-row').forEach(tr => {
    tr.onclick = (e) => {
      if (e.target.tagName !== 'INPUT') {
        const chk = tr.querySelector('.chk-item');
        chk.checked = !chk.checked;
      }
      const chk = tr.querySelector('.chk-item');
      if (chk.checked) tr.classList.add('selected');
      else tr.classList.remove('selected');
      updateSummary();
    };
  });
  
  $('#chkAll').onclick = (e) => {
    const isChecked = e.target.checked;
    document.querySelectorAll('.item-row').forEach(tr => {
      tr.querySelector('.chk-item').checked = isChecked;
      if (isChecked) tr.classList.add('selected');
      else tr.classList.remove('selected');
    });
    updateSummary();
  };

  $('#btnNextFac').onclick = () => {
    const selected = Array.from(document.querySelectorAll('.chk-item:checked')).map(cb => {
      return RECEPCIONES_PENDIENTES[cb.closest('tr').dataset.idx];
    });
    if(selected.length === 0) return toast('Selecciona al menos un ítem para facturar.');
    window._tempFacItems = selected;
    go('facPreDocs');
  };
}

window.removeFacUpload = function(id) {
  const dz = document.getElementById(id);
  if(dz) {
    dz.classList.remove('filled');
    const name = dz.dataset.name;
    if(window.uploadedFiles && window.uploadedFiles['temp_' + name]) {
      delete window.uploadedFiles['temp_' + name];
    }
    if(window._facValidateDocs) window._facValidateDocs();
  }
};

function vFacPreRegistroDocs() {
  const items = window._tempFacItems || [];
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  const hasServicios = items.some(r => r.tipo.toLowerCase() === 'servicio' || r.material.toLowerCase().includes('servicio') || r.material.toLowerCase().includes('serv-'));
  const hasBienes = items.some(r => !(r.tipo.toLowerCase() === 'servicio' || r.material.toLowerCase().includes('servicio') || r.material.toLowerCase().includes('serv-')));

  const stepHtml = `
    <div class="step-indicator">
      <div class="step"><div class="circle">1</div> Selección</div>
      <div style="color:var(--line)">—</div>
      <div class="step active"><div class="circle">2</div> Datos y sustentos</div>
    </div>
  `;

  const rows = items.map(r => `<tr>
    <td data-label="Material/Servicio">${r.material}</td><td data-label="OC"><span class="ui-chip">${r.oc}</span></td><td data-label="Ingreso">${formatDate(r.ingreso)}</td>
    <td data-label="Cantidad" class="right">${r.cantidad}</td><td data-label="P. Unitario" class="right">${formatMoney(r.pu,'')}</td>
    <td data-label="Subtotal" class="right font-semibold" style="color:var(--ink)">${formatMoney(r.subtotal,'')}</td>
  </tr>`).join('');
  
  const getDz = (id, title, reqClass, chipType, name) => `
    <div class="ui-dropzone ${reqClass}" id="${id}" data-name="${name}" onclick="triggerFacUpload('${id}', '${name}')">
      <div class="ui-dz-info">
        <div class="ui-dz-title">${title} <span class="ui-chip ${chipType}">${chipType}</span></div>
        <div class="ui-dz-desc">Haz clic o arrastra aquí</div>
      </div>
      <div class="ui-dz-status">Pendiente</div>
      <div class="ui-dz-file">
        <div>
          <div class="ui-dz-file-name"></div>
          <div class="ui-dz-file-meta"></div>
        </div>
        <button class="ui-dz-remove" onclick="event.stopPropagation(); window.removeFacUpload('${id}')" title="Quitar archivo">${ic('x')}</button>
      </div>
    </div>
  `;

  return `<div class="pros-fixed-layout">
    <button class="back" id="bkFac2">${ic('back')}Volver a Selección de Ítems</button>
    ${stepHtml}
    <div class="head" style="margin-bottom:16px;">
      <div><h1 class="pt">Datos y sustentos</h1><p class="sub-t">Ingresa los datos de la factura y sube los documentos requeridos. El perfil Contable evaluará tu envío.</p></div>
    </div>
    
    <div class="ui-fg" style="grid-template-columns: 2fr 1.2fr; align-items:start;">
      <div class="col" style="display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="padding:20px;">
          <h3 style="margin:0 0 16px; font-size:16px;">Datos de la Factura</h3>
          <div class="ui-fg" style="gap:16px;">
            <div><label class="ui-lbl">Nro. Factura <span style="color:var(--err)">*</span></label><input type="text" id="facNro" class="ui-input req-inp" placeholder="Ej: F001-000436"><div class="ui-err" id="err-facNro">Requerido</div></div>
            <div><label class="ui-lbl">Moneda</label><select id="facMoneda" class="ui-input"><option>PEN</option><option>USD</option></select></div>
            <div><label class="ui-lbl">Fecha Emisión <span style="color:var(--err)">*</span></label><input type="date" id="facFEm" class="ui-input req-inp"><div class="ui-err" id="err-facFEm">Requerido</div></div>
            <div><label class="ui-lbl">Fecha Vencimiento <span style="color:var(--err)">*</span></label><input type="date" id="facFVen" class="ui-input req-inp"><div class="ui-err" id="err-facFVen">Requerido</div></div>
          </div>
        </div>

        <div class="card" style="padding:0; overflow:hidden;">
          <div style="padding:16px 20px; border-bottom:1px solid var(--line);"><h3 style="margin:0; font-size:16px;">Ítems a Facturar</h3></div>
          <table class="ui-table mobile-cards" style="margin-bottom:0">
            <thead><tr><th>Material</th><th>OC</th><th>Ingreso</th><th class="right">Cant.</th><th class="right">PU (S/)</th><th class="right">Subtotal (S/)</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="ui-totals-block" style="padding:16px 20px 20px; border-top:0">
            <div class="ui-totals-row"><span>Subtotal:</span><span>${formatMoney(subtotal)}</span></div>
            <div class="ui-totals-row"><span>IGV (18%):</span><span>${formatMoney(igv)}</span></div>
            <div class="ui-totals-row main"><span>Total a facturar:</span><span id="facTotal">${formatMoney(total)}</span></div>
          </div>
        </div>
      </div>

      <div class="col" style="display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="padding:20px;">
          <h3 style="margin:0 0 12px; font-size:16px;">Documentos de Sustento</h3>
          <div style="margin-bottom:16px;">
             <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--mut);margin-bottom:6px"><span id="dz-progress-txt">0 de N cargados</span></div>
             <div class="docs-progress-bar" style="background:var(--line2);height:4px;border-radius:4px;overflow:hidden"><div class="docs-progress-ok" id="dz-progress-bar" style="width:0%;height:100%;background:var(--prim);transition:width 0.3s"></div></div>
          </div>
          
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${hasBienes ? `
              <h4 style="margin:8px 0 0; font-size:14px; color:var(--mut)">Para Bienes</h4>
              ${getDz('dz_facPdf', 'Factura PDF', 'req-dz', 'pdf', 'Factura PDF')}
              ${getDz('dz_facXml', 'Factura XML', 'req-dz', 'xml', 'Factura XML')}
              ${getDz('dz_grPdf', 'GR PDF', 'req-dz', 'pdf', 'Guía Remisión PDF')}
              ${getDz('dz_grXml', 'GR XML', 'req-dz', 'xml', 'Guía Remisión XML')}
              ${getDz('dz_constRec', 'Constancia de Recepción', 'req-dz', 'pdf', 'Constancia de Recepción')}
            ` : ''}
            ${hasServicios ? `
              <h4 style="margin:8px 0 0; font-size:14px; color:var(--mut)">Para Servicios</h4>
              ${getDz('dz_servFacPdf', 'Factura PDF', 'req-dz', 'pdf', 'Factura PDF (Servicios)')}
              ${getDz('dz_servFacXml', 'Factura XML', 'req-dz', 'xml', 'Factura XML (Servicios)')}
              ${getDz('dz_servInf', 'Informe de Servicios', 'req-dz', 'pdf', 'Informe de Servicios')}
            ` : ''}
          </div>
        </div>
      </div>
    </div>
    
    <div class="sticky-footer">
      <div class="summary" id="facSubmitHelp" style="color:var(--warn); font-size:14.5px;">Faltan datos o documentos por cargar.</div>
      <button class="btn p" id="btnSubmitFac" disabled style="min-width:200px">Enviar pre-registro</button>
    </div>
  </div>`;
}

function bindFacPreRegistroDocs() {
  $('#bkFac2').onclick = () => go('facPreItems');
  
  const validateForm = () => {
    let ok = true;
    let missingText = [];
    
    document.querySelectorAll('.req-inp').forEach(inp => {
      const err = $('#err-' + inp.id);
      if(!inp.value.trim()) { ok = false; if(err) err.style.display = 'block'; }
      else { if(err) err.style.display = 'none'; }
    });
    if(!ok) missingText.push('Completar los campos obligatorios');
    
    const dzs = document.querySelectorAll('.req-dz');
    const totalDz = dzs.length;
    let filledDz = 0;
    dzs.forEach(dz => {
      if(dz.classList.contains('filled')) filledDz++;
      else ok = false;
    });
    
    if(totalDz > 0) {
      if(filledDz < totalDz) missingText.push('Subir los sustentos');
      $('#dz-progress-txt').textContent = `${filledDz} de ${totalDz} cargados`;
      $('#dz-progress-bar').style.width = `${(filledDz/totalDz)*100}%`;
    }
    
    const btn = $('#btnSubmitFac');
    const help = $('#facSubmitHelp');
    if(ok) {
      btn.removeAttribute('disabled');
      help.innerHTML = '<span style="color:var(--ok)">¡Todo listo para enviar!</span>';
    } else {
      btn.setAttribute('disabled', 'true');
      help.textContent = missingText.join(' y ') + '.';
      help.style.color = 'var(--warn)';
    }
  };

  document.querySelectorAll('.req-inp').forEach(inp => inp.addEventListener('input', validateForm));
  window._facValidateDocs = validateForm;
  validateForm();

  document.querySelectorAll('.ui-dropzone').forEach(dz => {
    dz.ondragover = (e) => { e.preventDefault(); dz.classList.add('drag-active'); };
    dz.ondragleave = (e) => { e.preventDefault(); dz.classList.remove('drag-active'); };
    dz.ondrop = (e) => {
      e.preventDefault(); dz.classList.remove('drag-active');
      dz.click();
    };
  });

  $('#btnSubmitFac').onclick = () => {
    const btn = $('#btnSubmitFac');
    if(btn.hasAttribute('disabled')) return;
    const nro = $('#facNro').value.trim();
    
    const ocIds = [...new Set((window._tempFacItems || []).map(x => x.oc))].join(', ');
    
    const items = window._tempFacItems || [];
    const hasServicios = items.some(r => r.tipo.toLowerCase() === 'servicio' || r.material.toLowerCase().includes('servicio') || r.material.toLowerCase().includes('serv-'));
    const hasBienes = items.some(r => !(r.tipo.toLowerCase() === 'servicio' || r.material.toLowerCase().includes('servicio') || r.material.toLowerCase().includes('serv-')));

    const docsObj = {};
    if(hasBienes) {
      docsObj.facPdf = 'EN REVISION'; docsObj.facXml = 'EN REVISION';
      docsObj.grPdf = 'EN REVISION'; docsObj.grXml = 'EN REVISION';
      docsObj.constancia = 'EN REVISION';
    }
    if(hasServicios) {
      docsObj.servFacPdf = 'EN REVISION'; docsObj.servFacXml = 'EN REVISION';
      docsObj.informe = 'EN REVISION';
    }

    const newFac = {
      id: nro, ocId: ocIds || 'Varias OC', prov: 'Prov. Lumar EIRL', 
      monto: $('#facTotal').textContent, 
      moneda: $('#facMoneda').value, 
      fechaEmision: formatDate($('#facFEm').value) || '10/10/2026', 
      fechaVencimiento: formatDate($('#facFVen').value) || '10/11/2026', 
      estado: 'EN REVISION',
      pago: null, retencion: null, detraccion: null,
      docs: docsObj
    };
    FAC.unshift(newFac);
    
    const docNames = ['Factura PDF', 'Factura XML', 'Guía Remisión PDF', 'Guía Remisión XML', 'Constancia de Recepción', 'Informe de Servicios', 'Factura PDF (Servicios)', 'Factura XML (Servicios)'];
    docNames.forEach(dName => {
      if (window.uploadedFiles && window.uploadedFiles['temp_' + dName]) {
        window.uploadedFiles[nro + '_' + dName] = window.uploadedFiles['temp_' + dName];
        delete window.uploadedFiles['temp_' + dName];
      }
    });
    
    toast('Pre-registro enviado con éxito. En Revisión Contable.');
    window._tempFacItems = null;
    go('fac');
  };
}

// Global Prototype Actions
window.crearRFQ = function() {
  const num = COTI.length + 10;
  COTI.unshift({
    id: 'RFQ-2026-0' + num, titulo: 'Nueva Solicitud de EPPs (Auto)', fecha: '06/10/2026', vence: '12/10/2026', estado: 'Abierto', provs: 3
  });
  toast('Nuevo RFQ importado desde el ERP exitosamente');
  render();
};

window.enviarOferta = function(id) {
  const c = COTI.find(x => x.id === id);
  if(c) {
    c.estado = 'Enviado';
  }
  toast('Tu oferta comercial y PDF fueron enviados al área de Logística.');
  render();
  setTimeout(()=>go('coti'), 1500);
};

window.generarOCSeleccionada = function() {
  const c = CC.find(x => x.id === S.sel);
  if(c) {
    c.estado = 'Aprobado';
  }
  toast('Orden de Compra pre-generada y adjudicada.');
  render();
  setTimeout(()=>go('oc'), 1200);
};

window.aprobarPagoFac = function(id) {
  const f = FAC.find(x => x.id === id);
  if(f) {
    f.estado = 'PAGADO';
    f.pago = { n_operacion: 'OP-'+Math.floor(Math.random()*90000+10000), cuenta: 'BCP ***392', fecha: 'Hoy' };
  }
  toast('Factura validada contablemente. Pago programado en el banco.');
  render();
};

window.observarFac = function(id) {
  const f = FAC.find(x => x.id === id);
  if(f) f.estado = 'OBSERVADO';
  toast('Factura marcada como Observada.');
  render();
};

window.aprobarDocFac = function(id, pdfKey) {
  const f = FAC.find(x => x.id === id);
  if(f && f.docs) {
    f.docs[pdfKey] = 'ACEPTADO';
    toast('Documento aceptado.');
    render();
  }
};

window.observarDocFac = function(id, pdfKey) {
  openModal(`
    <div class="card pc" style="width:90%;max-width:500px;margin:10vh auto;padding:0;background:var(--card);">
      <div class="hd" style="padding:16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="margin:0;color:#ea580c;display:flex;align-items:center;gap:8px;">${ic('alert')} Observar Documento</h3>
        <button class="ibtn" onclick="window.closeModalGlobal()">${ic('x')}</button>
      </div>
      <div style="padding:20px;background:var(--bg);">
        <label style="font-weight:600;font-size:14px;color:var(--ink);display:block;margin-bottom:8px">Indica el motivo de la acción:</label>
        <textarea id="modalNotaOb" style="width:100%;height:100px;padding:12px;border:2px solid #cbd5e1;border-radius:12px;font-family:inherit;font-size:14px;resize:none;background:#fff;color:var(--ink)" placeholder="Escribe aquí el motivo por el cual estás observando o rechazando el documento..."></textarea>
      </div>
      <div style="padding:16px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px;background:var(--card)">
        <button class="btn o" onclick="window.closeModalGlobal()" style="color:#0ea5e9;border-color:transparent;font-weight:600">Cancelar</button>
        <button class="btn p" style="background:#ea580c;border-color:#ea580c;font-weight:600" onclick="window.confirmarObservacion('${id}', '${pdfKey}')">Confirmar y Observado</button>
      </div>
    </div>
  `);
};

window.confirmarObservacion = function(id, pdfKey) {
  const nota = document.getElementById('modalNotaOb').value.trim();
  if(!nota) { alert('Por favor, ingresa un motivo válido.'); return; }
  const f = FAC.find(x => x.id === id);
  if(f && f.docs) {
    f.docs[pdfKey] = 'OBSERVADO';
    window.notasDoc = window.notasDoc || {};
    window.notasDoc[`${id}_${pdfKey}`] = nota;
    toast('Documento observado.');
    window.closeModalGlobal();
    render();
  }
};

window.rechazarDocFac = function(id, pdfKey) {
  openModal(`
    <div class="card pc" style="width:90%;max-width:500px;margin:10vh auto;padding:0;background:var(--card);">
      <div class="hd" style="padding:16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="margin:0;color:#dc2626;display:flex;align-items:center;gap:8px;">${ic('x')} Rechazar Documento</h3>
        <button class="ibtn" onclick="window.closeModalGlobal()">${ic('x')}</button>
      </div>
      <div style="padding:20px;background:var(--bg);">
        <label style="font-weight:600;font-size:14px;color:var(--ink);display:block;margin-bottom:8px">Indica el motivo de la acción:</label>
        <textarea id="modalNotaRe" style="width:100%;height:100px;padding:12px;border:2px solid #cbd5e1;border-radius:12px;font-family:inherit;font-size:14px;resize:none;background:#fff;color:var(--ink)" placeholder="Escribe aquí el motivo por el cual estás rechazando el documento..."></textarea>
      </div>
      <div style="padding:16px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px;background:var(--card)">
        <button class="btn o" onclick="window.closeModalGlobal()" style="color:#0ea5e9;border-color:transparent;font-weight:600">Cancelar</button>
        <button class="btn p" style="background:#dc2626;border-color:#dc2626;font-weight:600" onclick="window.confirmarRechazo('${id}', '${pdfKey}')">Confirmar y Rechazado</button>
      </div>
    </div>
  `);
};

window.confirmarRechazo = function(id, pdfKey) {
  const nota = document.getElementById('modalNotaRe').value.trim();
  if(!nota) { alert('Por favor, ingresa un motivo válido.'); return; }
  const f = FAC.find(x => x.id === id);
  if(f && f.docs) {
    f.docs[pdfKey] = 'RECHAZADO';
    window.notasDoc = window.notasDoc || {};
    window.notasDoc[`${id}_${pdfKey}`] = nota;
    toast('Documento rechazado.');
    window.closeModalGlobal();
    render();
  }
};

window.subsanarDocFac = function(id, pdfKey, viewPdfName, viewXmlName) {
  openModal(`
    <div class="card pc" style="width:90%;max-width:500px;margin:10vh auto;padding:0;background:var(--card);">
      <div class="hd" style="padding:16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="margin:0;color:var(--prim);display:flex;align-items:center;gap:8px;">${ic('upload')} Subsanar Documento</h3>
        <button class="ibtn" onclick="window.closeModalGlobal()">${ic('x')}</button>
      </div>
      <div style="padding:20px;background:var(--bg);">
        <p style="margin:0 0 16px; font-size:14px; color:var(--mut)">Adjunta el nuevo documento para subsanar la observación:</p>
        <div class="ui-dropzone req-dz" id="dz_subsanar" onclick="window.triggerSubsanarUpload('${viewPdfName}')">
          <div class="icon">${ic('upload')}</div>
          <div class="txt">Haz clic o arrastra el archivo aquí</div>
          <div class="sub">Archivo PDF o XML</div>
        </div>
      </div>
      <div style="padding:16px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px;background:var(--card)">
        <button class="btn o" onclick="window.closeModalGlobal()" style="color:#0ea5e9;border-color:transparent;font-weight:600">Cancelar</button>
        <button class="btn p" style="background:#ea580c;border-color:#ea580c;font-weight:600" onclick="window.confirmarSubsanacion('${id}', '${pdfKey}', '${viewPdfName}')">Enviar Subsanación</button>
      </div>
    </div>
  `);
};

window.triggerSubsanarUpload = function(name) {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = '.pdf,.xml';
  input.onchange = e => {
    let file = e.target.files[0];
    if(file) {
      let url = URL.createObjectURL(file);
      window.uploadedFiles = window.uploadedFiles || {};
      window.uploadedFiles['temp_subsanar'] = { url: url, name: file.name, type: file.type, size: file.size };
      const dz = document.getElementById('dz_subsanar');
      dz.classList.add('filled');
      dz.innerHTML = `<div class="icon" style="color:var(--ok)">${ic('check')}</div><div class="txt" style="color:var(--ink);font-weight:600">${file.name}</div><div class="sub">Listo para enviar</div>`;
      dz.style.borderColor = 'var(--ok)';
      dz.style.background = '#f0fdf4';
    }
  };
  input.click();
};

window.confirmarSubsanacion = function(id, pdfKey, viewPdfName) {
  if(!window.uploadedFiles || !window.uploadedFiles['temp_subsanar']) {
    alert('Debes adjuntar un archivo primero.');
    return;
  }
  
  const f = FAC.find(x => x.id === id);
  if(f && f.docs) {
    f.docs[pdfKey] = 'EN REVISION';
    
    // Replace the file in window.uploadedFiles
    window.uploadedFiles[`${id}_${viewPdfName}`] = window.uploadedFiles['temp_subsanar'];
    delete window.uploadedFiles['temp_subsanar'];

    if (window.notasDoc && window.notasDoc[`${id}_${pdfKey}`]) {
      delete window.notasDoc[`${id}_${pdfKey}`];
    }
    
    toast('Documento subsanado exitosamente y enviado a revisión.');
    window.closeModalGlobal();
    render();
  }
};
