import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'inicio', component: HomeComponent },
      { path: 'categorias', component: CategoriasComponent },
      {path: 'perfil', component: PerfilComponent},
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
       {
      path: 'auditoria',
      component: AuditoriaComponent,
      canActivate: [AuthGuard, AdminGuard]
    },
    {
      path: 'configuracion',
      component: ConfiguracionComponent,
      canActivate: [AuthGuard, AdminGuard]
    },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
