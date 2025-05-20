import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,  private router: Router) {}

  login(email: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { email, contrasena });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getDecodedToken(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

   getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken() ?? '';
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch (e) {
      return true;
    }
  }

  esAdmin(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded) return false;
    
    const rol = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; 
    
    const isTokenExpired = decoded.exp && (Date.now() / 1000 > decoded.exp);
    return rol === 'Administrador' && !isTokenExpired;
  }


  editarUsuario(id: string, datos: any) {
    return this.http.put(
      `${this.baseUrl}/auth/usuarios/editar/${id}`, 
      datos,
      { responseType: 'text' }
    );
  }
   getDocumentosUsuario(id: string) {
    return this.http.get<any[]>(`${this.baseUrl}/auth/usuarios/${id}/documentos`);
  }
  
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/auth/usuarios`);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/auth/roles`);
  }

  registrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/registro`, data, {
      responseType: 'text'
    });
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/auth/usuarios/eliminar/${id}`,{
        responseType: 'text'
      });
  }

  cambiarRol(id: string, nuevoRolId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/auth/roles/modificar-rol/${id}`, 
      { nuevoRolId },{
        responseType: 'text' 
      });
  }

  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/documentos/categorias/eliminar/${id}`,{
        responseType: 'text'
      });
  }


}

