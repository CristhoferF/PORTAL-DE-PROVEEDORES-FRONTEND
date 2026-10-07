# Portal de Proveedores - Grupo La Joya Mining

> 🚀 **Sitio Web / Demo en Vivo:**  
> 👉 **[https://portaldeproveedore.netlify.app/](https://portaldeproveedore.netlify.app/)**

Este repositorio contiene la demostración interactiva del **Portal de Proveedores** diseñado para Grupo La Joya Mining. Es una aplicación web orientada a gestionar y optimizar el proceso completo de interacción con los proveedores, desde su registro y homologación hasta el pago de sus facturas.

## 🚀 Tecnologías

La aplicación es un prototipo interactivo (Frontend) desarrollado con tecnologías web estándar. No requiere compilación ni instalación de dependencias, por lo que puede ejecutarse directamente en cualquier navegador web.

- **Estructura:** HTML5
- **Estilos:** CSS3 (Vanilla), con diseño responsivo, modo claro/oscuro y variables de diseño.
- **Lógica e Interactividad:** JavaScript (ES6+), renderizado dinámico del DOM y manipulación de estado.
- **Datos (Mock):** Manejado localmente en memoria a través de arreglos de objetos (`js/data.js`).

## 👥 Perfiles de Usuario

El sistema separa responsabilidades según el rol con el que se inicie sesión. En la pantalla de login puedes elegir ingresar como:

1. **Proveedor (Externo):** Puede ver el estado de su homologación, subir requisitos y adjuntos, ver requerimientos de cotización (RFQs) para enviar sus ofertas, y subir sus facturas y documentos de sustento.
2. **Aprobador (Interno):** Encargado de revisar las solicitudes de nuevos prospectos y dictaminar el estado de su homologación.
3. **Comprador (Interno):** Emite requerimientos de compra (RFQs), invita a proveedores, evalúa ofertas y aprueba los Cuadros Comparativos.
4. **Compliance (Interno):** Revisa aspectos legales y normativos de la homologación de los proveedores, verificando información externa (como Sentinel).
5. **Contabilidad (Interno):** Encargado de revisar que la documentación tributaria y de las facturas (XML, PDF, Guías de Remisión) esté correcta. Tienen la capacidad de **Aceptar** u **Observar** facturas y documentos individuales.
6. **Finanzas (Interno):** Encargado de desembolsos. Puede visualizar la bandeja de facturas y, una vez validadas por Contabilidad (estado "Aceptado"), tiene la potestad de **Marcar como Pagado**, actualizando las métricas globales del negocio.

## ⚙️ Módulos Principales

### 1. Homologación
- **Consulta RUC (SUNAT):** Permite buscar por RUC validando datos contra una simulación de la base de SUNAT y crear un nuevo prospecto. Permite la integración de proveedores **Nacionales** y **No Domiciliados**.
- **Gestión de Prospectos:** Bandejas de revisión para hacer seguimiento del avance en la homologación (En Revisión, Observado, Rechazado, Aceptado).
- **Control Documentario:** Interfaz para que el proveedor suba documentos segmentados por: *Documentos Base*, *Por Tipo de Proveedor* y *Adicionales*.

### 2. Compras
- **Cotizaciones (RFQ):** Los proveedores reciben una matriz de ítems solicitados y cargan sus propuestas técnicas, económicas y comerciales.
- **Cuadro Comparativo (CC):** Sistema matricial que compara las ofertas económicas recibidas y selecciona de forma automática (o manual) la mejor opción.
- **Órdenes de Compra (OC):** Se autogeneran tras la aprobación del Cuadro Comparativo. Los proveedores pueden aceptarlas o rechazarlas.

### 3. Facturación y Pagos
- **Registro de Facturas:** Se desglosan por bienes y servicios, permitiendo subir XML y PDF de manera obligatoria.
- **Bandeja de Facturación:** Tablero con indicadores (métricas de montos) mostrando el estado financiero general de las operaciones.
- **Flujo de Pagos Separado:** El equipo de Contabilidad da la conformidad de recepción y facturación (Aceptación), y el equipo de Finanzas simula la realización de la transferencia y registra el número de operación (Pago).

## 🛠️ Instalación y Uso

Dado que es una maqueta frontend en estado estático, no necesitas levantar un servidor complejo.

1. Clona este repositorio o descarga los archivos.
2. Abre la carpeta del proyecto.
3. Ejecuta el archivo `index.html` haciendo doble clic sobre él en tu navegador preferido (Google Chrome, Firefox, Edge, etc.).
4. Selecciona un perfil en la pantalla inicial e ingresa para probar las distintas capacidades de cada rol.

## 📂 Estructura del Proyecto

```text
/
├── css/
│   └── styles.css        # Hoja de estilos con modo claro/oscuro
├── image/                # Activos e imágenes del sistema
├── js/
│   ├── app.js            # Lógica general (Login, Router, Componentes globales, RUC)
│   ├── data.js           # Base de datos simulada y configuraciones de estado
│   └── modules.js        # Lógica de módulos (Homologación, CC, OC, Facturación)
├── index.html            # Punto de entrada de la aplicación
└── README.md             # Documentación
```
