

/* ============ Estado ============ */
const S = { logged: false, userRole: null, route: 'login', sel: null, tab: { bandeja: 'rev', solic: 'cambios', docs: 'Base' }, size: 10, ruc: { q: '20539627938', res: null, err: '', nd: false }, open: { cfg: true, hom: true, comp: true, fin: true }, registering: false, creatingUser: false, registeringInfo: false };
S.ruc.res = lookup('20539627938');

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function toast(t) { const e = $('#toast'); e.innerHTML = ic('check') + ' ' + esc(t); e.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove('on'), 2600) }
const now = () => { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}` };

window.formatMoney = function(valor, moneda = 'S/') {
  const num = typeof valor === 'string' ? parseFloat(valor.replace(/[^0-9.-]+/g,"")) : valor;
  if(isNaN(num)) return valor;
  return `${moneda} ${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

window.formatDate = function(fechaStr) {
  if(!fechaStr) return '';
  const parts = fechaStr.split(/[\/\-\s]/);
  if(parts.length < 3) return fechaStr;
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  let d = parseInt(parts[0], 10), m = parseInt(parts[1], 10) - 1, y = parseInt(parts[2], 10);
  if(y < 100) y += 2000;
  if(isNaN(d) || isNaN(m) || isNaN(y)) return fechaStr;
  return `${String(d).padStart(2, '0')} ${meses[m]} ${y}`;
};

window.addContactRow = function(btn) {
  const row = btn.closest('.contact-row');
  const clone = row.cloneNode(true);
  clone.querySelectorAll('input').forEach(inp => { inp.value = ''; inp.style.borderColor = 'var(--border)'; });
  const msg = clone.querySelector('.val-msg');
  if(msg) msg.innerHTML = '';
  
  const btnClone = clone.querySelector('button');
  btnClone.title = 'Quitar fila';
  btnClone.innerHTML = '<span style="font-size:20px;line-height:1;margin-top:-2px;">-</span>';
  btnClone.style.color = '#ef4444';
  btnClone.style.borderColor = '#fee2e2';
  btnClone.style.background = '#fef2f2';
  btnClone.onclick = function() { clone.remove(); };
  
  row.parentNode.appendChild(clone);
};

window.validateBank = function(el) {
   const row = el.closest('.contact-row');
   const bank = row.querySelector('.val-bank').value;
   const cta = row.querySelector('.val-cta');
   const msg = row.querySelector('.val-msg');
   if(!cta || !msg) return;
   const val = cta.value.replace(/\D/g, '');
   
   if(!val) { msg.innerHTML = ''; cta.style.borderColor = 'var(--border)'; return; }
   
   let valid = false;
   if(bank === 'BCP' && val.length >= 13 && val.length <= 14) valid = true;
   else if(bank === 'BBVA' && val.length === 18) valid = true;
   else if(bank === 'Interbank' && val.length === 13) valid = true;
   else if(bank === 'Scotiabank' && val.length === 10) valid = true;
   else if(val.length >= 10 && val.length <= 20) valid = true; // Genérico
   
   if(valid) {
      msg.style.color = '#10b981';
      msg.innerHTML = '✓ Válido';
      cta.style.borderColor = '#10b981';
   } else {
      msg.style.color = '#ef4444';
      msg.innerHTML = '✗ Revisar';
      cta.style.borderColor = '#ef4444';
   }
};

/* ============ Menú ============ */
const MENU = [
  { id: 'cfg', t: 'Configuración', ic: 'settings', items: [['categorias', 'Categorías de producto', 'tag']] },
  { id: 'hom', t: 'Homologación', ic: 'check', items: [['ruc', 'Consulta RUC', 'search'], ['prospectos', 'Prospectos', 'users'], ['bandeja', 'Bandeja de revisión', 'inbox'], ['solicitudes', 'Solicitudes', 'msg']] },
  { id: 'comp', t: 'Compras', ic: 'tag', items: [['coti', 'Cotizaciones (RFQ)', 'send'], ['cc', 'Cuadros Comparativos', 'users'], ['oc', 'Órdenes de Compra', 'check']] },
  { id: 'fin', t: 'Finanzas', ic: 'settings', items: [['fac', 'Facturación y Pagos', 'check']] }
];
const ROLE_PERMISSIONS = {
  'Proveedor': ['prospecto', 'prospectos', 'coti', 'cotiDet', 'oc', 'ocDet', 'fac', 'facDet', 'facPreItems', 'facPreDocs'],
  'Aprobador': ['prospecto', 'prospectos', 'coti', 'cotiDet', 'oc', 'ocDet', 'cc', 'ccDet', 'fac', 'facDet', 'ruc', 'bandeja', 'solicitudes', 'categorias'],
  'Comprador': ['prospecto', 'prospectos', 'coti', 'cotiDet', 'oc', 'ocDet', 'cc', 'ccDet', 'ruc', 'bandeja', 'solicitudes', 'categorias', 'fac', 'facDet'],
  'Compliance': ['prospecto', 'prospectos', 'bandeja', 'solicitudes'],
  'Contable': ['fac', 'facDet'],
  'Finanzas': ['fac', 'facDet']
};

function renderNav() {
  const act = (S.userRole === 'Proveedor' && S.route === 'prospecto') ? 'prospecto' : (S.route === 'prospecto' ? 'prospectos' : S.route);
  const allowed = S.userRole ? ROLE_PERMISSIONS[S.userRole] : [];

  const filteredMenu = MENU.map(g => {
    let items = g.items.filter(i => allowed.includes(i[0]));
    if (S.userRole === 'Proveedor') {
      items = items.map(i => i[0] === 'prospectos' ? ['prospecto', 'Mi Homologación', 'user'] : i);
    }
    return { ...g, items };
  }).filter(g => g.items.length > 0);

  $('#nav').innerHTML = filteredMenu.map(g => `<div class="grp ${S.open[g.id] ? '' : 'closed'}">
    <button class="grp-h" data-g="${g.id}">${ic(g.ic)}<span>${g.t}</span><span class="chev">${ic('up')}</span></button>
    <div class="sub">${g.items.map(([id, t, i]) => `<button class="item ${act === id ? 'act' : ''}" data-r="${id}">${ic(i)}<span>${t}</span></button>`).join('')}</div></div>`).join('');
  document.querySelectorAll('[data-g]').forEach(b => b.onclick = () => { S.open[b.dataset.g] = !S.open[b.dataset.g]; renderNav() });
  document.querySelectorAll('[data-r]').forEach(b => b.onclick = () => go(b.dataset.r));
}
function go(r, sel) { S.route = r; if (sel !== undefined) S.sel = sel; render(); $('#view').scrollTop = 0; if (innerWidth <= 900) $('#side').classList.add('hide') }

/* ============ Vistas ============ */
function lookup(q) {
  const s = SUNAT[q]; if (s) return s;
  const p = PROS.find(x => x.ruc === q);
  if (p) return { razon: p.razon, persona: 'Persona jurídica', contrib: '—', estado: '—', cond: '—', inicio: '—', dom: '—', act: '—' };
  return null;
}
function badgeSt(v) { if (v === '—') return '—'; return `<span class="badge b-ok">${v}</span>` }
function vRuc() {
  const r = S.ruc, res = r.res, nd = r.nd;
  return `<div class="wrapc">
  <h1 class="pt">${ic('search')}Consulta RUC</h1>
  <p class="sub-t">Consulta la ficha RUC en SUNAT. Si el proveedor está ACTIVO y HABIDO puedes crear su prospecto de homologación.</p>
  <div class="card" style="padding:18px 18px 16px;margin-bottom:14px">
    <label class="lbl">RUC o ID del proveedor</label>
    <div class="rucrow">
      <input class="inp" id="rq" value="${esc(r.q)}" maxlength="11" autocomplete="off" ${nd ? 'placeholder="Ingrese ID o Nombre (Opcional)"' : 'inputmode="numeric"'}>
      <label style="display:flex;align-items:center;gap:8px;font-size:15px;cursor:pointer"><input type="checkbox" id="rnd" ${nd ? 'checked' : ''} style="width:18px;height:18px"> No Domiciliado <span class="badge b-info">NUEVO</span></label>
      <button class="btn p" id="rgo">${ic('search')}${nd ? 'Crear prospecto directo' : 'Consultar'}</button>
      <button class="btn" id="rcl">${ic('x')}Limpiar</button>
    </div>
    ${r.err ? `<div class="err">${esc(r.err)}</div>` : ''}
  </div>
  ${!nd && res ? `<div class="card">
    <div class="sunat-h"><h3>${ic('bld')}SUNAT — Ficha RUC</h3><span class="badge b-ok">Encontrado</span></div>
    <div class="fg">
      <div class="fld full"><small>Razón social</small><div style="font-weight:500">${esc(res.razon)}</div></div>
      <div class="fld"><small>Tipo de persona</small><div><span class="badge b-info">${res.persona}</span></div></div>
      <div class="fld"><small>Tipo contribuyente</small><div>${esc(res.contrib)}</div></div>
      <div class="fld"><small>Estado</small><div>${badgeSt(res.estado)}</div></div>
      <div class="fld"><small>Condición</small><div>${badgeSt(res.cond)}</div></div>
      <div class="fld full"><small>Inicio de actividades</small><div>${esc(res.inicio)}</div></div>
      <div class="fld full"><small>Domicilio fiscal</small><div>${esc(res.dom)}</div></div>
      <div class="fld full"><small>Actividad económica principal</small><div>${esc(res.act)}</div></div>
    </div>
    <div class="cardf"><hr><button class="btn p" id="rhom">${ic('uplus')}Homologación</button></div>
  </div>`: ''}
  </div>`;
}
function bindRuc() {
  const q = $('#rq'), nd = $('#rnd');
  const doit = () => {
    const v = q.value.trim(); S.ruc.q = v; S.ruc.nd = nd.checked;
    if (nd.checked) {
      S.ruc.err = ''; S.ruc.res = null;
      openHom(v || ('ND-' + Math.floor(Date.now() / 1000)), { razon: v || 'Proveedor Extranjero Nuevo' }, true);
      return;
    }
    if (!/^(10|20)\d{9}$/.test(v)) { S.ruc.err = 'El RUC debe tener 11 dígitos y empezar con 10 o 20.'; S.ruc.res = null; render(); return }
    const res = lookup(v);
    if (!res) { S.ruc.err = 'No se encontró el RUC en la base de demostración.'; S.ruc.res = null }
    else { S.ruc.err = ''; S.ruc.res = res }
    render();
  };
  nd.onchange = () => { S.ruc.nd = nd.checked; S.ruc.err = ''; render() };
  if (!S.ruc.nd) q.oninput = () => { q.value = q.value.replace(/\D/g, '') };
  q.onkeydown = e => { if (e.key === 'Enter') doit() };
  $('#rgo').onclick = doit;
  $('#rcl').onclick = () => { S.ruc = { q: '', res: null, err: '', nd: false }; render(); $('#rq').focus() };
  const h = $('#rhom'); if (h) h.onclick = () => openHom(S.ruc.q, S.ruc.res, false);
}

function pagerHTML(n) {
  return `<div class="pag"><button disabled>${ic('ccl')}</button><button disabled>${ic('cl')}</button><button class="cur">1</button><button disabled>${ic('cr')}</button><button disabled>${ic('ccr')}</button>
  <select id="psz">${[10, 20, 50].map(x => `<option ${S.size === x ? 'selected' : ''}>${x}</option>`).join('')}</select></div>`;
}
function vPros() {
  if (S.userRole === 'Proveedor') {
    setTimeout(() => go('prospecto', '20539627938'), 0);
    return `<div style="padding:20px;text-align:center;">Redirigiendo a tu prospecto...</div>`;
  }
  const rows = PROS.slice(0, S.size).map(p => `<tr class="click" data-ruc="${p.ruc}">
    <td class="mono">${p.ruc}</td><td class="rz">${esc(p.razon)}</td><td class="cc">${p.tipo}</td>
    <td class="cc">${p.cats.length ? p.cats.map(c => esc(segName(c))).join(', ') : '—'}</td>
    <td class="est cc"><span class="dot" style="background:${ESTADOS[p.estado]}"></span>${p.estado}</td>
    <td class="cc">${esc(p.resp)}</td><td class="cc mono" style="font-size:15px;font-family:inherit">${p.cel || '—'}</td>
    <td class="dt">${p.fecha.replace(' ', '<br>')}</td></tr>`).join('');
  return `<div class="head"><div><h1 class="pt">${ic('users')}Prospectos de homologación</h1><p class="sub-t">Proveedores en proceso de homologación y su estado.</p></div>
    <div class="btns"><button class="btn" id="rf">${ic('refresh')}Refrescar</button><button class="btn p" id="gr">${ic('search')}Consultar RUC</button></div></div>
  <div class="card" style="padding:12px 18px;margin-bottom:14px;display:flex;gap:12px;align-items:flex-end">
    <div style="flex:1"><label class="lbl">Estado</label><select class="inp" style="width:100%;height:42px"><option>Todos</option><option>Aceptado</option><option>Observado</option><option>Rechazado</option><option>Bloqueado</option></select></div>
    <div style="flex:1"><label class="lbl">Tipo</label><select class="inp" style="width:100%;height:42px"><option>Todos</option><option>Nacional</option><option>No Domiciliado</option></select></div>
    <div style="flex:2"><label class="lbl">Buscar</label><input class="inp" style="width:100%;height:42px" placeholder="RUC o Razón Social..."></div>
  </div>
  <div class="card tw"><table class="tbl"><thead><tr><th>RUC / ID</th><th>Razón social</th><th>Tipo</th><th>Categorías</th><th>Estado</th><th>Responsable</th><th>Celular</th><th>Registrado</th></tr></thead><tbody>${rows}</tbody></table>${pagerHTML()}</div>`;
}
function bindPros() {
  document.querySelectorAll('tr[data-ruc]').forEach(tr => tr.onclick = () => go('prospecto', tr.dataset.ruc));
  $('#gr').onclick = () => go('ruc');
  $('#rf').onclick = () => { const s = $('#rf svg'); s.classList.add('spin'); setTimeout(() => { s.classList.remove('spin'); toast('Lista actualizada') }, 650) };
  $('#psz').onchange = e => { S.size = +e.target.value; render() };
}

function docsOf(p) { return getDocs(p) }
function vPros1() {
  const p = PROS.find(x => x.ruc === S.sel); if (!p) { return vPros() }
  const s = SUNAT[p.ruc] || { estado: '—', cond: '—', dom: '—', act: '—', inicio: '—' };
  const docsAll = docsOf(p);
  const docsTab = docsAll.filter(d => d.grp === S.tab.docs);
  const ob = docsAll.filter(d => d.ob), cg = ob.filter(d => d.st !== 'Pendiente').length;
  const stc = { Pendiente: 'st-pend', 'Por revisar': 'st-rev', Aprobado: 'st-ok' };
  const dco = { Pendiente: '#8795a8', 'Por revisar': '#7c3aed', Aprobado: '#0f9d6a' };
  const inv = p.estado !== 'Registrado';
  const pill = (k, l) => `<button class="pill ${S.tab.docs === k ? 'on' : ''}" data-tdoc="${k}">${l}</button>`;
  const rubros = ['Transportistas', 'Contratistas', 'Insumos', 'Químicos', 'Intermediación Laboral', 'Explosivos'];
  const selRubro = `<select class="inp" id="selRubro" style="height:36px;font-size:14px;padding:0 8px;flex:1"><option value="">Seleccione el rubro del proveedor...</option>${rubros.map(r => `<option ${p.rubro === r ? 'selected' : ''}>${r}</option>`).join('')}</select>`;
  const isProv = S.userRole === 'Proveedor';
  const canDiscard = S.userRole === 'Aprobador';
  const canEvalStatus = S.userRole === 'Aprobador';
  const canEvalDocs = !isProv && S.userRole !== 'Comprador';

  const stageDef = [
    ['Registrado', 'Datos de contacto y categorías cargados'],
    ['En Revisión', 'Aprobador y Compliance revisan tus documentos'],
    ['Aprobado', 'Proveedor homologado y habilitado']
  ];
  const stOut = ['Rechazado', 'Bloqueado'].includes(p.estado);
  const stage = ['Aceptado', 'Habilitado'].includes(p.estado) ? 3
    : ['En revisión', 'Observado', 'Rechazado', 'Bloqueado'].includes(p.estado) ? 1 : 0;
  const timeline = isProv ? `
    <div class="card pc prog">
      <div class="hd"><h3>${ic('check')}Progreso de Homologación</h3></div>
      <ol class="vsteps">
        ${stageDef.map(([paso, desc], i) => {
    const done = i < stage;
    const active = i === stage;
    const bad = stOut && i === 2;
    const cls = bad ? 'bad' : (done ? 'done' : (active ? 'active' : 'todo'));
    const lbl = bad ? p.estado : paso;
    const sub = bad ? 'La homologación no fue aprobada' : (i === 1 && p.estado === 'Observado' ? 'Tienes documentos observados por corregir' : desc);
    const tag = bad ? 'Detenido' : (done ? 'Completado' : (active ? 'En curso' : 'Pendiente'));
    return `<li class="vs ${cls}">
          <span class="vs-dot">${done ? ic('check', 18) : (bad ? ic('x', 18) : (i + 1))}</span>
          <div class="vs-tx"><b>${lbl}</b><small>${sub}</small></div>
          <span class="vs-tag">${tag}</span>
        </li>`;
  }).join('')}
      </ol>
    </div>
  ` : '';

  return `<div class="pros-fixed-layout">
  ${!isProv ? `<button class="back" id="bk">${ic('back')}Prospectos</button>` : ''}
  <div class="card ph"><div class="r1"><div><h2>${esc(p.razon)}</h2>
    <div class="meta"><span><span class="mono" style="color:var(--mut)">${p.tipo === 'Nacional' ? 'RUC' : 'ID'}</span> <span class="mono">${p.ruc}</span></span><span class="badge b-info" style="font-size:13px">${p.tipo}</span><span><span class="dot" style="background:${ESTADOS[p.estado]}"></span>${p.estado}</span></div>
    <div class="ct"><span>${ic('phone')}${p.cel ? `<b>${p.cel}</b>`:'Sin celular'}</span><span>${ic('mail')}${p.email ? `<b>${esc(p.email)}</b>`:'Sin correo'}${!isProv ? `<button class="ibtn" id="ed" title="Editar contacto">${ic('pen')}</button>` : ''}</span></div></div>
    <div style="display:flex;gap:10px">
      ${canDiscard ? `<button class="btn o sm" id="dsc">Descartar prospecto</button>` : ''}
      ${canEvalStatus ? `<select class="inp" id="updSt" style="height:36px;font-size:14px;padding:0 8px"><option value="">Dictaminar...</option><option>Aceptado</option><option>Observado</option><option>Rechazado</option><option>Bloqueado</option></select>` : ''}
    </div>
  </div></div>
  <div class="det">
   <div class="col col-scroll">
    ${timeline}
    ${p.tipo === 'Nacional' ? `<div class="card pc"><div class="hd"><h3>${ic('bld')}SUNAT</h3></div>
      <div class="two"><div class="fld"><small>Estado</small><div>${s.estado}</div></div><div class="fld"><small>Condición</small><div>${s.cond}</div></div></div>
      <div class="two"><div class="fld"><small>Inicio act.</small><div>${s.inicio}</div></div><div class="fld"><small>Domicilio fiscal</small><div>${esc(s.dom)}</div></div></div>
      <div class="fld"><small>Actividad principal</small><div>${esc(s.act)}</div></div></div>` : ''}
    ${!isProv ? `<div class="card pc"><div class="hd"><h3>${ic('mail')}Acceso del proveedor</h3>${inv ? '' : `<button class="lnk" id="inv">${ic('send')}Invitar proveedor</button>`}</div>
      <div class="mu">${inv ? `Proveedor invitado${p.email ? ' a ' + esc(p.email) : ''}. Podrá activar su cuenta y subir sus documentos.`:'Aún no se invitó al proveedor. Al invitarlo recibirá un correo para activar su cuenta y subir sus documentos.'}</div>
      ${inv ? `<button class="btn o sm" style="margin-top:10px" onclick="toast('Correo de reseteo de contraseña enviado')">Resetear contraseña</button>`:''}</div>` : ''}
    <div class="card pc" style="background:var(--prim-soft); border:1px solid var(--prim-ink);">
      <div class="hd"><h3 style="color:var(--prim);">${ic('users')}Ficha de Registro de Información</h3><span class="badge b-info">COMPLETADO</span></div>
      <div class="mu" style="margin-top:6px; margin-bottom:12px; color:var(--ink);">Toda la información comercial, legal, financiera y de sucursales declarada por el proveedor.</div>
      <button class="btn p" style="width:100%;justify-content:center; background:var(--prim); border-color:var(--prim);" onclick="viewFicha('${p.ruc}')">${ic('eye')} Ver Ficha Completa del Proveedor</button>
    </div>
    ${!isProv && S.userRole !== 'Comprador' ? `<div class="card pc"><div class="hd"><h3>${ic('check')}Evaluación Externa</h3><span class="badge b-info">NUEVO</span></div>
      <div class="two" style="margin-top:10px">
        <div style="padding:10px;border:1px solid var(--line);border-radius:8px"><b>SENTINEL</b><br><span class="badge b-grey">Pendiente</span></div>
        <div style="padding:10px;border:1px solid var(--line);border-radius:8px"><b>CUMPLO 360</b><br><span class="badge b-grey">Pendiente</span></div>
      </div>
      <button class="btn sm p" style="margin-top:12px;width:100%">Ejecutar evaluación automática</button></div>` : ''}
    ${!isProv ? `<div class="card pc"><div class="hd"><h3 style="gap:10px"><span style="color:#ea7a1c;display:flex">${ic('msg')}</span>Observaciones y notas</h3></div>
      ${p.notas.length ? `<ul class="notes">${p.notas.map(n => `<li>${esc(n.t)}<small>${esc(n.f)} · Paul Andrade</small></li>`).join('')}</ul>`:'<div class="mu">Sin observaciones ni notas.</div>'}
      <textarea class="nota" id="nt" placeholder="Agregar una nota interna (el proveedor no la ve)"></textarea>
      <button class="btn sm" id="an" style="margin-top:8px;color:var(--mut)" disabled>${ic('plus')}Agregar nota</button></div>` : ''}
   </div>
   <div class="col col-static">
   <div class="card doc-t"><div class="doc-h"><h3>${ic('lchk')}Documentos requeridos</h3><span>${cg} de ${ob.length} obligatorios cargados</span></div>
    <div class="pills" style="padding:10px 14px 0">${pill('Base', 'Base')} ${pill('Por Tipo', 'Por Tipo')} ${pill('Adicionales', 'Adicionales')}</div>
    ${S.tab.docs === 'Por Tipo' ? `<div style="padding:14px 14px 0;display:flex;align-items:center;gap:10px"><label class="lbl" style="margin:0;white-space:nowrap">Tipo de proveedor:</label>${selRubro}</div>` : ''}
    <div class="tw"><table class="tbl"><thead><tr><th>Código</th><th>Documento</th><th>Requisito</th><th>¿Subido?</th><th>Estado</th><th>Acción</th></tr></thead><tbody>
    ${docsTab.map(d => {
    const sub = d.st !== 'Pendiente';
    const tag = sub ? '<span style="color:#0f9d6a;font-weight:600">Sí</span>' : '<span style="color:#e02424;font-weight:600">No</span>';

    let btn = '';
    if (isProv) {
      if (!sub) {
        btn = `<button class="btn sm p" style="font-size:12px;padding:2px 8px;border-radius:4px" onclick="triggerUpload('${p.ruc}','${d.c}','${esc(d.n)}')">${ic('plus', 14)} Subir</button>`;
        } else {
           if(d.st === 'Observado' || d.st === 'Rechazado') {
              btn = `<div style="display:flex;gap:6px;align-items:center"><button class="btn sm o" style="font-size:12px;padding:2px 8px;border-radius:4px;color:#ea580c;border-color:#ea580c" onclick="viewDocObservation('${p.ruc}','${d.c}')">Ver Obs.</button>
              <button class="btn sm p" style="font-size:12px;padding:2px 8px;border-radius:4px" onclick="triggerUpload('${p.ruc}','${d.c}','${esc(d.n)}')">Reemplazar</button></div>`;
           } else {
              btn = `<div style="display:flex;gap:6px;align-items:center"><button class="ibtn" title="Vista previa" onclick="viewDocument('${p.ruc}','${d.c}','${esc(d.n)}')">${ic('eye')}</button></div>`;
           }
        }
      } else {
        if (!sub) {
          if (!isProv) {
            btn = `<button class="btn sm o" style="font-size:12px;padding:2px 8px;border-radius:4px" onclick="toast('Se notificó al proveedor la falta de: ${esc(d.n)}')">Notificar</button>`;
          }
        } else {
          if (canEvalDocs) {
            btn = `<div style="display:flex;gap:6px;align-items:center">
  <button class="ibtn" title="Ver documento" onclick="viewDocument('${p.ruc}','${d.c}','${esc(d.n)}')">${ic('eye')}</button>
  <button class="ibtn" style="color:#0f9d6a" title="Aprobar" onclick="setDocState('${p.ruc}','${d.c}','Aprobado')">${ic('check')}</button>
  <button class="ibtn" style="color:#ea580c" title="Observar" onclick="promptDocAction('${p.ruc}','${d.c}','Observado')">${ic('warn')}</button>
  <button class="ibtn" style="color:#e02424" title="Rechazar" onclick="promptDocAction('${p.ruc}','${d.c}','Rechazado')">${ic('x')}</button>
  </div>`;
          } else {
            btn = `<div style="display:flex;gap:6px;align-items:center"><button class="ibtn" title="Ver documento" onclick="viewDocument('${p.ruc}','${d.c}','${esc(d.n)}')">${ic('eye')}</button></div>`;
          }
        }
      }
      return `<tr><td class="cod">${d.c}</td><td><div style="font-weight:500;color:var(--ink)">${d.n}</div></td><td><span class="badge ${d.ob ? 'b-warn' : 'b-grey'}">${d.ob ? 'Obligatorio' : 'Opcional'}</span></td><td>${tag}</td><td class="${stc[d.st] || 'st-rev'}"><span class="dot" style="background:${dco[d.st] || '#8795a8'}"></span><b>${d.st}</b></td><td>${btn}</td></tr>`;
    }).join('')}
    ${docsTab.length === 0 ? '<tr><td colspan="4" style="text-align:center;padding:30px;color:var(--mut)">No hay documentos en esta pestaña.</td></tr>' : ''}
    </tbody></table></div></div>
   </div>
  </div>
  </div>`;
      }
      function bindPros1() {
        const p = PROS.find(x => x.ruc === S.sel); if (!p) return;
        const bk = $('#bk'); if (bk) bk.onclick = () => go('prospectos');
        const ed = $('#ed'); if (ed) ed.onclick = () => openContact(p);
        const ec = $('#ec'); if (ec) ec.onclick = () => openCats(p);
        const dsc = $('#dsc'); if (dsc) dsc.onclick = () => openDiscard(p);
        const iv = $('#inv'); if (iv) iv.onclick = () => {
          if (!p.email) { toast('Agrega un correo al prospecto antes de invitar'); openContact(p); return }
          p.estado = 'Invitado'; toast('Invitación enviada a ' + p.email); render()
        };
        const nt = $('#nt'), an = $('#an');
        if (nt && an) {
          nt.oninput = () => { const ok = nt.value.trim().length > 0; an.disabled = !ok; an.style.color = ok ? '' : '#9aa6b6' };
          an.onclick = () => { p.notas.push({ t: nt.value.trim(), f: now() }); render() };
        }
        document.querySelectorAll('[data-tdoc]').forEach(b => b.onclick = () => { S.tab.docs = b.dataset.tdoc; render() });
        const us = $('#updSt'); if (us) us.onchange = e => { const v = e.target.value; if (v) { p.estado = v; toast('Estado actualizado a ' + v); render() } };
        const sr = $('#selRubro'); if (sr) sr.onchange = e => { p.rubro = e.target.value; p._docs = null; toast('Rubro actualizado a ' + p.rubro); render() };
      }

      function vBandeja() {
        const rev = PROS.filter(p => p.estado === 'En revisión');
        const t = S.tab.bandeja;
        const list = t === 'rev' || t === 'todos' ? rev : [];
        const pill = (k, l, n) => `<button class="pill ${t === k ? 'on' : ''}" data-t="${k}">${l} <span>(${n})</span></button>`;
        const rows = list.map(p => {
          const d = docsOf(p).filter(x => x.ob); const a = d.filter(x => x.st === 'Aprobado').length, r = d.filter(x => x.st === 'Por revisar').length, o = d.filter(x => x.st === 'Observado').length;
          return `<tr class="click" data-ruc="${p.ruc}"><td class="mono">${p.ruc}</td><td class="rz">${esc(p.razon)}</td><td class="cc">${p.tipo}</td><td class="cc"><span class="dot" style="background:${ESTADOS[p.estado]};margin-right:6px"></span>${p.estado}</td><td class="cc">nº ${p.envio || 1}</td><td class="cc">${p.ultimo || p.fecha}</td>
    <td><span style="color:#0f9d6a">${a} aprobados</span> · <span style="color:#7c3aed">${r} por revisar</span> · <span style="color:#ea580c">${o} observados</span> <span style="color:#8795a8">/ ${d.length}</span></td></tr>`
        }).join('');
        return `<div class="head"><div><h1 class="pt">${ic('inbox')}Bandeja de revisión</h1><p class="sub-t">Expedientes de homologación enviados por los proveedores.</p></div>
    <div class="btns"><button class="btn" id="rf">${ic('refresh')}Refrescar</button></div></div>
  <div class="pills">${pill('rev', 'Por revisar', rev.length)}${pill('apr', 'En aprobación', 0)}${pill('dev', 'Devueltos al proveedor', 0)}${pill('todos', 'Todos', rev.length)}</div>
  <div class="card tw"><table class="tbl"><thead><tr><th>RUC</th><th>Razón social</th><th>Tipo</th><th>Estado</th><th>Envío</th><th>Último envío</th><th>Avance de revisión</th></tr></thead>
  <tbody>${rows || `<tr><td colspan="7"><div class="empty">${ic('inbox')} No hay expedientes en esta vista.</div></td></tr>`}</tbody></table>${pagerHTML()}</div>`;
      }
      function bindBandeja() {
        document.querySelectorAll('tr[data-ruc]').forEach(tr => tr.onclick = () => go('prospecto', tr.dataset.ruc));
        document.querySelectorAll('.pill').forEach(b => b.onclick = () => { S.tab.bandeja = b.dataset.t; render() });
        $('#rf').onclick = () => { const s = $('#rf svg'); s.classList.add('spin'); setTimeout(() => { s.classList.remove('spin'); toast('Bandeja actualizada') }, 650) };
        $('#psz').onchange = e => { S.size = +e.target.value; render() };
      }
      function vSolic() {
        const t = S.tab.solic;
        const pill = (k, l) => `<button class="pill ${t === k ? 'on' : ''}" data-t="${k}">${l} <span>(${SOLIC.length})</span></button>`;
        return `<div class="head"><div><h1 class="pt">${ic('msg')}Solicitudes</h1><p class="sub-t">Cambios que piden los proveedores sobre documentos ya enviados y documentos adicionales que se les solicitan. Para pedir un documento adicional, entra al detalle del prospecto.</p></div>
    <div class="btns"><button class="btn" id="rf">${ic('refresh')}Refrescar</button></div></div>
  <div class="pills">${pill('cambios', 'Cambios por resolver')}${pill('docs', 'Documentos pedidos')}${pill('abiertas', 'Abiertas')}${pill('todas', 'Todas')}</div>
  <div class="card tw"><table class="tbl"><thead><tr><th>Proveedor</th><th>Tipo</th><th>Documento</th><th>Motivo</th><th>Estado</th><th>Fecha límite</th></tr></thead>
  <tbody><tr><td colspan="6"><div class="empty">${ic('inbox')}No hay solicitudes en esta vista.</div></td></tr></tbody></table>${pagerHTML()}</div>`;
      }
      function bindSolic() {
        document.querySelectorAll('.pill').forEach(b => b.onclick = () => { S.tab.solic = b.dataset.t; render() });
        $('#rf').onclick = () => { const s = $('#rf svg'); s.classList.add('spin'); setTimeout(() => { s.classList.remove('spin'); toast('Solicitudes actualizadas') }, 650) };
        $('#psz').onchange = e => { S.size = +e.target.value; render() };
      }
      function vCats() {
        return `<h1 class="pt">${ic('tag')}Categorías de producto</h1><p class="sub-t">Pantalla del menú Configuración. No venía en las capturas, queda pendiente de replicar.</p>
  <div class="card ph-box">${ic('tag', 28)}<p style="margin:10px 0 0">Sin captura de referencia.</p></div>`;
      }

      /* ============ Modales ============ */
      function openModal(html) { const o = $('#ov'); o.innerHTML = html; o.classList.add('on'); o.onmousedown = e => { if (e.target === o) closeModal() }; }
      function closeModal() { const o = $('#ov'); o.classList.remove('on'); o.innerHTML = '' }
      addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() });

      function catPicker(sel, onchange) {
        /* devuelve HTML + binder */
        return {
          html: `<div class="qq">¿Qué bienes o servicios ofrece?</div>
    <div class="qs">Según las categorías se piden documentos adicionales. Puedes completarlas después desde el prospecto.</div>
    <div class="chips" id="chips"></div>
    <input class="mi" id="cq" placeholder="Buscar por código o nombre (ej. transporte, 78)" autocomplete="off">
    <button class="seg-all" id="sa" type="button">Todos los segmentos</button>
    <div class="list" id="cl"></div>`,
          bind() {
            const draw = () => {
              const q = norm($('#cq').value.trim());
              const items = SEG.filter(s => !q || norm(s.n).includes(q) || (s.c + '000000').includes(q) || s.c.startsWith(q));
              $('#cl').innerHTML = items.map(s => `<div class="row ${sel.has(s.c) ? 'on' : ''}" data-c="${s.c}"><span class="cb">${ic('tick')}</span><span class="cd">${s.c}000000</span><span class="nm">${esc(s.n)}</span>${s.crit ? '<span class="cr">Crítica</span>' : ''}</div>`).join('') || '<div class="empty" style="padding:30px 0;font-size:14px">Sin resultados.</div>';
              $('#cl').querySelectorAll('.row').forEach(r => r.onclick = () => { const c = r.dataset.c; sel.has(c) ? sel.delete(c) : sel.add(c); draw(); chips(); onchange && onchange() });
            };
            const chips = () => {
              $('#chips').innerHTML = sel.size ? [...sel].map(c => `<span class="chip">${c} · ${esc(segName(c).slice(0, 38))}${segName(c).length > 38 ? '…' : ''}<button data-x="${c}">${ic('x')}</button></span>`).join('') : 'Aún no elegiste categorías.';
              $('#chips').querySelectorAll('[data-x]').forEach(b => b.onclick = e => { e.stopPropagation(); sel.delete(b.dataset.x); draw(); chips(); onchange && onchange() });
            };
            $('#cq').oninput = draw; $('#sa').onclick = () => { $('#cq').value = ''; draw() };
            draw(); chips();
          }
        };
      }
      function openHom(ruc, res) {
        const sel = new Set();
        const ex = PROS.find(p => p.ruc === ruc); if (ex) ex.cats.forEach(c => sel.add(c));
        const cp = catPicker(sel);
        openModal(`<div class="modal"><div class="mh"><h2>Homologación</h2><button class="xb" id="mx">${ic('x')}</button></div>
   <div class="mb"><div class="pv"><small>Proveedor</small><b>${esc(res.razon)}</b><div class="mono">${ruc}</div></div>
   <div class="f2"><div><label>Celular de contacto</label><input class="mi" id="mc" placeholder="9XXXXXXXX" maxlength="9" inputmode="numeric" value="${esc(ex ? ex.cel : '')}"></div>
   <div><label>Correo (recibirá la invitación)</label><input class="mi" id="me" placeholder="contacto@empresa.com" value="${esc(ex ? ex.email : '')}"></div></div>
   ${cp.html}</div>
   <div class="mf"><button class="mbtn" id="mcn">Cancelar</button><button class="mbtn p" id="mok" disabled>${ic('tick')}Crear prospecto</button></div></div>`);
        cp.bind();
        const chk = () => {
          const okE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($('#me').value.trim()); const c = $('#mc').value.trim(); const okC = !c || /^9\d{8}$/.test(c);
          $('#me').classList.toggle('bad', $('#me').value.length > 0 && !okE); $('#mc').classList.toggle('bad', !okC); $('#mok').disabled = !(okE && okC)
        };
        $('#me').oninput = chk; $('#mc').oninput = e => { e.target.value = e.target.value.replace(/\D/g, ''); chk() }; chk();
        $('#mx').onclick = $('#mcn').onclick = closeModal;
        $('#mok').onclick = () => {
          const cel = $('#mc').value.trim(), email = $('#me').value.trim(), cats = [...sel];
          let p = PROS.find(x => x.ruc === ruc);
          if (p) { p.cel = cel; p.email = email; p.cats = cats; toast('Prospecto actualizado') }
          else { p = { ruc, razon: res.razon, tipo: 'Jurídica', cats, estado: 'Registrado', resp: 'Paul Andrade', cel, fecha: now(), email, notas: [] }; PROS.unshift(p); toast('Prospecto creado') }
          closeModal(); go('prospecto', ruc);
        };
      }
      function openCats(p) {
        const sel = new Set(p.cats), cp = catPicker(sel);
        openModal(`<div class="modal"><div class="mh"><h2>Categorías de producto</h2><button class="xb" id="mx">${ic('x')}</button></div>
   <div class="mb"><div class="pv"><small>Proveedor</small><b>${esc(p.razon)}</b></div>${cp.html}</div>
   <div class="mf"><button class="mbtn" id="mcn">Cancelar</button><button class="mbtn p" id="mok">${ic('tick')}Guardar</button></div></div>`);
        cp.bind(); $('#mx').onclick = $('#mcn').onclick = closeModal;
        $('#mok').onclick = () => { p.cats = [...sel]; closeModal(); toast('Categorías actualizadas'); render() };
      }
      function openContact(p) {
        openModal(`<div class="modal"><div class="mh"><h2>Datos de contacto</h2><button class="xb" id="mx">${ic('x')}</button></div>
   <div class="mb"><div class="f2"><div><label>Celular de contacto</label><input class="mi" id="mc" placeholder="9XXXXXXXX" maxlength="9" value="${esc(p.cel)}"></div>
   <div><label>Correo (recibirá la invitación)</label><input class="mi" id="me" placeholder="contacto@empresa.com" value="${esc(p.email)}"></div></div></div>
   <div class="mf"><button class="mbtn" id="mcn">Cancelar</button><button class="mbtn p" id="mok">${ic('tick')}Guardar</button></div></div>`);
        $('#mx').onclick = $('#mcn').onclick = closeModal;
        $('#mc').oninput = e => e.target.value = e.target.value.replace(/\D/g, '');
        $('#mok').onclick = () => {
          const e = $('#me').value.trim(), c = $('#mc').value.trim();
          if (e && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) { $('#me').classList.add('bad'); return }
          if (c && !/^9\d{8}$/.test(c)) { $('#mc').classList.add('bad'); return }
          p.email = e; p.cel = c; closeModal(); toast('Contacto actualizado'); render()
        };
      }
      function openDiscard(p) {
        openModal(`<div class="modal" style="width:min(460px,100%)"><div class="mh"><h2>Descartar prospecto</h2><button class="xb" id="mx">${ic('x')}</button></div>
   <div class="mb"><p style="margin:6px 0;line-height:1.5;font-size:15px">Se quitará <b>${esc(p.razon)}</b> de la lista de prospectos. Esta acción no se puede deshacer.</p></div>
   <div class="mf"><button class="mbtn" id="mcn">Cancelar</button><button class="mbtn d" id="mok">Descartar</button></div></div>`);
        $('#mx').onclick = $('#mcn').onclick = closeModal;
        $('#mok').onclick = () => { const i = PROS.findIndex(x => x.ruc === p.ruc); if (i !== -1) PROS.splice(i, 1); closeModal(); toast('Prospecto descartado'); go('prospectos') };
      }

      /* ============ Render ============ */
      function vLogin() {
        return `
    <div style="display:flex; height:100vh; width:100%; position:fixed; top:0; left:0; z-index:9999; overflow:hidden; background:linear-gradient(135deg, #32537d, #1a2f4c);">
      
      <!-- Lado Izquierdo: Imagen y Logo expandidos en el fondo -->
      <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; text-align:center;">
         <img src="image/icon-grupo-la-joya-bl.png" alt="Grupo La Joya" style="max-width:240px; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.2)); margin-bottom:30px;">
         <h1 style="margin:0; font-size:46px; font-weight:800; color:#fff; letter-spacing:-1px; text-shadow:0 2px 10px rgba(0,0,0,0.15);">GRUPO La Joya</h1>
         <p style="margin:10px 0 0; font-size:20px; color:#eff6ff; font-weight:600; text-transform:uppercase; letter-spacing:1.5px;">Portal de Proveedores</p>
      </div>
      
      <!-- Lado Derecho: Formulario de Login flotante -->
      <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:20px;">
        <div style="width:420px; background:var(--card); display:flex; flex-direction:column; padding:50px; border-radius:24px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.4);">
           <div style="margin-bottom:40px;">
              <h2 style="margin:0; font-size:28px; color:var(--ink); font-weight:700;">Iniciar Sesión</h2>
              <p style="margin:8px 0 0; color:var(--mut); font-size:15px;">Bienvenido al portal de proveedores</p>
           </div>
           
           <div style="margin-bottom:20px">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink);font-size:14px">${ic('users')} Seleccione el Perfil (Demo)</label>
              <select id="loginRole" class="inp" style="width:100%;padding:14px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:15px;color:var(--ink);">
                 <option value="Proveedor">Proveedor (Externo)</option>
                 <option value="Aprobador">Aprobador de Proveedores</option>
                 <option value="Comprador">Comprador</option>
                 <option value="Compliance">Compliance</option>
                 <option value="Contable">Contabilidad</option>
                 <option value="Finanzas">Finanzas</option>
              </select>
           </div>
           
           <div style="margin-bottom:30px">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink);font-size:14px">${ic('lock')} Contraseña</label>
              <input type="password" value="******" disabled class="inp" style="width:100%;opacity:0.6;cursor:not-allowed;padding:14px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--ink);" title="La contraseña se autocompleta en esta demo">
           </div>

           <button class="btn p" id="btnLogin" style="width:100%;justify-content:center;font-size:16px;font-weight:600;padding:14px 20px;border-radius:8px;">${ic('send')} Ingresar al Portal</button>

           <div style="margin-top:20px;text-align:center;position:relative">
              <hr style="border:0;border-top:1px solid var(--line);position:absolute;top:50%;width:100%;z-index:1"><span style="background:var(--card);padding:0 10px;color:var(--mut);font-size:14px;position:relative;z-index:2">¿Eres un proveedor nuevo?</span>
           </div>
           <button class="btn" id="btnRegister" style="width:100%;justify-content:center;font-size:16px;font-weight:600;padding:14px 20px;border-radius:8px;margin-top:20px;background:var(--bg);border:1px solid var(--border);color:var(--ink);">${ic('uplus')} Registrarse</button>

           <div style="margin-top:40px; text-align:center; font-size:12px; color:#94a3b8;">
              © 2026 La Joya Mining Group.<br>Todos los derechos reservados.
           </div>
        </div>
      </div>
    </div>
  `;
      }

      function bindLogin() {
        const btnReg = $('#btnRegister');
        if (btnReg) btnReg.onclick = () => { S.registering = true; S.ruc = { q: '', res: null, err: '', nd: false }; render(); };
        const b = $('#btnLogin');
        if (b) b.onclick = () => {
          const role = $('#loginRole').value;
          S.logged = true;
          S.userRole = role;

          if (role === 'Proveedor') {
            S.route = 'prospecto';
            S.sel = '20539627938';
          }
          else if (role === 'Contable' || role === 'Finanzas') S.route = 'fac';
          else S.route = 'prospectos';

          $('#topUserName').textContent = role === 'Proveedor' ? 'Prov. Lumar EIRL' : 'Usuario LJM';
          $('#topUserRole').textContent = role;
          $('#topUserInitials').textContent = role.substring(0, 2).toUpperCase();

          render();
          toast(`Sesión iniciada como ${role}`);
        };
      }

      function vRegisterRuc() {
        const r = S.ruc, res = r.res, nd = r.nd;
        return `
    <div style="display:flex; height:100vh; width:100%; position:fixed; top:0; left:0; z-index:9999; overflow:hidden; background:linear-gradient(135deg, #32537d, #1a2f4c);">
      <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; text-align:center;">
         <img src="image/icon-grupo-la-joya-bl.png" alt="Grupo La Joya" style="max-width:240px; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.2)); margin-bottom:30px;">
         <h1 style="margin:0; font-size:46px; font-weight:800; color:#fff; letter-spacing:-1px; text-shadow:0 2px 10px rgba(0,0,0,0.15);">GRUPO La Joya</h1>
      </div>
      <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:20px; overflow-y:auto;">
        <div style="width:500px; background:var(--card); display:flex; flex-direction:column; padding:40px; border-radius:24px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.4);">
           <div style="margin-bottom:30px; display:flex; align-items:center; gap:10px;">
              <button class="ibtn" id="btnBackLogin" style="background:var(--bg);border-radius:50%;padding:8px;" title="Volver">${ic('back')}</button>
              <div>
                <h2 style="margin:0; font-size:24px; color:var(--ink); font-weight:700;">Registro de Proveedor</h2>
                <p style="margin:4px 0 0; color:var(--mut); font-size:14px;">Valida tu RUC para continuar</p>
              </div>
           </div>
           
           <div style="margin-bottom:20px">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink);font-size:14px">RUC o ID</label>
              <input class="inp" id="rrq" value="${esc(r.q)}" maxlength="11" autocomplete="off" style="width:100%;padding:14px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--ink);font-size:15px;" ${nd ? 'placeholder="Ingrese ID o Nombre (Opcional)"' : 'inputmode="numeric"'}>
           </div>

           <div style="margin-bottom:20px">
              <label style="display:flex;align-items:center;gap:8px;font-size:15px;cursor:pointer;color:var(--ink);font-weight:500;"><input type="checkbox" id="rrnd" ${nd ? 'checked' : ''} style="width:18px;height:18px"> Proveedor No Domiciliado (Extranjero) <span class="badge b-info">NUEVO</span></label>
           </div>
           
           ${r.err ? `<div class="err" style="margin-bottom:20px">${esc(r.err)}</div>` : ''}

           <button class="btn p" id="btnRegRuc" style="width:100%;justify-content:center;font-size:16px;font-weight:600;padding:14px 20px;border-radius:8px;margin-bottom:20px;">${ic('search')} ${nd ? 'Continuar registro' : 'Validar RUC'}</button>

           ${!nd && res ? `
           <div style="background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:20px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><h3 style="margin:0;font-size:15px;display:flex;align-items:center;gap:6px;color:var(--ink);">${ic('bld',18)} SUNAT</h3><span class="badge b-ok">Encontrado</span></div>
              <div style="font-size:13px;color:var(--mut);margin-bottom:8px;"><b>Razón social:</b> ${esc(res.razon)}</div>
              <div style="font-size:13px;color:var(--mut);margin-bottom:8px;display:flex;gap:12px;"><span><b>Estado:</b> ${badgeSt(res.estado)}</span><span><b>Condición:</b> ${badgeSt(res.cond)}</span></div>
              ${res.estado === 'ACTIVO' && res.cond === 'HABIDO' ? 
                `<button class="btn p" id="btnContinueReg" style="width:100%;justify-content:center;margin-top:12px;background:#0ea5e9;border-color:#0ea5e9;">${ic('check')} RUC Válido - Crear Usuario</button>` : 
                `<div class="err" style="margin-top:12px;font-size:13px;text-align:center;">El RUC debe estar ACTIVO y HABIDO para continuar.</div>`}
           </div>
           ` : ''}
        </div>
      </div>
    </div>
        `;
      }

      function bindRegisterRuc() {
        $('#btnBackLogin').onclick = () => { S.registering = false; S.ruc = { q: '', res: null, err: '', nd: false }; render(); };
        const q = $('#rrq'), nd = $('#rrnd');
        
        const doit = () => {
          const v = q.value.trim(); S.ruc.q = v; S.ruc.nd = nd.checked;
          if (nd.checked) {
            S.ruc.err = ''; S.ruc.res = null;
            S.registering = false; S.creatingUser = true; render();
            return;
          }
          if (!/^(10|20)\d{9}$/.test(v)) { S.ruc.err = 'El RUC debe tener 11 dígitos y empezar con 10 o 20.'; S.ruc.res = null; render(); return }
          const res = lookup(v);
          if (!res) { S.ruc.err = 'No se encontró el RUC en la base de demostración.'; S.ruc.res = null }
          else { S.ruc.err = ''; S.ruc.res = res }
          render();
        };

        nd.onchange = () => { S.ruc.nd = nd.checked; S.ruc.err = ''; render(); };
        if (!S.ruc.nd) q.oninput = () => { q.value = q.value.replace(/\\D/g, '') };
        q.onkeydown = e => { if (e.key === 'Enter') doit() };
        $('#btnRegRuc').onclick = doit;
        
        const btnCont = $('#btnContinueReg');
        if (btnCont) {
          btnCont.onclick = () => { S.registering = false; S.creatingUser = true; render(); };
        }
      }

      function vCreateUser() {
        const f = S.cuForm || { u:'', e:'', e2:'', p:'', p2:'' };
        return `
    <div style="display:flex; min-height:100vh; width:100%; position:absolute; top:0; left:0; z-index:9999; background:linear-gradient(135deg, #32537d, #1a2f4c); padding:40px 20px; overflow-y:auto; justify-content:center;">
      <div style="width:100%; max-width:480px; display:flex; flex-direction:column; align-items:center;">
         <div style="text-align:center; margin-bottom:30px;">
            <img src="image/icon-grupo-la-joya-bl.png" alt="Grupo La Joya" style="max-width:180px; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.2)); margin-bottom:15px;">
            <h1 style="margin:0; font-size:32px; font-weight:800; color:#fff; letter-spacing:-1px; text-shadow:0 2px 10px rgba(0,0,0,0.15);">GRUPO La Joya</h1>
         </div>
         <div style="width:100%; background:var(--card); display:flex; flex-direction:column; padding:40px; border-radius:24px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.4);">
           <div style="margin-bottom:30px; display:flex; align-items:center; gap:10px;">
              <button class="ibtn" id="btnBackReg" style="background:var(--bg);border-radius:50%;padding:8px;" title="Volver">${ic('back')}</button>
              <div>
                <h2 style="margin:0; font-size:24px; color:var(--ink); font-weight:700;">Crear Usuario</h2>
                <p style="margin:4px 0 0; color:var(--mut); font-size:14px;">Ingresa tus datos de acceso</p>
              </div>
           </div>
           
           ${S.cuErr ? `<div class="err" style="margin-bottom:16px">${esc(S.cuErr)}</div>` : ''}

           <div style="margin-bottom:16px">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink);font-size:14px">Usuario *</label>
              <input type="text" class="inp" id="cuUser" value="${esc(f.u)}" placeholder="Nombre de usuario" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--ink);font-size:15px;">
           </div>

           <div style="margin-bottom:16px">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink);font-size:14px">Correo Electrónico *</label>
              <input type="email" class="inp" id="cuEmail" value="${esc(f.e)}" placeholder="correo@empresa.com" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--ink);font-size:15px;">
           </div>

           <div style="margin-bottom:16px">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink);font-size:14px">Confirmar Correo Electrónico *</label>
              <input type="email" class="inp" id="cuEmail2" value="${esc(f.e2)}" placeholder="correo@empresa.com" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--ink);font-size:15px;">
           </div>

           <div style="margin-bottom:16px">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink);font-size:14px">Contraseña *</label>
              <input type="password" class="inp" id="cuPass" value="${esc(f.p)}" placeholder="Crea una contraseña" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--ink);font-size:15px;">
           </div>

           <div style="margin-bottom:30px">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink);font-size:14px">Confirmar Contraseña *</label>
              <input type="password" class="inp" id="cuPass2" value="${esc(f.p2)}" placeholder="Repite tu contraseña" style="width:100%;padding:12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--ink);font-size:15px;">
           </div>

           <button class="btn p" id="btnNextReg" style="width:100%;justify-content:center;font-size:16px;font-weight:600;padding:14px 20px;border-radius:8px;">${ic('check')} Siguiente</button>
        </div>
      </div>
    </div>
        `;
      }

      function bindCreateUser() {
        $('#btnBackReg').onclick = () => { S.creatingUser = false; S.registering = true; S.cuErr = ''; render(); };
        $('#btnNextReg').onclick = () => {
          const u = $('#cuUser').value.trim();
          const e = $('#cuEmail').value.trim();
          const e2 = $('#cuEmail2').value.trim();
          const p = $('#cuPass').value;
          const p2 = $('#cuPass2').value;
          
          S.cuForm = { u, e, e2, p, p2 };

          if(!u || !e || !e2 || !p || !p2) { S.cuErr = 'Completa todos los campos'; render(); return; }
          if(e !== e2) { S.cuErr = 'Los correos electrónicos no coinciden'; S.cuForm.e2 = ''; render(); return; }
          if(p !== p2) { S.cuErr = 'Las contraseñas no coinciden'; S.cuForm.p = ''; S.cuForm.p2 = ''; render(); return; }
          
          S.cuErr = '';
          S.newUserEmail = e;
          S.newUserName = u;
          S.creatingUser = false;
          S.registeringInfo = true;
          render();
        };
      }

      const CAT_TXT = `REPUESTOS	002001	REPUESTOS DE CHANCADO
REPUESTOS	002002	REPUESTOS DE MOLIENDA
REPUESTOS	002003	REPUESTOS DE BOMBEO
REPUESTOS	002004	REPUESTOS DE FAJAS TRANSPORTADORAS
REPUESTOS	002005	REPUESTOS DE ZARANDAS Y CLASIFICACIÓN
REPUESTOS	002006	REPUESTOS DE LIXIVIACIÓN Y ADSORCIÓN
REPUESTOS	002007	REPUESTOS DE RECUPERACIÓN METALÚRGICA
REPUESTOS	002008	REPUESTOS DE TRATAMIENTO DE AGUA Y EFLUENTES
REPUESTOS	002009	REPUESTOS DE AIRE, VENTILACIÓN Y COMPRESIÓN
REPUESTOS	002010	REPUESTOS DE PERFORACIÓN Y SOSTENIMIENTO
REPUESTOS	002011	REPUESTOS DE VEHÍCULOS Y MAQUINARIA PESADA
REPUESTOS	002012	REPUESTOS DE IZAJE Y MANIPULACIÓN
REPUESTOS	002013	REPUESTOS DE EQUIPOS DE LABORATORIO
REPUESTOS	002014	REPUESTOS DE EQUIPOS DE SOLDADURA Y CORTE
REPUESTOS	002015	REPUESTOS DE EQUIPOS DE MANTENIMIENTO
REPUESTOS	002016	RODAMIENTOS Y CHUMACERAS
REPUESTOS	002017	SELLOS, RETENES Y EMPAQUETADURAS
REPUESTOS	002018	ELEMENTOS DE TRANSMISIÓN
REPUESTOS	002019	COMPONENTES MECÁNICOS DE PRECISIÓN
REPUESTOS	002020	FILTROS
REPUESTOS	002021	NEUMATICOS
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003001	FIJACIONES Y ELEMENTOS DE SUJECIÓN
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003002	CERRAJERÍA Y ACCESORIOS
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003003	ALAMBRES Y CABLES DE SUJECIÓN
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003004	HERRAMIENTAS MANUALES
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003005	MATERIALES DE CONSTRUCCIÓN CIVIL
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003006	MATERIALES DE RELLENO Y MOVIMIENTO DE TIERRA
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003007	MADERAS PARA CONSTRUCCIÓN Y ENCOFRADO
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003008	PINTURAS Y RECUBRIMIENTOS
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003009	ADHESIVOS, SELLADORES Y MASILLAS
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003010	CINTAS TÉCNICAS Y MATERIALES DE SELLADO
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003011	MATERIALES Y ACCESORIOS DE GASFITERÍA
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003012	MATERIALES Y ACCESORIOS PARA INSTALACIONES ELÉCTRICAS
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003013	QUÍMICOS AUXILIARES DE MANTENIMIENTO
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003014	ACCESORIOS E IMPLEMENTOS DE LIMPIEZA
FERRETERÍA, CONSTRUCCIÓN Y LIMPIEZA	003015	MATERIALES DE PROTECCIÓN Y COBERTURA
SISTEMA DE CONDUCCIÓN DE FLUIDOS	004001	TUBERÍAS METÁLICAS
SISTEMA DE CONDUCCIÓN DE FLUIDOS	004002	TUBERÍAS PLÁSTICAS
SISTEMA DE CONDUCCIÓN DE FLUIDOS	004003	MANGUERAS INDUSTRIALES
SISTEMA DE CONDUCCIÓN DE FLUIDOS	004004	CONEXIONES Y ACCESORIOS DE TUBERÍAS
SISTEMA DE CONDUCCIÓN DE FLUIDOS	004005	VÁLVULAS
MATERIALES METÁLICOS Y POLIMÉRICOS	005001	ACEROS AL CARBONO Y ALEADOS
MATERIALES METÁLICOS Y POLIMÉRICOS	005002	ACEROS INOXIDABLES
MATERIALES METÁLICOS Y POLIMÉRICOS	005003	METALES NO FERROSOS
MATERIALES METÁLICOS Y POLIMÉRICOS	005004	MATERIALES COMPUESTOS Y FIBROSOS
MATERIALES METÁLICOS Y POLIMÉRICOS	005005	PLÁSTICOS TÉCNICOS
MATERIALES METÁLICOS Y POLIMÉRICOS	005006	MATERIALES DE CAUCHO
SOLDADURA Y CORTE	006001	ELECTRODOS DE SOLDADURA
SOLDADURA Y CORTE	006002	MATERIALES DE APORTE Y FUNDENTES
SOLDADURA Y CORTE	006003	CONSUMIBLES DE CORTE
SOLDADURA Y CORTE	006004	ACCESORIOS Y CONSUMIBLES DE SOLDADURA
SOLDADURA Y CORTE	006005	MATERIALES DE PROTECCIÓN PARA SOLDADURA
SOLDADURA Y CORTE	006006	CONSUMIBLES DE CALENTAMIENTO
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007001	REACTIVOS DE PROCESAMIENTO METALÚRGICO
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007002	REACTIVOS Y QUÍMICOS DE LABORATORIO
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007003	FLOCULANTES Y COAGULANTES
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007004	QUÍMICOS PARA TRATAMIENTO DE AGUA
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007005	QUÍMICOS INDUSTRIALES
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007006	ANTIESPUMANTES Y AUXILIARES DE PROCESO
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007007	CONSUMIBLES DE PROCESO
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007008	CIANURO DE SODIO
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007009	SODA CÁUSTICA
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007010	CARBÓN ACTIVADO
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007011	FUNDENTE
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007012	ALCOHOL INDUSTRIAL
QUÍMICOS, REACTIVOS Y CONSUMIBLES DE PROCESO	007013	LANA DE ACERO
MEDIOS DE MOLIENDA	008001	BOLAS DE MOLIENDA
GASES, LUBRICANTES Y ENERGÉTICOS	009001	GASES INDUSTRIALES
GASES, LUBRICANTES Y ENERGÉTICOS	009002	GASES COMBUSTIBLES
GASES, LUBRICANTES Y ENERGÉTICOS	009003	ACEITES LUBRICANTES
GASES, LUBRICANTES Y ENERGÉTICOS	009004	GRASAS LUBRICANTES
GASES, LUBRICANTES Y ENERGÉTICOS	009005	REFRIGERANTES Y LUBRICANTES ESPECIALES
GASES, LUBRICANTES Y ENERGÉTICOS	009006	COMBUSTIBLES LÍQUIDOS
GASES, LUBRICANTES Y ENERGÉTICOS	009007	COMBUSTIBLES SÓLIDOS Y ENERGÉTICOS
LABORATORIO	010001	MATERIAL DE VIDRIO DE LABORATORIO
LABORATORIO	010002	MATERIAL PLÁSTICO DE LABORATORIO
LABORATORIO	010003	MATERIAL DE MUESTREO
LABORATORIO	010004	CONSUMIBLES DE FILTRACIÓN Y SEPARACIÓN
LABORATORIO	010005	MATERIAL PARA PREPARACIÓN Y MANIPULACIÓN DE MUESTRAS
LABORATORIO	010006	CONSUMIBLES PARA ENSAYOS Y ANÁLISIS
LABORATORIO	010007	MATERIAL DE LIMPIEZA DE LABORATORIO
EQUIPOS E IMPLEMENTOS DE SEGURIDAD	011001	EQUIPOS DE PROTECCIÓN PERSONAL
EQUIPOS E IMPLEMENTOS DE SEGURIDAD	011002	ROPA DE TRABAJO Y PROTECCIÓN
EQUIPOS E IMPLEMENTOS DE SEGURIDAD	011003	PROTECCIÓN COLECTIVA Y SEÑALIZACIÓN
EQUIPOS E IMPLEMENTOS DE SEGURIDAD	011004	SEGURIDAD CONTRA INCENDIOS
EQUIPOS E IMPLEMENTOS DE SEGURIDAD	011005	INSUMOS MÉDICOS, MEDICAMENTOS Y PRIMEROS AUXILIOS
EQUIPOS E IMPLEMENTOS DE SEGURIDAD	011006	CONTROL DE DERRAMES Y EMERGENCIAS AMBIENTALES
EQUIPOS E IMPLEMENTOS DE SEGURIDAD	011007	GESTIÓN DE RESIDUOS
EQUIPOS E IMPLEMENTOS DE SEGURIDAD	011008	MONITOREO AMBIENTAL Y OCUPACIONAL
EQUIPOS E IMPLEMENTOS DE SEGURIDAD	011009	ACCESORIOS PARA TRABAJOS EN ALTURA
EQUIPOS E IMPLEMENTOS DE SEGURIDAD	011010	CONTROL DE TRÁNSITO Y SEGURIDAD VIAL
EQUIPOS E IMPLEMENTOS DE SEGURIDAD	011011	CONTROL DE FAUNA Y VECTORES
UTILES DE ESCRITORIO Y OFIMÁTICA	012001	ÚTILES Y SUMINISTROS DE OFICINA
UTILES DE ESCRITORIO Y OFIMÁTICA	012002	PAPEL Y MATERIALES DE IMPRESIÓN
UTILES DE ESCRITORIO Y OFIMÁTICA	012003	CONSUMIBLES DE IMPRESIÓN
UTILES DE ESCRITORIO Y OFIMÁTICA	012004	ACCESORIOS Y PERIFÉRICOS INFORMÁTICOS
UTILES DE ESCRITORIO Y OFIMÁTICA	012005	ALMACENAMIENTO Y MEDIOS INFORMÁTICOS
UTILES DE ESCRITORIO Y OFIMÁTICA	012006	MATERIALES Y ACCESORIOS DE REDES
UTILES DE ESCRITORIO Y OFIMÁTICA	012007	ACCESORIOS PARA EQUIPOS DE COMUNICACIÓN
UTILES DE ESCRITORIO Y OFIMÁTICA	012008	CONSUMIBLES DE IDENTIFICACIÓN Y CONTROL
UTILES DE ESCRITORIO Y OFIMÁTICA	012009	FORMATOS IMPRESOS
ENVASES, EMBALAJES Y ALMACENAMIENTO	013001	ENVASES PLÁSTICOS
ENVASES, EMBALAJES Y ALMACENAMIENTO	013002	ENVASES METÁLICOS
ENVASES, EMBALAJES Y ALMACENAMIENTO	013003	ENVASES DE VIDRIO
ENVASES, EMBALAJES Y ALMACENAMIENTO	013004	SACOS, BOLSAS Y BIG BAGS
ENVASES, EMBALAJES Y ALMACENAMIENTO	013005	EMBALAJES DE MADERA
ENVASES, EMBALAJES Y ALMACENAMIENTO	013006	MATERIALES DE EMBALAJE Y ASEGURAMIENTO DE CARGA
ENVASES, EMBALAJES Y ALMACENAMIENTO	013007	ELEMENTOS DE IDENTIFICACIÓN Y ROTULADO DE EMBALAJES
ENVASES, EMBALAJES Y ALMACENAMIENTO	013008	CAJAS, GAVETAS Y CONTENEDORES DE ALMACENAMIENTO
MINERÍA SUBTERRÁNEA	014001	PERFORACIÓN Y ACCESORIOS
MINERÍA SUBTERRÁNEA	014002	EXPLOSIVOS Y ACCESORIOS DE VOLADURA
MINERÍA SUBTERRÁNEA	014003	MATERIALES DE SOSTENIMIENTO
MINERÍA SUBTERRÁNEA	014004	CONCRETO Y MORTEROS PARA SOSTENIMIENTO
MINERÍA SUBTERRÁNEA	014005	MATERIALES Y ACCESORIOS DE VENTILACIÓN
GEOLOGÍA Y EXPLORACIÓN	015001	MUESTREO GEOLÓGICO
GEOLOGÍA Y EXPLORACIÓN	015002	PERFORACIÓN DE EXPLORACIÓN
GEOLOGÍA Y EXPLORACIÓN	015003	TESTIGOS Y ALMACENAMIENTO GEOLÓGICO
GEOLOGÍA Y EXPLORACIÓN	015004	CARTOGRAFÍA Y LEVANTAMIENTO GEOLÓGICO
GEOLOGÍA Y EXPLORACIÓN	015005	ACCESORIOS Y CONSUMIBLES DE EXPLORACIÓN
GEOLOGÍA Y EXPLORACIÓN	015006	MATERIALES PARA PERFORACIÓN Y MUESTREO
IZAJE Y MANIOBRAS	016001	ESLINGAS Y ACCESORIOS DE IZAJE
IZAJE Y MANIOBRAS	016002	CABLES Y COMPONENTES DE IZAJE
IZAJE Y MANIOBRAS	016003	POLEAS, PASTECAS Y APAREJOS
IZAJE Y MANIOBRAS	016004	ELEMENTOS DE SUJECIÓN Y AMARRE DE CARGA
IZAJE Y MANIOBRAS	016005	ACCESORIOS PARA MANIOBRAS DE CARGA
IZAJE Y MANIOBRAS	016006	ELEMENTOS DE PROTECCIÓN PARA IZAJE
VÍVERES	018001	ALIMENTOS COMESTIBLES
VÍVERES	018002	ALIMENTOS BEBIBLES
VÍVERES	018003	CANASTAS
ENSERES Y MENAJE	019002	ENSERES
ENSERES Y MENAJE	019003	MENAJE
MATERÍAS PRIMAS	020001	MATERÍAS PRIMAS
ELECTRICIDAD E INSTRUMENTACIÓN	024001	CANALIZACIÓN Y ACCESORIOS DE INSTALACIÓN
ELECTRICIDAD E INSTRUMENTACIÓN	024002	EQUIPOS DE MANIOBRA, FUERZA Y PROTECCIÓN
ELECTRICIDAD E INSTRUMENTACIÓN	024003	CABLES Y CONDUCTORES ESPECIALES
ELECTRICIDAD E INSTRUMENTACIÓN	024004	INSTRUMENTACIÓN, CONTROL Y MEDICIÓN
ELECTRICIDAD E INSTRUMENTACIÓN	024005	ILUMINACIÓN INDUSTRIAL
ELECTRICIDAD E INSTRUMENTACIÓN	024006	POTENCIA, RESPALDO Y MOTORES`.split('\n').filter(Boolean).map(l=>{const p=l.split('\t');return `${p[0]} - ${p[2]}`});

      function vRegisterInfo() {
        const nd = S.ruc.nd;
        const f = S.riForm || {};
        return `
    <div style="display:flex; height:100vh; width:100%; position:absolute; top:0; left:0; z-index:9999; background:linear-gradient(135deg, #32537d, #1a2f4c); padding:40px 20px; overflow-y:auto; overflow-x:hidden; justify-content:center; align-items:flex-start;">
      <div style="width:100%; max-width:1200px; display:flex; flex-direction:column;">
         <div style="width:100%; background:var(--card); display:flex; flex-direction:column; padding:40px; border-radius:24px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.4);">
           <div style="margin-bottom:30px; display:flex; align-items:center; gap:10px;">
              <button class="ibtn" id="btnBackInfo" style="background:var(--bg);border-radius:50%;padding:8px;" title="Volver">${ic('back')}</button>
              <div>
                <h2 style="margin:0; font-size:24px; color:var(--ink); font-weight:700;">Registro de Información</h2>
                <p style="margin:4px 0 0; color:var(--mut); font-size:14px;">Completa tu perfil para enviar la solicitud</p>
              </div>
           </div>

           ${S.riErr ? `<div class="err" style="margin-bottom:16px">${esc(S.riErr)}</div>` : ''}
           
           <!-- CONTACTOS (Ancho completo) -->
           <div style="margin-bottom:32px;">
             <!-- CONTACTOS COMERCIALES -->
             <h3 style="margin:0 0 16px; font-size:16px; color:var(--ink); border-bottom:1px solid var(--border); padding-bottom:8px;">1. Contacto Comercial (Asesor, Jefe o de Operaciones)</h3>
             <div class="contact-container" style="margin-bottom:24px;">
               <div class="contact-row" style="display:flex; gap:12px; align-items:flex-end; margin-bottom:12px; flex-wrap:wrap;">
                  <div style="flex:2; min-width:200px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Nombres y Apellidos *</label>
                     <input type="text" class="inp" id="riComNom" value="${esc(f.comNom||'')}" placeholder="Ej. Juan Pérez" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:150px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Cargo *</label>
                     <input type="text" class="inp" placeholder="Ej. Asesor Comercial" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:120px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Celular *</label>
                     <input type="text" class="inp" id="riComCel" value="${esc(f.comCel||'')}" placeholder="Ej. 999 888 777" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:2; min-width:200px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Correo Electrónico *</label>
                     <input type="email" class="inp" id="riComMail" value="${esc(f.comMail||'')}" placeholder="correo@empresa.com" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div>
                     <button type="button" class="btn o" style="height:41px; padding:0 12px; font-weight:bold;" title="Agregar otro contacto" onclick="addContactRow(this)">${ic('plus',16)}</button>
                  </div>
               </div>
             </div>

             <!-- CONTACTOS CONTABLES -->
             <h3 style="margin:0 0 16px; font-size:16px; color:var(--ink); border-bottom:1px solid var(--border); padding-bottom:8px;">2. Contacto Contable (Contabilidad, finanzas)</h3>
             <div class="contact-container" style="margin-bottom:24px;">
               <div class="contact-row" style="display:flex; gap:12px; align-items:flex-end; margin-bottom:12px; flex-wrap:wrap;">
                  <div style="flex:2; min-width:200px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Nombres y Apellidos *</label>
                     <input type="text" class="inp" id="riConNom" value="${esc(f.conNom||'')}" placeholder="Ej. María Gómez" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:150px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Cargo *</label>
                     <input type="text" class="inp" placeholder="Ej. Contadora" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:120px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Celular *</label>
                     <input type="text" class="inp" id="riConCel" value="${esc(f.conCel||'')}" placeholder="Ej. 999 888 777" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:2; min-width:200px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Correo Electrónico *</label>
                     <input type="email" class="inp" id="riConMail" value="${esc(f.conMail||'')}" placeholder="correo@empresa.com" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div>
                     <button type="button" class="btn o" style="height:41px; padding:0 12px; font-weight:bold;" title="Agregar otro contacto" onclick="addContactRow(this)">${ic('plus',16)}</button>
                  </div>
               </div>
             </div>

             <!-- REPRESENTANTE LEGAL -->
             <h3 style="margin:0 0 16px; font-size:16px; color:var(--ink); border-bottom:1px solid var(--border); padding-bottom:8px;">3. Representante Legal</h3>
             <div class="contact-container" style="margin-bottom:24px;">
               <div class="contact-row" style="display:flex; gap:12px; align-items:flex-end; margin-bottom:12px; flex-wrap:wrap;">
                  <div style="flex:2; min-width:200px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Nombres y Apellidos *</label>
                     <input type="text" class="inp" placeholder="Ej. Carlos Mendoza" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:150px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Cargo *</label>
                     <input type="text" class="inp" placeholder="Ej. Gerente General" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:120px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Celular *</label>
                     <input type="text" class="inp" placeholder="Ej. 999 888 777" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:2; min-width:200px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Correo Electrónico *</label>
                     <input type="email" class="inp" placeholder="correo@empresa.com" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div>
                     <button type="button" class="btn o" style="height:41px; padding:0 12px; font-weight:bold;" title="Agregar representante" onclick="addContactRow(this)">${ic('plus',16)}</button>
                  </div>
               </div>
             </div>

             <!-- ACCIONISTA -->
             <h3 style="margin:0 0 16px; font-size:16px; color:var(--ink); border-bottom:1px solid var(--border); padding-bottom:8px;">4. Accionista mayor al 10%</h3>
             <div class="contact-container" style="margin-bottom:24px;">
               <div class="contact-row" style="display:flex; gap:12px; align-items:flex-end; margin-bottom:12px; flex-wrap:wrap;">
                  <div style="flex:2; min-width:200px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Nombres y Apellidos *</label>
                     <input type="text" class="inp" placeholder="Ej. Carlos Mendoza" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:150px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Cargo / Rol *</label>
                     <input type="text" class="inp" placeholder="Ej. Inversionista" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:120px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Celular *</label>
                     <input type="text" class="inp" placeholder="Ej. 999 888 777" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:2; min-width:200px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Correo Electrónico *</label>
                     <input type="email" class="inp" placeholder="correo@empresa.com" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div>
                     <button type="button" class="btn o" style="height:41px; padding:0 12px; font-weight:bold;" title="Agregar accionista" onclick="addContactRow(this)">${ic('plus',16)}</button>
                  </div>
               </div>
             </div>

             <!-- PROVEEDORES DEL PROVEEDOR -->
             <h3 style="margin:0 0 16px; font-size:16px; color:var(--ink); border-bottom:1px solid var(--border); padding-bottom:8px;">5. Principales Proveedores</h3>
             <div class="contact-container" style="margin-bottom:24px;">
               <div class="contact-row" style="display:flex; gap:12px; align-items:flex-end; margin-bottom:12px; flex-wrap:wrap;">
                  <div style="flex:2; min-width:180px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Razón Social *</label>
                     <input type="text" class="inp" placeholder="Ej. Distribuidora XYZ S.A.C." style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:120px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">RUC *</label>
                     <input type="text" class="inp" placeholder="Ej. 20123456789" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:2; min-width:180px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Contacto (Nombres y Apellidos)</label>
                     <input type="text" class="inp" placeholder="Ej. Luis Ramírez" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:120px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Celular</label>
                     <input type="text" class="inp" placeholder="Ej. 999 888 777" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:150px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Correo</label>
                     <input type="email" class="inp" placeholder="correo@proveedor.com" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div>
                     <button type="button" class="btn o" style="height:41px; padding:0 12px; font-weight:bold;" title="Agregar proveedor" onclick="addContactRow(this)">${ic('plus',16)}</button>
                  </div>
               </div>
             </div>

             <!-- CLIENTES -->
             <h3 style="margin:0 0 16px; font-size:16px; color:var(--ink); border-bottom:1px solid var(--border); padding-bottom:8px;">6. Principales Clientes</h3>
             <div class="contact-container" style="margin-bottom:24px;">
               <div class="contact-row" style="display:flex; gap:12px; align-items:flex-end; margin-bottom:12px; flex-wrap:wrap;">
                  <div style="flex:2; min-width:180px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Razón Social *</label>
                     <input type="text" class="inp" placeholder="Ej. Constructora ABC S.A." style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:120px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">RUC *</label>
                     <input type="text" class="inp" placeholder="Ej. 20987654321" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:2; min-width:180px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Contacto (Nombres y Apellidos)</label>
                     <input type="text" class="inp" placeholder="Ej. Ana Suárez" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:120px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Celular</label>
                     <input type="text" class="inp" placeholder="Ej. 999 888 777" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:150px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Correo</label>
                     <input type="email" class="inp" placeholder="correo@cliente.com" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div>
                     <button type="button" class="btn o" style="height:41px; padding:0 12px; font-weight:bold;" title="Agregar cliente" onclick="addContactRow(this)">${ic('plus',16)}</button>
                  </div>
               </div>
             </div>

             <!-- SUCURSALES -->
             <h3 style="margin:0 0 16px; font-size:16px; color:var(--ink); border-bottom:1px solid var(--border); padding-bottom:8px;">7. Sucursales</h3>
             <div class="contact-container" style="margin-bottom:24px;">
               <div class="contact-row" style="display:flex; gap:12px; align-items:flex-end; margin-bottom:12px; flex-wrap:wrap;">
                  <div style="flex:2; min-width:200px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Dirección *</label>
                     <input type="text" class="inp" placeholder="Ej. Av. Los Incas 123" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:120px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Distrito</label>
                     <input type="text" class="inp" placeholder="Ej. Miraflores" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:120px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Provincia</label>
                     <input type="text" class="inp" placeholder="Ej. Lima" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:120px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Departamento</label>
                     <input type="text" class="inp" placeholder="Ej. Lima" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div style="flex:1; min-width:120px;">
                     <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">País</label>
                     <input type="text" class="inp" placeholder="Ej. Perú" value="Perú" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                  </div>
                  <div>
                     <button type="button" class="btn o" style="height:41px; padding:0 12px; font-weight:bold;" title="Agregar sucursal" onclick="addContactRow(this)">${ic('plus',16)}</button>
                  </div>
               </div>
             </div>

           </div>

             <!-- CATEGORÍAS -->
             <div style="margin-bottom:32px;">
               <h3 style="margin:0 0 16px; font-size:16px; color:var(--ink); border-bottom:1px solid var(--border); padding-bottom:8px;">8. Categorías de Compra</h3>
               <div style="margin-bottom:24px; position:relative;">
                  <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Selecciona tu familia y sub familia principal *</label>
                  <input type="text" class="inp" id="riCat" value="${esc(f.cat||'')}" placeholder="Escribe para buscar o selecciona..." style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);" autocomplete="off">
                  <div id="riCatList" style="display:none; position:absolute; top:100%; left:0; width:100%; max-height:220px; overflow-y:auto; background:var(--card); border:1px solid var(--border); border-top:none; border-radius:0 0 8px 8px; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1); z-index:100;"></div>
               </div>
             </div>

             <!-- INFORMACIÓN BANCARIA -->
             <div style="margin-bottom:32px;">
               <h3 style="margin:0 0 16px; font-size:16px; color:var(--ink); border-bottom:1px solid var(--border); padding-bottom:8px;">9. Información Bancaria</h3>
               ${nd ? `
               <div class="contact-container" style="margin-bottom:24px;">
                 <div class="contact-row" style="display:flex; gap:12px; align-items:flex-end; margin-bottom:12px; flex-wrap:wrap;">
                    <div style="flex:2; min-width:150px;">
                       <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Banco Internacional *</label>
                       <input type="text" class="inp val-bank" placeholder="Ej. Bank of America" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                    </div>
                    <div style="flex:1; min-width:120px;">
                       <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Moneda *</label>
                       <select class="inp" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                          <option>USD</option><option>EUR</option>
                       </select>
                    </div>
                    <div style="flex:1; min-width:150px;">
                       <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Swift Code *</label>
                       <input type="text" class="inp" placeholder="Swift" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                    </div>
                    <div style="flex:2; min-width:180px; position:relative;">
                       <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Número de Cuenta *</label>
                       <input type="text" class="inp val-cta" oninput="validateBank(this)" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                       <span class="val-msg" style="position:absolute; right:10px; top:36px; font-size:12px; font-weight:bold;"></span>
                    </div>
                    <div style="flex:2; min-width:180px;">
                       <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Titular de la cuenta *</label>
                       <input type="text" class="inp" placeholder="Titular" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                    </div>
                    <div>
                       <button type="button" class="btn o" style="height:41px; padding:0 12px; font-weight:bold;" title="Agregar cuenta" onclick="addContactRow(this)">${ic('plus',16)}</button>
                    </div>
                 </div>
               </div>
               ` : `
               <div class="contact-container" style="margin-bottom:24px;">
                 <div class="contact-row" style="display:flex; gap:12px; align-items:flex-end; margin-bottom:12px; flex-wrap:wrap;">
                    <div style="flex:2; min-width:150px;">
                       <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Banco *</label>
                       <select class="inp val-bank" onchange="validateBank(this)" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                          <option value="BCP">BCP</option>
                          <option value="BBVA">BBVA</option>
                          <option value="Interbank">Interbank</option>
                          <option value="Scotiabank">Scotiabank</option>
                          <option value="Otros">Otros</option>
                       </select>
                    </div>
                    <div style="flex:1; min-width:120px;">
                       <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Tipo *</label>
                       <select class="inp val-tipo" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                          <option>Ahorros</option>
                          <option>Corriente</option>
                       </select>
                    </div>
                    <div style="flex:1; min-width:120px;">
                       <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Moneda *</label>
                       <select class="inp" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                          <option>Soles (PEN)</option>
                          <option>Dólares (USD)</option>
                       </select>
                    </div>
                    <div style="flex:2; min-width:150px; position:relative;">
                       <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Cuenta Bancaria *</label>
                       <input type="text" class="inp val-cta" oninput="validateBank(this)" placeholder="Ej. 194..." style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                       <span class="val-msg" style="position:absolute; right:10px; top:36px; font-size:12px; font-weight:bold;"></span>
                    </div>
                    <div style="flex:1; min-width:150px;">
                       <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">CCI *</label>
                       <input type="text" class="inp" placeholder="002..." style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                    </div>
                    <div style="flex:2; min-width:150px;">
                       <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--ink);font-size:13px">Titular *</label>
                       <input type="text" class="inp" placeholder="Titular de la cuenta" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg);font-size:14px;color:var(--ink);">
                    </div>
                    <div>
                       <button type="button" class="btn o" style="height:41px; padding:0 12px; font-weight:bold;" title="Agregar cuenta" onclick="addContactRow(this)">${ic('plus',16)}</button>
                    </div>
                 </div>
               </div>
               `}
             </div>

           <button class="btn p" id="btnFinishReg" style="width:100%;justify-content:center;font-size:16px;font-weight:600;padding:14px 20px;border-radius:8px;margin-top:10px;">${ic('send')} Finalizar y Enviar Registro</button>
         </div>
      </div>
    </div>
        `;
      }

      function bindRegisterInfo() {
        $('#btnBackInfo').onclick = () => { S.registeringInfo = false; S.creatingUser = true; S.riErr = ''; render(); };
        
        const inp = $('#riCat');
        const lst = $('#riCatList');
        function renderCat(q) {
            const query = norm(q);
            const filtered = CAT_TXT.filter(c => !query || norm(c).includes(query));
            if(filtered.length === 0) {
                lst.innerHTML = `<div style="padding:10px 12px; color:#64748b; font-size:13px;">No se encontraron categorías</div>`;
            } else {
                lst.innerHTML = filtered.map(c => `<div class="cat-opt" style="padding:10px 12px; cursor:pointer; font-size:13px; border-bottom:1px solid #f1f5f9; color:#334155;">${esc(c)}</div>`).join('');
                lst.querySelectorAll('.cat-opt').forEach(el => {
                    el.onclick = () => { inp.value = el.textContent; lst.style.display = 'none'; };
                    el.onmouseover = () => el.style.background = '#f8fafc';
                    el.onmouseout = () => el.style.background = 'transparent';
                });
            }
        }
        inp.onfocus = () => { lst.style.display = 'block'; renderCat(inp.value); };
        inp.oninput = () => { lst.style.display = 'block'; renderCat(inp.value); };
        inp.onclick = e => e.stopPropagation();
        lst.onclick = e => e.stopPropagation();

        $('#btnFinishReg').onclick = () => {
          const nd = S.ruc.nd;
          
          const r = {
            comNom: $('#riComNom').value.trim(), comCel: $('#riComCel').value.trim(), comMail: $('#riComMail').value.trim(),
            conNom: $('#riConNom').value.trim(), conCel: $('#riConCel').value.trim(), conMail: $('#riConMail').value.trim(),
            cat: $('#riCat').value, bank: $('#riBank').value.trim(), 
            swift: nd ? $('#riSwift').value.trim() : '',
            cta: $('#riCta').value.trim(), titular: $('#riTitular').value.trim(),
            tipoCta: nd ? '' : $('#riTipoCta').value,
            cci: nd ? '' : $('#riCCI').value.trim()
          };
          S.riForm = r;

          // Validar
          if(!r.comNom || !r.comCel || !r.comMail) { S.riErr = 'Complete todos los campos del contacto comercial'; render(); return; }
          if(!r.conNom || !r.conCel || !r.conMail) { S.riErr = 'Complete todos los campos del contacto contable'; render(); return; }
          if(!r.cat) { S.riErr = 'Seleccione una categoría de compra'; render(); return; }
          
          if(nd) {
            if(!r.bank || !r.swift || !r.cta || !r.titular) { S.riErr = 'Complete toda su información bancaria'; render(); return; }
          } else {
            if(!r.bank || !r.tipoCta || !r.cta || !r.cci || !r.titular) { S.riErr = 'Complete toda su información bancaria'; render(); return; }
          }

          S.riErr = '';
          toast('Registro completado exitosamente. Ahora puede iniciar sesión.');
          
          // Guardar prospecto
          const np = {
            ruc: S.ruc.q || ('ND-'+Math.floor(Date.now()/1000)), 
            razon: (S.ruc.res ? S.ruc.res.razon : 'Proveedor Nuevo '+S.ruc.q), 
            tipo: nd ? 'No Domiciliado' : 'Nacional', 
            rubro: r.cat, 
            cats: [r.cat], 
            estado: 'Registrado', 
            resp: r.comNom, 
            cel: r.comCel, 
            fecha: now(), 
            email: S.newUserEmail, 
            notas: []
          };
          if (!PROS.find(x => x.ruc === np.ruc)) PROS.unshift(np);

          S.registeringInfo = false;
          S.registering = false;
          S.creatingUser = false;
          S.ruc = { q: '', res: null, err: '', nd: false };
          S.cuForm = null;
          S.riForm = null;
          render();
        };
      }

      function render() {
        const v = $('#view');

        if (!S.logged) {
          $('#side').style.display = 'none';
          $('#top').style.display = 'none';
          document.body.style.background = '#0f172a';
          if (S.registeringInfo) {
             v.innerHTML = vRegisterInfo();
             bindRegisterInfo();
          } else if (S.creatingUser) {
             v.innerHTML = vCreateUser();
             bindCreateUser();
          } else if (S.registering) {
             v.innerHTML = vRegisterRuc();
             bindRegisterRuc();
          } else {
             v.innerHTML = vLogin();
             bindLogin();
          }
          return;
        }

        $('#side').style.display = 'flex';
        $('#top').style.display = 'flex';
        document.body.style.background = '';

        renderNav();
        v.className = S.route === 'prospecto' ? 'no-scroll' : '';
        const m = {
          login: [vLogin, bindLogin],
          ruc: [vRuc, bindRuc], prospectos: [vPros, bindPros], prospecto: [vPros1, bindPros1], bandeja: [vBandeja, bindBandeja],
          solicitudes: [vSolic, bindSolic], categorias: [vCats, () => { }],
          coti: [vCoti, bindCoti], cotiDet: [vCoti, bindCoti],
          cc: [vCC, bindCC], ccDet: [vCCDet, bindCCDet],
          oc: [vOC, bindOC], ocDet: [vOCDet, bindOCDet],
          fac: [vFac, bindFac], facDet: [vFacDet, bindFacDet],
          facPreItems: [vFacPreRegistroItems, bindFacPreRegistroItems],
          facPreDocs: [vFacPreRegistroDocs, bindFacPreRegistroDocs],
          plan: [() => { return `<div class="head"><h1>En construcción</h1></div>` }, () => { }]
        }[S.route] || [() => `<div class="head"><h1>Página no encontrada</h1><p>La ruta solicitada no existe.</p><button class="btn p" onclick="go('prospectos')">Volver al inicio</button></div>`, () => {}];
        v.innerHTML = m[0](); m[1]();
      }

      /* ============ Topbar ============ */
      $('#burger').innerHTML = ic('menu'); $('#sIc').innerHTML = ic('search', 20);
      $('#burger').onclick = () => $('#side').classList.toggle('hide');
      $('#coB').innerHTML = ic('bld') + '<span>LA JOYA COMERCIAL SAC</span>' + ic('down');
      $('#coB .i').classList.add('b');
      $('#coM').innerHTML = `<div>${ic('check')} LA JOYA COMERCIAL SAC</div><hr style="margin:5px 0;border:0;border-top:1px solid var(--line)"><div style="font-size:13px;color:var(--mut);padding:4px 12px">Rol: Administrador</div>`;
      $('#coB').onclick = e => { e.stopPropagation(); $('#coM').classList.toggle('on') };
      document.addEventListener('click', () => { $('#coM').classList.remove('on'); $('#sdd').classList.remove('on'); const l = $('#riCatList'); if(l) l.style.display='none'; });
      function setTheme(t) { document.documentElement.dataset.theme = t; $('#theme').innerHTML = ic(t === 'dark' ? 'sun' : 'moon') }
      setTheme('light');
      $('#theme').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
      const FEATS = [['ruc', 'Consulta RUC', 'search'], ['prospectos', 'Prospectos', 'users'], ['bandeja', 'Bandeja de revisión', 'inbox'], ['solicitudes', 'Solicitudes', 'msg'], ['categorias', 'Categorías de producto', 'tag']];
      function sdd() {
        const q = norm($('#sq').value.trim());
        const r = FEATS.filter(f => !q || norm(f[1]).includes(q));
        $('#sdd').innerHTML = r.length ? r.map(f => `<button data-f="${f[0]}">${ic(f[2])}${f[1]}</button>`).join('') : '<div class="em">Sin resultados.</div>';
        $('#sdd').classList.add('on');
        $('#sdd').querySelectorAll('[data-f]').forEach(b => b.onclick = () => { $('#sq').value = ''; $('#sdd').classList.remove('on'); go(b.dataset.f) });
      }
      $('#sq').oninput = sdd; $('#sq').onfocus = sdd; $('#sq').onclick = e => e.stopPropagation();
      $('#sdd').onclick = e => e.stopPropagation();
      if (innerWidth <= 900) $('#side').classList.add('hide');



      render();

      window.uploadedFiles = window.uploadedFiles || {};
      window.closeModalGlobal = closeModal; // exponer globalmente
      
      window.confirmUpload = function (ruc, cod, filename) {
        toast('Archivo subido: ' + filename);
        setDocState(ruc, cod, 'Por revisar');
        closeModalGlobal();
      };

      window.triggerUpload = function (ruc, cod, name) {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        input.onchange = e => {
          if (e.target.files && e.target.files.length > 0) {
            let file = e.target.files[0];
            let url = URL.createObjectURL(file);
            window.uploadedFiles[ruc + '_' + cod] = { url: url, name: file.name, type: file.type };
            
            // Open modal to confirm upload
            openModal(`
              <div class="card pc" style="width:90%;max-width:800px;height:85vh;display:flex;flex-direction:column;margin:4vh auto;padding:0;">
                <div class="hd" style="padding:16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
                  <h3 style="margin:0;">Previsualización de: ${esc(name)}</h3>
                  <button class="ibtn" onclick="window.closeModalGlobal()">${ic('x')}</button>
                </div>
                <div style="flex:1;background:#f5f5f5;padding:10px;">
                  <iframe src="${url}" style="width:100%;height:100%;border:none;"></iframe>
                </div>
                <div style="padding:16px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px;">
                  <button class="btn o" onclick="window.closeModalGlobal()">Cancelar</button>
                  <button class="btn p" onclick="window.confirmUpload('${ruc}', '${cod}', '${esc(file.name)}')">Confirmar subir documento</button>
                </div>
              </div>
            `);
          }
        };
        input.click();
      };

      window.confirmFacUpload = function (docName, btnId) {
        toast('Documento subido: ' + docName);
        const btn = document.getElementById(btnId);
        if(btn) {
          if (btn.classList.contains('ui-dropzone')) {
            btn.classList.add('filled');
            const fileObj = window.uploadedFiles && window.uploadedFiles['temp_' + docName];
            if(fileObj) {
              const fNameEl = btn.querySelector('.ui-dz-file-name');
              const fMetaEl = btn.querySelector('.ui-dz-file-meta');
              if(fNameEl) fNameEl.textContent = fileObj.name;
              if(fMetaEl) fMetaEl.textContent = (fileObj.size ? Math.round(fileObj.size/1024) + ' KB' : 'Cargado correctamente');
            }
            if(window._facValidateDocs) window._facValidateDocs();
          } else {
            btn.style.borderColor = '#10b981';
            btn.style.color = '#10b981';
            btn.innerHTML = btn.innerHTML.replace('Subiendo', 'Adjuntado').replace('Adjuntar', 'Adjuntado');
          }
        }
        closeModalGlobal();
      };

      window.triggerFacUpload = function (btnId, name) {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.xml,application/pdf,text/xml';
        input.onchange = e => {
          if (e.target.files && e.target.files.length > 0) {
            let file = e.target.files[0];
            let url = URL.createObjectURL(file);
            window.uploadedFiles = window.uploadedFiles || {};
            window.uploadedFiles['temp_' + name] = { url: url, name: file.name, type: file.type, size: file.size };
            
            openModal(`
              <div class="card pc" style="width:90%;max-width:800px;height:85vh;display:flex;flex-direction:column;margin:4vh auto;padding:0;">
                <div class="hd" style="padding:16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
                  <h3 style="margin:0;">Previsualización de Facturación: ${esc(name)}</h3>
                  <button class="ibtn" onclick="window.closeModalGlobal()">${ic('x')}</button>
                </div>
                <div style="flex:1;background:#f5f5f5;padding:10px;">
                  <iframe src="${url}" style="width:100%;height:100%;border:none;"></iframe>
                </div>
                <div style="padding:16px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px;">
                  <button class="btn o" onclick="window.closeModalGlobal()">Cancelar</button>
                  <button class="btn p" onclick="window.confirmFacUpload('${esc(name)}', '${btnId}')">Confirmar Adjuntar</button>
                </div>
              </div>
            `);
          }
        };
        input.click();
      };


      window.viewDocument = function (ruc, cod, name) {
        let fd = window.uploadedFiles[ruc + '_' + cod];
        let url = fd && fd.url ? fd.url : 'data:text/html;charset=utf-8,' + encodeURIComponent(`
          <div style="font-family:sans-serif;padding:40px;text-align:center;color:#475569;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;">
            <h1 style="color:#0ea5e9;margin:0 0 10px 0;">📄 Documento de Demostración</h1>
            <p style="font-size:18px;margin:0 0 20px 0;color:#1e293b;"><b>${name}</b></p>
            <p style="margin:0 0 30px 0;">Este es un documento simulado para la validación (Demo).</p>
            <div style="width:80%;height:300px;padding:20px;border:2px dashed #cbd5e1;background:#f8fafc;border-radius:12px;display:flex;align-items:center;justify-content:center;">
              [ Contenido del documento legible ]
            </div>
          </div>
        `);
        
        openModal(`
          <div class="card pc" style="width:90%;max-width:800px;height:85vh;display:flex;flex-direction:column;margin:4vh auto;padding:0;background:var(--card);">
            <div class="hd" style="padding:16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
              <h3 style="margin:0;color:var(--ink);display:flex;align-items:center;gap:8px;">${ic('eye')} Visualizando: ${esc(name)}</h3>
              <button class="ibtn" onclick="window.closeModalGlobal()">${ic('x')}</button>
            </div>
            <div style="flex:1;background:var(--bg);padding:20px;">
              <iframe src="${url}" style="width:100%;height:100%;border:1px solid var(--border);background:#fff;border-radius:12px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.1);"></iframe>
            </div>
          </div>
        `);
      };

      window.viewFicha = function (ruc) {
        const p = PROS.find(x => x.ruc === ruc);
        if(!p) return;
        
        openModal(`
          <div class="card pc" style="width:95%;max-width:1000px;height:90vh;display:flex;flex-direction:column;margin:3vh auto;padding:0;background:var(--card);">
            <div class="hd" style="padding:16px 24px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
              <h3 style="margin:0;color:var(--ink);display:flex;align-items:center;gap:8px;font-size:20px;">${ic('users')} Ficha de Registro de Información: ${esc(p.razon)}</h3>
              <button class="ibtn" onclick="window.closeModalGlobal()">${ic('x')}</button>
            </div>
            <div style="flex:1;background:var(--bg);padding:32px;overflow-y:auto;display:flex;flex-direction:column;gap:24px;">
               
               <div class="card" style="padding:20px;border:1px solid var(--border);border-radius:12px;background:var(--card);">
                 <h4 style="margin:0 0 16px;color:var(--ink);border-bottom:1px solid var(--line);padding-bottom:8px;font-size:15px;">1. Contacto Comercial</h4>
                 <div style="overflow-x:auto;">
                   <table class="tbl" style="width:100%;margin:0;min-width:600px;">
                     <thead><tr><th style="text-align:left;padding:8px">Nombres y Apellidos</th><th style="text-align:left;padding:8px">Cargo</th><th style="text-align:left;padding:8px">Celular</th><th style="text-align:left;padding:8px">Correo Electrónico</th></tr></thead>
                     <tbody>
                       <tr><td style="padding:8px">${esc(p.resp || '-')}</td><td style="padding:8px">Asesor Comercial</td><td style="padding:8px">${esc(p.cel || '-')}</td><td style="padding:8px">${esc(p.email || '-')}</td></tr>
                     </tbody>
                   </table>
                 </div>
               </div>

               <div class="card" style="padding:20px;border:1px solid var(--border);border-radius:12px;background:var(--card);">
                 <h4 style="margin:0 0 16px;color:var(--ink);border-bottom:1px solid var(--line);padding-bottom:8px;font-size:15px;">2. Contacto Contable</h4>
                 <div style="overflow-x:auto;">
                   <table class="tbl" style="width:100%;margin:0;min-width:600px;">
                      <thead><tr><th style="text-align:left;padding:8px">Nombres y Apellidos</th><th style="text-align:left;padding:8px">Cargo</th><th style="text-align:left;padding:8px">Celular</th><th style="text-align:left;padding:8px">Correo Electrónico</th></tr></thead>
                      <tbody>
                        <tr><td style="padding:8px">María Gómez</td><td style="padding:8px">Contadora</td><td style="padding:8px">987654321</td><td style="padding:8px">maria@empresa.com</td></tr>
                      </tbody>
                   </table>
                 </div>
               </div>

               <div class="card" style="padding:20px;border:1px solid var(--border);border-radius:12px;background:var(--card);">
                 <h4 style="margin:0 0 16px;color:var(--ink);border-bottom:1px solid var(--line);padding-bottom:8px;font-size:15px;">3. Representante Legal</h4>
                 <div style="overflow-x:auto;">
                   <table class="tbl" style="width:100%;margin:0;min-width:600px;">
                      <thead><tr><th style="text-align:left;padding:8px">Nombres y Apellidos</th><th style="text-align:left;padding:8px">Cargo</th><th style="text-align:left;padding:8px">Celular</th><th style="text-align:left;padding:8px">Correo Electrónico</th></tr></thead>
                      <tbody>
                        <tr><td style="padding:8px">Carlos Mendoza</td><td style="padding:8px">Gerente General</td><td style="padding:8px">999111222</td><td style="padding:8px">carlos@empresa.com</td></tr>
                      </tbody>
                   </table>
                 </div>
               </div>

               <div class="card" style="padding:20px;border:1px solid var(--border);border-radius:12px;background:var(--card);">
                 <h4 style="margin:0 0 16px;color:var(--ink);border-bottom:1px solid var(--line);padding-bottom:8px;font-size:15px;">4. Accionista mayor al 10%</h4>
                 <div style="overflow-x:auto;">
                   <table class="tbl" style="width:100%;margin:0;min-width:600px;">
                      <thead><tr><th style="text-align:left;padding:8px">Nombres y Apellidos</th><th style="text-align:left;padding:8px">Cargo / Rol</th><th style="text-align:left;padding:8px">Celular</th><th style="text-align:left;padding:8px">Correo Electrónico</th></tr></thead>
                      <tbody>
                        <tr><td style="padding:8px">Grupo Inversor SAC</td><td style="padding:8px">Inversionista</td><td style="padding:8px">-</td><td style="padding:8px">inversiones@grupo.com</td></tr>
                      </tbody>
                   </table>
                 </div>
               </div>

               <div class="card" style="padding:20px;border:1px solid var(--border);border-radius:12px;background:var(--card);">
                 <h4 style="margin:0 0 16px;color:var(--ink);border-bottom:1px solid var(--line);padding-bottom:8px;font-size:15px;">5. Principales Proveedores</h4>
                 <div style="overflow-x:auto;">
                   <table class="tbl" style="width:100%;margin:0;min-width:700px;">
                      <thead><tr><th style="text-align:left;padding:8px">Razón Social</th><th style="text-align:left;padding:8px">RUC</th><th style="text-align:left;padding:8px">Contacto</th><th style="text-align:left;padding:8px">Celular</th><th style="text-align:left;padding:8px">Correo</th></tr></thead>
                      <tbody>
                        <tr><td style="padding:8px">Distribuidora Central S.A.</td><td style="padding:8px">20123456789</td><td style="padding:8px">Luis Ramírez</td><td style="padding:8px">999888777</td><td style="padding:8px">luis@distribuidora.com</td></tr>
                      </tbody>
                   </table>
                 </div>
               </div>

               <div class="card" style="padding:20px;border:1px solid var(--border);border-radius:12px;background:var(--card);">
                 <h4 style="margin:0 0 16px;color:var(--ink);border-bottom:1px solid var(--line);padding-bottom:8px;font-size:15px;">6. Principales Clientes</h4>
                 <div style="overflow-x:auto;">
                   <table class="tbl" style="width:100%;margin:0;min-width:700px;">
                      <thead><tr><th style="text-align:left;padding:8px">Razón Social</th><th style="text-align:left;padding:8px">RUC</th><th style="text-align:left;padding:8px">Contacto</th><th style="text-align:left;padding:8px">Celular</th><th style="text-align:left;padding:8px">Correo</th></tr></thead>
                      <tbody>
                        <tr><td style="padding:8px">Constructora ABC S.A.</td><td style="padding:8px">20987654321</td><td style="padding:8px">Ana Suárez</td><td style="padding:8px">999888777</td><td style="padding:8px">ana@constructora.com</td></tr>
                      </tbody>
                   </table>
                 </div>
               </div>

               <div class="card" style="padding:20px;border:1px solid var(--border);border-radius:12px;background:var(--card);">
                 <h4 style="margin:0 0 16px;color:var(--ink);border-bottom:1px solid var(--line);padding-bottom:8px;font-size:15px;">7. Sucursales</h4>
                 <div style="overflow-x:auto;">
                   <table class="tbl" style="width:100%;margin:0;min-width:700px;">
                      <thead><tr><th style="text-align:left;padding:8px">Dirección</th><th style="text-align:left;padding:8px">Distrito</th><th style="text-align:left;padding:8px">Provincia</th><th style="text-align:left;padding:8px">Departamento</th><th style="text-align:left;padding:8px">País</th></tr></thead>
                      <tbody>
                        <tr><td style="padding:8px">Av. Los Incas 123</td><td style="padding:8px">Miraflores</td><td style="padding:8px">Lima</td><td style="padding:8px">Lima</td><td style="padding:8px">Perú</td></tr>
                      </tbody>
                   </table>
                 </div>
               </div>

               <div class="card" style="padding:20px;border:1px solid var(--border);border-radius:12px;background:var(--card);">
                 <h4 style="margin:0 0 16px;color:var(--ink);border-bottom:1px solid var(--line);padding-bottom:8px;font-size:15px;">8. Categorías de Compra</h4>
                 <div style="font-size:14px;color:var(--ink);padding:8px;">${p.cats ? p.cats.join(', ') : 'Ninguna'}</div>
               </div>

               <div class="card" style="padding:20px;border:1px solid var(--border);border-radius:12px;background:var(--card);">
                  <h4 style="margin:0 0 16px;color:var(--ink);border-bottom:1px solid var(--line);padding-bottom:8px;font-size:15px;">9. Información Bancaria</h4>
                  <div style="overflow-x:auto;">
                    <table class="tbl" style="width:100%;margin:0;min-width:600px;">
                      <thead><tr><th style="text-align:left;padding:8px">Banco</th><th style="text-align:left;padding:8px">Tipo / Moneda</th><th style="text-align:left;padding:8px">Cuenta / CCI</th><th style="text-align:left;padding:8px">Titular</th></tr></thead>
                      <tbody>
                         <tr>
                           <td style="padding:8px">BCP</td>
                           <td style="padding:8px">Corriente / PEN</td>
                           <td style="padding:8px">194-12345678-0-00<br><span style="color:var(--mut);font-size:11px">00219412345678000</span></td>
                           <td style="padding:8px">${esc(p.razon)}</td>
                         </tr>
                      </tbody>
                    </table>
                  </div>
               </div>

            </div>
            <div style="padding:16px 24px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;">
               <button class="btn p" style="padding:10px 24px;font-weight:bold" onclick="window.closeModalGlobal()">Cerrar Ficha</button>
            </div>
          </div>
        `);
      };
      window.promptDocAction = function(ruc, cod, st) {
        const title = st === 'Observado' ? 'Observar Documento' : 'Rechazar Documento';
        const color = st === 'Observado' ? '#ea580c' : '#e02424';
        const icon = st === 'Observado' ? 'warn' : 'x';
        
        openModal(`
          <div class="card pc" style="width:90%;max-width:500px;margin:15vh auto;padding:0;background:var(--card);">
            <div class="hd" style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
              <h3 style="margin:0;color:${color};display:flex;align-items:center;gap:8px;">${ic(icon)} ${title}</h3>
              <button class="ibtn" onclick="window.closeModalGlobal()">${ic('x')}</button>
            </div>
            <div style="padding:24px;background:var(--bg);">
              <label style="display:block;margin-bottom:8px;font-weight:600;font-size:14px;color:var(--ink);">Indica el motivo de la acción:</label>
              <textarea id="docReason" class="inp" style="width:100%;height:100px;padding:12px;border:1px solid var(--border);border-radius:8px;font-family:inherit;font-size:14px;resize:none;background:var(--card);color:var(--ink);" placeholder="Escribe aquí el motivo por el cual estás observando o rechazando el documento..."></textarea>
            </div>
            <div style="padding:16px 20px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:12px;background:var(--card);">
              <button class="btn o" onclick="window.closeModalGlobal()">Cancelar</button>
              <button class="btn p" style="background:${color};border-color:${color};color:#fff;" onclick="window.confirmDocAction('${ruc}', '${cod}', '${st}')">Confirmar y ${st}</button>
            </div>
          </div>
        `);
        setTimeout(() => { const el = document.getElementById('docReason'); if(el) el.focus(); }, 50);
      };

      window.viewDocObservation = function(ruc, cod) {
        const p = PROS.find(x => x.ruc === ruc);
        if (!p || !p._docs) return;
        const doc = p._docs.find(d => d.c === cod);
        if(!doc) return;
        
        const docName = doc.n;
        let reason = 'Documento ilegible o incompleto. Favor de volver a subir.';
        for(let i = p.notas.length - 1; i >= 0; i--) {
           if(p.notas[i].t.includes('[' + docName + ']')) {
              reason = p.notas[i].t;
              break;
           }
        }
        
        openModal(`
          <div class="card pc" style="width:90%;max-width:500px;margin:15vh auto;padding:0;background:var(--card);">
            <div class="hd" style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
              <h3 style="margin:0;color:#ea580c;display:flex;align-items:center;gap:8px;">${ic('warn')} Observación del Documento</h3>
              <button class="ibtn" onclick="window.closeModalGlobal()">${ic('x')}</button>
            </div>
            <div style="padding:24px;background:var(--bg);color:var(--ink);font-size:14px;line-height:1.5;">
              <div style="margin-bottom:8px;"><b>Documento:</b> ${esc(docName)}</div>
              <b>Motivo de la observación / rechazo:</b><br><br>
              <div style="padding:16px;background:var(--card);border:1px solid var(--line);border-radius:8px;white-space:pre-wrap;color:var(--mut);">${esc(reason)}</div>
            </div>
            <div style="padding:16px 20px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;background:var(--card);">
              <button class="btn p" style="background:#ea580c;border-color:#ea580c;color:#fff;" onclick="window.closeModalGlobal()">Entendido</button>
            </div>
          </div>
        `);
      };

      window.confirmDocAction = function(ruc, cod, st) {
         const el = document.getElementById('docReason');
         const reason = el ? el.value.trim() : '';
         if(!reason) { toast('Por favor, ingresa el motivo para continuar'); return; }
         closeModalGlobal();
         setDocState(ruc, cod, st, reason);
      };

      window.setDocState = function (ruc, cod, st, reason = '') {
        const p = PROS.find(x => x.ruc === ruc);
        if (!p || !p._docs) return;
        const doc = p._docs.find(d => d.c === cod);
        if (doc) { 
          if (st === 'Observado' || st === 'Rechazado') {
             const prefix = S.userRole === 'Compliance' ? `⚠️ Compliance ha vetado (${st.toLowerCase()}) el documento [${doc.n}]` : `Observación en [${doc.n}]`;
             p.notas.push({ t: `${prefix}: "${reason}"`, f: now() });
             
             if (S.userRole === 'Compliance') {
                toast('Alerta enviada a Logística. Prospecto vetado.');
                p.estado = st === 'Rechazado' ? 'Rechazado' : 'Observado';
             } else {
                toast('Documento ' + st.toLowerCase() + ' con motivo guardado.');
             }
          } else if (st === 'Aprobado') {
             toast('Documento Aprobado exitosamente');
             if (S.userRole === 'Compliance') {
                p.estado = 'Aceptado';
                p.notas.push({ t: `✅ Compliance ha aprobado el documento [${doc.n}]. Prospecto Aceptado.`, f: now() });
             }
          } else {
             toast('Documento ' + st.toLowerCase()); 
          }
          doc.st = st;
          render(); 
        }
      };

      const av = document.getElementById('topUserInitials'); if (av) { av.style.cursor = 'pointer'; av.title = 'Cerrar Sesión'; av.onclick = () => { S.logged = false; S.userRole = null; S.route = 'login'; render(); }; }



