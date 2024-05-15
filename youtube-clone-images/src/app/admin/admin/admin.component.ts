import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgFor} from '@angular/common';
import { ImageService } from '../../services/image/image.service'; // Assuming you have a service to handle API requests

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],  // Ensure CommonModule is imported here
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  images: any[] = [];

  constructor() { }
  ImageService: ImageService = inject(ImageService);

  ngOnInit() {
    this.ImageService.getAllImages().then((data: any[]) => {
      this.images = data;
    });
  }

  deleteImage(imageId: number) {
    this.ImageService.deleteImageById(imageId).then(() => {
      this.images = this.images.filter(img => img.id !== imageId);
    }).catch((err: any) => {
      console.error('Error deleting image:', err);
    });
  }
}
