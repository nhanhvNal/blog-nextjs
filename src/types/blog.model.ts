export interface PostModel {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  author: string;
  tags?: string[];
  readingTime?: string;
  authorAvatar?: string;
}

export interface CreatePostData {
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  date: string;
  authorAvatar: string;
  author: string;
  readingTime: string;
}

export interface UpdatePostData extends CreatePostData {
  id: string;
}
