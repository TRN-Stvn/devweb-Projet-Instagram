import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ImageService } from '../../services/image/image.service';
import { CommonModule, NgFor } from '@angular/common';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { Image, User } from '../../services/datas';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-image-view',
  standalone: true,
  imports: [CommonModule, ImageModalComponent, NgFor],
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})

export class ImageViewComponent
// implements OnInit
{
  private _images: Image[] = [];

  get images(): Image[] {
    return this._images;
  }

  // set images(value: Image[]) {
  //   this._images = value.map(image => ({
  //     ...image,
  //     author: this.users.find(user => user.id === image.user_id)?.firstName || 'Unknown'
  //   }));
  // }

  users: User[] = [];

  selectedImage: Image | null = null;
  // image_id: string | null = null;
  private imageService: ImageService = inject(ImageService);
  private authService: AuthService = inject(AuthService);

  @ViewChild(ImageModalComponent) imageModalComponent!: ImageModalComponent;

  constructor() {
    this.initializeData();

    // console.log(this.images);
  }

  private setAuthor(image: Image, users: User[]): Image {
    const user = users.find(u => u.id === image.user_id);
    return {
      ...image,
      author: user ? user.firstName : 'Unknown'
    };
  }
  getAuthor(image: Image): string {
    const user = this.users.find(u => u.id === image.user_id);
    
    return user ? user.firstName : 'Unknown';
  }

  private initializeData(): void {
    Promise.all([
      this.authService.fetchAllUsers(),
      this.imageService.getAllImages()
    ]).then(([users, images]) => {
      this.users = users;
      this._images = images.map(image => this.setAuthor(image, users));
      
      // console.log(this._images);  // Now logging the images array after setting authors
    }).catch(error => console.error('Error fetching data:', error));
  }

  getImageUrl(imagePath: string): string {
    return `http://localhost:5000/${imagePath}`;
  }


  // ngOnInit() {
  //   this.imageService.getImages().subscribe(data => {
  //     this.images = data.map(item => ({
  //       ...item,
  //       imagePath: item.image_path.replace(/\\/g, '/') // Replace backslashes
  //     }));
  //   });
  // }

  selectImage(image: Image) {
    this.selectedImage = image;
    // console.log(`selected image: ${this.selectedImage.author}`);
    this.imageModalComponent.selectImage(this.selectedImage); // Pass the entire selectedImage object
  }

  // addComment(imageId: number, comment: string): void {
  //   // Implement the service call to add a comment
  // }
}
