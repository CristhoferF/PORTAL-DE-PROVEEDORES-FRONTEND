
/* ============ Iconos (estilo Lucide) ============ */
const P={
 search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
 settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
 tag:'<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
 check:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
 tick:'<path d="M20 6 9 17l-5-5"/>',
 users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
 inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
 msg:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><circle cx="12" cy="11" r="2.5"/><path d="m14 13 2 2"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 bld:'<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/>',
 moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
 up:'<path d="m18 15-6-6-6 6"/>', down:'<path d="m6 9 6 6 6-6"/>',
 x:'<path d="M18 6 6 18M6 6l12 12"/>',
 uplus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
 refresh:'<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
 back:'<path d="m12 19-7-7 7-7M19 12H5"/>',
 phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
 mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
 pen:'<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
 send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
 lchk:'<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8M13 12h8M13 18h8"/>',
 plus:'<path d="M5 12h14M12 5v14"/>',
 cl:'<path d="m15 18-6-6 6-6"/>', cr:'<path d="m9 18 6-6-6-6"/>',
 ccl:'<path d="m11 17-5-5 5-5M18 17l-5-5 5-5"/>', ccr:'<path d="m6 17 5-5-5-5M13 17l5-5-5-5"/>',
 chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>'
  ,eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  warn:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>'
};
const ic=(n,s)=>`<svg class="i" viewBox="0 0 24 24"${s?` style="font-size:${s}px"`:''}>${P[n]}</svg>`;

/* ============ Datos ============ */
const SEG=[
['10','Material vivo vegetal y animal, accesorios y suministros'],['11','Materiales minerales, textiles y vegetales y animales no comestibles'],
['12','Materiales químicos incluyendo bioquímicos y materiales de gas',1],['13','Materiales de resina, colofonia, caucho, espuma, película y elastómeros'],
['14','Materiales y productos de papel'],['15','Materiales combustibles, aditivos para combustibles, lubricantes y anticorrosivos',1],
['20','Maquinaria y accesorios de minería y perforación de pozos'],['21','Maquinaria y accesorios para agricultura, pesca, silvicultura y fauna'],
['22','Maquinaria y accesorios para construcción y edificación'],['23','Maquinaria y accesorios para manufactura y procesamiento industrial'],
['24','Maquinaria, accesorios y suministros para manejo, acondicionamiento y almacenamiento de materiales'],['25','Vehículos comerciales, militares y particulares, accesorios y componentes'],
['26','Maquinaria y accesorios para generación y distribución de energía'],['27','Herramientas y maquinaria general'],
['30','Componentes y suministros para estructuras, edificación, construcción y obras civiles'],['31','Componentes y suministros de manufactura'],
['32','Componentes y suministros electrónicos'],['39','Maquinaria, accesorios y suministros eléctricos de iluminación'],
['40','Maquinaria, accesorios y suministros de distribución y acondicionamiento'],['41','Equipo de laboratorio, de medición, de observación y de pruebas'],
['42','Equipo médico, accesorios y suministros'],['43','Difusión de tecnologías de información y telecomunicaciones'],
['44','Equipos de oficina, accesorios y suministros'],['45','Equipos de imprenta, fotográficos y audiovisuales'],
['46','Equipo, suministros y accesorios de defensa, orden público, protección, vigilancia y seguridad'],['47','Equipos de limpieza y suministros'],
['48','Maquinaria, equipo y suministros para la industria de servicios'],['49','Equipos, suministros y accesorios para deportes y recreación'],
['50','Alimentos, bebidas y tabaco'],['51','Medicamentos y productos farmacéuticos'],
['52','Electrodomésticos, equipos y artículos de consumo electrónico'],['53','Ropa, maletas y productos de aseo personal'],
['55','Publicaciones impresas, publicaciones electrónicas y accesorios'],['56','Muebles, mobiliario y decoración'],
['60','Instrumentos musicales, juegos, artes, artesanías y equipo educativo'],['70','Servicios de cultivo, pesca, silvicultura y fauna'],
['71','Servicios de minería, petróleo y gas'],['72','Servicios de edificación, construcción de instalaciones y mantenimiento'],
['73','Servicios de producción industrial y manufactura'],['76','Servicios de limpieza industrial'],['77','Servicios medioambientales'],
['78','Servicios de transporte, almacenaje y correo'],['80','Servicios de gestión, servicios profesionales de empresa y servicios administrativos'],
['81','Servicios basados en ingeniería, investigación y tecnología'],['82','Servicios editoriales, de diseño, de artes gráficas y bellas artes'],
['83','Servicios públicos y servicios relacionados con el sector público'],['84','Servicios financieros y de seguros'],['85','Servicios de salud'],
['86','Servicios educativos y de formación'],['90','Servicios de viajes, alimentación, alojamiento y entretenimiento'],['91','Servicios personales y domésticos'],
['92','Servicios de defensa nacional, orden público, seguridad y vigilancia'],['93','Servicios políticos y de asuntos cívicos'],
['94','Organizaciones y clubes'],['95','Terrenos, edificios, estructuras y vías']
].map(([c,n,k])=>({c,n,crit:!!k}));
const segName=c=>(SEG.find(s=>s.c===c)||{}).n||c;

