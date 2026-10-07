import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update bindLogin to default Proveedor to prospecto with sel = 20539627938
code = code.replace(
    "if(role === 'Proveedor') S.route = 'coti';",
    "if(role === 'Proveedor') {\n      S.route = 'prospecto';\n      S.sel = '20539627938';\n    }"
)

# 2. Add isProv, timeline, and replace left column in vPros1
new_top = '''    const isProv = S.userRole === 'Proveedor';
    const canDiscard = !isProv;
    const canEval = !isProv;
    
    const timeline = isProv ? `
      <div style="margin-top:20px; padding: 20px; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0; max-width:800px; margin-bottom:20px">
        <h3 style="margin-top:0;margin-bottom:25px;font-size:15px;color:#334155">${ic('check')} Progreso de Homologación</h3>
        <div style="display:flex; align-items:center; justify-content:space-between; position:relative; max-width:600px; margin:0 auto;">
          <div style="position:absolute; top:16px; left:10%; right:10%; height:3px; background:#cbd5e1; z-index:0;"></div>
          ${['Registrado', 'En Revisión', 'Aprobado'].map((paso, i) => {
            let active = false, done = false;
            if(paso === 'Registrado') { active = p.estado === 'Registrado'; done = p.estado !== 'Registrado'; }
            if(paso === 'En Revisión') { active = p.estado === 'En revisión' || p.estado === 'Observado'; done = p.estado === 'Aceptado'; }
            if(paso === 'Aprobado') { active = p.estado === 'Aceptado'; done = p.estado === 'Aceptado'; }
            const color = done ? '#0f9d6a' : (active ? '#1b5fb8' : '#94a3b8');
            const bg = done || active ? color : '#f1f5f9';
            const fg = done || active ? '#fff' : '#64748b';
            return \\`<div style="position:relative; z-index:1; text-align:center; flex:1;">
              <div style="width:34px; height:34px; border-radius:50%; margin:0 auto; background:\\${bg}; color:\\${fg}; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:15px; box-shadow:0 0 0 6px #f8fafc; border:\\${done||active?'none':'2px solid #cbd5e1'}">
                \\${done ? ic('check',18) : (i+1)}
              </div>
              <div style="margin-top:12px; font-size:13px; font-weight:600; color:\\${active||done?'#0f172a':'#64748b'}">\\${paso}</div>
            </div>\\`;
          }).join('')}
        </div>
      </div>
    ` : '';
    
    return `<div class="pros-fixed-layout">
    ${isProv ? '' : `<button class="back" id="bk">${ic('back')}Prospectos</button>`}
    <div class="card ph"><div class="r1"><div><h2>${esc(p.razon)}</h2>
      <div class="meta"><span><span class="mono" style="color:#667085">${p.tipo==='Nacional'?'RUC':'ID'}</span> <span class="mono">${p.ruc}</span></span><span class="badge b-info" style="font-size:13px">${p.tipo}</span><span><span class="dot" style="background:${ESTADOS[p.estado]}"></span>${p.estado}</span></div>
      <div class="ct"><span>${ic('phone')}${p.cel?`<b>${p.cel}</b>`:'Sin celular'}</span><span>${ic('mail')}${p.email?`<b>${esc(p.email)}</b>`:'Sin correo'}<button class="ibtn" id="ed" title="Editar contacto">${ic('pen')}</button></span></div></div>
      <div style="display:flex;gap:10px">
        ${canDiscard ? `<button class="btn o sm" id="dsc">Descartar prospecto</button>` : ''}
        ${canEval ? `<select class="inp" id="updSt" style="height:36px;font-size:14px;padding:0 8px"><option value="">Dictaminar...</option><option>Aceptado</option><option>Observado</option><option>Rechazado</option><option>Bloqueado</option></select>` : ''}
      </div>
    </div></div>
    ${timeline}
    <div class="det">
     <div class="col col-scroll">
      ${p.tipo==='Nacional'?`<div class="card pc"><div class="hd"><h3>${ic('bld')}SUNAT</h3></div>
        <div class="two"><div class="fld"><small>Estado</small><div>${s.estado}</div></div><div class="fld"><small>Condición</small><div>${s.cond}</div></div></div>
        <div class="two"><div class="fld"><small>Inicio act.</small><div>${s.inicio}</div></div><div class="fld"><small>Domicilio fiscal</small><div>${esc(s.dom)}</div></div></div>
        <div class="fld"><small>Actividad principal</small><div>${esc(s.act)}</div></div></div>`:''}
      ${!isProv ? `<div class="card pc"><div class="hd"><h3>${ic('mail')}Acceso del proveedor</h3>${inv?'':`<button class="lnk" id="inv">${ic('send')}Invitar proveedor</button>`}</div>
        <div class="mu">${inv?`Proveedor invitado${p.email?' a '+esc(p.email):''}. Podrá activar su cuenta y subir sus documentos.`:'Aún no se invitó al proveedor. Al invitarlo recibirá un correo para activar su cuenta y subir sus documentos.'}</div>
        ${inv?`<button class="btn o sm" style="margin-top:10px" onclick="toast('Correo de reseteo de contraseña enviado')">Resetear contraseña</button>`:''}</div>` : ''}
      <div class="card pc"><div class="hd"><h3>${ic('users')}Contactos del proveedor</h3><span class="badge b-info">NUEVO</span></div>
        <div class="mu" style="margin-top:6px"><b>Comercial:</b> Asesor, Jefe, Operaciones<br><b>Contable:</b> Contabilidad, Finanzas</div>
        <button class="lnk" style="margin-top:10px">${ic('plus')} Añadir contactos</button></div>
      <div class="card pc"><div class="hd"><h3>${ic('tag')}Categorías de producto</h3><button class="lnk" id="ec">${ic('pen')}Editar</button></div>
        ${p.cats.length?p.cats.map(c=>`<div class="catl"><i>${c}</i>${esc(segName(c))}</div>`).join(''):'<div class="mu">Sin categorías.</div>'}</div>
      <div class="card pc"><div class="hd"><h3>${ic('bld')}Información Bancaria</h3><span class="badge b-info">NUEVO</span></div>
        <div class="mu" style="margin-top:6px">Estructura esperada para <b>${p.tipo}</b>:<br>${p.tipo==='Nacional'?'Banco, Tipo, Cuenta, CCI, Titular':'Banco, Cuenta, SWIFT, Titular'}</div>
        <button class="lnk" style="margin-top:10px">${ic('plus')} Añadir cuenta</button></div>
      ${!isProv ? `<div class="card pc"><div class="hd"><h3>${ic('check')}Evaluación Externa</h3><span class="badge b-info">NUEVO</span></div>
        <div class="two" style="margin-top:10px">
          <div style="padding:10px;border:1px solid var(--line);border-radius:8px"><b>SENTINEL</b><br><span class="badge b-grey">Pendiente</span></div>
          <div style="padding:10px;border:1px solid var(--line);border-radius:8px"><b>CUMPLO 360</b><br><span class="badge b-grey">Pendiente</span></div>
        </div>
        <button class="btn sm p" style="margin-top:12px;width:100%">Ejecutar evaluación automática</button></div>
      <div class="card pc"><div class="hd"><h3 style="gap:10px"><span style="color:#ea7a1c;display:flex">${ic('msg')}</span>Observaciones y notas</h3></div>
        ${p.notas.length?`<ul class="notes">${p.notas.map(n=>`<li>${esc(n.t)}<small>${esc(n.f)} · Paul Andrade</small></li>`).join('')}</ul>`:'<div class="mu">Sin observaciones ni notas.</div>'}
        <textarea class="nota" id="nt" placeholder="Agregar una nota interna (el proveedor no la ve)"></textarea>
        <button class="btn sm" id="an" style="margin-top:8px;color:#9aa6b6" disabled>${ic('plus')}Agregar nota</button></div>` : ''}'''

