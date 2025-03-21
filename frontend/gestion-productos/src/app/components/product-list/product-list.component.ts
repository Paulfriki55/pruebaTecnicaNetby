// src/app/components/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;
  error: string | null = null;
  
  // Filtros
  idFilter: string = '';
  nameFilter: string = '';
  categoryFilter: string = '';
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los productos: ' + err.message;
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      // Filtro por ID
      if (this.idFilter && 
          !product.id?.toString().includes(this.idFilter)) {
        return false;
      }
      
      // Filtro por nombre
      if (this.nameFilter && 
          !product.name.toLowerCase().includes(this.nameFilter.toLowerCase())) {
        return false;
      }
      
      // Filtro por categoría
      if (this.categoryFilter && 
          !product.category.toLowerCase().includes(this.categoryFilter.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }

  resetFilters(): void {
    this.idFilter = '';
    this.nameFilter = '';
    this.categoryFilter = '';
    this.filteredProducts = [...this.products];
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== id);
          this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);
        },
        error: (err) => {
          this.error = 'Error al eliminar el producto: ' + err.message;
        }
      });
    }
  }
}