const ESTADOS={
  'Registrado':'#64748b','Invitado':'#0ea5e9','En registro':'#f59e0b','En revisión':'#8b5cf6','Habilitado':'#16a34a',
  'Aceptado':'#157a3c','Observado':'#b45309','Rechazado':'#b42318','En evaluación':'#8b5cf6','Bloqueado':'#374151'
};
let PROS=[
 {ruc:'20539627938',razon:'LA JOYA MINING SOCIEDAD ANONIMA CERRADA',tipo:'Nacional',rubro:'',cats:['32'],estado:'Registrado',resp:'Paul Andrade',cel:'',fecha:'02/10/2026 09:10',email:'jhon.andrade@ucsp.edu.pe',notas:[]},
 {ruc:'20570804775',razon:'GRUPO MONTEPER S.A.C.',tipo:'Nacional',rubro:'Transportistas',cats:[],estado:'Aceptado',resp:'Paul Andrade',cel:'',fecha:'01/10/2026 16:07',email:'',notas:[]},
 {ruc:'20610820094',razon:'MINERA LUMAR E.I.R.L.',tipo:'Nacional',rubro:'Contratistas',cats:[],estado:'En revisión',resp:'EDER GUSTAVO HUARCA THEA',cel:'983784805',fecha:'01/10/2026 15:28',email:'',notas:[],envio:1,ultimo:'01/10/2026 15:58'},
 {ruc:'20547825781',razon:'DMG DRILLING E.I.R.L.',tipo:'Nacional',rubro:'',cats:[],estado:'Observado',resp:'Paul Andrade',cel:'',fecha:'01/10/2026 15:24',email:'',notas:[]},
 {ruc:'20604915351',razon:'MEN GRAPH S.A.C.',tipo:'Nacional',rubro:'',cats:[],estado:'En evaluación',resp:'EDER GUSTAVO HUARCA THEA',cel:'983784807',fecha:'25/09/2026 10:41',email:'',notas:[]},
 {ruc:'89839483',razon:'GLOBAL MINING SUPPLIES LLC',tipo:'No Domiciliado',rubro:'',cats:['20'],estado:'Invitado',resp:'Paul Andrade',cel:'+1 555 1234',fecha:'24/09/2026 09:54',email:'sales@globalmining.com',notas:[]}
];
const SUNAT={'20539627938':{razon:'LA JOYA MINING SOCIEDAD ANONIMA CERRADA',persona:'Persona jurídica',contrib:'SOCIEDAD ANONIMA CERRADA',estado:'ACTIVO',cond:'HABIDO',inicio:'01/10/2012',dom:'AV. PASEO DE LA REPUBLICA NRO. 3147 INT. 502 URB. SANTA ANA LIMA - LIMA - SAN ISIDRO',act:'EXPLOTACIÓN DE OTRAS MINAS Y CANTERAS N.C.P.'}};
function getDocs(p){
  const list=[];
  if(p.tipo==='No Domiciliado'){
    list.push({c:'HOM 01',n:'Registro tributario origen',ob:1,grp:'Base'});
    list.push({c:'HOM 02',n:'Cert. existencia legal',ob:1,grp:'Base'});
    list.push({c:'HOM 03',n:'ID representantes',ob:0,grp:'Base'});
    list.push({c:'HOM 04',n:'DJ cumplimiento',ob:1,grp:'Base'});
    list.push({c:'HOM 05',n:'Carta presentación',ob:1,grp:'Base'});
    list.push({c:'HOM 06',n:'Formato de creación (Intl)',ob:1,grp:'Base'});
  }else{
    list.push({c:'HOM 01',n:'Ficha RUC',ob:1,grp:'Base'});
    list.push({c:'HOM 02',n:'Reporte tributario de SUNAT',ob:1,grp:'Base'});
    list.push({c:'HOM 03',n:'Doc identidad rep. legal',ob:1,grp:'Base'});
    list.push({c:'HOM 04',n:'Certificado Único Laboral',ob:1,grp:'Base'});
    list.push({c:'HOM 05',n:'Copia literal de empresa',ob:1,grp:'Base'});
    list.push({c:'HOM 06',n:'DJ información general',ob:1,grp:'Base'});
    list.push({c:'HOM 09',n:'Formulario PEP',ob:1,grp:'Base'});
    list.push({c:'HOM 10',n:'Formato de creación',ob:1,grp:'Base'});
  }
  if(p.rubro==='Transportistas'){
    list.push({c:'TIP 01',n:'Habilitación MTC',ob:1,grp:'Por Tipo'});
    list.push({c:'TIP 02',n:'Tarjeta de Circulación',ob:1,grp:'Por Tipo'});
    list.push({c:'TIP 03',n:'SOAT Vigente',ob:1,grp:'Por Tipo'});
    list.push({c:'TIP 04',n:'Licencias de Conducir',ob:1,grp:'Por Tipo'});
  }
  if(p.rubro==='Contratistas'){
    list.push({c:'TIP 01',n:'Registro RENOC',ob:1,grp:'Por Tipo'});
    list.push({c:'TIP 02',n:'SCTR (Salud y Pensión)',ob:1,grp:'Por Tipo'});
    list.push({c:'TIP 03',n:'Certificado de Trabajo en Altura',ob:0,grp:'Por Tipo'});
  }
  if(p.rubro==='Insumos'){
    list.push({c:'TIP 01',n:'Certificado de Calidad',ob:1,grp:'Por Tipo'});
    list.push({c:'TIP 02',n:'Ficha Técnica del Producto',ob:1,grp:'Por Tipo'});
  }
  if(p.rubro==='Químicos'){
    list.push({c:'TIP 01',n:'Hoja de Seguridad (MSDS)',ob:1,grp:'Por Tipo'});
    list.push({c:'TIP 02',n:'Certificado IQBF (si aplica)',ob:0,grp:'Por Tipo'});
    list.push({c:'TIP 03',n:'Resolución DIGESA',ob:1,grp:'Por Tipo'});
  }
  if(p.rubro==='Intermediación Laboral'){
    list.push({c:'TIP 01',n:'Constancia REMYPE',ob:1,grp:'Por Tipo'});
    list.push({c:'TIP 02',n:'Licencia de Funcionamiento',ob:1,grp:'Por Tipo'});
  }
  if(p.rubro==='Explosivos'){
    list.push({c:'TIP 01',n:'Autorización SUCAMEC',ob:1,grp:'Por Tipo'});
    list.push({c:'TIP 02',n:'Certificado de Operación Minera (COM)',ob:1,grp:'Por Tipo'});
  }
  list.push({c:'ADD 01',n:'Brochure',ob:0,grp:'Adicionales'});
  list.push({c:'ADD 02',n:'Referencias comerciales',ob:0,grp:'Adicionales'});
  const rev=p.estado==='En revisión'||p.estado==='En evaluación';
  return list.map((d,i)=>({...d,st:rev&&d.ob?(i===0?'Aprobado':'Por revisar'):'Pendiente'}));
}
const SOLIC=[];

