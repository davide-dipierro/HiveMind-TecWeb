import {Component, Input, inject } from '@angular/core';
import { RestBackendService } from '../../_services/rest-backend/rest-backend.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { IdeaItem } from '../../_services/rest-backend/IdeaItem';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';


/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'app-idea-card',
  templateUrl: 'idea-card.component.html',
  styleUrl: 'idea-card.component.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, NgClass, MarkdownComponent, MarkdownModule],
})
export class IdeaCardComponent {

  @Input() idea: IdeaItem = {id: 0, title: "", description: "", PositiveVotes: 0, NegativeVotes: 0};
  @Input() inDetail: boolean = false;

  Router = inject(Router);
  toastr = inject(ToastrService);
  restService = inject(RestBackendService);

  like(): void {
    if (this.idea.id !== undefined) {
      this.restService.voteIdea(this.idea.id, true).subscribe({
        next: (data) => {
          if (this.idea.PositiveVotes === undefined) {
            this.idea.PositiveVotes = 0;
          }
          this.idea.PositiveVotes++;
          console.log(data);
        },
        error: (err) => {
          this.toastr.error("Errore nel voto!" , "Non puoi votare la tua idea o votare due volte la stessa idea!");
          console.error(err);
        }
      });
    }
  }
  
  dislike() : void{
    if (this.idea.id !== undefined) {
      this.restService.voteIdea(this.idea.id, false).subscribe({
        next: (data) => {
          if (this.idea.NegativeVotes === undefined) {
            this.idea.NegativeVotes = 0;
          }
          this.idea.NegativeVotes++;
          console.log(data);
        },
        error: (err) => {
          this.toastr.error("Hai già votato!" , "Non puoi votare due volte la stessa idea!");
          console.error(err);
        }
      });
    }
  }

  viewIdea() : void {
    if (this.idea.id !== undefined && !this.inDetail) {
      this.Router.navigateByUrl(`/idea/${this.idea.id}`);
    }
  }


}
