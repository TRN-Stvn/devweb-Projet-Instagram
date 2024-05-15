import { Component, OnInit, ViewChild, inject } from '@angular/core';
// import { MockImageService } from '../services/mockservices/mock-image.service';
import { ImageService } from '../../services/image/image.service';
import { CommonModule ,NgFor} from '@angular/common';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { Image } from '../../services/datas';

@Component({
  selector: 'app-image-view',
  standalone: true,
  imports: [CommonModule, ImageModalComponent ,NgFor],
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})

export class ImageViewComponent
// implements OnInit
{
  images: Image[] = [];
  selectedImage: Image | null = null;
  // image_id: string | null = null;
  private imageService: ImageService = inject(ImageService);

  @ViewChild(ImageModalComponent) imageModalComponent!: ImageModalComponent;

  constructor() {
    this.imageService.getAllImages().then((imageList: Image[]) => {
      this.images = imageList;

    });
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
    this.imageModalComponent.selectImage(image); // Ensure this line is here to pass the image to the modal
  }

  // addComment(imageId: number, comment: string): void {
  //   // Implement the service call to add a comment
  // }
}
