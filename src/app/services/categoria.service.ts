import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({ providedIn: 'root' })
export class CategoriaService {
  
    private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listarCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/documentos/categorias/listar`)
  }

  crearCategoria(nombre: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/documentos/categorias/crear`, JSON.stringify(nombre), {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'text'
    });
  }

}
