import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, duration = 4000) {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      verticalPosition: 'top',
      panelClass: 'error-snackbar',
    });
  }
}
