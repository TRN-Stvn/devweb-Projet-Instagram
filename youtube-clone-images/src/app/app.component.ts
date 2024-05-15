import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common';
import { ImageViewComponent } from './images/image-view/image-view.component';
import { ImageUploadComponent } from './images/image-upload/image-upload.component';
import { CommentViewComponent } from './comment/comment-view/comment-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, ImageViewComponent, ImageUploadComponent, CommentViewComponent], // Include HttpClientModule in the imports array
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent {
  title = 'youtube-clone-images';
  isLoggedIn = false;
comments: any;

  login() {
    // Implement login logic
  }
}
