import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentosService } from 'src/app/services/documento.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-documento-detalle-dialog',
  templateUrl: './documento-detalle-dialog.component.html',
  styleUrls: ['./documento-detalle-dialog.component.scss']
})
export class DocumentoDetalleDialogComponent implements OnInit {
  formulario!: FormGroup;
  archivoSeleccionado?: File;
  categorias: { id: string; nombre: string }[] = [];
  versiones: any[] = [];
  versionSeleccionada: number | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DocumentoDetalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private documentoService: DocumentosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  this.documentoService.listarCategorias().subscribe({
    next: (categorias) => {
      this.categorias = categorias;
      this.cargarVersiones();

      // Luego de cargar categorías, ahora sí obtenemos los detalles
      this.documentoService.obtenerDetallesDocumento(this.data.id).subscribe(detalle => {
        const metadatos = detalle.metadatos || {};

        const permisosAcceso = Array.isArray(metadatos.permisosAcceso)
          ? metadatos.permisosAcceso
          : (typeof metadatos.permisosAcceso === 'string'
              ? metadatos.permisosAcceso.split(',').map((p: string) => p.trim())
              : []);

        let firmaElectronica = metadatos.firmaElectronica === 'Sí' ? true : false;
            
        this.formulario = this.fb.group({
          nombre: [{ value: detalle.nombre, disabled: true }],
          categoria: [{ value: detalle.categoria, disabled: true }],
          Codigo: [metadatos.codigoClasificacion || ''],
          Año: [metadatos.anio || ''],
          estado: [metadatos.estado || ''],
          permisosAcceso: [permisosAcceso],
          Formato: [metadatos.formato || ''],
          firmaElectronica: [firmaElectronica],
          fechaUltimaModificacion: [metadatos.fechaUltimaModificacion || ''],
        });
      });
    },
    error: (err) => {
      console.error('Error al cargar categorías:', err);
      this.snackBar.open('No se pudieron cargar las categorías.', 'Cerrar', { duration: 3000 });
    }
  });
}


  camposExtras: string[] = [
    'Codigo',
    'Año', 
    'Formato',
    'fechaUltimaModificacion'
  ];
  

  guardarCambios(): void {
    let permisosAcceso = this.formulario.value.permisosAcceso;

    // Convertir permisosAcceso de array a string
    if (Array.isArray(permisosAcceso)) {
      permisosAcceso = permisosAcceso.join(','); // Convertir array a string separado por coma
    }

    // Convertir firmaElectronica de booleano a string

    let firmaElectronica = this.formulario.value.firmaElectronica ? "Sí" : "No";
  
    // Crear objeto de datos que se enviará
    const datos = {
      ...this.formulario.value,
      permisosAcceso: permisosAcceso,  // Asignar permisosAcceso como string
      firmaElectronica: firmaElectronica,
    };
  
    // Enviar los datos al backend
    this.documentoService.editarMetadatos(this.data.id, datos).subscribe(() => {
      this.snackBar.open('Metadatos actualizados', 'Cerrar', { duration: 3000 });
      this.dialogRef.close(true);
    });
  }
  
  

  seleccionarArchivo(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  subirNuevaVersion(): void {
    if (this.archivoSeleccionado) {
      this.documentoService.subirNuevaVersion(this.data.id, this.archivoSeleccionado).subscribe(() => {
        this.snackBar.open('Versión subida correctamente', 'Cerrar', { duration: 3000 });
      });
    }
  }

  cargarVersiones(): void {
    this.documentoService.listarVersiones(this.data.id).subscribe({
      next: (versiones) => {
        this.versiones = versiones;
      },
      error: (err) => {
        console.error('Error al cargar versiones:', err);
        this.snackBar.open('No se pudieron cargar las versiones.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  restaurarVersion(): void {
    if (this.versionSeleccionada !== null) {
      this.documentoService.restaurarVersion(this.data.id, this.versionSeleccionada).subscribe({
        next: (res) => {
          this.snackBar.open(`Versión ${this.versionSeleccionada} restaurada correctamente`, 'Cerrar', { duration: 3000 });
          this.dialogRef.close(true); // Opcional: cerrar el diálogo y actualizar lista
        },
        error: (err) => {
          console.error('Error al restaurar versión:', err);
          this.snackBar.open('No se pudo restaurar la versión', 'Cerrar', { duration: 3000 });
        }
        });
      }
  }

  
}
