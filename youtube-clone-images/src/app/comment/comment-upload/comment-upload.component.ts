import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { CommentService } from '../../services/comment/comment.service'; // Adjust the path as necessary
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { AuthService } from '../../services/auth/auth.service';

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
  authService: AuthService = inject(AuthService);
  userId: number | null = null;
  userFirstName: string | null = null;
  isLoggedIn: boolean = false;

  constructor() {
    this.authService.userId.subscribe(id => {
      this.userId = id;
      this.isLoggedIn = !!id;
      // Make sure this is a number
    });
    this.authService.fetchAllUsers().then(users => {
      this.authService.userId.subscribe(id => {
        const user = users.find(user => user.id === id);
        this.userFirstName = user ? user.firstName : null;
      });
      console.log("(comment upload)userId: " + this.userId);
      console.log("(comment upload)userFirstName: " + this.userFirstName);
    }).catch(error => {
      console.error('Failed to fetch users:', error);
    });
  }

  // submitComment(): void {
  //   if (this.userId && this.userFirstName) {
  //     const newComment = {
  //       image_id: this.image_id,
  //       contenu: this.commentText,
  //       pseudo: this.userFirstName, // Use the user's first name as pseudo
  //       id_user: this.userId, // Include the user ID
  //       date_published: new Date().toISOString() // Format date to ISO 8601
  //     };
  //     this.CommentsService.postComment(newComment).then(() => {
  //       this.commentText = ''; // Clear the form
  //       alert('Comment posted successfully!');
  //     }).catch(error => {
  //       console.error('Failed to post comment:', error);
  //     });
  //   } else {
  //     console.error('User ID or first name is null');
  //   }
  // }

  submitComment(): void {
    const newComment = {
      image_id: this.image_id,
      contenu: this.commentText,
      id_user: this.userId,
      pseudo: this.userFirstName, // Replace with dynamic user data
      date_published: new Date().toISOString() // Format date to ISO 8601
    };
    console.log(newComment);
    if (this.userId !== null && this.userFirstName !== null) {
      this.CommentsService.postComment(this.image_id, this.userId, this.userFirstName, this.commentText).then(() => {
        this.commentText = ''; // Clear the form
        alert('Comment posted successfully!');
      }).catch(error => {
        console.error('Failed to post comment:', error);
      });
    } else {
      console.error('User ID or first name is null');
    }

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

