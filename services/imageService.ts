
import { CDN_BASE_URL } from '../constants';
import { ImageItem } from '../types';

/**
 * Structural Note for Continuous Uploads:
 * Currently, we probe 1.png, 2.png, etc.
 * PRO: No extra files needed.
 * CON: Slow if you have 1000s of images.
 * 
 * RECOMMENDED UPGRADE: 
 * Create a 'gallery.json' file in your GitHub root:
 * { "images": [{ "id": 1, "year": 2024, "tags": ["cat"] }, ...] }
 * Then fetch that single JSON file instead of multiple HEAD requests.
 */

export const discoverImages = async (): Promise<ImageItem[]> => {
  const availableImages: ImageItem[] = [];
  let consecutiveFailures = 0;
  let currentId = 1;
  const MAX_SEARCH_LIMIT = 500; // Increased limit for future growth

  while (consecutiveFailures < 3 && currentId <= MAX_SEARCH_LIMIT) {
    const imageUrl = `${CDN_BASE_URL}/${currentId}.png`;
    
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      
      if (response.ok) {
        availableImages.push({
          id: currentId,
          url: imageUrl,
          title: `Archive Item #${currentId.toString().padStart(3, '0')}`
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

  // Reverse to show newest (highest number) first by default
  return availableImages.reverse();
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
    alert('Failed to download image.');
  }
};

export const shareOnTwitter = (imageUrl: string) => {
  const text = encodeURIComponent('Checking out the skyfishb 2024-2026 archive!');
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=${text}`, '_blank');
};

export const shareOnFacebook = (imageUrl: string) => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`, '_blank');
};

export const shareOnLinkedIn = (imageUrl: string) => {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl)}`, '_blank');
};
