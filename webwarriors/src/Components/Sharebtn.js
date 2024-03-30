import React from 'react'
import share from "../Images/share.png" 

function Sharebtn({ title, url }) {
    const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title,
              url,
            });
            console.log('Shared successfully');
          } catch (error) {
            console.error('Error sharing:', error.message);
          }
        } else {
          // Fallback behavior if Web Share API is not supported
          const shareUrl = `whatsapp://send?text=${encodeURIComponent(title + ' - ' + url)}`;
          window.open(shareUrl, '_blank');
        }
      };
    
  return (
    <button onClick={handleShare}>
    <img src={share} alt="Share" />
  </button>
  )
}

export default Sharebtn