code = re.sub(
    r"    const canDiscard = true;.*?(?=<div class=\"col col-static\">)",
    new_top + "\n     </div>\n     ",
    code,
    flags=re.DOTALL
)

# 3. Update the table actions for Proveedor
table_repl = '''      let btn = '';
      if (isProv) {
        if (!sub) {
           btn = `<button class="btn sm p" style="font-size:12px;padding:2px 8px;border-radius:4px" onclick="if(confirm('¿Desea previsualizar y subir el documento: ${esc(d.n)}?')) { setDocState('${p.ruc}','${d.c}','Por revisar'); }">${ic('plus',14)} Subir</button>`;
        } else {
           if(d.st === 'Observado') {
              btn = `<div style="display:flex;gap:6px;align-items:center"><button class="btn sm o" style="font-size:12px;padding:2px 8px;border-radius:4px;color:#ea580c;border-color:#ea580c" onclick="alert('Observación de logística: Documento ilegible. Favor de volver a subir.')">Ver Obs.</button>
              <button class="btn sm p" style="font-size:12px;padding:2px 8px;border-radius:4px" onclick="if(confirm('¿Desea previsualizar y volver a subir el documento corregido?')) { setDocState('${p.ruc}','${d.c}','Por revisar'); }">Reemplazar</button></div>`;
           } else {
              btn = `<div style="display:flex;gap:6px;align-items:center"><button class="ibtn" title="Vista previa" onclick="toast('Abriendo previsualización...')">${ic('eye')}</button></div>`;
           }
        }
      } else {
        if (!sub) {
          if (canEval) {
            btn = `<button class="btn sm o" style="font-size:12px;padding:2px 8px;border-radius:4px" onclick="toast('Se notificó al proveedor la falta de: ${esc(d.n)}')">Notificar</button>`;
          }
        } else {
          if (canEval) {
            btn = `<div style="display:flex;gap:6px;align-items:center">
<button class="ibtn" title="Ver documento" onclick="toast('Abriendo visor para: ${esc(d.n)}')">${ic('eye')}</button>
<button class="ibtn" style="color:#0f9d6a" title="Aprobar" onclick="setDocState('${p.ruc}','${d.c}','Aprobado')">${ic('check')}</button>
<button class="ibtn" style="color:#ea580c" title="Observar" onclick="setDocState('${p.ruc}','${d.c}','Observado')">${ic('warn')}</button>
<button class="ibtn" style="color:#e02424" title="Rechazar" onclick="setDocState('${p.ruc}','${d.c}','Rechazado')">${ic('x')}</button>
</div>`;
          } else {
            btn = `<div style="display:flex;gap:6px;align-items:center"><button class="ibtn" title="Ver documento" onclick="toast('Abriendo visor para: ${esc(d.n)}')">${ic('eye')}</button></div>`;
          }
        }
      }
      return `<tr><td class="cod">${d.c}</td><td><div style="font-weight:500;color:var(--ink)">${d.n}</div></td><td><span class="badge ${d.ob?'b-warn':'b-grey'}">${d.ob?'Obligatorio':'Opcional'}</span></td><td>${tag}</td><td class="${stc[d.st]||'st-rev'}"><span class="dot" style="background:${dco[d.st]||'#8795a8'}"></span><b>${d.st}</b></td><td>${btn}</td></tr>`;'''

code = re.sub(
    r"      let btn = '';\s+if \(!sub\).*?return `<tr><td class=\"cod\">\${d.c}.*?</tr>`;",
    table_repl,
    code,
    flags=re.DOTALL
)

# Fix missing event listeners on #bk, #ed, #ec for Proveedor
code = code.replace(
    "$('#bk').onclick=()=>go('prospectos');\n  $('#ed').onclick=()=>openContact(p);\n  $('#ec').onclick=()=>openCats(p);",
    "const bk=$('#bk');if(bk)bk.onclick=()=>go('prospectos');\n  const ed=$('#ed');if(ed)ed.onclick=()=>openContact(p);\n  const ec=$('#ec');if(ec)ec.onclick=()=>openCats(p);"
)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Replacement successful.")
