// src/app/components/transaction-list/transaction-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  loading = false;
  error: string | null = null;
  
  // Filtros
  productIdFilter: string = '';
  detailFilter: string = '';
  transactionType: string = 'todos';

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading = true;
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.filteredTransactions = [...this.transactions];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las transacciones: ' + err.message;
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredTransactions = this.transactions.filter(transaction => {
      // Filtro por ID de producto
      if (this.productIdFilter && 
          !transaction.productId.toString().includes(this.productIdFilter)) {
        return false;
      }
      
      // Filtro por detalle
      if (this.detailFilter && 
          !transaction.detail.toLowerCase().includes(this.detailFilter.toLowerCase())) {
        return false;
      }
      
      // Filtro por tipo de transacción
      if (this.transactionType !== 'todos' && 
          transaction.transactionType !== this.transactionType) {
        return false;
      }
      
      return true;
    });
  }

  resetFilters(): void {
    this.productIdFilter = '';
    this.detailFilter = '';
    this.transactionType = 'todos';
    this.filteredTransactions = [...this.transactions];
  }

  deleteTransaction(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta transacción?')) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => {
          this.transactions = this.transactions.filter(transaction => transaction.id !== id);
          this.filteredTransactions = this.filteredTransactions.filter(transaction => transaction.id !== id);
        },
        error: (err) => {
          this.error = 'Error al eliminar la transacción: ' + err.message;
        }
      });
    }
  }

  getTransactionTypeClass(type: string): string {
    return type === 'venta' ? 'badge bg-success' : 'badge bg-primary';
  }
}