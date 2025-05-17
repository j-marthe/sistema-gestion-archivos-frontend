import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from 'src/app/components/usuario-dialog/usuario-dialog.component';
import { CambiarRolDialogComponent } from 'src/app/components/cambiar-rol-dialog/cambiar-rol-dialog.component';

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

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarRoles();
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
      this.authService.eliminarUsuario(id).subscribe(() => {
        this.cargarUsuarios();
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
  
}
