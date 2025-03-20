# Prueba Técnica - Sistema de Gestión de Inventario

Este proyecto implementa un sistema completo de gestión de inventario con una arquitectura de microservicios en el backend y una interfaz de usuario moderna desarrollada en Angular.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Requisitos](#requisitos)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Backend](#backend)
  - [ProductService](#productservice)
  - [TransactionService](#transactionservice)
  - [Endpoints](#endpoints)
- [Frontend](#frontend)
  - [Características](#características)
  - [Configuración e Instalación](#configuración-e-instalación)
  - [Estructura de Componentes](#estructura-de-componentes)
- [Ejecución del Proyecto Completo](#ejecución-del-proyecto-completo)
- [Estructura del Repositorio](#estructura-del-repositorio)
- [Autor](#autor)

## Descripción General

El sistema de gestión de inventario consta de:

- **Backend**: Dos microservicios desarrollados en ASP.NET Core:
  - **ProductService**: Gestiona el catálogo de productos
  - **TransactionService**: Maneja las transacciones (compras y ventas) y actualiza el inventario
- **Frontend**: Aplicación Angular con componentes standalone que proporciona una interfaz de usuario intuitiva para gestionar productos y transacciones.

Ambos componentes se comunican a través de API REST y utilizan una base de datos SQL Server para el almacenamiento de datos.

## Requisitos

- **Backend**:
  - [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
  - [SQL Server](https://www.microsoft.com/es-es/sql-server/sql-server-downloads) o SQL Server Express
  - [Visual Studio 2022](https://visualstudio.microsoft.com/es/) o [Visual Studio Code](https://code.visualstudio.com/)
- **Frontend**:
  - [Node.js](https://nodejs.org/) (v14 o superior)
  - [Angular CLI](https://angular.io/cli) (v15 o superior)
  - Navegador web moderno (Chrome, Firefox, Edge)

## Configuración de la Base de Datos

1. Abre **SQL Server Management Studio (SSMS)** y conéctate a tu servidor local.
2. Ejecuta el script SQL `crearBDD.sql` ubicado en la carpeta `BDD` del proyecto.
3. Verifica que la base de datos `InventoryDB` y sus tablas se hayan creado correctamente.

## Backend

### ProductService

Este microservicio gestiona todas las operaciones relacionadas con productos:

- Crear, leer, actualizar y eliminar productos
- Gestionar información como nombre, descripción, categoría, precio y stock

#### Ejecución:

```shellscript
cd ProductService
dotnet restore
dotnet run
```

El servicio estará disponible en: `https://localhost:7022/`

### TransactionService

Este microservicio gestiona todas las operaciones relacionadas con transacciones:

- Registrar compras y ventas de productos
- Actualizar automáticamente el stock de productos
- Mantener un historial de transacciones

#### Ejecución:

```shellscript
cd TransactionService
dotnet restore
dotnet run
```

El servicio estará disponible en: `https://localhost:7283/`

### Endpoints

#### ProductService Endpoints

- `GET /api/Product` - Obtener todos los productos
- `GET /api/Product/{id}` - Obtener un producto por ID
- `POST /api/Product` - Crear un nuevo producto
- `PUT /api/Product/{id}` - Actualizar un producto existente
- `DELETE /api/Product/{id}` - Eliminar un producto

#### TransactionService Endpoints

- `GET /api/Transaction` - Obtener todas las transacciones
- `GET /api/Transaction/{id}` - Obtener una transacción por ID
- `POST /api/Transaction` - Crear una nueva transacción (compra o venta)
- `PUT /api/Transaction/{id}` - Actualizar una transacción existente
- `DELETE /api/Transaction/{id}` - Eliminar una transacción

## Frontend

El frontend está desarrollado en Angular utilizando componentes standalone, lo que proporciona una arquitectura moderna y eficiente.

### Características

- **Diseño Responsive**: Interfaz adaptable a diferentes dispositivos
- **Componentes Standalone**: Arquitectura moderna de Angular
- **Formularios Reactivos**: Validación de datos en tiempo real
- **Gestión de Estado**: Manejo eficiente del estado de la aplicación
- **Navegación Intuitiva**: Sistema de rutas para una experiencia de usuario fluida
- **Feedback Visual**: Indicadores de carga y mensajes de éxito/error

### Configuración e Instalación

1. Navega al directorio del frontend:

```shellscript
cd frontend/gestion-productos
```

2. Instala las dependencias:

```shellscript
npm install
```

3. Ejecuta la aplicación:

```shellscript
ng serve
```

La aplicación estará disponible en: `http://localhost:4200/`

### Estructura de Componentes

- **Home**: Página principal con información del proyecto
- **Productos**:
  - Lista de productos
  - Detalle de producto
  - Formulario de creación/edición de productos
- **Transacciones**:
  - Lista de transacciones
  - Detalle de transacción
  - Formulario de registro de transacciones

## Ejecución del Proyecto Completo

Para ejecutar el proyecto completo, sigue estos pasos:

1. Inicia el ProductService:

```shellscript
cd ProductService
dotnet run
```

2. Inicia el TransactionService:

```shellscript
cd TransactionService
dotnet run
```

3. Inicia el frontend:

```shellscript
cd frontend/gestion-productos
ng serve
```

4. Abre tu navegador y navega a `http://localhost:4200/`

## Estructura del Repositorio

```plaintext
/pruebaTecnicaNetby
│── ProductService/
│── TransactionService/
│── frontend/
│   └── gestion-productos/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   ├── models/
│       │   │   ├── services/
│       │   │   └── ...
│       │   ├── assets/
│       │   └── ...
│       └── ...
│── BDD/
│   └── crearBDD.sql
│── README.md
└── .gitignore
```

## Autor

**Paul Sanchez**

- GitHub: [https://github.com/Paulfriki55](https://github.com/Paulfriki55)
- LinkedIn: [https://www.linkedin.com/in/paul-sanchez-955204271/](https://www.linkedin.com/in/paul-sanchez-955204271/)
- Repositorio del Proyecto: [https://github.com/Paulfriki55/pruebaTecnicaNetby](https://github.com/Paulfriki55/pruebaTecnicaNetby)

---

Este proyecto fue desarrollado como parte de una prueba técnica para demostrar habilidades en el desarrollo de aplicaciones web utilizando ASP.NET Core y Angular.