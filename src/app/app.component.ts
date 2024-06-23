import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NgIf } from '@angular/common';
import { AuthService } from './_services/auth/auth.service';


 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TopbarComponent, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'HiveMind';
  authService = inject(AuthService);
  router = inject(Router);
  ngOnInit() {
    console.log("App Component Loaded");
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/welcome']);
    }
  }
}
