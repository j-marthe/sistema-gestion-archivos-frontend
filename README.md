# Sistema de Gestión de Archivos y Metadatos (Frontend)

## Descripción

Este es el **frontend** del sistema de gestión de archivos y metadatos. Está desarrollado con **Angular**, proporcionando una interfaz amigable para usuarios y administradores para gestionar archivos, metadatos y realizar acciones de auditoría.

---

## Tecnologías Utilizadas

* **Framework**: Angular
* **Lenguaje**: TypeScript
* **Estilos**: SCSS, Angular Material
* **Autenticación**: JWT
* **Consumo de APIs**: HttpClient
* **Control de versiones**: Git

---

## Funcionalidades Clave

* **Autenticación de Usuarios**
  Inicio de sesión seguro mediante JWT.

* **Gestión de Archivos**
  Subida, descarga, eliminación y restauración de versiones.

* **Visualización y Búsqueda**
  Filtros por categoría, metadatos y nombre.

* **Auditoría**
  Visualización de registros de actividad (descargas, modificaciones, etc.).

* **Roles y Permisos**
  Acceso condicional según el rol (Administrador, Usuario, Lector).

---

## Requisitos Previos

* Node.js v16 o superior
  [Descargar Node.js](https://nodejs.org)

* Angular CLI
  Instalar con:
  npm install -g @angular/cli

---

## Pasos para Ejecutar el Proyecto

1. **Clona el repositorio**

   git clone https://github.com/tu-usuario/sistema-gestion-archivos-frontend.git
   cd sistema-gestion-archivos-frontend


2. **Instala las dependencias**

   npm install


3. **Configura el entorno**
   
   Asegúrate de tener un archivo `src/environments/environment.ts`

4. **Levanta el servidor de desarrollo**

    ng serve

5. Accede en tu navegador a:
   [http://localhost:4200](http://localhost:4200)

---

## Scripts esenciales

* `ng serve` — Levanta el servidor local.
* `ng build` — Compila la app para producción.

---

## Comunicación con el Backend

Todos los endpoints se consumen desde la API ASP.NET Core mediante JWT. El token se guarda localmente y se envía con cada solicitud autenticada. Para más información visita el repositorio del [backend](https://github.com/j-marthe/sistema-gestion-archivos-backend) de esta misma aplicación 

---

### Licencia

Este proyecto está bajo la licencia **MIT**.

