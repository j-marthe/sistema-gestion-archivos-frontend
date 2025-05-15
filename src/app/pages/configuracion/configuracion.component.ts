import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from 'src/app/components/usuario-dialog/usuario-dialog.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  usuarios: any [] = [];
  roles: any [] = [];

  constructor(private authService: AuthService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  cargarUsuarios(): void {
    this.authService.getUsuarios().subscribe({
      next: (res) => this.usuarios = res,
      error: () => console.error('Error cargando usuarios')
    });
  }

  cargarRoles(): void {
    this.authService.getRoles().subscribe({
      next: (res) => this.roles = res,
      error: () => console.error('Error cargando roles')
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

  abrirDialogCrear() {
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

abrirDialogEditar(usuario: any) {
  const dialogRef = this.dialog.open(UsuarioDialogComponent, {
    width: '400px',
    data: { usuario, roles: this.roles }
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




}
