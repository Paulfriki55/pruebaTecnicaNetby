// src/app/components/transaction-form/transaction-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Transaction } from '../../models/transaction';
import { Product } from '../../models/product';
import { TransactionService } from '../../services/transaction.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  transactionForm: FormGroup;
  isEditMode = false;
  transactionId: number | null = null;
  loading = false;
  error: string | null = null;
  submitted = false;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private productService: ProductService
  ) {
    this.transactionForm = this.fb.group({
      transactionType: ['venta', [Validators.required]],
      productId: [null, [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]],
      detail: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.transactionId = +id;
      this.loadTransaction(this.transactionId);
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.error = 'Error al cargar los productos: ' + err.message;
      }
    });
  }

  loadTransaction(id: number): void {
    this.loading = true;
    this.transactionService.getTransaction(id).subscribe({
      next: (transaction) => {
        this.transactionForm.patchValue(transaction);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la transacción: ' + err.message;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.transactionForm.invalid) {
      return;
    }
    
    const transaction: Transaction = this.transactionForm.value;
    
    this.loading = true;
    
    if (this.isEditMode && this.transactionId) {
      transaction.id = this.transactionId;
      this.transactionService.updateTransaction(transaction).subscribe({
        next: () => {
          this.router.navigate(['/transactions']);
        },
        error: (err) => {
          this.error = 'Error al actualizar la transacción: ' + err.message;
          this.loading = false;
        }
      });
    } else {
      this.transactionService.createTransaction(transaction).subscribe({
        next: () => {
          this.router.navigate(['/transactions']);
        },
        error: (err) => {
          this.error = 'Error al crear la transacción: ' + err.message;
          this.loading = false;
        }
      });
    }
  }
}