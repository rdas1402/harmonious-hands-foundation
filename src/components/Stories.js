import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Stories = () => {
  const stories = [
    {
      title: 'Community Engagement Success',
      description: 'How we reached over 50 communities with our holistic development programs.',
      image: require('../assets/events/cm_event/cm_event_5.webp')
    },
    {
      title: 'Education Transformation',
      description: 'Success stories of children who are now thriving in school.',
      image: require('../assets/events/cm_event/cm_event_6.webp')
    },
    {
      title: 'Cultural Preservation',
      description: 'Preserving Assam\'s rich cultural heritage through community programs.',
      image: require('../assets/events/cm_event/cm_event_7.webp')
    }
  ];

  // Function to dynamically load all images ONLY from the gallery folder
  const loadGalleryImages = () => {
    try {
      // Load ALL images from the gallery folder dynamically
      const galleryContext = require.context('../assets/gallery', false, /\.(jpg|jpeg|png|gif|webp|avif)$/i);
      const imageFiles = galleryContext.keys();
      
      // Create an array of objects with filename, module, and extracted date
      const imagesWithInfo = imageFiles.map(filename => {
        const dateInfo = extractDateInfoFromFilename(filename);
        return {
          filename,
          module: galleryContext(filename),
          date: dateInfo.date,
          sortKey: dateInfo.sortKey,
          dateString: dateInfo.dateString
        };
      });
      
      // Sort by date in descending order (newest first)
      // If no date found in filename, sort alphabetically in reverse (Z-A)
      imagesWithInfo.sort((a, b) => {
        // Both have dates - sort by date
        if (a.sortKey && b.sortKey) {
          return b.sortKey - a.sortKey; // Descending (newest first)
        }
        
        // Only one has date - prioritize dated files
        if (a.sortKey && !b.sortKey) return -1;
        if (!a.sortKey && b.sortKey) return 1;
        
        // Neither has date - sort alphabetically in reverse
        return b.filename.localeCompare(a.filename);
      });
      
      // Extract just the modules (image sources) in sorted order
      const galleryImages = imagesWithInfo.map(img => img.module);
      
      // Return only gallery images, no fallbacks
      return galleryImages;
    } catch (error) {
      console.error('Error loading gallery images:', error);
      // Return empty array if no images found
      return [];
    }
  };

  // Helper function to extract date information from filename
  const extractDateInfoFromFilename = (filename) => {
    // Remove path and extension
    const basename = filename.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '');
    
    // Common date patterns in filenames (in order of preference)
    const datePatterns = [
      // YYYY-MM-DD or YYYY_MM_DD or YYYY.MM.DD
      { pattern: /(\d{4})[-_.](\d{1,2})[-_.](\d{1,2})/, type: 'yyyy-mm-dd' },
      // DD-MM-YYYY or DD_MM_YYYY or DD.MM.YYYY
      { pattern: /(\d{1,2})[-_.](\d{1,2})[-_.](\d{4})/, type: 'dd-mm-yyyy' },
      // YYYYMMDD
      { pattern: /(\d{4})(\d{2})(\d{2})/, type: 'yyyymmdd' },
      // MMDDYYYY or DDMMYYYY
      { pattern: /(\d{2})(\d{2})(\d{4})/, type: 'mmddyyyy' },
      // Unix timestamp (10 or 13 digits)
      { pattern: /(\d{10}|\d{13})/, type: 'timestamp' }
    ];
    
    for (const datePattern of datePatterns) {
      const match = basename.match(datePattern.pattern);
      if (match) {
        let date, sortKey, dateString;
        
        switch (datePattern.type) {
          case 'yyyy-mm-dd':
            date = new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
            sortKey = date.getTime();
            dateString = `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
            break;
            
          case 'dd-mm-yyyy':
            date = new Date(parseInt(match[3]), parseInt(match[2]) - 1, parseInt(match[1]));
            sortKey = date.getTime();
            dateString = `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
            break;
            
          case 'yyyymmdd':
            date = new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
            sortKey = date.getTime();
            dateString = `${match[1]}-${match[2]}-${match[3]}`;
            break;
            
          case 'mmddyyyy':
            // Assume MM-DD-YYYY format
            date = new Date(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]));
            sortKey = date.getTime();
            dateString = `${match[3]}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
            break;
            
          case 'timestamp':
            const timestamp = parseInt(match[1]);
            // If 10 digits, it's seconds; if 13 digits, it's milliseconds
            const timestampMs = timestamp.toString().length === 10 ? timestamp * 1000 : timestamp;
            date = new Date(timestampMs);
            sortKey = timestampMs;
            dateString = date.toISOString().split('T')[0];
            break;
        }
        
        if (date && !isNaN(date.getTime())) {
          return { date, sortKey, dateString };
        }
      }
    }
    
    // No date pattern found
    return { date: null, sortKey: null, dateString: null };
  };

  // State for gallery images
  const [galleryImages, setGalleryImages] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);

  // Load all gallery images on component mount
  useEffect(() => {
    const images = loadGalleryImages();
    setGalleryImages(images);
    
    // Always set the first image as center (since they're sorted newest first)
    if (images.length > 0) {
      setCenterIndex(0); // First image is now the newest
    }
  }, []);

  const handlePrev = () => {
    if (isTransitioning || galleryImages.length === 0) return;
    setIsTransitioning(true);
    setCenterIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleNext = () => {
    if (isTransitioning || galleryImages.length === 0) return;
    setIsTransitioning(true);
    setCenterIndex(prev => (prev + 1) % galleryImages.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleDotClick = (index) => {
    if (isTransitioning || galleryImages.length === 0) return;
    setIsTransitioning(true);
    setCenterIndex(index);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleImageClick = (index) => {
    if (isTransitioning || galleryImages.length === 0 || index === centerIndex) return;
    setIsTransitioning(true);
    setCenterIndex(index);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  // Get 3 images to display (left, center, right)
  const getDisplayImages = () => {
    const total = galleryImages.length;
    if (total === 0) return [];
    
    const images = [];
    
    for (let i = -1; i <= 1; i++) {
      let index = centerIndex + i;
      if (index < 0) index = total + index;
      if (index >= total) index = index - total;
      images.push({
        index,
        position: i, // -1, 0, 1
        isCenter: i === 0
      });
    }
    
    return images;
  };

  // Display message if no gallery images found
  if (galleryImages.length === 0) {
    return (
      <section id="stories" className="section stories">
        {/* Top Brush Decoration */}
        <div 
          className="brush-decoration top-brush"
          style={{ 
            backgroundImage: `url(${require('../assets/brush-top-alt.jpeg')})`
          }}
        />
        <div className="container">
          <h2 className="section-title">Our Stories & Gallery</h2>
          <p className="stories-subtitle">
            Witness the impact of our work through photos and success stories
          </p>
          
          <div className="stories-grid">
            {stories.map((story, index) => (
              <div key={index} className="story-card">
                <div className="story-image">
                  <img 
                    src={story.image} 
                    alt={story.title}
                  />
                </div>
                <div className="story-content">
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                  <button className="btn">View Gallery</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="gallery-preview">
            <div className="gallery-header-container">
              <div className="gallery-header-divider"></div>
              <h3 className="gallery-title">PHOTO GALLERY</h3>
              <div className="gallery-header-divider"></div>
            </div>
            
            <div className="gallery-spacing"></div>
            
            <div className="no-gallery-message">
              <p>No photos found in the gallery folder.</p>
              <p>Please add photos to <code>assets/gallery/</code> folder.</p>
              <div className="naming-tip">
                <h4>For automatic chronological sorting:</h4>
                <ul>
                  <li><strong>Use date prefixes:</strong> <code>2024-01-15_event.jpg</code></li>
                  <li><strong>Or sequence numbers:</strong> <code>001_event.jpg</code>, <code>002_event.jpg</code></li>
                  <li><strong>Recommended format:</strong> <code>YYYY-MM-DD_description.jpg</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          .no-gallery-message {
            text-align: center;
            padding: 60px 20px;
            color: #666;
            font-size: 1.1rem;
          }
          
          .no-gallery-message p {
            margin: 10px 0;
          }
          
          .no-gallery-message code {
            background: #f0f0f0;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            color: #2c3e50;
          }
          
          .naming-tip {
            margin-top: 30px;
            padding: 20px;
            background: rgba(255, 165, 0, 0.1);
            border-radius: 10px;
            border: 1px solid rgba(255, 165, 0, 0.2);
            text-align: left;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .naming-tip h4 {
            color: #2c3e50;
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 1.1rem;
          }
          
          .naming-tip ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          
          .naming-tip li {
            margin-bottom: 8px;
            line-height: 1.5;
          }
          
          .naming-tip strong {
            color: #2c3e50;
          }
        `}</style>
      </section>
    );
  }

  return (
    <section id="stories" className="section stories">
      {/* Top Brush Decoration */}
      <div 
        className="brush-decoration top-brush"
        style={{ 
          backgroundImage: `url(${require('../assets/brush-top-alt.jpeg')})`
        }}
      />
      <div className="container">
        <h2 className="section-title">Our Stories & Gallery</h2>
        <p className="stories-subtitle">
          Witness the impact of our work through photos and success stories
        </p>
        
        <div className="stories-grid">
          {stories.map((story, index) => (
            <div key={index} className="story-card">
              <div className="story-image">
                <img 
                  src={story.image} 
                  alt={story.title}
                />
              </div>
              <div className="story-content">
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                <button className="btn">View Gallery</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="gallery-preview">
          {/* Gallery Header - Centered with proper spacing */}
          <div className="gallery-header-container">
            <div className="gallery-header-divider"></div>
            <h3 className="gallery-title">PHOTO GALLERY</h3>
            <div className="gallery-header-divider"></div>
          </div>
          
          {/* Spacing between title and photos - 80px */}
          <div className="gallery-spacing"></div>
          
          <div className="gallery-carousel-container" ref={carouselRef}>
            {/* Left Arrow - Light and Transparent */}
            <button 
              className="carousel-arrow left-arrow" 
              onClick={handlePrev}
              aria-label="Previous"
              disabled={isTransitioning || galleryImages.length === 0}
            >
              <FaChevronLeft />
            </button>
            
            {/* Carousel with 3 images */}
            <div className={`gallery-carousel ${isTransitioning ? 'transitioning' : ''}`}>
              {getDisplayImages().map(({ index, position, isCenter }) => (
                <div 
                  key={index}
                  className={`carousel-image ${isCenter ? 'center' : ''} position-${position}`}
                  onClick={() => handleImageClick(index)}
                >
                  <div className="image-wrapper">
                    <img 
                      src={galleryImages[index]} 
                      alt={`Gallery Image ${index + 1}`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x500?text=Image+Not+Found';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right Arrow - Light and Transparent */}
            <button 
              className="carousel-arrow right-arrow" 
              onClick={handleNext}
              aria-label="Next"
              disabled={isTransitioning || galleryImages.length === 0}
            >
              <FaChevronRight />
            </button>
          </div>
          
          {/* Dot indicators only */}
          <div className="gallery-dots">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === centerIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to image ${index + 1}`}
                disabled={isTransitioning}
              />
            ))}
          </div>
          
          {/* Gallery info */}
          <div className="gallery-info">
            <span className="photo-count">{galleryImages.length} photos</span>
            <span className="sorting-info">• Sorted by date (newest first)</span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .stories {
          position: relative;
          background: #ffffff;
          scroll-margin-top: 95px;
          padding: 80px 0;
          overflow: hidden;
        }
        
        .container {
          position: relative;
          z-index: 2;
        }
        
        .section-title {
          color: #2c3e50;
          font-size: 2.8rem;
          margin-bottom: 20px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
          text-align: center;
        }
        
        .stories-subtitle {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 50px;
          color: #666;
          font-size: 1.1rem;
        }
        
        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }
        
        .story-card {
          background: #ffffff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(255, 165, 0, 0.15);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 165, 0, 0.2);
        }
        
        .story-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(255, 165, 0, 0.25);
        }
        
        .story-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: #FFA500;
          border-radius: 15px 15px 0 0;
        }
        
        .story-image {
          height: 200px;
          overflow: hidden;
        }
        
        .story-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        
        .story-card:hover .story-image img {
          transform: scale(1.1);
        }
        
        .story-content {
          padding: 30px;
        }
        
        .story-content h3 {
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .story-content p {
          color: #666;
          margin-bottom: 20px;
          line-height: 1.6;
          font-size: 1.05rem;
        }
        
        .btn {
          background: #FFA500;
          color: #2c3e50 !important;
          border: none;
          padding: 12px 30px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          text-align: center;
          min-width: 150px;
        }
        
        .btn:hover {
          background: #FF8C00;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 165, 0, 0.4);
        }
        
        .gallery-preview {
          background: #ffffff;
          padding: 50px 40px 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(255, 165, 0, 0.15);
          text-align: center;
          border: 1px solid rgba(255, 165, 0, 0.2);
          position: relative;
          overflow: hidden;
          margin-top: 30px;
        }
        
        .gallery-preview::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: #FFA500;
          border-radius: 15px 15px 0 0;
        }
        
        /* Gallery Header */
        .gallery-header-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 25px;
          width: 100%;
        }
        
        .gallery-title {
          color: #2c3e50;
          font-size: 2.5rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
          margin: 0;
          white-space: nowrap;
          text-align: center;
          flex-shrink: 0;
        }
        
        .gallery-header-divider {
          flex: 1;
          height: 4px;
          background: #FFA500;
          border-radius: 2px;
          max-width: 200px;
        }
        
        /* Spacing between title and photos - 80px */
        .gallery-spacing {
          height: 80px;
          width: 100%;
        }
        
        /* Carousel Container */
        .gallery-carousel-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin-bottom: 30px;
          position: relative;
          height: 450px;
          min-height: 450px;
          width: 100%;
        }
        
        /* Arrows - Light and Transparent */
        .carousel-arrow {
          background: rgba(255, 165, 0, 0.7);
          color: #2c3e50;
          border: none;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 2rem;
          transition: all 0.3s ease;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(255, 165, 0, 0.2);
          z-index: 20;
          position: relative;
          margin: 0;
          backdrop-filter: blur(5px);
          border: 2px solid rgba(255, 165, 0, 0.3);
        }
        
        .carousel-arrow:hover:not(:disabled) {
          background: rgba(255, 165, 0, 0.9);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(255, 165, 0, 0.3);
        }
        
        .carousel-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none !important;
        }
        
        /* Carousel */
        .gallery-carousel {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          width: 100%;
          max-width: 1100px;
          padding: 20px;
          position: relative;
          transition: opacity 0.3s ease;
          height: 450px;
          margin: 0 auto;
        }
        
        .gallery-carousel.transitioning {
          opacity: 0.9;
        }
        
        /* Images */
        .carousel-image {
          border-radius: 15px;
          overflow: hidden;
          cursor: pointer;
          position: absolute;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border: 4px solid transparent;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          background: #f8f8f8;
          opacity: 0;
          transform: scale(0.8);
        }
        
        /* Left image */
        .position--1 {
          width: 320px;
          height: 400px;
          left: 15%;
          transform: translateX(-50%) scale(0.85);
          opacity: 0.6;
          z-index: 2;
        }
        
        /* Center image */
        .position-0.center {
          width: 450px;
          height: 550px;
          left: 50%;
          transform: translateX(-50%) scale(1);
          opacity: 1;
          z-index: 10;
          border-color: #FFA500;
          box-shadow: 0 25px 60px rgba(255, 165, 0, 0.4);
        }
        
        /* Right image */
        .position-1 {
          width: 320px;
          height: 400px;
          right: 15%;
          transform: translateX(50%) scale(0.85);
          opacity: 0.6;
          z-index: 2;
        }
        
        .carousel-image:hover:not(.center) {
          opacity: 0.8;
          transform: scale(0.9);
          box-shadow: 0 12px 35px rgba(255, 165, 0, 0.25);
        }
        
        .carousel-image.center:hover {
          transform: translateX(-50%) scale(1.02);
          box-shadow: 0 30px 70px rgba(255, 165, 0, 0.5);
        }
        
        .image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #f8f8f8;
        }
        
        .carousel-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .carousel-image:hover img {
          transform: scale(1.05);
        }
        
        .center-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 165, 0, 0.9);
          color: #2c3e50;
          padding: 10px 18px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          animation: pulse 2s infinite;
          box-shadow: 0 4px 15px rgba(255, 165, 0, 0.3);
          z-index: 11;
          backdrop-filter: blur(5px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        
        .image-number {
          font-size: 0.8rem;
          font-weight: 600;
          opacity: 0.9;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        /* Dot indicators */
        .gallery-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 10px;
          margin-bottom: 20px;
        }
        
        .dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ddd;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
          flex-shrink: 0;
        }
        
        .dot.active {
          background: #FFA500;
          transform: scale(1.4);
          box-shadow: 0 0 15px rgba(255, 165, 0, 0.5);
        }
        
        .dot:hover:not(:disabled) {
          background: #FFA500;
          transform: scale(1.2);
        }
        
        .dot:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        
        /* Gallery info */
        .gallery-info {
          color: #666;
          font-size: 0.9rem;
          margin-top: 15px;
          opacity: 0.8;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
        }
        
        .photo-count {
          font-weight: 600;
          color: #2c3e50;
        }
        
        .sorting-info {
          font-size: 0.85rem;
          opacity: 0.7;
        }
        
        /* Responsive Design */
        @media (max-width: 1400px) {
          .position--1, .position-1 {
            width: 280px;
            height: 350px;
          }
          
          .position-0.center {
            width: 400px;
            height: 500px;
          }
          
          .gallery-carousel-container {
            height: 420px;
            min-height: 420px;
          }
          
          .gallery-carousel {
            height: 420px;
          }
          
          .carousel-arrow {
            width: 65px;
            height: 65px;
            font-size: 1.8rem;
          }
          
          .gallery-spacing {
            height: 70px;
          }
        }
        
        @media (max-width: 1200px) {
          .gallery-title {
            font-size: 2.2rem;
          }
          
          .gallery-carousel {
            max-width: 900px;
          }
          
          .position--1, .position-1 {
            width: 250px;
            height: 320px;
            left: 10%;
            right: 10%;
          }
          
          .position-0.center {
            width: 350px;
            height: 440px;
          }
          
          .gallery-carousel-container {
            height: 380px;
            min-height: 380px;
          }
          
          .gallery-carousel {
            height: 380px;
          }
          
          .carousel-arrow {
            width: 60px;
            height: 60px;
            font-size: 1.7rem;
          }
          
          .gallery-spacing {
            height: 60px;
          }
        }
        
        @media (max-width: 992px) {
          .stories {
            scroll-margin-top: 70px;
            padding: 60px 0;
          }
          
          .section-title {
            font-size: 2.3rem;
          }
          
          .gallery-title {
            font-size: 2rem;
          }
          
          .gallery-carousel-container {
            gap: 20px;
            height: 350px;
            min-height: 350px;
          }
          
          .carousel-arrow {
            width: 55px;
            height: 55px;
            font-size: 1.5rem;
          }
          
          .position--1, .position-1 {
            width: 220px;
            height: 280px;
          }
          
          .position-0.center {
            width: 300px;
            height: 380px;
          }
          
          .gallery-carousel {
            height: 350px;
          }
          
          .gallery-header-divider {
            max-width: 120px;
          }
          
          .gallery-spacing {
            height: 50px;
          }
        }
        
        @media (max-width: 768px) {
          .stories {
            scroll-margin-top: 70px;
          }
          
          .gallery-preview {
            padding: 40px 30px 30px;
          }
          
          .gallery-title {
            font-size: 1.8rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .gallery-carousel-container {
            gap: 15px;
            height: 320px;
            min-height: 320px;
          }
          
          .carousel-arrow {
            width: 50px;
            height: 50px;
            font-size: 1.3rem;
          }
          
          .position--1, .position-1 {
            width: 180px;
            height: 230px;
            display: none;
          }
          
          .position-0.center {
            width: 280px;
            height: 350px;
            left: 50%;
            transform: translateX(-50%) scale(1);
          }
          
          .gallery-carousel {
            height: 320px;
          }
          
          .center-badge {
            padding: 8px 14px;
            font-size: 0.8rem;
          }
          
          .gallery-header-divider {
            max-width: 80px;
          }
          
          .gallery-spacing {
            height: 40px;
          }
        }
        
        @media (max-width: 640px) {
          .gallery-header-container {
            flex-direction: column;
            gap: 15px;
          }
          
          .gallery-header-divider {
            width: 100px;
            max-width: 100px;
          }
          
          .gallery-title {
            font-size: 1.7rem;
          }
          
          .gallery-carousel-container {
            flex-direction: row;
            height: 300px;
            min-height: 300px;
          }
          
          .gallery-carousel {
            flex-direction: row;
            height: 300px;
          }
          
          .position-0.center {
            width: 250px;
            height: 320px;
          }
          
          .gallery-spacing {
            height: 30px;
          }
          
          .gallery-info {
            flex-direction: column;
            gap: 3px;
          }
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 1.8rem;
          }
          
          .gallery-title {
            font-size: 1.5rem;
          }
          
          .stories-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .position-0.center {
            width: 220px;
            height: 280px;
          }
          
          .carousel-arrow {
            width: 45px;
            height: 45px;
            font-size: 1.2rem;
          }
          
          .gallery-carousel-container {
            height: 280px;
            min-height: 280px;
          }
          
          .gallery-carousel {
            height: 280px;
          }
          
          .gallery-spacing {
            height: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default Stories;