/* ============ Estado ============ */
const S={route:'ruc',sel:null,tab:{bandeja:'rev',solic:'cambios',docs:'Base'},size:10,ruc:{q:'20539627938',res:null,err:'',nd:false},open:{cfg:true,hom:true}};
S.ruc.res=lookup('20539627938');

const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
function toast(t){const e=$('#toast');e.innerHTML=ic('check')+' '+esc(t);e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2600)}
const now=()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return `${p(d.getDate())}/${p(d.getMonth()+1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`};

/* ============ Menú ============ */
const MENU=[
 {id:'cfg',t:'Configuración',ic:'settings',items:[['categorias','Categorías de producto','tag']]},
 {id:'hom',t:'Homologación',ic:'check',items:[['ruc','Consulta RUC','search'],['prospectos','Prospectos','users'],['bandeja','Bandeja de revisión','inbox'],['solicitudes','Solicitudes','msg']]}
];
function renderNav(){
  const act=S.route==='prospecto'?'prospectos':S.route;
  $('#nav').innerHTML=MENU.map(g=>`<div class="grp ${S.open[g.id]?'':'closed'}">
    <button class="grp-h" data-g="${g.id}">${ic(g.ic)}<span>${g.t}</span><span class="chev">${ic('up')}</span></button>
    <div class="sub">${g.items.map(([id,t,i])=>`<button class="item ${act===id?'act':''}" data-r="${id}">${ic(i)}<span>${t}</span></button>`).join('')}</div></div>`).join('');
  document.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{S.open[b.dataset.g]=!S.open[b.dataset.g];renderNav()});
  document.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>go(b.dataset.r));
}
function go(r,sel){S.route=r;if(sel!==undefined)S.sel=sel;render();$('#view').scrollTop=0;if(innerWidth<=900)$('#side').classList.add('hide')}

/* ============ Vistas ============ */
function lookup(q){
  const s=SUNAT[q];if(s)return s;
  const p=PROS.find(x=>x.ruc===q);
  if(p)return {razon:p.razon,persona:'Persona jurídica',contrib:'—',estado:'—',cond:'—',inicio:'—',dom:'—',act:'—'};
  return null;
}
function badgeSt(v){if(v==='—')return '—';return `<span class="badge b-ok">${v}</span>`}
function vRuc(){
  const r=S.ruc,res=r.res,nd=r.nd;
  return `<div class="wrapc">
  <h1 class="pt">${ic('search')}Consulta RUC</h1>
  <p class="sub-t">Consulta la ficha RUC en SUNAT. Si el proveedor está ACTIVO y HABIDO puedes crear su prospecto de homologación.</p>
  <div class="card" style="padding:18px 18px 16px;margin-bottom:14px">
    <label class="lbl">RUC o ID del proveedor</label>
    <div class="rucrow">
      <input class="inp" id="rq" value="${esc(r.q)}" maxlength="11" autocomplete="off" ${nd?'placeholder="Ingrese ID o Nombre (Opcional)"':'inputmode="numeric"'}>
      <label style="display:flex;align-items:center;gap:8px;font-size:15px;cursor:pointer"><input type="checkbox" id="rnd" ${nd?'checked':''} style="width:18px;height:18px"> No Domiciliado <span class="badge b-info">NUEVO</span></label>
      <button class="btn p" id="rgo">${ic('search')}${nd?'Crear prospecto directo':'Consultar'}</button>
      <button class="btn" id="rcl">${ic('x')}Limpiar</button>
    </div>
    ${r.err?`<div class="err">${esc(r.err)}</div>`:''}
  </div>
  ${!nd&&res?`<div class="card">
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
  </div>`:''}
  </div>`;
}
function bindRuc(){
  const q=$('#rq'),nd=$('#rnd');
  const doit=()=>{
    const v=q.value.trim();S.ruc.q=v;S.ruc.nd=nd.checked;
    if(nd.checked){
      S.ruc.err='';S.ruc.res=null;
      openHom(v||('ND-'+Math.floor(Date.now()/1000)),{razon:v||'Proveedor Extranjero Nuevo'},true);
      return;
    }
    if(!/^\d{11}$/.test(v)){S.ruc.err='El RUC debe tener 11 dígitos.';S.ruc.res=null;render();return}
    const res=lookup(v);
    if(!res){S.ruc.err='No se encontró el RUC en la base de demostración.';S.ruc.res=null}
    else{S.ruc.err='';S.ruc.res=res}
    render();
  };
  nd.onchange=()=>{S.ruc.nd=nd.checked;S.ruc.err='';render()};
  if(!S.ruc.nd) q.oninput=()=>{q.value=q.value.replace(/\D/g,'')};
  q.onkeydown=e=>{if(e.key==='Enter')doit()};
  $('#rgo').onclick=doit;
  $('#rcl').onclick=()=>{S.ruc={q:'',res:null,err:'',nd:false};render();$('#rq').focus()};
  const h=$('#rhom');if(h)h.onclick=()=>openHom(S.ruc.q,S.ruc.res,false);
}

