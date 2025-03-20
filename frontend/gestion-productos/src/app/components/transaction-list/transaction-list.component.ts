// src/app/components/transaction-list/transaction-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  loading = false;
  error: string | null = null;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading = true;
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las transacciones: ' + err.message;
        this.loading = false;
      }
    });
  }

  deleteTransaction(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta transacción?')) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => {
          this.transactions = this.transactions.filter(transaction => transaction.id !== id);
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