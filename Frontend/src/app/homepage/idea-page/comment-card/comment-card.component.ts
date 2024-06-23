import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommentItem } from '../../../_services/rest-backend/IdeaItem';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent {

  @Input() comment: CommentItem = {id: 0, text: "", UserUserName: ""};

}
