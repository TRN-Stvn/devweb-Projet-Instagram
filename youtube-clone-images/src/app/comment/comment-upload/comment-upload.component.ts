import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { CommentService } from '../../services/comment/comment.service'; // Adjust the path as necessary
import { FormsModule } from '@angular/forms'; // Import FormsModule here

@Component({
  selector: 'app-comment-upload',
  standalone: true,
  imports: [FormsModule], // Add FormsModule to the imports array
  templateUrl: './comment-upload.component.html',
  styleUrls: ['./comment-upload.component.css']
})
export class CommentUploadComponent {
  @Input() image_id!: number;
  commentText: string = '';
  CommentsService: CommentService = inject(CommentService);


  constructor() { }


  submitComment(): void {
    const newComment = {
      image_id: this.image_id,
      contenu: this.commentText,
      pseudo: 'YourUsername', // Replace with dynamic user data
      date_published: new Date().toISOString() // Format date to ISO 8601
    };
    console.log(newComment);
    this.CommentsService.postComment(this.image_id, "Test_before_auth", this.commentText).then(() => {
      this.commentText = ''; // Clear the form
      alert('Comment posted successfully!');
    }).catch(error => {
      console.error('Failed to post comment:', error);
    });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['image_id']) {
  //     this.image_id = changes['image_id'].currentValue;
  //     console.log('imageId has changed:', changes['image_id'].currentValue);
  //     this.submitComment();
  //     console.log("image id : " + this.image_id);
  //   }
  // }



}


