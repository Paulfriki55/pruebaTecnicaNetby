// src/app/components/transaction-detail/transaction-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  transaction: Transaction | null = null;
  product: Product | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadTransaction();
  }

  loadTransaction(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.transactionService.getTransaction(id).subscribe({
        next: (data) => {
          this.transaction = data;
          this.loadProduct(data.productId);
        },
        error: (err) => {
          this.error = 'Error al cargar la transacción: ' + err.message;
          this.loading = false;
        }
      });
    }
  }

  loadProduct(productId: number): void {
    this.productService.getProduct(productId).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el producto: ' + err.message;
        this.loading = false;
      }
    });
  }

  getTransactionTypeClass(): string {
    return this.transaction?.transactionType === 'venta' ? 'badge bg-success' : 'badge bg-primary';
  }
}