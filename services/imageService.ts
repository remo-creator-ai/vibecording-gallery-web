
import { CDN_BASE_URL } from '../constants';
import { ImageItem } from '../types';

export const discoverImages = async (): Promise<ImageItem[]> => {
  const availableImages: ImageItem[] = [];
  let consecutiveFailures = 0;
  let currentId = 1;
  const MAX_SEARCH_LIMIT = 100;

  while (consecutiveFailures < 3 && currentId <= MAX_SEARCH_LIMIT) {
    const imageUrl = `${CDN_BASE_URL}/${currentId}.png`;
    
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      
      if (response.ok) {
        // Based on user request: 1-8 are 2024 Colorful Cat series
        const is2024 = currentId <= 8;
        availableImages.push({
          id: currentId,
          url: imageUrl,
          title: is2024 ? `Colorful Cat #${currentId}` : `Cat with flower #${currentId - 8}`,
          year: is2024 ? 2024 : 2026,
          series: is2024 ? "A Colorful Cat" : "Cat with flower"
        });
        consecutiveFailures = 0;
      } else {
        consecutiveFailures++;
      }
    } catch (error) {
      consecutiveFailures++;
    }
    
    currentId++;
  }

  return availableImages;
};

export const downloadImage = async (imageUrl: string, imageName: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${imageName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
  }
};

export const shareOnTwitter = (imageUrl: string) => {
  const text = encodeURIComponent('Check out this AI art by skyfishb!');
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=${text}`, '_blank');
};

export const shareOnFacebook = (imageUrl: string) => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`, '_blank');
};

export const shareOnLinkedIn = (imageUrl: string) => {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl)}`, '_blank');
};