function pagerHTML(n){
  return `<div class="pag"><button disabled>${ic('ccl')}</button><button disabled>${ic('cl')}</button><button class="cur">1</button><button disabled>${ic('cr')}</button><button disabled>${ic('ccr')}</button>
  <select id="psz">${[10,20,50].map(x=>`<option ${S.size===x?'selected':''}>${x}</option>`).join('')}</select></div>`;
}
function vPros(){
  const rows=PROS.slice(0,S.size).map(p=>`<tr class="click" data-ruc="${p.ruc}">
    <td class="mono">${p.ruc}</td><td class="rz">${esc(p.razon)}</td><td class="cc">${p.tipo}</td>
    <td class="cc">${p.cats.length?p.cats.map(c=>esc(segName(c))).join(', '):'—'}</td>
    <td class="est cc"><span class="dot" style="background:${ESTADOS[p.estado]}"></span>${p.estado}</td>
    <td class="cc">${esc(p.resp)}</td><td class="cc mono" style="font-size:15px;font-family:inherit">${p.cel||'–'}</td>
    <td class="dt">${p.fecha.replace(' ','<br>')}</td></tr>`).join('');
  return `<div class="head"><div><h1 class="pt">${ic('users')}Prospectos de homologación</h1><p class="sub-t">Proveedores en proceso de homologación y su estado.</p></div>
    <div class="btns"><button class="btn" id="rf">${ic('refresh')}Refrescar</button><button class="btn p" id="gr">${ic('search')}Consultar RUC</button></div></div>
  <div class="card" style="padding:12px 18px;margin-bottom:14px;display:flex;gap:12px;align-items:flex-end">
    <div style="flex:1"><label class="lbl">Estado</label><select class="inp" style="width:100%;height:42px"><option>Todos</option><option>Aceptado</option><option>Observado</option><option>Rechazado</option><option>Bloqueado</option></select></div>
    <div style="flex:1"><label class="lbl">Tipo</label><select class="inp" style="width:100%;height:42px"><option>Todos</option><option>Nacional</option><option>No Domiciliado</option></select></div>
    <div style="flex:2"><label class="lbl">Buscar</label><input class="inp" style="width:100%;height:42px" placeholder="RUC o Razón Social..."></div>
  </div>
  <div class="card tw"><table class="tbl"><thead><tr><th>RUC / ID</th><th>Razón social</th><th>Tipo</th><th>Categorías</th><th>Estado</th><th>Responsable</th><th>Celular</th><th>Registrado</th></tr></thead><tbody>${rows}</tbody></table>${pagerHTML()}</div>`;
}
function bindPros(){
  document.querySelectorAll('tr[data-ruc]').forEach(tr=>tr.onclick=()=>go('prospecto',tr.dataset.ruc));
  $('#gr').onclick=()=>go('ruc');
  $('#rf').onclick=()=>{const s=$('#rf svg');s.classList.add('spin');setTimeout(()=>{s.classList.remove('spin');toast('Lista actualizada')},650)};
  $('#psz').onchange=e=>{S.size=+e.target.value;render()};
}

