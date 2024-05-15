import { Component, inject } from '@angular/core';
import { CommentService } from '../../services/comment/comment.service';
import { Comment } from '../../services/datas';
import { CommonModule, NgFor } from '@angular/common';
import { Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-comment-view',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './comment-view.component.html',
  styleUrl: './comment-view.component.css'
})

export class CommentViewComponent implements OnChanges {
  @Input() image_id!: number;
  comments: Comment[] = [];
  private CommentService: CommentService = inject(CommentService);

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['image_id']) {
      // console.log('imageId has changed:', changes['image_id'].currentValue);
      this.CommentService.getCommentsByIdImg(this.image_id).then((commentList: Comment[]) => {
        this.comments = commentList;
        // console.log("comments : " + this.comments);
      }).catch(error => {
        console.error('Error fetching comments:', error);
      });
    }
  }


}
