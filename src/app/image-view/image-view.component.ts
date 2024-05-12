import { Component, OnInit, ViewChild } from '@angular/core';
import { MockImageService } from '../services/mock-image.service';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-image-view',
  standalone: true,
  imports: [CommonModule, ImageModalComponent],
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
  images: any[] = [];
  selectedImage: any = null;

  @ViewChild(ImageModalComponent) imageModalComponent!: ImageModalComponent;

  constructor(private imageService: MockImageService) {}

  ngOnInit(): void {
    this.images = this.imageService.getImages();
  }

  selectImage(image: any) {
    this.selectedImage = image;
    this.imageModalComponent.selectImage(image); // Ensure this line is here to pass the image to the modal
  }

  addComment(imageId: number, comment: string): void {
    // Implement the service call to add a comment
  }
}
