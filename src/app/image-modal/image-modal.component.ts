import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent {
  @Input() image: any;
  comments: string[] = [];
  newComment: string = '';
  isVisible: boolean = false;
  selectedImage: any;

  addComment() {
    if (this.newComment) {
      this.comments.push(this.newComment);
      this.newComment = ''; // Clear the input after adding
    }
  }

  onBackdropClick(event: MouseEvent): void {
    this.closeModal(); // Now this method will exist
  }

  closeModal(): void {
    console.log('Closing modal');
    this.isVisible = false;
  }

  openModal(): void {
    this.isVisible = true;
  }

  selectImage(image: any): void {
    this.selectedImage = image;
    this.openModal();  // Ensure this line is here to open the modal
  }
}

