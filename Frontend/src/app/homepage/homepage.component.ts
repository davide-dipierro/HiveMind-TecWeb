import { Component, HostListener, Input, inject } from '@angular/core';
import { IdeaCardComponent } from './idea-card/idea-card.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RestBackendService, SortingCriteria } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IdeaItem } from '../_services/rest-backend/IdeaItem';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';
import { NgxMasonryComponent } from 'ngx-masonry';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ IdeaCardComponent, NgFor, MatIconModule, MatButtonModule, NgClass, NgIf, NgxMasonryModule ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);
  ideas: IdeaItem[] = [];
  private orderSubscription: Subscription | undefined;
  
  actualPage: number = 1;
  throttle = 0;
  distance = 2;

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent | undefined;




  ngOnInit() {
    this.orderSubscription = this.restService.orderChanged.subscribe((order) => {
      this.reloadIdeas();
    });
  }

  ngAfterViewInit() {
    this.actualPage = 1;
    this.fetchIdeas();
  }

  fetchIdeas(pageNumber: number = 1){
    this.restService.getIdeaPage(pageNumber).subscribe({
      next: (data) => {
        console.log(data);
        this.ideas = [...this.ideas, ...data];
        this.actualPage++;
        if (data.length === 0) {
          this.toastr.info("No more ideas available", "End of Ideas");
        }
      },
      error: (err) => {
        if(err.status === 401){
          this.toastr.error("Your access token appears to be invalid. Login again", "Token expired");
          this.router.navigateByUrl("/login");
        } else {
          this.toastr.error(err.message, err.statusText)
        }
      },
      complete: () => {
      }
    });
  }

  loadMore(){
    this.fetchIdeas(this.actualPage);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (this.throttle > Date.now()) {
      return;
    }
    const pos = document.documentElement.scrollTop + document.documentElement.clientHeight;
    const max = document.documentElement.scrollHeight;
    if (pos + this.distance >= max) {
      this.throttle = Date.now() + 1000;
      this.loadMore();
    }
  }

  goToCreateIdea(){
    this.router.navigateByUrl("/post");
  }

  ordinaPer(order: SortingCriteria){
    this.restService.changeOrder(order);
  }

  reloadIdeas(){
    this.ideas = [];
    this.masonry?.reloadItems();
    this.masonry?.layout();
    this.actualPage = 1;
    this.fetchIdeas();
  }

  
    

}
