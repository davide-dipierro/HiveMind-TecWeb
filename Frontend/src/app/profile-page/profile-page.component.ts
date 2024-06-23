import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

  authService = inject(AuthService);
  isNeko: boolean = false;

  spawnNeko() {
    if (!this.isNeko) {
      const script = document.createElement('script');
      script.src = 'oneko.js';
      document.body.appendChild(script);
      this.isNeko = true;
    }
  }

}
