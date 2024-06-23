import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestBackendService } from '../../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdeaCardComponent } from '../idea-card/idea-card.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { NgFor } from '@angular/common';
import { CommentItem } from '../../_services/rest-backend/IdeaItem';
import { IdeaItem } from '../../_services/rest-backend/IdeaItem';

@Component({
  selector: 'app-idea-detail',
  standalone: true,
  imports: [ReactiveFormsModule, IdeaCardComponent, CommentCardComponent, NgFor ],
  templateUrl: './idea-page.component.html',
  styleUrl: './idea-page.component.scss'
})
export class IdeaPageComponent {
  constructor(private route:ActivatedRoute){}
  id: number = 0;
  actualIdea: IdeaItem = { title: "", description: "", UserUserName: "", TotalVotes: 0, PositiveVotes: 0, NegativeVotes: 0, Comments: [] };

  restService = inject(RestBackendService);
  toastr = inject(ToastrService);
  router = inject(Router);


  ngOnInit(){
    this.id = this.route.snapshot.params["id"];
    this.restService.getIdeaDetails(this.id)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.actualIdea = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          
        }
      });
  }

  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required)
  });

  submitComment(){
    if(this.commentForm.value.comment == ""
      || this.commentForm.value.comment == null
      || this.commentForm.value.comment == undefined){
      this.toastr.error("Invalid comment");
      return;
    }
    this.restService.postComment(this.id, this.commentForm.value.comment)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.toastr.success("Comment posted!");
          this.ngOnInit();
          this.scrollToBottom();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Error posting comment");
        },
        complete: () => {
        }
      });
  }

  scrollToBottom(){
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }

  




}
