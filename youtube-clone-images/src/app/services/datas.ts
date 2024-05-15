export interface Image {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  image_path: string;
  category?: string;
  date_published?: Date;
}

export interface Comment {
  id: number;
  image_id: number;
  // user_id: number;
  pseudo: string;
  contenu: string;
  date_published: Date;
}

