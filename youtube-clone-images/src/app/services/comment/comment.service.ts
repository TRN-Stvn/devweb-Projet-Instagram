import { Injectable } from '@angular/core';
import { Comment } from '../datas';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://localhost:8080';

  async getAllComments(): Promise<Comment[]> {
    try {
      const data = await fetch(`${this.baseUrl}/comments`);
      return await data.json() ?? [];
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      return [];
    }
  }

  async getCommentsByIdImg(imageId: number) {
    const data = await fetch(`${this.baseUrl}/comments-by-img-id/${imageId}`);
    // console.log("data :"+data);
    return await data.json() ?? [];
  }

  async postComment(id_img: number, pseudo: string, contenu: string): Promise<void> {
    const newComment = {
      id_image: id_img,
      pseudo: pseudo,
      contenu: contenu,
      date_published: new Date() // Assuming the date is set on the client-side
    };

    const response = await fetch(`${this.baseUrl}/upload-com`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    });

    if (!response.ok) {
      throw new Error('Failed to post comment');
    }
  }
}
