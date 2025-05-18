import { Component, OnInit } from '@angular/core';
import { AuditoriaService } from 'src/app/services/auditoria.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.scss']
})
export class AuditoriaComponent implements OnInit {
  auditoria: any[] = []
  filtradas: any[] = []
  searchTerm: string = ''

  constructor(private auditoriaService: AuditoriaService) {}

  ngOnInit(): void {
    this.cargarAuditoria()
  }

  cargarAuditoria(): void {
  const hoy = new Date();
  const haceTresMeses = new Date();
  haceTresMeses.setMonth(hoy.getMonth() - 3);

  // Asegura día válido en el mes al retroceder meses
  if (haceTresMeses.getDate() !== hoy.getDate()) {
    haceTresMeses.setDate(1);
  }

  this.auditoriaService.listarAuditoria(haceTresMeses, hoy).subscribe({
    next: (data) => {
      this.auditoria = data;
      this.filtradas = [...data];
    },
    error: (err) => console.error('Error cargando auditoría:', err)
  });
}

  filtrar(): void {
    const term = this.searchTerm.toLowerCase()
    this.filtradas = this.auditoria.filter(a =>
      a.usuario.toLowerCase().includes(term) ||
      a.archivo.toLowerCase().includes(term) ||
      a.accion.toLowerCase().includes(term)
    )
  }
}
