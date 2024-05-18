import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { ImageViewComponent } from './images/image-view/image-view.component';
import { ImageUploadComponent } from './images/image-upload/image-upload.component';
import { CommentViewComponent } from './comment/comment-view/comment-view.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, ImageViewComponent, ImageUploadComponent, CommentViewComponent], // Include HttpClientModule in the imports array
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent {
  logout() {
    window.location.href = 'http://localhost:4200';
  }
  title = 'youtube-clone-images';
  isLoggedIn = false;
  comments: any;

  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.authService.userId.subscribe(id => {
      this.isLoggedIn = !!id;
    });


    if (isPlatformBrowser(this.platformId)) {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('userId');
      const firstName = urlParams.get('firstName');
      if (userId) {
        this.authService.setUserId(+userId);
      }
      if (firstName) {
        this.authService.setUserFirstName(firstName);
      }
    }
  }

  login() {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = 'http://localhost:8081/auth/google';
    }
  }
}

