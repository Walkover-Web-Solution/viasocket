import React, { useEffect, useState } from 'react';
import IconWrapper from './iconWrapper.js'

export function IconOfBlock({ iconUrl }) {
  const [imgSrc, setImgSrc] = useState(iconUrl);

  useEffect(() => {
    if (!iconUrl) {
      setImgSrc(null);
      return;
    }

    // Check if it's a data URL (base64)
    if (iconUrl.startsWith('data:')) {
      setImgSrc(iconUrl);
      return;
    }

    let objectUrl;

    fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(iconUrl)}`)
      .then((res) => res.blob())
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        setImgSrc(objectUrl);
      })
      .catch((err) => {
        console.error('Error loading icon:', err);
        setImgSrc(iconUrl); // fallback to original URL
      });

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [iconUrl]);

  if (!imgSrc) return null;

  return (
    <IconWrapper
      iconUrl={imgSrc}
      size="40px" // adjust size or use a variable
    />
  );
}