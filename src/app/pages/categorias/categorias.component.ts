import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriaDialogComponent } from 'src/app/components/categoria-dialog/categoria-dialog.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = []
  filtradas: any[] = []
  searchTerm: string = ''

  constructor(private categoriaService: CategoriaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarCategorias()
  }

  cargarCategorias(): void {
  this.categoriaService.listarCategorias().subscribe({
    next: (data) => {
      this.categorias = data
      this.filtradas = [...data]
    },
    error: (err) => console.error('Error cargando categorías', err)
  })
}


  filtrar(): void {
    this.filtradas = this.categorias.filter(categoria =>
      categoria.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }


  abrirDialogo(): void {
    const dialogRef = this.dialog.open(CategoriaDialogComponent, {
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarCategorias()
    })
  }
}
