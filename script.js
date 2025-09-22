
const images = [
    'https://cdn.thecollector.com/wp-content/uploads/2021/12/colosseum-world-wonder-national-geographic.jpg?width=1200&quality=100&dpr=2', 
    'https://cdn.thecollector.com/wp-content/uploads/2022/12/petra-jordan-treasury-al-khazneh.jpg?width=1200&quality=100&dpr=2',
    'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/73/d0/32.jpg',
    'https://cdn.thecollector.com/wp-content/uploads/2021/12/machu-picchu-world-wonder.jpg?width=1095&quality=100&dpr=2', 
    'https://cdn.thecollector.com/wp-content/uploads/2021/12/chichen-itza-image-1-1.jpg?width=1280&quality=100&dpr=2',
    'https://cdn.thecollector.com/wp-content/uploads/2021/12/colosseum-world-wonder-national-geographic.jpg?width=1200&quality=100&dpr=2',
    'https://cdn.thecollector.com/wp-content/uploads/2021/12/the-taj-mahal-architectural-digest.jpg?width=1200&quality=100&dpr=2' 
];

const imageDisplay = document.querySelector('.image-display');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const indicatorsContainer = document.querySelector('.indicators');
const playPauseBtn = document.querySelector('.play-pause-btn');

let currentImageIndex = 0;
let slideshowInterval;
let isPlaying = true;

function renderSlider() {
    imageDisplay.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    images.forEach((imageUrl, index) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Wonder of the World ${index + 1}`;
        imageDisplay.appendChild(img);

        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === currentImageIndex) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => goToImage(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateSliderPosition();
}


function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateSliderPosition();
}


function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateSliderPosition();
}


function goToImage(index) {
    currentImageIndex = index;
    updateSliderPosition();
    if (isPlaying) {
        startSlideshow(); 
    }
}


function updateSliderPosition() {
    imageDisplay.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentImageIndex);
    });
}


function startSlideshow() {
    clearInterval(slideshowInterval);
    if (isPlaying) {
        slideshowInterval = setInterval(showNextImage, 3000);
    }
}


function togglePlayPause() {
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
    if (isPlaying) {
        startSlideshow();
    } else {
        clearInterval(slideshowInterval);
    }
}


nextBtn.addEventListener('click', () => {
    showNextImage();
    if (isPlaying) startSlideshow();
});

prevBtn.addEventListener('click', () => {
    showPreviousImage();
    if (isPlaying) startSlideshow();
});

playPauseBtn.addEventListener('click', togglePlayPause);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        showNextImage();
        if (isPlaying) startSlideshow();
    } else if (e.key === 'ArrowLeft') {
        showPreviousImage();
        if (isPlaying) startSlideshow();
    }
});


imageDisplay.addEventListener('mouseenter', () => {
    if (isPlaying) {
        clearInterval(slideshowInterval);
    }
});

imageDisplay.addEventListener('mouseleave', () => {
    if (isPlaying) {
        startSlideshow();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderSlider();
    startSlideshow();
});
