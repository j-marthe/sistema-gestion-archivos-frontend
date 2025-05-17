import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambiar-rol-dialog',
  templateUrl: './cambiar-rol-dialog.component.html'
})
export class CambiarRolDialogComponent {
  rolForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CambiarRolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string, rolId: string, roles: any[] }
  ) {
    this.rolForm = this.fb.group({
      nuevoRolId: [data.rolId, Validators.required]
    });
  }

  guardar() {
    if (this.rolForm.invalid) return;
    this.dialogRef.close(this.rolForm.value.nuevoRolId);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
