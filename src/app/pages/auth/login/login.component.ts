import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si ya hay un token en localStorage, redirigimos al dashboard
    if (localStorage.getItem('token')) {
      this.router.navigate(['/inicio']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

 onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        if (err.status === 500) {
          this.error = 'Vuelve a intentar hacer el login. El servidor está iniciando.';
        } else if (err.status === 401) {
          this.error = 'Credenciales incorrectas.';
        } else {
          this.error = 'Error inesperado. Intenta más tarde.';
        }
        this.loading = false;
      }
    });
  }
  
}
