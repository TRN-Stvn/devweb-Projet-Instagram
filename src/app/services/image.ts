export interface Image {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  image_path: string;
  category?: string;
  date_published?: Date;
}

