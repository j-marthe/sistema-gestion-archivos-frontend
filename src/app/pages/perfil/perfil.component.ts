import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {jwtDecode} from 'jwt-decode'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  perfilForm!: FormGroup;
  documentos: any[] = [];
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}
  
  mensaje: string = '';
  errorMensaje: string = '';

  ngOnInit(): void {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded: any = jwtDecode(token);
    this.userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    const name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']

    console.log(name);

    this.perfilForm = this.fb.group({
      nombre: [name || '', Validators.required],
      email: [email || '', [Validators.required, Validators.email]],
      contrasena: ['']
    });

    if (this.userId) {
      this.authService.getDocumentosUsuario(this.userId).subscribe({
        next: (docs) => (this.documentos = docs),
        error: () => (this.documentos = [])
      });
    }
  }
}


  actualizarPerfil() {
    if (this.perfilForm.invalid) return;

    const datos = this.perfilForm.value;
    this.authService.editarUsuario(this.userId, datos).subscribe({
      next: (res) => {
        this.mensaje = res;
        this.errorMensaje = '';
        setTimeout(() => {
          this.mensaje = '';
          location.reload(); 
        }, 3000);
      },
      error: (err) => {
        this.errorMensaje = 'Error al actualizar el perfil';
        this.mensaje = '';
      }
    });
  }

}

