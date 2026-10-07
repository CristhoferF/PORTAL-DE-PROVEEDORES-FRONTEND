
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
  list.push({c:'ADD 03',n:'Cartas de representación',ob:0,grp:'Adicionales'});
  list.push({c:'ADD 04',n:'Otros (A solicitud de Compliance/Logística)',ob:0,grp:'Adicionales'});
  if (p._docs) return p._docs;
  const rev=p.estado==='En revisión'||p.estado==='En evaluación';
  p._docs = list.map((d,i)=>({...d,st:rev&&d.ob?(i===0?'Aprobado':'Por revisar'):'Pendiente'}));
  return p._docs;
}
const SOLIC=[];


const COTI=[
  {id:'RFQ-2026-045', titulo:'Adquisición de Cascos y Lentes de Seguridad', fecha:'03/10/2026', vence:'08/10/2026', estado:'Abierto', provs:3},
  {id:'RFQ-2026-042', titulo:'Repuestos para Perforadora', fecha:'28/09/2026', vence:'02/10/2026', estado:'Cerrado', provs:5}
];
const CC=[
  {id:'CC-2026-014', reqId:'RFQ-2026-045', estado:'Pendiente Aprob.', provGana:'GRUPO FREMAT S.A.C.', monto:'S/ 4,130.00', hist:{freq:true, compras:12, rating:'4.8/5'}},
  {id:'CC-2026-012', reqId:'RFQ-2026-042', estado:'Aprobado', provGana:'MINERA LUMAR E.I.R.L.', monto:'S/ 12,450.00', hist:{freq:false, compras:1, rating:'3.5/5'}}
];
const OC=[
  {
    id:'OC-2026-089', ccId:'CC-2026-014', prov:'GRUPO FREMAT S.A.C.', fecha:'04/10/2026 10:30:00 AM', estado:'Emitida',
    subtotal: 3500.00, impuestos: 630.00, monto: 'S/ 4,130.00',
    items: [
      { prod: 'Casco de seguridad tipo Jockey (Blanco)', desc: 'Certificado ANSI Z89.1', fecha: '10/10/2026', cant: '50.00', und: 'UND', precio: '30.00', imp: 'IGV 18%', sub: '1,500.00' },
      { prod: 'Lentes de Seguridad Anti-empañantes', desc: '3M', fecha: '10/10/2026', cant: '100.00', und: 'UND', precio: '20.00', imp: 'IGV 18%', sub: '2,000.00' }
    ]
  }
];
const RECEPCIONES_PENDIENTES = [
  { material: 'SKU 1', desc: 'Filtro de Aceite XJ-900', oc: '26PO0048', ingreso: '3485', cantidad: 5, pu: 2.50, subtotal: 12.50, tipo: 'bien' },
  { material: 'SKU 2', desc: 'Faja de Distribución', oc: '26PO0048', ingreso: '3485', cantidad: 8, pu: 3.00, subtotal: 24.00, tipo: 'bien' },
  { material: 'SKU 3', desc: 'Rodamiento Z-800', oc: '26PO0048', ingreso: '3485', cantidad: 4, pu: 12.00, subtotal: 48.00, tipo: 'bien' },
  { material: 'SKU 4', desc: 'Sello Mecánico', oc: '26PO0048', ingreso: '3485', cantidad: 2, pu: 6.00, subtotal: 12.00, tipo: 'bien' },
  { material: 'SERV-01', desc: 'Mantenimiento Preventivo', oc: '26PO0099', ingreso: '9921', cantidad: 1, pu: 1500.00, subtotal: 1500.00, tipo: 'servicio' }
];

const FAC=[
  {
    id:'F001-000452', ocId:'OC-2026-089', prov:'GRUPO FREMAT S.A.C.', monto:'113.87', moneda:'PEN', 
    fechaEmision:'13-May-2026', fechaVencimiento:'13-Jun-2026', estado:'PAGADO', 
    pago: { n_operacion: 'OP-99823', cuenta: 'BCP ***392', fecha: '14-Jun-2026' },
    retencion: { n_operacion: 'RET-112', cuenta: 'BN ***111', fecha: '14-Jun-2026' },
    detraccion: { n_operacion: 'DET-881', cuenta: 'BN ***222', fecha: '14-Jun-2026' },
    docs: { facPdf: 'ACEPTADO', facXml: 'ACEPTADO', grPdf: 'ACEPTADO', grXml: 'ACEPTADO', constancia: 'ACEPTADO' }
  },
  {
    id:'F001-000488', ocId:'OC-2026-088', prov:'MINERA LUMAR E.I.R.L.', monto:'12,450.00', moneda:'PEN', 
    fechaEmision:'05-Oct-2026', fechaVencimiento:'05-Nov-2026', estado:'EN REVISION',
    pago: null, retencion: null, detraccion: null,
    docs: { facPdf: 'EN REVISION', facXml: 'EN REVISION', grPdf: 'OBSERVADO', grXml: 'EN REVISION', constancia: 'EN REVISION' }
  }
];
