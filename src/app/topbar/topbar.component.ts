import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';
import { NgClass } from '@angular/common';
import { RestBackendService, SortingCriteria } from '../_services/rest-backend/rest-backend.service';


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

  showDropDown = false;
  authService = inject(AuthService);
  router = inject(Router);
  restService = inject(RestBackendService);

  openDropDown(){
    this.showDropDown = !this.showDropDown;
  }

  ordinaPer(order: string){
    this.showDropDown = false;
    this.restService.changeOrder(order as SortingCriteria);
  }

}