function docsOf(p){return getDocs(p)}
function vPros1(){
  const p=PROS.find(x=>x.ruc===S.sel);if(!p){return vPros()}
  const s=SUNAT[p.ruc]||{estado:'—',cond:'—',dom:'—',act:'—',inicio:'—'};
  const docsAll=docsOf(p);
  const docsTab=docsAll.filter(d=>d.grp===S.tab.docs);
  const ob=docsAll.filter(d=>d.ob),cg=ob.filter(d=>d.st!=='Pendiente').length;
  const stc={Pendiente:'st-pend','Por revisar':'st-rev',Aprobado:'st-ok'};
  const dco={Pendiente:'#8795a8','Por revisar':'#7c3aed',Aprobado:'#0f9d6a'};
  const inv=p.estado!=='Registrado';
  const pill=(k,l)=>`<button class="pill ${S.tab.docs===k?'on':''}" data-tdoc="${k}">${l}</button>`;
  const rubros=['Transportistas', 'Contratistas', 'Insumos', 'Químicos', 'Intermediación Laboral', 'Explosivos'];
  const selRubro=`<select class="inp" id="selRubro" style="height:36px;font-size:14px;padding:0 8px;flex:1"><option value="">Seleccione el rubro del proveedor...</option>${rubros.map(r=>`<option ${p.rubro===r?'selected':''}>${r}</option>`).join('')}</select>`;
  return `<div class="pros-fixed-layout">
  <button class="back" id="bk">${ic('back')}Prospectos</button>
  <div class="card ph"><div class="r1"><div><h2>${esc(p.razon)}</h2>
    <div class="meta"><span><span class="mono" style="color:#667085">${p.tipo==='Nacional'?'RUC':'ID'}</span> <span class="mono">${p.ruc}</span></span><span class="badge b-info" style="font-size:13px">${p.tipo}</span><span><span class="dot" style="background:${ESTADOS[p.estado]}"></span>${p.estado}</span></div>
    <div class="ct"><span>${ic('phone')}${p.cel?`<b>${p.cel}</b>`:'Sin celular'}</span><span>${ic('mail')}${p.email?`<b>${esc(p.email)}</b>`:'Sin correo'}<button class="ibtn" id="ed" title="Editar contacto">${ic('pen')}</button></span></div></div>
    <div style="display:flex;gap:10px">
      <button class="btn o sm" id="dsc">Descartar prospecto</button>
      <select class="inp" id="updSt" style="height:36px;font-size:14px;padding:0 8px"><option value="">Dictaminar...</option><option>Aceptado</option><option>Observado</option><option>Rechazado</option><option>Bloqueado</option></select>
    </div>
  </div></div>
  <div class="det">
   <div class="col col-scroll">
    ${p.tipo==='Nacional'?`<div class="card pc"><div class="hd"><h3>${ic('bld')}SUNAT</h3></div>
      <div class="two"><div class="fld"><small>Estado</small><div>${s.estado}</div></div><div class="fld"><small>Condición</small><div>${s.cond}</div></div></div>
      <div class="two"><div class="fld"><small>Inicio act.</small><div>${s.inicio}</div></div><div class="fld"><small>Domicilio fiscal</small><div>${esc(s.dom)}</div></div></div>
      <div class="fld"><small>Actividad principal</small><div>${esc(s.act)}</div></div></div>`:''}
    <div class="card pc"><div class="hd"><h3>${ic('mail')}Acceso del proveedor</h3>${inv?'':`<button class="lnk" id="inv">${ic('send')}Invitar proveedor</button>`}</div>
      <div class="mu">${inv?`Proveedor invitado${p.email?' a '+esc(p.email):''}. Podrá activar su cuenta y subir sus documentos.`:'Aún no se invitó al proveedor. Al invitarlo recibirá un correo para activar su cuenta y subir sus documentos.'}</div>
      ${inv?`<button class="btn sm o" style="margin-top:10px" onclick="toast('Correo de reseteo de contraseña enviado')">Resetear contraseña</button>`:''}</div>
    <div class="card pc"><div class="hd"><h3>${ic('users')}Contactos del proveedor</h3><span class="badge b-info">NUEVO</span></div>
      <div class="mu" style="margin-top:6px"><b>Comercial:</b> Asesor, Jefe, Operaciones<br><b>Contable:</b> Contabilidad, Finanzas</div>
      <button class="lnk" style="margin-top:10px">${ic('plus')} Añadir contactos</button></div>
    <div class="card pc"><div class="hd"><h3>${ic('tag')}Categorías de producto</h3><button class="lnk" id="ec">${ic('pen')}Editar</button></div>
      ${p.cats.length?p.cats.map(c=>`<div class="catl"><i>${c}</i>${esc(segName(c))}</div>`).join(''):'<div class="mu">Sin categorías.</div>'}</div>
    <div class="card pc"><div class="hd"><h3>${ic('bld')}Información Bancaria</h3><span class="badge b-info">NUEVO</span></div>
      <div class="mu" style="margin-top:6px">Estructura esperada para <b>${p.tipo}</b>:<br>${p.tipo==='Nacional'?'Banco, Tipo, Cuenta, CCI, Titular':'Banco, Cuenta, SWIFT, Titular'}</div>
      <button class="lnk" style="margin-top:10px">${ic('plus')} Añadir cuenta</button></div>
    <div class="card pc"><div class="hd"><h3>${ic('check')}Evaluación Externa</h3><span class="badge b-info">NUEVO</span></div>
      <div class="two" style="margin-top:10px">
        <div style="padding:10px;border:1px solid var(--line);border-radius:8px"><b>SENTINEL</b><br><span class="badge b-grey">Pendiente</span></div>
        <div style="padding:10px;border:1px solid var(--line);border-radius:8px"><b>CUMPLO 360</b><br><span class="badge b-grey">Pendiente</span></div>
      </div>
      <button class="btn sm p" style="margin-top:12px;width:100%">Ejecutar evaluación automática</button></div>
    <div class="card pc"><div class="hd"><h3 style="gap:10px"><span style="color:#ea7a1c;display:flex">${ic('msg')}</span>Observaciones y notas</h3></div>
      ${p.notas.length?`<ul class="notes">${p.notas.map(n=>`<li>${esc(n.t)}<small>${esc(n.f)} · Paul Andrade</small></li>`).join('')}</ul>`:'<div class="mu">Sin observaciones ni notas.</div>'}
      <textarea class="nota" id="nt" placeholder="Agregar una nota interna (el proveedor no la ve)"></textarea>
      <button class="btn sm" id="an" style="margin-top:8px;color:#9aa6b6" disabled>${ic('plus')}Agregar nota</button></div>
   </div>
   <div class="col col-static">
   <div class="card doc-t"><div class="doc-h"><h3>${ic('lchk')}Documentos requeridos</h3><span>${cg} de ${ob.length} obligatorios cargados</span></div>
    <div class="pills" style="padding:10px 14px 0">${pill('Base','Base')} ${pill('Por Tipo','Por Tipo')} ${pill('Adicionales','Adicionales')}</div>
    ${S.tab.docs==='Por Tipo'?`<div style="padding:14px 14px 0;display:flex;align-items:center;gap:10px"><label class="lbl" style="margin:0;white-space:nowrap">Tipo de proveedor:</label>${selRubro}</div>`:''}
    <div class="tw"><table class="tbl"><thead><tr><th>Código</th><th>Documento</th><th>Requisito</th><th>¿Subido?</th><th>Estado</th><th>Acción</th></tr></thead><tbody>
    ${docsTab.map(d=>{
      const sub = d.st !== 'Pendiente';
      const tag = sub ? '<span style="color:#0f9d6a;font-weight:600">Sí</span>' : '<span style="color:#e02424;font-weight:600">No</span>';
      const btnNotif = `<button class="btn sm o" style="font-size:12px;padding:2px 8px;border-radius:4px" onclick="toast('Se notificó al proveedor la falta de: ${esc(d.n)}')">Notificar</button>`;
      const btnActions = `<div style="display:flex;gap:6px;align-items:center"><button class="ibtn" title="Ver documento" onclick="toast('Abriendo visor para: ${esc(d.n)}')">${ic('eye')}</button><button class="ibtn" style="color:#0f9d6a" title="Aprobar" onclick="toast('Documento aprobado')">${ic('check')}</button><button class="ibtn" style="color:#ea580c" title="Observar" onclick="toast('Documento observado')">${ic('warn')}</button><button class="ibtn" style="color:#e02424" title="Rechazar" onclick="toast('Documento rechazado')">${ic('x')}</button></div>`;
      const btn = !sub ? btnNotif : btnActions;
      return `<tr><td class="cod">${d.c}</td><td>${d.n}</td><td><span class="badge ${d.ob?'b-warn':'b-grey'}">${d.ob?'Obligatorio':'Opcional'}</span></td><td>${tag}</td><td class="${stc[d.st]}"><span class="dot" style="background:${dco[d.st]}"></span>${d.st}</td><td>${btn}</td></tr>`;
    }).join('')}
    ${docsTab.length===0?'<tr><td colspan="4" style="text-align:center;padding:30px;color:var(--mut)">No hay documentos en esta pestaña.</td></tr>':''}
    </tbody></table></div></div>
   </div>
  </div>
  </div>`;
}
function bindPros1(){
  const p=PROS.find(x=>x.ruc===S.sel);if(!p)return;
  $('#bk').onclick=()=>go('prospectos');
  $('#ed').onclick=()=>openContact(p);
  $('#ec').onclick=()=>openCats(p);
  $('#dsc').onclick=()=>openDiscard(p);
  const iv=$('#inv');if(iv)iv.onclick=()=>{
    if(!p.email){toast('Agrega un correo al prospecto antes de invitar');openContact(p);return}
    p.estado='Invitado';toast('Invitación enviada a '+p.email);render()};
  const nt=$('#nt'),an=$('#an');
  nt.oninput=()=>{const ok=nt.value.trim().length>0;an.disabled=!ok;an.style.color=ok?'':'#9aa6b6'};
  an.onclick=()=>{p.notas.push({t:nt.value.trim(),f:now()});render()};
  document.querySelectorAll('[data-tdoc]').forEach(b=>b.onclick=()=>{S.tab.docs=b.dataset.tdoc;render()});
  const us=$('#updSt');if(us)us.onchange=e=>{const v=e.target.value;if(v){p.estado=v;toast('Estado actualizado a '+v);render()}};
  const sr=$('#selRubro');if(sr)sr.onchange=e=>{p.rubro=e.target.value;toast('Rubro actualizado a '+p.rubro);render()};
}

