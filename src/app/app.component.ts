import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common';
import { ImageViewComponent } from './image-view/image-view.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, ImageViewComponent, ImageUploadComponent], // Replace RouterOutlet with RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'youtube-clone-images';
  isLoggedIn = false;

  login() {
    // Implement login logic
  }
}
