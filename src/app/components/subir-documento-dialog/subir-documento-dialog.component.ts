import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentosService } from 'src/app/services/documento.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subir-documento-dialog',
  templateUrl: './subir-documento-dialog.component.html',
  styleUrls: ['./subir-documento-dialog.component.scss']
})
export class SubirDocumentoDialogComponent implements OnInit {
  form: FormGroup;
  archivoSeleccionado: File | null = null;
  categorias: { id: string; nombre: string }[] = [];

  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubirDocumentoDialogComponent>,
    private documentoService: DocumentosService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      categoriaId: ['', Validators.required],
      etiquetas: [''],
      codigoClasificacion: ['', Validators.required],
      estado: ['', Validators.required],
      anio: [''],
      permisosAcceso: [''],
      formato: [''],
      firmaElectronica: [false],
      fechaUltimaModificacion: ['']
    });
  }

  ngOnInit(): void {
    this.documentoService.listarCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.snackBar.open('No se pudieron cargar las categorías.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  seleccionarArchivo(event: any): void {
    const archivo = event.target.files[0];
    this.archivoSeleccionado = archivo ?? null;
  }

  subir(): void {
    if (!this.archivoSeleccionado || this.form.invalid) {
      this.snackBar.open('Completa todos los campos requeridos y selecciona un archivo.', 'Cerrar', { duration: 3000 });
      return;
    }
  
    const formData = new FormData();
    formData.append('archivo', this.archivoSeleccionado);
    formData.append('nombre', this.form.value.nombre);
    formData.append('categoriaId', this.form.value.categoriaId);
  
    if (this.form.value.etiquetas?.trim()) {
      formData.append('etiquetas', this.form.value.etiquetas);
    }
  
    const fechaMod = this.form.value.fechaUltimaModificacion
      ? new Date(this.form.value.fechaUltimaModificacion)
      : null;
  
    const metadatos: any = {
      codigoClasificacion: this.form.value.codigoClasificacion,
      estado: this.form.value.estado,
      permisosAcceso: this.form.value.permisosAcceso,
      formato: this.form.value.formato,
      firmaElectronica: this.form.value.firmaElectronica ? 'Sí' : 'No',
      fechaUltimaModificacion: fechaMod
        ? fechaMod.toISOString().split('T')[0]
        : null,
      anio: fechaMod
        ? fechaMod.getFullYear().toString()
        : new Date().getFullYear().toString()
    };
  
    // Elimina claves con valores falsy o arrays vacíos
    const metadatosLimpios = Object.fromEntries(
      Object.entries(metadatos).filter(
        ([_, v]) => v !== null && v !== undefined && v !== ''
      )
    );
  
    if (Object.keys(metadatosLimpios).length > 0) {
      formData.append('metadatos', JSON.stringify(metadatosLimpios));
    }
  
    console.log('formData:', {
      archivo: this.archivoSeleccionado,
      nombre: this.form.value.nombre,
      categoriaId: this.form.value.categoriaId,
      etiquetas: this.form.value.etiquetas,
      metadatos: metadatosLimpios
    });
  
    this.documentoService.subirDocumento(formData).subscribe({
      next: (response) => {
        console.log('Documento subido correctamente:', response);
        this.snackBar.open('Documento subido correctamente.', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al subir documento:', err);
        this.snackBar.open('Error al subir el documento.', 'Cerrar', { duration: 3000 });
      }
    });
  }
  
  cancelar(): void {
    this.dialogRef.close();
  }
}
