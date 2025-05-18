import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/enviroment';

@Injectable({ providedIn: 'root' })
export class AuditoriaService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

 listarAuditoria(desde?: Date, hasta?: Date) {

  const params: any = {};

    if (desde) {
      params.desde = desde.toISOString();
    }

    if (hasta) {
      params.hasta = hasta.toISOString();
    }

    return this.http.get<any[]>(`${this.baseUrl}/auditoria/listar`, { params });
  }

}
