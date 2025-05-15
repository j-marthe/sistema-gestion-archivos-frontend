import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'inicio', component: HomeComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'auditoria', component: AuditoriaComponent },
      {path: 'perfil', component: PerfilComponent},
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
