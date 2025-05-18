import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private router: Router,
    public authService: AuthService
  ) {}

  menuAbierto: boolean = false;

  get esAdmin(): boolean {
    return this.authService.esAdmin();
  }

  verPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  logout(): void{
    this.authService.logout();
  }
  
}
