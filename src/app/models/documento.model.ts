export interface Documento {
    id: string;
    nombre: string;
    fechaSubida: string;
    usuario: string;
    categoria: string;
    etiquetas: string[];
  
    metadatos: {
      
      tipo?: string;
      anio?: string;
      version?: string;
      
      // Nuevos metadatos administrativos
      codigoClasificacion?: string;
      estado?: string;
      historialVersiones?: string[];
      permisosAcceso?: string[];
  
      // Interoperabilidad y seguridad
      formato?: string;
      firmaElectronica?: boolean;
      fechaUltimaModificacion?: string;
    };
  }
  