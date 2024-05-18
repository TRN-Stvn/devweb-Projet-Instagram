import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ImageService } from '../../services/image/image.service';
import { Image } from '../../services/datas';
import { AuthService } from '../../services/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  imports: [ReactiveFormsModule], // Now valid because the component is standalone
  standalone: true
})
export class ImageUploadComponent {
  uploadForm: FormGroup;
  imageService: ImageService = inject(ImageService);
  isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
      userId: [null, Validators.required],
      category: ['']
    });

    this.authService.userId.subscribe(id => {
      this.uploadForm.patchValue({ userId: id });
      this.isLoggedIn = !!id;
    });
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    this.uploadForm.patchValue({ image: file });
  }

  async onSubmit(): Promise<void> {
    if (this.uploadForm.valid) {
      const userId: number = this.uploadForm.get('userId')!.value;
      const userFirstName = await this.authService.userFirstName.pipe(take(1)).toPromise(); // Get the user's first name

      const file: File = this.uploadForm.get('image')!.value;
      const imageData: Image = {
        user_id: userId,
        title: this.uploadForm.get('title')!.value,
        description: this.uploadForm.get('description')!.value,
        category: this.uploadForm.get('category')!.value,
        image_path: '',
        id: 0,
        author: 'Author Name' // Temporarily include for frontend use
      };

      // Remove 'author' before sending to backend
      const { author, ...dataForBackend } = imageData;
      this.imageService.uploadImage(dataForBackend, file).then(response => {
        console.log('Upload successful', response);
        alert('Image uploaded successfully!');
        this.uploadForm.reset();
      }).catch(error => {
        console.error('Failed to upload image:', error);
      });
    } else {
      console.error('Form is not valid');
    }
  }
}
