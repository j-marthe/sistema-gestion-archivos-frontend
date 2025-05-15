import { Component, OnInit } from '@angular/core';
import { DocumentosService } from 'src/app/services/documento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DocumentoDetalleDialogComponent } from 'src/app/components/documento-detalle-dialog/documento-detalle-dialog.component';
import { SubirDocumentoDialogComponent } from 'src/app/components/subir-documento-dialog/subir-documento-dialog.component';
import { BusquedaAvanzadaDialogComponent } from 'src/app/components/busqueda-avanzada-dialog/busqueda-avanzada-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchTerm: string = ''; // El término de búsqueda
  documentos: any[] = []; // Lista de documentos mostrados después de la búsqueda
  allDocuments: any[] = []; // Lista completa de documentos (sin filtrar)
  columnas: string[] = [
    'nombre',
    'usuario',
    'fecha',
    'categoria',
    'etiquetas',
    'codigoClasificacion',
    'anio',
    'fechaUltimaModificacion',
    'formato',
    'firmaElectronica',
    'estado',
    'permisosAcceso',
    'acciones'
  ];
  mostrarEliminarFiltros: boolean = false;
  isMobile: boolean = false;


  constructor(
    private documentosService: DocumentosService, 
    private snackBar: MatSnackBar,  
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  this.cargarDocumentos();
  this.isMobile = window.innerWidth < 768;
  
  // Cambiar las columnas para dispositivos móviles
  if (this.isMobile) {
    this.columnas = ['nombre', 'usuario', 'fecha', 'acciones'];
  } else {
    this.columnas = [
      'nombre',
      'usuario',
      'fecha',
      'categoria',
      'etiquetas',
      'codigoClasificacion',
      'anio',
      'fechaUltimaModificacion',
      'formato',
      'firmaElectronica',
      'estado',
      'permisosAcceso',
      'acciones'
    ];
  }
  
  // Asegurarse de que la tabla se refresque si el tamaño de la pantalla cambia
  window.addEventListener('resize', this.onResize.bind(this));
}

onResize() {
  this.isMobile = window.innerWidth < 768;
  
  if (this.isMobile) {
    this.columnas = ['nombre', 'usuario', 'fecha', 'acciones'];
  } else {
    this.columnas = [
      'nombre',
      'usuario',
      'fecha',
      'categoria',
      'etiquetas',
      'codigoClasificacion',
      'anio',
      'fechaUltimaModificacion',
      'formato',
      'firmaElectronica',
      'estado',
      'permisosAcceso',
      'acciones'
    ];
  }
}


  cargarDocumentos(): void {
    this.documentosService.listarDocumentos().subscribe(
      (data) => {
        if (!Array.isArray(data) || data.length === 0) {
          this.documentos = [];
          this.snackBar.open('No hay documentos disponibles.', 'Cerrar', { duration: 3000 });
          return;
        }
  
        // Guardamos la lista completa de documentos para futuras búsquedas
        this.allDocuments = data.map(doc => ({
          ...doc,
          etiquetas: Array.isArray(doc.etiquetas) ? doc.etiquetas : [],
          metadatos: {
            ...doc.metadatos,
          }
        }));

        // Inicializamos los documentos visibles (sin filtrar)
        this.documentos = [...this.allDocuments];
      },
      (error) => {
        console.error('Error al cargar documentos:', error);
        this.documentos = [];
        this.snackBar.open('Error al cargar documentos. Intenta más tarde.', 'Cerrar', { duration: 3000 });
      }
    );
  }

  // Método para realizar la búsqueda
  buscar(): void {
    if (this.searchTerm.trim() === '') {
      // Si no hay término de búsqueda, mostramos todos los documentos
      this.documentos = [...this.allDocuments];
    } else {
      // Filtramos los documentos que coinciden con el término de búsqueda
      this.documentos = this.allDocuments.filter(doc => 
        doc.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.categoria.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (doc.etiquetas && doc.etiquetas.some((etiqueta: string) => etiqueta.toLowerCase().includes(this.searchTerm.toLowerCase())))
      );
      this.mostrarEliminarFiltros = true;
    }
  }  

  abrirBusquedaAvanzada(): void {
  const dialogRef = this.dialog.open(BusquedaAvanzadaDialogComponent, {
    width: '600px'
  });

  dialogRef.afterClosed().subscribe(filtros => {
    if (filtros) {
      this.documentosService.buscarDocumentosAvanzado(filtros).subscribe({
        next: (docs) => {
          this.documentos = docs || [];

          
          this.mostrarEliminarFiltros = true;

          if (docs && docs.length > 0) {
            this.snackBar.open('Búsqueda completada', 'Cerrar', { duration: 2000 });
          } else {
            this.snackBar.open('No se encontraron documentos.', 'Cerrar', { duration: 3000 });
          }
        },
        error: (err) => {
          console.error('Error en búsqueda avanzada:', err);
          this.snackBar.open('Error al buscar documentos', 'Cerrar', { duration: 3000 });
        }
      });
    }
  });
}


  verDetalle(doc: any): void {
    const dialogRef = this.dialog.open(DocumentoDetalleDialogComponent, {
      width: '600px',
      data: { id: doc.id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarDocumentos();
      }
    });
  }

  descargarDocumento(id: string): void {
    // Primero obtenemos el nombre y la extensión del archivo
    this.documentosService.obtenerArchivosBasicos().subscribe({
      next: (archivos) => {
        // Buscar el archivo por su ID
        const archivo = archivos.find(a => a.id === id);

        if (archivo) {
          const filename = `${archivo.nombre}${archivo.extension}`;

          // Llamamos al servicio para descargar el archivo (suponiendo que tienes un endpoint de descarga en el backend)
          this.documentosService.descargarDocumento(id).subscribe({
            next: (response) => {
              const blob = response.body;
              if (blob) {
                // Crear una URL para el Blob y proceder a la descarga
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;  // Usamos el nombre y la extensión obtenidos
                a.click();
                window.URL.revokeObjectURL(url);  // Liberar la URL una vez descargado
              }
            },
            error: (err) => {
              console.error('Error al descargar documento:', err);
              this.snackBar.open('Error al descargar documento', 'Cerrar', { duration: 3000 });
            }
          });
        } else {
          console.error('No se encontró el archivo');
          this.snackBar.open('Archivo no encontrado', 'Cerrar', { duration: 3000 });
        }
      },
      error: (err) => {
        console.error('Error al obtener archivos básicos:', err);
        this.snackBar.open('Error al obtener la información del archivo', 'Cerrar', { duration: 3000 });
      }
    });
  }


  abrirSubirDocumento(): void {
    const dialogRef = this.dialog.open(SubirDocumentoDialogComponent, {
      width: '600px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarDocumentos();  // Recargar si se subió uno nuevo
      }
    });
  }

  eliminarDocumento(doc: any): void {
    if (confirm(`¿Estás seguro de eliminar "${doc.nombre}"?`)) {
      this.documentosService.eliminarDocumento(doc.id).subscribe(() => {
        this.snackBar.open('Documento eliminado', 'Cerrar', { duration: 2000 });
        this.cargarDocumentos();
      });
    }
  }

  eliminarFiltros(): void {
  location.reload();
  }

}
