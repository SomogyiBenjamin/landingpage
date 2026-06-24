
document.addEventListener('DOMContentLoaded', function() {
    const carouselNames = new Set();
    document.querySelectorAll('.carousel__activator').forEach(input => {
        carouselNames.add(input.name);
    });


    carouselNames.forEach(carouselName => {
        const inputs = document.querySelectorAll(`input[name="${carouselName}"]`);
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % inputs.length;
            inputs[currentIndex].checked = true;
        }, 10000);
    });
});



document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault(); 
  
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const endpoint = "https://formspree.io/f/meebeeae";

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, message: message })
    });

    if (response.ok) {
      document.getElementById('modalTitle').innerText = "Köszönöm!";
      document.getElementById('modalMessage').innerText = "Az üzeneted sikeresen elküldted. Hamarosan kapcsolatba lépek veled.";
      document.getElementById('contactForm').reset();
      document.getElementById('thankYouModal').style.display = 'block';
    } else {
      document.getElementById('modalTitle').innerText = "Hiba!";
      document.getElementById('modalMessage').innerText = "Hiba történt a küldés során. Kérlek, próbáld újra!";
      document.getElementById('thankYouModal').style.display = 'block';
    }
  } catch (error) {
    document.getElementById('modalTitle').innerText = "Hiba!";
    document.getElementById('modalMessage').innerText = "Hálózati hiba történt. Ellenőrizd a kapcsolatot.";
    document.getElementById('thankYouModal').style.display = 'block';
  }
});

const modal = document.getElementById('thankYouModal');
const closeBtn = document.querySelector('.close');

if (closeBtn) {
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  }
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Image modal functionality
const imageModal = document.getElementById('imageModal');
const imageModalCloseBtn = imageModal.querySelector('.close');

if (imageModalCloseBtn) {
  imageModalCloseBtn.onclick = function() {
    imageModal.style.display = 'none';
    // Stop rotation when closing
    if (window.modalRotationInterval) {
      clearInterval(window.modalRotationInterval);
      window.modalRotationInterval = null;
    }
  }
}

window.addEventListener('click', function(event) {
  if (event.target == imageModal) {
    imageModal.style.display = 'none';
    // Stop rotation when closing
    if (window.modalRotationInterval) {
      clearInterval(window.modalRotationInterval);
      window.modalRotationInterval = null;
    }
  }
});

// Add click listeners to carousel images
document.querySelectorAll('.carousel_image').forEach((img) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', function() {
    // Get the parent carousel container
    const parentCarousel = img.closest('ul.carousel');
    
    // Get all slides and inputs from the parent carousel
    const slides = parentCarousel.querySelectorAll('.carousel__slide');
    const inputs = parentCarousel.querySelectorAll('.carousel__activator');
    const slideCount = slides.length;
    
    // Find which input is currently checked
    let checkedIndex = 0;
    inputs.forEach((input, i) => {
      if (input.checked) {
        checkedIndex = i;
      }
    });
    
    // Update modal carousel
    const modalCarousel = document.getElementById('modalCarousel');
    
    // Clear existing slides (keep only inputs and indicators div)
    const existingSlides = modalCarousel.querySelectorAll('.carousel__slide');
    existingSlides.forEach(slide => slide.remove());
    
    // Clear existing inputs
    const existingInputs = modalCarousel.querySelectorAll('.carousel__activator');
    existingInputs.forEach(input => input.remove());
    
    // Clear existing indicators
    const existingIndicators = modalCarousel.querySelector('.carousel__indicators');
    if (existingIndicators) existingIndicators.remove();
    
    // Create new inputs and slides based on the parent carousel
    slides.forEach((slide, index) => {
      // Create new input
      const newInput = document.createElement('input');
      newInput.className = 'carousel__activator';
      newInput.type = 'radio';
      newInput.id = `modal_${index}`;
      newInput.name = 'carouselModal';
      if (index === checkedIndex) newInput.checked = true;
      modalCarousel.appendChild(newInput);
    });
    
    // Create slides
    slides.forEach((slide, index) => {
      const newSlide = document.createElement('li');
      newSlide.className = 'carousel__slide';
      const srcImg = slide.querySelector('img');
      if (srcImg) {
        const imgClone = srcImg.cloneNode(true);
        newSlide.appendChild(imgClone);
      }
      modalCarousel.appendChild(newSlide);
    });
    
    // Create indicators
    const indicatorsDiv = document.createElement('div');
    indicatorsDiv.className = 'carousel__indicators';
    for (let i = 0; i < slideCount; i++) {
      const label = document.createElement('label');
      label.className = 'carousel__indicator';
      label.htmlFor = `modal_${i}`;
      indicatorsDiv.appendChild(label);
    }
    modalCarousel.appendChild(indicatorsDiv);
    
    // Show modal
    imageModal.style.display = 'block';
    
    // Restart modal carousel auto-rotation
    const newModalInputs = modalCarousel.querySelectorAll(`input[name="carouselModal"]`);
    let currentModalIndex = checkedIndex;
    
    // Clear any existing rotation interval
    if (window.modalRotationInterval) {
      clearInterval(window.modalRotationInterval);
    }
    
    // Start new rotation
    window.modalRotationInterval = setInterval(() => {
      currentModalIndex = (currentModalIndex + 1) % newModalInputs.length;
      newModalInputs[currentModalIndex].checked = true;
    }, 10000);
  });
});