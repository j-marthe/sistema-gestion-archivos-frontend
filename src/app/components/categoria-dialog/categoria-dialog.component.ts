import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { CategoriaService } from 'src/app/services/categoria.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-crear-categoria-dialog',
  templateUrl: './categoria-dialog.component.html',
  styleUrls: ['./categoria-dialog.component.scss']
})
export class CategoriaDialogComponent {
  nombreCategoria: string = ''

  constructor(
    private dialogRef: MatDialogRef<CategoriaDialogComponent>,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar
  ) {}

  crear(): void {
    if (!this.nombreCategoria.trim()) return

    this.categoriaService.crearCategoria(this.nombreCategoria).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error creando categoría:', err)
    });

  }

  cerrar(): void {
    this.dialogRef.close()
  }
}
