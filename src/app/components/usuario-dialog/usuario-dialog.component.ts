import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html'
})
export class UsuarioDialogComponent {
  usuarioForm: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data.usuario;

    this.usuarioForm = this.fb.group({
      nombre: [data.usuario?.nombre || '', Validators.required],
      email: [data.usuario?.email || '', [Validators.required, Validators.email]],
      contrasena: ['', this.isEdit ? [] : [Validators.required]]
    });
  }

  guardar() {
    if (this.usuarioForm.invalid) return;
    this.dialogRef.close(this.usuarioForm.value);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
