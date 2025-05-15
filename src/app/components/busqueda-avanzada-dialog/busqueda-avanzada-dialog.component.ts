import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentosService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-busqueda-avanzada-dialog',
  templateUrl: './busqueda-avanzada-dialog.component.html',
  styleUrls: ['./busqueda-avanzada-dialog.component.scss']
})
export class BusquedaAvanzadaDialogComponent implements OnInit {
  formulario: FormGroup;
  categorias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BusquedaAvanzadaDialogComponent>,
    private documentoService: DocumentosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formulario = this.fb.group({
      nombre: [''],
      usuario: [''],
      categoriaId: [null],
      fechaDesde: [null],
      fechaHasta: [null],
      etiquetas: [''],
      valorMetadato: ['']
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.documentoService.listarCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }

  buscar() {
  const raw = this.formulario.value;
  
  // Normalizar campos
  const filtros: any = {
    nombre: raw.nombre?.trim() || null,
    usuario: raw.usuario?.trim() || null,
    categoriaId: raw.categoriaId || null,
    fechaDesde: raw.fechaDesde ? new Date(raw.fechaDesde).toISOString() : null,
    fechaHasta: raw.fechaHasta ? new Date(raw.fechaHasta).toISOString() : null,
    valorMetadato: raw.valorMetadato?.trim() || null,
    etiquetas: raw.etiquetas
      ? raw.etiquetas.split(',').map((e: string) => e.trim()).filter((e: string) => e.length)
      : []
  };

  console.log('Filtros enviados:', filtros);  // Verifica en la consola que los filtros sean correctos

  this.documentoService.buscarDocumentosAvanzado(filtros).subscribe({
    next: (result) => {
      console.log('Resultados:', result);
      // Realiza la lógica con los resultados, como actualizar el datagrid
      this.dialogRef.close(filtros);  // Devuelve los filtros al componente padre
    },
    error: (err) => {
      console.error('Error al realizar la búsqueda', err);
    }
  });
}


  cancelar() {
    this.dialogRef.close();
  }
}
