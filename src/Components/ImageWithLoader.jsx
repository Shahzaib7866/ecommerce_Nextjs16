'use client'
import { useState } from 'react';
import './ImageWithLoader.css';

const ImageWithLoader = ({ src, alt, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="img-loader-wrapper">
      {/* Shimmer skeleton — hidden once image loads */}
      {!loaded && !error && (
        <div className="img-loader-skeleton">
          <div className="img-loader-shimmer" />
        </div>
      )}

      {/* Error fallback */}
      {error && (
        <div className="img-loader-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M3 16l5-5 4 4 3-3 6 6" />
            <circle cx="8.5" cy="8.5" r="1.5" />
          </svg>
          <span>Image unavailable</span>
        </div>
      )}

      {/* Actual image — invisible until loaded */}
      <img
        src={src}
        alt={alt}
        className={`img-loader-img ${loaded ? 'img-loader-img--visible' : ''} ${className}`}
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
      />
    </div>
  );
};

export default ImageWithLoader;
