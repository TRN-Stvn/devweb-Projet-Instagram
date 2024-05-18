import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Image } from '../../services/datas';
import { CommentViewComponent } from "../../comment/comment-view/comment-view.component";
import { CommentService } from '../../services/comment/comment.service';
import { CommentUploadComponent } from "../../comment/comment-upload/comment-upload.component";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
  imports: [CommonModule, FormsModule, CommentViewComponent, CommentUploadComponent]
})
export class ImageModalComponent {
  @Input() image!: Image;  // Ensure this is correctly typed as Image
  @Input() image_id!: number;
  newComment: string = '';
  isVisible: boolean = false;
  selectedImage: Image | null = null;
  CommentService: any;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {


    this.authService.userId.subscribe(id => {
      this.isLoggedIn = !!id;
    });
  }

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
    this.closeModal();
  }

  closeModal(): void {
    console.log('Closing modal');
    this.isVisible = false;
  }

  openModal(): void {
    this.isVisible = true;
  }

  selectImage(image: Image): void {
    // console.log("Selected Image:", image);
    this.image = image;
    this.openModal();
  }
  getImageUrl(imagePath: string): string {
    return `http://localhost:5000/${imagePath}`;
  }
}

