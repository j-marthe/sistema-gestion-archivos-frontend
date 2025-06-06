import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from 'src/app/components/usuario-dialog/usuario-dialog.component';
import { CambiarRolDialogComponent } from 'src/app/components/cambiar-rol-dialog/cambiar-rol-dialog.component';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriaDialogComponent } from 'src/app/components/categoria-dialog/categoria-dialog.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  usuarios: any[] = [];
  roles: any[] = [];
  filtradas: any[] = [];
  searchTerm: string = '';

  categorias: any[] = []
  filtradasCategorias: any[] = []
  searchTermCategorias: string = ''

  constructor(private authService: AuthService, private dialog: MatDialog, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarRoles();
    this.cargarCategorias();
  }

cargarRoles(): void {
    this.authService.getRoles().subscribe({
      next: (res) => {
        this.roles = res;
        this.cargarUsuarios();
      },
      error: () => console.error('Error cargando roles')
    });
  }

cargarUsuarios(): void {
    this.authService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
        this.filtrar();
      },
      error: () => console.error('Error cargando usuarios')
    });
  }

  getNombreRol(rolId: string): string {
    const rol = this.roles.find(r => r.id === rolId);
    return rol ? rol.nombre : 'Desconocido';
  }

  eliminarUsuario(id: string): void {
  if (confirm('¿Estás seguro de eliminar este usuario?')) {
    this.authService.eliminarUsuario(id).subscribe({
      next: () => {
        this.cargarUsuarios();
      },
      error: (err) => {
        if (err.status === 409 || err.status === 400) {
          // Aquí muestras el mensaje personalizado que envía el backend
          alert(err.error || 'No se puede eliminar el usuario porque tiene documentos asociados. Primero elimine los documentos.');
        } else {
          alert('Ocurrió un error al eliminar el usuario.');
          console.error(err);
        }
      }
    });
  }
}

  abrirDialogCrear(): void {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      width: '400px',
      data: { roles: this.roles }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.registrarUsuario(result).subscribe({
          next: () => this.cargarUsuarios(),
          error: err => alert('Error al registrar usuario: ' + err.error)
        });
      }
    });
  }

  abrirDialogEditar(usuario: any): void {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      width: '400px',
      data: { usuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.editarUsuario(usuario.id, result).subscribe({
          next: () => this.cargarUsuarios(),
          error: err => alert('Error al editar usuario: ' + err.error)
        });
      }
    });
  }

  abrirDialogCambiarRol(usuario: any): void {
    const dialogRef = this.dialog.open(CambiarRolDialogComponent, {
      width: '400px',
      data: {
        nombre: usuario.nombre,
        rolId: usuario.rolId,
        roles: this.roles
      }
    });

    dialogRef.afterClosed().subscribe(nuevoRolId => {
      if (nuevoRolId && nuevoRolId !== usuario.rolId) {
        this.authService.cambiarRol(usuario.id, nuevoRolId).subscribe({
          next: () => this.cargarUsuarios(),
          error: err => alert('Error al cambiar rol: ' + err.error)
        });
      }
    });
  }

  filtrar(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.filtradas = term
      ? this.usuarios.filter(u => {
          const rol = this.roles.find(r => r.id === u.rolId);
          const rolNombre = rol ? rol.nombre.toLowerCase() : '';
          return (
            u.nombre.toLowerCase().includes(term) ||
            u.email.toLowerCase().includes(term) ||
            rolNombre.includes(term)
          );
        })
      : [...this.usuarios];
  }

  cargarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe({
      next: (dataCategorias) => {
        this.categorias = dataCategorias
        this.filtradasCategorias = [...dataCategorias]
      },
      error: (err) => console.error('Error cargando categorías', err)
    })
  }
  
  
  filtrarCategoria(): void {
    this.filtradasCategorias = this.categorias.filter(categoria =>
      categoria.nombre.toLowerCase().includes(this.searchTermCategorias.toLowerCase())
    )
  }
  
  
  abrirDialogCategoria(): void {
    const dialogRef = this.dialog.open(CategoriaDialogComponent, {
      width: '400px'
  })
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarCategorias()
    })
  }

  eliminarCategoria(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.authService.eliminarCategoria(id).subscribe(() => {
        this.cargarCategorias();
      });
    }
  }
  
}