function vBandeja(){
  const rev=PROS.filter(p=>p.estado==='En revisión');
  const t=S.tab.bandeja;
  const list=t==='rev'||t==='todos'?rev:[];
  const pill=(k,l,n)=>`<button class="pill ${t===k?'on':''}" data-t="${k}">${l} <span>(${n})</span></button>`;
  const rows=list.map(p=>{const d=docsOf(p).filter(x=>x.ob);const a=d.filter(x=>x.st==='Aprobado').length,r=d.filter(x=>x.st==='Por revisar').length,o=d.filter(x=>x.st==='Observado').length;
    return `<tr data-ruc="${p.ruc}"><td class="mono">${p.ruc}</td><td class="rz">${esc(p.razon)}</td><td class="cc">${p.tipo}</td><td class="cc"><span class="dot" style="background:${ESTADOS[p.estado]};margin-right:6px"></span>${p.estado}</td><td class="cc">nº ${p.envio||1}</td><td class="cc">${p.ultimo||p.fecha}</td>
    <td><span style="color:#0f9d6a">${a} aprobados</span> · <span style="color:#7c3aed">${r} por revisar</span> · <span style="color:#ea580c">${o} observados</span> <span style="color:#8795a8">/ ${d.length}</span></td></tr>`}).join('');
  return `<div class="head"><div><h1 class="pt">${ic('inbox')}Bandeja de revisión</h1><p class="sub-t">Expedientes de homologación enviados por los proveedores.</p></div>
    <div class="btns"><button class="btn" id="rf">${ic('refresh')}Refrescar</button></div></div>
  <div class="pills">${pill('rev','Por revisar',rev.length)}${pill('apr','En aprobación',0)}${pill('dev','Devueltos al proveedor',0)}${pill('todos','Todos',rev.length)}</div>
  <div class="card tw"><table class="tbl"><thead><tr><th>RUC</th><th>Razón social</th><th>Tipo</th><th>Estado</th><th>Envío</th><th>Último envío</th><th>Avance de revisión</th></tr></thead>
  <tbody>${rows||`<tr><td colspan="7"><div class="empty">${ic('inbox')} No hay expedientes en esta vista.</div></td></tr>`}</tbody></table>${pagerHTML()}</div>`;
}
function bindBandeja(){
  document.querySelectorAll('tr[data-ruc]').forEach(tr=>tr.onclick=()=>go('prospecto',tr.dataset.ruc));
  document.querySelectorAll('.pill').forEach(b=>b.onclick=()=>{S.tab.bandeja=b.dataset.t;render()});
  $('#rf').onclick=()=>{const s=$('#rf svg');s.classList.add('spin');setTimeout(()=>{s.classList.remove('spin');toast('Bandeja actualizada')},650)};
  $('#psz').onchange=e=>{S.size=+e.target.value;render()};
}
function vSolic(){
  const t=S.tab.solic;
  const pill=(k,l)=>`<button class="pill ${t===k?'on':''}" data-t="${k}">${l} <span>(${SOLIC.length})</span></button>`;
  return `<div class="head"><div><h1 class="pt">${ic('msg')}Solicitudes</h1><p class="sub-t">Cambios que piden los proveedores sobre documentos ya enviados y documentos adicionales que se les solicitan. Para pedir un documento adicional, entra al detalle del prospecto.</p></div>
    <div class="btns"><button class="btn" id="rf">${ic('refresh')}Refrescar</button></div></div>
  <div class="pills">${pill('cambios','Cambios por resolver')}${pill('docs','Documentos pedidos')}${pill('abiertas','Abiertas')}${pill('todas','Todas')}</div>
  <div class="card tw"><table class="tbl"><thead><tr><th>Proveedor</th><th>Tipo</th><th>Documento</th><th>Motivo</th><th>Estado</th><th>Fecha límite</th></tr></thead>
  <tbody><tr><td colspan="6"><div class="empty">${ic('inbox')}No hay solicitudes en esta vista.</div></td></tr></tbody></table>${pagerHTML()}</div>`;
}
function bindSolic(){
  document.querySelectorAll('.pill').forEach(b=>b.onclick=()=>{S.tab.solic=b.dataset.t;render()});
  $('#rf').onclick=()=>{const s=$('#rf svg');s.classList.add('spin');setTimeout(()=>{s.classList.remove('spin');toast('Solicitudes actualizadas')},650)};
  $('#psz').onchange=e=>{S.size=+e.target.value;render()};
}
function vCats(){
  return `<h1 class="pt">${ic('tag')}Categorías de producto</h1><p class="sub-t">Pantalla del menú Configuración. No venía en las capturas, queda pendiente de replicar.</p>
  <div class="card ph-box">${ic('tag',28)}<p style="margin:10px 0 0">Sin captura de referencia.</p></div>`;
}

