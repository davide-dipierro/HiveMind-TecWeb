import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { IdeaCardComponent } from '../homepage/idea-card/idea-card.component';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, IdeaCardComponent],
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent {
  toastr = inject(ToastrService);
  router = inject(Router);
  restService = inject(RestBackendService);
  authService = inject(AuthService);
  submitted = false;
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required, Validators.maxLength(400)])
  });

  handlePost() {
    if (this.postForm.valid) {
      console.log(this.postForm.value);
      if(this.postForm.value.title == '' || this.postForm.value.content == ''
        || this.postForm.value.title == null || this.postForm.value.content == null
        || this.postForm.value.title == undefined || this.postForm.value.content == undefined){
        this.toastr.error('Please fill in the form correctly.');
        return;
      }
      this.restService.postIdea({
        title: this.postForm.value.title,
        description: this.postForm.value.content
      }).subscribe({
        next: (data) => {
          this.toastr.success('Idea posted successfully');
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          if (err.status === 401) {
            this.toastr.error('Your access token appears to be invalid. Login again', 'Token expired');
            this.router.navigateByUrl('/login');
          } else {
            this.toastr.error(err.message, err.statusText);
          }
        }
      });
    } else {
      this.toastr.error('Please fill in the form correctly.');
    }
  }
}
