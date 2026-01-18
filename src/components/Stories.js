import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes, FaCalendar, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import '../styles/components/Stories.css';

const Stories = ({ onModalOpen }) => {  // Add onModalOpen prop
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
    
    // Notify parent component that modal is open
    if (onModalOpen) {
      onModalOpen(true);
    }
  };

  // Close event modal
  const handleCloseModal = () => {
    setSelectedStory(null);
    setEventPhotos([]);
    setCurrentPhotoIndex(0);
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
    
    // Notify parent component that modal is closed
    if (onModalOpen) {
      onModalOpen(false);
    }
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
    </section>
  );
};

export default Stories;