import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listarDocumentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/documentos/listar`);
  }

  eliminarDocumento(id: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/documentos/eliminar/${id}`, {
      responseType: 'text'
    });
  }  

  descargarDocumento(id: string): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${this.baseUrl}/documentos/descargar/${id}`, {
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }
  

  obtenerDetallesDocumento(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/documentos/detalles/${id}`);
  }
  
  editarMetadatos(id: string, metadatos: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/documentos/editar-metadatos/${id}`,
      metadatos,
      { responseType: 'text' } 
    );
  }
  
  subirNuevaVersion(id: string, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    return this.http.post(`${this.baseUrl}/documentos/subir-version/${id}`, formData);
  }

  subirDocumento(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/documentos/subir`, formData);
  }
  
  listarCategorias(): Observable<{ id: string; nombre: string }[]> {
    return this.http.get<{ id: string; nombre: string }[]>(`${this.baseUrl}/documentos/categorias/listar`);
  }


  buscarDocumentosAvanzado(payload: any): Observable<any[]> {
  return this.http.post<any[]>(`${this.baseUrl}/documentos/buscar`, payload);
  }

  listarVersiones(id: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/documentos/listar-versiones/${id}`);
  }

  restaurarVersion(id: string, version: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/documentos/restaurar-version/${id}/${version}`, {});
  }

  obtenerArchivosBasicos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/documentos/archivos-basicos`);
  }


  
}