/* ============ Modales ============ */
function openModal(html){const o=$('#ov');o.innerHTML=html;o.classList.add('on');o.onmousedown=e=>{if(e.target===o)closeModal()};}
function closeModal(){const o=$('#ov');o.classList.remove('on');o.innerHTML=''}
addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

function catPicker(sel,onchange){
  /* devuelve HTML + binder */
  return {
   html:`<div class="qq">¿Qué bienes o servicios ofrece?</div>
    <div class="qs">Según las categorías se piden documentos adicionales. Puedes completarlas después desde el prospecto.</div>
    <div class="chips" id="chips"></div>
    <input class="mi" id="cq" placeholder="Buscar por código o nombre (ej. transporte, 78)" autocomplete="off">
    <button class="seg-all" id="sa" type="button">Todos los segmentos</button>
    <div class="list" id="cl"></div>`,
   bind(){
     const draw=()=>{
       const q=norm($('#cq').value.trim());
       const items=SEG.filter(s=>!q||norm(s.n).includes(q)||(s.c+'000000').includes(q)||s.c.startsWith(q));
       $('#cl').innerHTML=items.map(s=>`<div class="row ${sel.has(s.c)?'on':''}" data-c="${s.c}"><span class="cb">${ic('tick')}</span><span class="cd">${s.c}000000</span><span class="nm">${esc(s.n)}</span>${s.crit?'<span class="cr">Crítica</span>':''}</div>`).join('')||'<div class="empty" style="padding:30px 0;font-size:14px">Sin resultados.</div>';
       $('#cl').querySelectorAll('.row').forEach(r=>r.onclick=()=>{const c=r.dataset.c;sel.has(c)?sel.delete(c):sel.add(c);draw();chips();onchange&&onchange()});
     };
     const chips=()=>{
       $('#chips').innerHTML=sel.size?[...sel].map(c=>`<span class="chip">${c} · ${esc(segName(c).slice(0,38))}${segName(c).length>38?'…':''}<button data-x="${c}">${ic('x')}</button></span>`).join(''):'Aún no elegiste categorías.';
       $('#chips').querySelectorAll('[data-x]').forEach(b=>b.onclick=e=>{e.stopPropagation();sel.delete(b.dataset.x);draw();chips();onchange&&onchange()});
     };
     $('#cq').oninput=draw;$('#sa').onclick=()=>{$('#cq').value='';draw()};
     draw();chips();
   }};
}
function openHom(ruc,res){
  const sel=new Set();
  const ex=PROS.find(p=>p.ruc===ruc);if(ex)ex.cats.forEach(c=>sel.add(c));
  const cp=catPicker(sel);
  openModal(`<div class="modal"><div class="mh"><h2>Homologación</h2><button class="xb" id="mx">${ic('x')}</button></div>
   <div class="mb"><div class="pv"><small>Proveedor</small><b>${esc(res.razon)}</b><div class="mono">${ruc}</div></div>
   <div class="f2"><div><label>Celular de contacto</label><input class="mi" id="mc" placeholder="9XXXXXXXX" maxlength="9" inputmode="numeric" value="${esc(ex?ex.cel:'')}"></div>
   <div><label>Correo (recibirá la invitación)</label><input class="mi" id="me" placeholder="contacto@empresa.com" value="${esc(ex?ex.email:'')}"></div></div>
   ${cp.html}</div>
   <div class="mf"><button class="mbtn" id="mcn">Cancelar</button><button class="mbtn p" id="mok" disabled>${ic('tick')}Crear prospecto</button></div></div>`);
  cp.bind();
  const chk=()=>{const okE=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($('#me').value.trim());const c=$('#mc').value.trim();const okC=!c||/^9\d{8}$/.test(c);
    $('#me').classList.toggle('bad',$('#me').value.length>0&&!okE);$('#mc').classList.toggle('bad',!okC);$('#mok').disabled=!(okE&&okC)};
  $('#me').oninput=chk;$('#mc').oninput=e=>{e.target.value=e.target.value.replace(/\D/g,'');chk()};chk();
  $('#mx').onclick=$('#mcn').onclick=closeModal;
  $('#mok').onclick=()=>{
    const cel=$('#mc').value.trim(),email=$('#me').value.trim(),cats=[...sel];
    let p=PROS.find(x=>x.ruc===ruc);
    if(p){p.cel=cel;p.email=email;p.cats=cats;toast('Prospecto actualizado')}
    else{p={ruc,razon:res.razon,tipo:'Jurídica',cats,estado:'Registrado',resp:'Paul Andrade',cel,fecha:now(),email,notas:[]};PROS.unshift(p);toast('Prospecto creado')}
    closeModal();go('prospecto',ruc);
  };
}
function openCats(p){
  const sel=new Set(p.cats),cp=catPicker(sel);
  openModal(`<div class="modal"><div class="mh"><h2>Categorías de producto</h2><button class="xb" id="mx">${ic('x')}</button></div>
   <div class="mb"><div class="pv"><small>Proveedor</small><b>${esc(p.razon)}</b></div>${cp.html}</div>
   <div class="mf"><button class="mbtn" id="mcn">Cancelar</button><button class="mbtn p" id="mok">${ic('tick')}Guardar</button></div></div>`);
  cp.bind();$('#mx').onclick=$('#mcn').onclick=closeModal;
  $('#mok').onclick=()=>{p.cats=[...sel];closeModal();toast('Categorías actualizadas');render()};
}
function openContact(p){
  openModal(`<div class="modal"><div class="mh"><h2>Datos de contacto</h2><button class="xb" id="mx">${ic('x')}</button></div>
   <div class="mb"><div class="f2"><div><label>Celular de contacto</label><input class="mi" id="mc" placeholder="9XXXXXXXX" maxlength="9" value="${esc(p.cel)}"></div>
   <div><label>Correo (recibirá la invitación)</label><input class="mi" id="me" placeholder="contacto@empresa.com" value="${esc(p.email)}"></div></div></div>
   <div class="mf"><button class="mbtn" id="mcn">Cancelar</button><button class="mbtn p" id="mok">${ic('tick')}Guardar</button></div></div>`);
  $('#mx').onclick=$('#mcn').onclick=closeModal;
  $('#mc').oninput=e=>e.target.value=e.target.value.replace(/\D/g,'');
  $('#mok').onclick=()=>{const e=$('#me').value.trim(),c=$('#mc').value.trim();
    if(e&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){$('#me').classList.add('bad');return}
    if(c&&!/^9\d{8}$/.test(c)){$('#mc').classList.add('bad');return}
    p.email=e;p.cel=c;closeModal();toast('Contacto actualizado');render()};
}
function openDiscard(p){
  openModal(`<div class="modal" style="width:min(460px,100%)"><div class="mh"><h2>Descartar prospecto</h2><button class="xb" id="mx">${ic('x')}</button></div>
   <div class="mb"><p style="margin:6px 0;line-height:1.5;font-size:15px">Se quitará <b>${esc(p.razon)}</b> de la lista de prospectos. Esta acción no se puede deshacer.</p></div>
   <div class="mf"><button class="mbtn" id="mcn">Cancelar</button><button class="mbtn d" id="mok">Descartar</button></div></div>`);
  $('#mx').onclick=$('#mcn').onclick=closeModal;
  $('#mok').onclick=()=>{PROS=PROS.filter(x=>x.ruc!==p.ruc);closeModal();toast('Prospecto descartado');go('prospectos')};
}

