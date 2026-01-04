import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes, FaCalendar, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const Stories = () => {
  const stories = [
    {
      id: 'health_camp',
      title: 'Health Checkup Camp',
      date: 'January 04, 2026',
      location: 'Rural Assam',
      participants: '100+ Villagers',
      description: 'Free health checkup camp organized in collaboration with local doctors. Provided basic healthcare services and medicines to underserved communities.',
      image: require('../assets/events/health_camp/2026-01-04_2.jpeg')
    },
    {
      id: 'cm_event',
      title: 'Community Meet Event',
      date: 'December 15, 2023',
      location: 'Sonari, Assam',
      participants: '150+ Community Members',
      description: 'A successful community engagement event where we discussed various development initiatives and gathered feedback from local residents. This event helped us understand the specific needs of the community and plan our future projects accordingly.',
      image: require('../assets/events/cm_event/cm_event_1.webp')
    },
    {
      id: 'education_camp',
      title: 'Education Awareness Camp',
      date: 'November 22, 2023',
      location: 'Multiple Villages, Assam',
      participants: '200+ Students & Parents',
      description: 'Education awareness camp focused on the importance of schooling, especially for girl children. We distributed educational materials and enrolled 45 new students in schools.',
      image: require('../assets/events/education_camp/event_2_1.webp')
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

  // Function to load event-specific photos from assets/events/ folder
  // create context ONCE (outside the function)
  const eventsContext = require.context(
    '../assets/events',
    true, // allow subfolders
    /\.(jpg|jpeg|png|gif|webp|avif)$/i
  );

  const loadEventPhotos = (eventId) => {
    try {
      const imageFiles = eventsContext
        .keys()
        .filter((path) => path.startsWith(`./${eventId}/`));

      const sortedFiles = imageFiles.sort((a, b) => {
        const getNumber = (str) => {
          const match = str.match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        };
        return getNumber(a) - getNumber(b);
      });

      return sortedFiles.map((filename) => ({
        src: eventsContext(filename),
        eventId,
        filename: filename.replace(`./${eventId}/`, ''),
      }));
    } catch (error) {
      console.error(`Error loading photos for event ${eventId}:`, error);
      return [];
    }
  };

  // State for gallery images and events
  const [galleryImages, setGalleryImages] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [eventPhotos, setEventPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
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

  // Handle "View Event Details" button click
  const handleViewEvent = (story) => {
    setSelectedStory(story);
    const photos = loadEventPhotos(story.id);
    setEventPhotos(photos);
    setCurrentPhotoIndex(0);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Close event modal
  const handleCloseModal = () => {
    setSelectedStory(null);
    setEventPhotos([]);
    setCurrentPhotoIndex(0);
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  // Navigate event photos in modal
  const handlePrevPhoto = () => {
    setCurrentPhotoIndex(prev => (prev - 1 + eventPhotos.length) % eventPhotos.length);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex(prev => (prev + 1) % eventPhotos.length);
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
                  <p>{story.description.substring(0, 100)}...</p>
                  <button 
                    className="btn"
                    onClick={() => handleViewEvent(story)}
                  >
                    View Event Details
                  </button>
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
                <p>{story.description.substring(0, 100)}...</p>
                <button 
                  className="btn"
                  onClick={() => handleViewEvent(story)}
                >
                  View Event Details
                </button>
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

      {/* Event Details Modal */}
      {selectedStory && (
        <div className="event-modal-overlay" onClick={handleCloseModal}>
          <div className="event-modal-content" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <h3 className="modal-title">{selectedStory.title}</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="modal-body">
              {/* Event Info */}
              <div className="event-info">
                <div className="info-item">
                  <FaCalendar className="info-icon" />
                  <span>{selectedStory.date}</span>
                </div>
                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <span>{selectedStory.location}</span>
                </div>
                <div className="info-item">
                  <FaUsers className="info-icon" />
                  <span>{selectedStory.participants}</span>
                </div>
              </div>
              
              {/* Event Description */}
              <div className="event-description">
                <h4>Event Description</h4>
                <p>{selectedStory.description}</p>
              </div>
              
              {/* Event Photos */}
              <div className="event-photos-section">
                <h4>Event Photos ({eventPhotos.length})</h4>
                
                {eventPhotos.length > 0 ? (
                  <>
                    {/* Photo Gallery Section - Similar to main page */}
                    <div className="modal-gallery-carousel-container">
                      {/* Left Arrow */}
                      <button 
                        className="modal-carousel-arrow left-arrow" 
                        onClick={handlePrevPhoto}
                        aria-label="Previous"
                        disabled={eventPhotos.length <= 1}
                      >
                        <FaChevronLeft />
                      </button>
                      
                      {/* Main Photo Display */}
                      <div className="modal-main-photo">
                        <img 
                          src={eventPhotos[currentPhotoIndex]?.src} 
                          alt={`${selectedStory.title} - Photo ${currentPhotoIndex + 1}`}
                        />
                      </div>
                      
                      {/* Right Arrow */}
                      <button 
                        className="modal-carousel-arrow right-arrow" 
                        onClick={handleNextPhoto}
                        aria-label="Next"
                        disabled={eventPhotos.length <= 1}
                      >
                        <FaChevronRight />
                      </button>
                      
                      {/* Photo Counter */}
                      <div className="modal-photo-counter">
                        {currentPhotoIndex + 1} / {eventPhotos.length}
                      </div>
                    </div>
                    
                    {/* Dot indicators */}
                    <div className="modal-gallery-dots">
                      {eventPhotos.map((_, index) => (
                        <button
                          key={index}
                          className={`modal-dot ${index === currentPhotoIndex ? 'active' : ''}`}
                          onClick={() => setCurrentPhotoIndex(index)}
                          aria-label={`Go to photo ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="no-photos-message">
                    <p>No photos available for this event.</p>
                    <p>Please add photos to <code>assets/events/{selectedStory.id}/</code> folder.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="modal-footer">
              <button className="btn" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
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
          min-height: 60px;
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
        
        /* ============ EVENT MODAL STYLES ============ */
        /* Using the same orange theme as the rest of the app */
        .event-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
          backdrop-filter: blur(5px);
        }
        
        .event-modal-content {
          background: #ffffff;
          border-radius: 15px;
          width: 90%;
          max-width: 1000px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          animation: modalFadeIn 0.3s ease;
          border: 1px solid rgba(255, 165, 0, 0.2);
        }
        
        .event-modal-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: #FFA500;
          border-radius: 15px 15px 0 0;
        }
        
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .modal-header {
          background: #ffffff;
          color: #2c3e50;
          padding: 25px 30px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid rgba(255, 165, 0, 0.2);
        }
        
        .modal-title {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 800;
          color: #2c3e50;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .modal-close {
          background: #FFA500;
          color: #2c3e50 !important;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(255, 165, 0, 0.3);
        }
        
        .modal-close:hover {
          background: #FF8C00;
          transform: rotate(90deg);
          box-shadow: 0 6px 15px rgba(255, 165, 0, 0.4);
        }
        
        .modal-body {
          padding: 30px;
          flex: 1;
          overflow-y: auto;
        }
        
        .event-info {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          margin-bottom: 30px;
          padding-bottom: 25px;
          border-bottom: 2px solid rgba(255, 165, 0, 0.2);
        }
        
        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1rem;
          color: #2c3e50;
          padding: 10px 15px;
          background: rgba(255, 165, 0, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(255, 165, 0, 0.2);
          transition: all 0.3s ease;
        }
        
        .info-item:hover {
          background: rgba(255, 165, 0, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 165, 0, 0.2);
        }
        
        .info-icon {
          color: #FFA500;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        
        .event-description {
          margin-bottom: 40px;
          padding: 25px;
          background: linear-gradient(to bottom, #fffaf0, #ffffff);
          border-radius: 10px;
          border: 1px solid rgba(255, 165, 0, 0.2);
          box-shadow: 0 5px 20px rgba(255, 165, 0, 0.1);
        }
        
        .event-description h4 {
          color: #2c3e50;
          font-size: 1.5rem;
          margin-bottom: 20px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding-bottom: 10px;
          border-bottom: 2px solid rgba(255, 165, 0, 0.3);
        }
        
        .event-description p {
          color: #666;
          line-height: 1.8;
          font-size: 1.1rem;
        }
        
        .event-photos-section {
          background: #ffffff;
          padding: 30px;
          border-radius: 15px;
          border: 1px solid rgba(255, 165, 0, 0.2);
          box-shadow: 0 10px 30px rgba(255, 165, 0, 0.15);
        }
        
        .event-photos-section h4 {
          color: #2c3e50;
          font-size: 1.5rem;
          margin-bottom: 25px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-align: center;
          padding-bottom: 15px;
          border-bottom: 2px solid rgba(255, 165, 0, 0.3);
        }
        
        /* Modal Gallery Carousel - Similar to main page gallery */
        .modal-gallery-carousel-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin-bottom: 25px;
          position: relative;
          height: 400px;
          min-height: 400px;
          width: 100%;
        }
        
        .modal-carousel-arrow {
          background: rgba(255, 165, 0, 0.7);
          color: #2c3e50;
          border: none;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.8rem;
          transition: all 0.3s ease;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(255, 165, 0, 0.2);
          z-index: 10;
          position: relative;
          margin: 0;
          backdrop-filter: blur(5px);
          border: 2px solid rgba(255, 165, 0, 0.3);
        }
        
        .modal-carousel-arrow:hover:not(:disabled) {
          background: rgba(255, 165, 0, 0.9);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(255, 165, 0, 0.3);
        }
        
        .modal-carousel-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none !important;
        }
        
        .modal-main-photo {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f8f8;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border: 4px solid #FFA500;
        }
        
        .modal-main-photo img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .modal-photo-counter {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(0, 0, 0, 0.7);
          color: #ffffff;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 0.95rem;
          font-weight: 600;
          backdrop-filter: blur(5px);
        }
        
        .modal-gallery-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        
        .modal-dot {
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
        
        .modal-dot.active {
          background: #FFA500;
          transform: scale(1.4);
          box-shadow: 0 0 15px rgba(255, 165, 0, 0.5);
        }
        
        .modal-dot:hover:not(:disabled) {
          background: #FFA500;
          transform: scale(1.2);
        }
        
        .no-photos-message {
          text-align: center;
          padding: 40px;
          color: #666;
          background: #f8f8f8;
          border-radius: 10px;
          margin-top: 20px;
          border: 1px solid rgba(255, 165, 0, 0.2);
        }
        
        .no-photos-message code {
          background: #e0e0e0;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          color: #2c3e50;
        }
        
        .modal-footer {
          padding: 20px 30px;
          border-top: 1px solid rgba(255, 165, 0, 0.2);
          display: flex;
          justify-content: flex-end;
          background: linear-gradient(to bottom, #fffaf0, #ffffff);
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
          
          /* Modal Responsive */
          .event-modal-content {
            width: 95%;
            max-height: 85vh;
          }
          
          .modal-gallery-carousel-container {
            height: 350px;
            min-height: 350px;
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
          
          .gallery-header-divider {
            max-width: 80px;
          }
          
          .gallery-spacing {
            height: 40px;
          }
          
          /* Modal Responsive */
          .modal-header {
            padding: 20px 25px 15px;
          }
          
          .modal-title {
            font-size: 1.5rem;
          }
          
          .modal-body {
            padding: 20px;
          }
          
          .event-info {
            flex-direction: column;
            gap: 15px;
          }
          
          .modal-gallery-carousel-container {
            height: 300px;
            min-height: 300px;
            gap: 20px;
          }
          
          .modal-carousel-arrow {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
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
          
          /* Modal Responsive */
          .event-modal-content {
            padding: 0;
            max-height: 80vh;
          }
          
          .modal-gallery-carousel-container {
            height: 250px;
            min-height: 250px;
            gap: 15px;
          }
          
          .modal-carousel-arrow {
            width: 45px;
            height: 45px;
            font-size: 1.3rem;
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
          
          /* Modal Responsive */
          .modal-title {
            font-size: 1.3rem;
          }
          
          .modal-close {
            width: 35px;
            height: 35px;
          }
          
          .modal-gallery-carousel-container {
            height: 220px;
            min-height: 220px;
          }
          
          .event-info {
            gap: 10px;
          }
          
          .info-item {
            padding: 8px 12px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Stories;