
export interface ImageItem {
  id: number;
  url: string;
  title: string;
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light'
}

export interface GalleryState {
  images: ImageItem[];
  isLoading: boolean;
  error: string | null;
}
