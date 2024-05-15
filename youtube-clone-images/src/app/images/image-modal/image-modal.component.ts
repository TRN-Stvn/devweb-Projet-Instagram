import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Image } from '../../services/datas';
import { CommentViewComponent } from "../../comment/comment-view/comment-view.component";
import { CommentService } from '../../services/comment/comment.service';
import { CommentUploadComponent } from "../../comment/comment-upload/comment-upload.component";

@Component({
  selector: 'app-image-modal',
  standalone: true,
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
  imports: [CommonModule, FormsModule, CommentViewComponent, CommentUploadComponent]
})
export class ImageModalComponent {
  @Input()
  image: any;
  @Input() image_id!: number; // Added this line to declare 'image_id' as an input
  newComment: string = '';
  isVisible: boolean = false;
  selectedImage: any;
  CommentService: any;

  constructor() { }


  // loadComments() {
  //   this.CommentService.getCommentsByIdImg(this.image_id).subscribe((comments: any[]) => {
  //     this.comments = comments;
  //   });
  // }

  // addComment() {
  //   if (this.newComment) {
  //     this.comments.push(this.newComment);
  //     this.newComment = ''; // Clear the input after adding
  //   }
  // }

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
    // this.image_id = image.id;
    console.log("Selected Image ID:", this.selectedImage.id);
    this.openModal();  // Ensure this line is here to open the modal
  }
  getImageUrl(imagePath: string): string {
    return `http://localhost:5000/${imagePath}`;
  }
}

