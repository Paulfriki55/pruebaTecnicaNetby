-- Creación de la base de datos
CREATE DATABASE InventoryDB;
GO

USE InventoryDB;
GO

-- Tabla de Productos
CREATE TABLE Products (
  Id INT PRIMARY KEY IDENTITY(1,1),
  Name NVARCHAR(100) NOT NULL,
  Description NVARCHAR(MAX),
  Category NVARCHAR(50),
  Image NVARCHAR(255),
  Price DECIMAL(18,2) NOT NULL,
  Stock INT NOT NULL
);
GO

-- Tabla de Transacciones
CREATE TABLE Transactions (
  Id INT PRIMARY KEY IDENTITY(1,1),
  Date DATETIME NOT NULL DEFAULT GETDATE(),
  TransactionType NVARCHAR(10) NOT NULL, -- 'Compra' o 'Venta'
  ProductId INT NOT NULL,
  Quantity INT NOT NULL,
  UnitPrice DECIMAL(18,2) NOT NULL,
  TotalPrice DECIMAL(18,2) NOT NULL,
  Detail NVARCHAR(MAX),
  CONSTRAINT FK_Transactions_Products FOREIGN KEY (ProductId) REFERENCES Products(Id)
);
GO
