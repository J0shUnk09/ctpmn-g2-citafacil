# CitaFácil

**Aplicación web para gestionar y organizar citas en pequeños negocios.**

[Ver aplicación publicada](https://ctpmn-g2-citafacil.vercel.app/)

## Descripción

CitaFácil es una aplicación web diseñada para facilitar la gestión de citas en pequeños negocios que ofrecen servicios con horarios definidos, como barberías, salones de belleza y otros establecimientos.

Permite consultar los servicios disponibles, reservar citas según los horarios de atención y administrar las reservas desde un panel de control. Su objetivo es simplificar la organización del negocio y evitar conflictos entre horarios.

El proyecto utiliza una barbería como negocio de demostración, pero su configuración permite adaptar los servicios, precios y horarios a otros tipos de establecimientos.

## Funcionalidades

### Página principal
- Presentación del negocio.
- Catálogo de servicios con descripción, duración y precio.
- Visualización de los horarios de atención.
- Acceso al formulario de reservas.

### Reservar una cita
- Formulario para registrar el nombre y teléfono del cliente.
- Selección de servicio y fecha.
- Consulta de horarios disponibles.
- Validación del teléfono (exactamente 8 dígitos).
- Validación de fechas y horarios.
- Prevención de reservas que se superpongan con otras citas.
- Confirmación de la reserva.

### Panel de administración
- Consulta de citas por fecha.
- Búsqueda por nombre o número de teléfono.
- Filtrado por estado.
- Edición de citas existentes.
- Confirmación y finalización de citas.
- Cancelación y eliminación de reservas.
- Resumen de citas activas y total estimado del día.

### Almacenamiento
- Las citas se guardan en `localStorage`.
- Los datos permanecen disponibles al recargar la página en el mismo navegador.
- No requiere una base de datos externa.

## Tecnologías utilizadas

- **React 19:** construcción de la interfaz mediante componentes.
- **Vite:** entorno de desarrollo y compilación.
- **JavaScript (ES6+):** lógica de la aplicación y manipulación de datos.
- **React Router:** navegación entre las páginas.
- **HTML5:** estructura semántica.
- **CSS3:** estilos, diseño adaptable, Flexbox y Grid.
- **localStorage:** persistencia local de las citas.
- **Git y GitHub:** control de versiones y organización del proyecto.
- **Vercel:** publicación de la aplicación.

## Instalación y ejecución local

### Requisitos
- Node.js
- npm
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/J0shUnk09/ctpmn-g2-citafacil.git
```

### 2. Entrar en la carpeta del proyecto

```bash
cd ctpmn-g2-citafacil
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación en el navegador.

### 5. Compilar para producción

```bash
npm run build
```

Para comprobar localmente la versión compilada:

```bash
npm run preview
```

## Configuración del negocio

La información del negocio de demostración se encuentra en:

- `src/data/businessConfig.js`: nombre, moneda, horarios de atención e intervalos de disponibilidad.
- `src/data/services.js`: catálogo de servicios, duración y precios.

Estos archivos pueden modificarse para adaptar la aplicación a otro establecimiento.

## Estructura general del proyecto

```text
ctpmn-g2-citafacil/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Consideraciones

- Esta versión utiliza `localStorage`, por lo que las citas se almacenan en el navegador donde se realizan.
- Los datos no se sincronizan entre distintos dispositivos o navegadores.
- El catálogo de servicios, precios y horarios corresponde a una configuración de demostración y puede modificarse en el código.
- El panel administrativo forma parte de la aplicación de demostración; no implementa autenticación de usuarios.

## Equipo de desarrollo

**Integrantes:**  
- [Nombre del integrante 1]
- [Nombre del integrante 2]
- [Nombre del integrante 3]

## Publicación

La aplicación está desplegada mediante Vercel:

[https://ctpmn-g2-citafacil.vercel.app/](https://ctpmn-g2-citafacil.vercel.app/)

---

Proyecto académico desarrollado con React y Vite.