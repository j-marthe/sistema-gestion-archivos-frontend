import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DocumentoDetalleDialogComponent } from './components/documento-detalle-dialog/documento-detalle-dialog.component';
import { SubirDocumentoDialogComponent } from './components/subir-documento-dialog/subir-documento-dialog.component';
import { CategoriaDialogComponent } from './components/categoria-dialog/categoria-dialog.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';
import { CambiarRolDialogComponent } from './components/cambiar-rol-dialog/cambiar-rol-dialog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { LoadingInterceptor } from './loading.interceptor';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BusquedaAvanzadaDialogComponent } from './components/busqueda-avanzada-dialog/busqueda-avanzada-dialog.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    DocumentoDetalleDialogComponent,
    SubirDocumentoDialogComponent,
    BusquedaAvanzadaDialogComponent,
    CategoriaDialogComponent,
    CategoriasComponent,
    AuditoriaComponent,
    PerfilComponent,
    ConfiguracionComponent,
    UsuarioDialogComponent,
    CambiarRolDialogComponent,
    NotFoundComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
