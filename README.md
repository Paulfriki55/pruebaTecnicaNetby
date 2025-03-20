# Inventory Management Microservices

Esta solución de backend para la gestión de inventarios utiliza una arquitectura de microservicios con dos proyectos principales:

- **ProductService:** Gestiona productos (crear, editar, listar, eliminar).
- **TransactionService:** Gestiona transacciones de inventario (compras y ventas) y ajusta el stock de productos.

Ambos microservicios se conectan a una base de datos SQL Server llamada `InventoryDB`, alojada en el servidor `DESKTOP-ANBETID`, usando el usuario `sa` y la contraseña `Paulfriki55`.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Ejecución del Backend](#ejecución-del-backend)
  - [ProductService](#productservice)
  - [TransactionService](#transactionservice)
- [Endpoints](#endpoints)
- [Pruebas](#pruebas)
- [Estructura del Repositorio](#estructura-del-repositorio)
- [.gitignore](#gitignore)
- [Licencia](#licencia)

## Requisitos

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [SQL Server](https://www.microsoft.com/es-es/sql-server/sql-server-downloads) o SQL Server Express
- [Visual Studio 2022](https://visualstudio.microsoft.com/es/) o [Visual Studio Code](https://code.visualstudio.com/)

## Configuración de la Base de Datos

1. Abre **SQL Server Management Studio (SSMS)** y conéctate al servidor local de preferencia, y carga el script que se encuentra en la raiz del proecto llamado:
crearBDD.sql en la carpeta BDD, ejecutalo y asegurate de que las tablas se han creado exitosamente en la base de datos InventoryDB