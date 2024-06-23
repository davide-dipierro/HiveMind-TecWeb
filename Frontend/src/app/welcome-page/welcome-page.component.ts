import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
  
  constructor(private authService: AuthService) {}
  router = inject(Router);
  ngOnInit() {
    console.log("Welcome Page Loaded");
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }
  
}