/* ============ Render ============ */
function render(){
  renderNav();
  const v=$('#view');
  const m={ruc:[vRuc,bindRuc],prospectos:[vPros,bindPros],prospecto:[vPros1,bindPros1],bandeja:[vBandeja,bindBandeja],solicitudes:[vSolic,bindSolic],categorias:[vCats,()=>{}]}[S.route];
  v.innerHTML=m[0]();m[1]();
}

/* ============ Topbar ============ */
$('#burger').innerHTML=ic('menu');$('#sIc').innerHTML=ic('search',20);
$('#burger').onclick=()=>$('#side').classList.toggle('hide');
$('#coB').innerHTML=ic('bld')+'<span>LA JOYA COMERCIAL SAC</span>'+ic('down');
$('#coB .i').classList.add('b');
$('#coM').innerHTML=`<div>${ic('check')} LA JOYA COMERCIAL SAC</div>`;
$('#coB').onclick=e=>{e.stopPropagation();$('#coM').classList.toggle('on')};
document.addEventListener('click',()=>{$('#coM').classList.remove('on');$('#sdd').classList.remove('on')});
function setTheme(t){document.documentElement.dataset.theme=t;$('#theme').innerHTML=ic(t==='dark'?'sun':'moon')}
setTheme('light');
$('#theme').onclick=()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');
const FEATS=[['ruc','Consulta RUC','search'],['prospectos','Prospectos','users'],['bandeja','Bandeja de revisión','inbox'],['solicitudes','Solicitudes','msg'],['categorias','Categorías de producto','tag']];
function sdd(){
  const q=norm($('#sq').value.trim());
  const r=FEATS.filter(f=>!q||norm(f[1]).includes(q));
  $('#sdd').innerHTML=r.length?r.map(f=>`<button data-f="${f[0]}">${ic(f[2])}${f[1]}</button>`).join(''):'<div class="em">Sin resultados.</div>';
  $('#sdd').classList.add('on');
  $('#sdd').querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{$('#sq').value='';$('#sdd').classList.remove('on');go(b.dataset.f)});
}
$('#sq').oninput=sdd;$('#sq').onfocus=sdd;$('#sq').onclick=e=>e.stopPropagation();
$('#sdd').onclick=e=>e.stopPropagation();
if(innerWidth<=900)$('#side').classList.add('hide');
render();

