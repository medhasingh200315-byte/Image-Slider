// Array of image URLs for the slider
const images = [
    'https://cdn.thecollector.com/wp-content/uploads/2021/12/colosseum-world-wonder-national-geographic.jpg?width=1200&quality=100&dpr=2', 
    'https://cdn.thecollector.com/wp-content/uploads/2022/12/petra-jordan-treasury-al-khazneh.jpg?width=1200&quality=100&dpr=2',
    'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/73/d0/32.jpg',
    'https://cdn.thecollector.com/wp-content/uploads/2021/12/machu-picchu-world-wonder.jpg?width=1095&quality=100&dpr=2', 
    'https://cdn.thecollector.com/wp-content/uploads/2021/12/chichen-itza-image-1-1.jpg?width=1280&quality=100&dpr=2',
    'https://cdn.thecollector.com/wp-content/uploads/2021/12/colosseum-world-wonder-national-geographic.jpg?width=1200&quality=100&dpr=2', 
    'https://cdn.thecollector.com/wp-content/uploads/2021/12/the-taj-mahal-architectural-digest.jpg?width=1200&quality=100&dpr=2' 
];

// Get references to the HTML elements
const imageDisplay = document.querySelector('.image-display');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const indicatorsContainer = document.querySelector('.indicators');
const playPauseBtn = document.querySelector('.play-pause-btn');

// State variables for the slider
let currentImageIndex = 0;
let slideshowInterval;
let isPlaying = true; // Slideshow starts in the playing state

/**
 * Renders the slider by dynamically creating <img> elements and indicator dots.
 */
function renderSlider() {
    imageDisplay.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Create an <img> element for each URL and append it to the display area
    images.forEach((imageUrl, index) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Wonder of the World ${index + 1}`;
        imageDisplay.appendChild(img);

        // Create a <div> element for each indicator dot
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === currentImageIndex) {
            indicator.classList.add('active'); // Highlight the current indicator
        }
        // Add click listener to navigate to the corresponding image
        indicator.addEventListener('click', () => goToImage(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateSliderPosition();
}

/**
 * Moves to the next image in the array, looping back to the start.
 */
function showNextImage() {
    // Uses the modulo operator (%) to loop the index: 6 -> 0
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateSliderPosition();
}

/**
 * Moves to the previous image in the array, looping back to the end.
 */
function showPreviousImage() {
    // Calculates the previous index, handling the wrap-around from 0 to the last image
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateSliderPosition();
}

/**
 * Sets the slider to a specific image index.
 * @param {number} index - The index of the image to go to.
 */
function goToImage(index) {
    currentImageIndex = index;
    updateSliderPosition();
    // Restart the slideshow timer if it was playing
    if (isPlaying) {
        startSlideshow(); 
    }
}

/**
 * Updates the CSS transform property to slide the images.
 * Also updates the active state of the indicators.
 */
function updateSliderPosition() {
    // Moves the image-display track left by a multiple of 100% (the width of one image)
    imageDisplay.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    
    // Update indicator active class
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentImageIndex);
    });
}

/**
 * Starts the automatic slideshow interval.
 */
function startSlideshow() {
    clearInterval(slideshowInterval); // Clear any existing interval
    if (isPlaying) {
        // Set a new interval to change images every 3000 milliseconds (3 seconds)
        slideshowInterval = setInterval(showNextImage, 3000);
    }
}

/**
 * Toggles the slideshow state between play and pause.
 */
function togglePlayPause() {
    isPlaying = !isPlaying; // Toggle the state
    playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play'; // Update button text
    
    if (isPlaying) {
        startSlideshow();
    } else {
        clearInterval(slideshowInterval); // Stop the timer if pausing
    }
}


// --- Event Listeners ---

// Next button click handler
nextBtn.addEventListener('click', () => {
    showNextImage();
    if (isPlaying) startSlideshow(); // Restart timer on manual interaction
});

// Previous button click handler
prevBtn.addEventListener('click', () => {
    showPreviousImage();
    if (isPlaying) startSlideshow(); // Restart timer on manual interaction
});

// Play/Pause button handler
playPauseBtn.addEventListener('click', togglePlayPause);

// Keyboard navigation (Arrow keys)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        showNextImage();
        if (isPlaying) startSlideshow();
    } else if (e.key === 'ArrowLeft') {
        showPreviousImage();
        if (isPlaying) startSlideshow();
    }
});


// Pause slideshow on mouse hover over the image
imageDisplay.addEventListener('mouseenter', () => {
    if (isPlaying) {
        clearInterval(slideshowInterval);
    }
});

// Resume slideshow on mouse leave from the image
imageDisplay.addEventListener('mouseleave', () => {
    if (isPlaying) {
        startSlideshow();
    }
});

// Initial function calls when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    renderSlider(); // Initial creation of images and indicators
    startSlideshow(); // Start the automatic slideshow
});
